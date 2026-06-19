require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'database.json');

let mysqlPool = null;

/* ------------------ FILE DB (fallback) ------------------ */

function ensureDatabase() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}, null, 2));
  }
}

function readDatabase() {
  ensureDatabase();
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8') || '{}');
  } catch (error) {
    console.error('Database read failed:', error);
    return {};
  }
}

function writeDatabase(data) {
  ensureDatabase();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

/* ------------------ MYSQL CONNECTION ------------------ */

function getMysqlPool() {
  if (!process.env.DB_HOST) {
    return null;
  }

  if (!mysqlPool) {
    mysqlPool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  return mysqlPool;
}

/* ------------------ INIT MYSQL TABLE ------------------ */

async function initStore() {
  ensureDatabase();
  const pool = getMysqlPool();

  if (!pool) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_store (
      store_key VARCHAR(191) PRIMARY KEY,
      store_value JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

/* ------------------ GET VALUE ------------------ */

async function getStoreValue(key) {
  const pool = getMysqlPool();

  if (!pool) {
    const db = readDatabase();
    return Object.prototype.hasOwnProperty.call(db, key) ? db[key] : null;
  }

  const [rows] = await pool.execute(
    'SELECT store_value FROM app_store WHERE store_key = ? LIMIT 1',
    [key]
  );

  if (!rows.length) return null;

  return typeof rows[0].store_value === 'string'
    ? JSON.parse(rows[0].store_value)
    : rows[0].store_value;
}

/* ------------------ SET VALUE ------------------ */

async function setStoreValue(key, value) {
  const pool = getMysqlPool();

  if (!pool) {
    const db = readDatabase();
    db[key] = value;
    writeDatabase(db);
    return value;
  }

  await pool.execute(
    `INSERT INTO app_store (store_key, store_value)
     VALUES (?, CAST(? AS JSON))
     ON DUPLICATE KEY UPDATE store_value = VALUES(store_value)`,
    [key, JSON.stringify(value)]
  );

  return value;
}

/* ------------------ DELETE VALUE ------------------ */

async function deleteStoreValue(key) {
  const pool = getMysqlPool();

  if (!pool) {
    const db = readDatabase();
    delete db[key];
    writeDatabase(db);
    return;
  }

  await pool.execute(
    'DELETE FROM app_store WHERE store_key = ?',
    [key]
  );
}

/* ------------------ INIT ------------------ */

ensureDatabase();

app.use(express.json({ limit: '2mb' }));

/* ------------------ ROUTES ------------------ */

app.get('/api/health', async (req, res) => {
  try {
    await initStore();
    res.json({
      ok: true,
      database: process.env.DB_HOST ? 'mysql' : 'file'
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/api/store/:key', async (req, res) => {
  try {
    const value = await getStoreValue(req.params.key);
    res.json({ key: req.params.key, value });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/store/:key', async (req, res) => {
  try {
    const value = await setStoreValue(req.params.key, req.body.value);
    res.json({ success: true, key: req.params.key, value });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/store/:key', async (req, res) => {
  try {
    await deleteStoreValue(req.params.key);
    res.json({ success: true, key: req.params.key });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ------------------ STATIC FRONTEND ------------------ */

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/* ------------------ START SERVER ------------------ */

initStore()
  .then(() => {
    app.listen(PORT, () => {
      console.log('========================================================');
      console.log('ScholarLink AI Server is running!');
      console.log(`Port: ${PORT}`);
      console.log(`Database: ${process.env.DB_HOST ? 'MySQL (Aiven)' : 'File DB'}`);
      console.log('========================================================');
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });