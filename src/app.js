const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

//Instancia del ProductManager
const productManager = new ProductManager('products.json');

//Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
    const {limit} = req.query;
    let products = productManager.getProducts();

    if (limit) {
        const limitNum = parseInt(limit);
        products = products.slice(0, limitNum);
    }

    res.json(products);
});

//Endpoint para obtener producto por su id
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else{
        res.status(404).json({
            error: 'Product not found'
        });
    }
});

//Iniciamos servidor
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
