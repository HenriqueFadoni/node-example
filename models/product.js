const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    // Adding products to the document
    save() {
        const productsFile = path.join(
            rootDir,
            'data',
            'products.json'
        );
        fs.readFile(productsFile, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(productsFile, JSON.stringify(products), err => {
                console.log(err)
            });
        });
    }

    static fetchAll(callBack) {
        const productsFile = path.join(
            rootDir,
            'data',
            'products.json'
        );
        fs.readFile(productsFile, (err, fileContent) => {
            if (err) {
                callBack([]);
            }
            callBack(JSON.parse(fileContent));
        });
    }
}