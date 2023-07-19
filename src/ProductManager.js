const fs = require('fs');

class ProductManager {
    //Constructor que recibe la ruta del archivo de productos
    constructor(path) {
        this.path = path;
        this.loadProducts();
    }

    //Carga los productos desde el archivo especificado en el constructor
    //Si hay un error al cargar: inicializa el array de productos vacío
    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.log('Error loading products:', error.message);
            this.products = [];
        }
    }

    //Guarda los productos.
    //Si hay un error al guardar: mensaje de error
    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (error) {
            console.log('Error saving products:', error.message);
        }
    }

    //Agrega un nuevo producto al array de productos
    //Asigna un nuevo ID al producto basado en el último ID existente en el array
    addProduct(product) {
        const newProduct = {
            ...product
        };

        if (this.products.length === 0) {
            newProduct.id = 1;
        } else{
            newProduct.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(newProduct);
        this.saveProducts();
    }

    //Obtiene los productos
    getProducts() {
        return this.products;
    }

    //Obtiene un producto por su id
    //Si no se encuentra el producto: mensaje de error
    getProductById(id) {
        const product = this.products.find((product) => product.id === id);

        if (product) {
            return product;
        } else{
            console.log('Product not found');
        }
    }

    //Actualiza un producto existente por su id
    //Si no se encuentra el producto: mensaje de error
    updateProduct(id, fieldsToUpdate) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            const product = this.products[productIndex];
            const updatedProduct = {...product, ...fieldsToUpdate};
            this.products[productIndex] = updatedProduct;
            this.saveProducts();
        } else {
            console.log('Product not found');
        }
    }

    //Elimina un producto existente por su id
    //Si no se encuentra el producto: mensaje de error
    deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
        } else {
            console.log('Product not found');
        }
    }
}

module.exports = ProductManager;
