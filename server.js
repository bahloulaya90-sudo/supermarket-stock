const express = require('express');
const path = require('path');
const fs = require('fs'); // Jdid
const app = express();
const PORT = 5000;

app.use(express.json());

const DATA_FILE = 'data.json'; // fichier li ghadi nsauvegardiw fih

// Fonction bach n9raw men fichier
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE));
  }
  return [ // ila makanch fichier, nbda b hado
    {id: 1, name: "Lait", stock: 20, prix: 8},
    {id: 2, name: "Pain", stock: 50, prix: 2},
    {id: 3, name: "Huile", stock: 15, prix: 25}
  ];
}

// Fonction bach nktbo f fichier
function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

let products = loadData(); // Kanloadiw mli kaybd2 server

app.get('/api/products', (req, res) => { res.json(products); });

app.post('/api/products/:id/update', (req, res) => {
  const id = parseInt(req.params.id);
  let product = products.find(p => p.id === id);
  if(product) { 
    product.stock += req.body.change; 
    saveData(); // Sovader hna
    res.json(product); 
  }
});

app.post('/api/products', (req, res) => {
  const newProduct = { 
    id: products.length > 0 ? Math.max(...products.map(p=>p.id)) + 1 : 1, 
    name: req.body.name, 
    stock: req.body.stock,
    prix: req.body.prix
  };
  products.push(newProduct); 
  saveData(); // Sovader hna
  res.json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  saveData(); // Sovader hna
  res.json({message: 'Produit supprimé'});
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'src', 'index.html')); });

app.listen(PORT, () => { console.log(`Server: http://localhost:${PORT}`); });