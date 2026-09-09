const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api/products', (req, res) => {
  res.json([
    {id: 1, name: "7lib", stock: 20},
    {id: 2, name: "khobz", stock: 50},
    {id: 3, name: "zit", stock: 15}
  ]);
});

app.listen(PORT, () => {
  console.log(`Server khdam f http://localhost:${PORT}`);
});