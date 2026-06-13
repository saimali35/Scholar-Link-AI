const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));
// Catch-all route to redirect back to index.html or handle default behaviors
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(` ScholarLink AI Server is running locally!`);
  console.log(` Access your frontend at: http://localhost:${PORT}`);
  console.log(`========================================================`);
});
