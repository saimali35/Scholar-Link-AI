require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'database.json');
const databaseUrl = process.env.DATABASE_URL;
let mysqlPool = null;

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

function getMysqlPool() {
  if (!databaseUrl) {
    return null;
  }

  if (!mysqlPool) {
    mysqlPool = mysql.createPool({
      uri: databaseUrl,
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true
    });
  }

  return mysqlPool;
}

async function initStore() {
  ensureDatabase();
  const pool = getMysqlPool();

  if (!pool) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_store (
      store_key VARCHAR(191) PRIMARY KEY,
      store_value JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

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

  if (!rows.length) {
    return null;
  }

  return typeof rows[0].store_value === 'string'
    ? JSON.parse(rows[0].store_value)
    : rows[0].store_value;
}

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

async function deleteStoreValue(key) {
  const pool = getMysqlPool();

  if (!pool) {
    const db = readDatabase();
    delete db[key];
    writeDatabase(db);
    return;
  }

  await pool.execute('DELETE FROM app_store WHERE store_key = ?', [key]);
}

ensureDatabase();

app.use(express.json({ limit: '2mb' }));

app.get('/api/health', async (req, res) => {
  try {
    await initStore();
    res.json({
      ok: true,
      database: databaseUrl ? 'mysql' : dbPath
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

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Catch-all route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

initStore()
  .then(() => {
    app.listen(PORT, () => {
      console.log('========================================================');
      console.log('ScholarLink AI Server is running!');
      console.log(`Access your app at: http://localhost:${PORT}`);
      console.log(`Database: ${databaseUrl ? 'MySQL' : dbPath}`);
      console.log('========================================================');
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });