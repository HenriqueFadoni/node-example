const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');

const Cart = require('./cart');

const productsFile = path.join(
  rootDir,
  'data',
  'products.json'
);

const getProductsFromFile = (callBack) => {
  fs.readFile(productsFile, (err, fileContent) => {
    if (err) {
      callBack([]);
    } else {
      callBack(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // Adding Products to the Document
  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(productsFile, JSON.stringify(updatedProducts), err => {
          console.log(err)
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(productsFile, JSON.stringify(products), err => {
          console.log(err)
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id === id);
      fs.writeFile(productsFile, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  // Fetch All Data from the File
  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
}