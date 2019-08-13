const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res) => {
    const title = new Product(req.body.title);
    const imageUrl = new Product(req.body.imageUrl);
    const price = new Product(req.body.price);
    const description = new Product(req.body.description);
    product.save(title, imageUrl, price, description);
    res.redirect('/admin');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin',
            path: '/admin/products'
        });
    });
};