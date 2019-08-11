const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    const products = adminData.products;
    res.render(
        'shop',
        { 
            prods: products,
            pageTitle: 'Shop',
            path:'/admin/',
            hasProducts: products.length > 0
        }
    );
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;