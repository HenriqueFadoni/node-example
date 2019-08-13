const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');

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
    constructor(title) {
        this.title = title;
    }

    // Adding Products to the Document
    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(productsFile, JSON.stringify(products), err => {
                console.log(err)
            });
        });
    }

    // Fetch All Data from the File
    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }
}