const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //console.log('In another middleware!');
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>'); //Auto sets text/html content type to the response.

    //res.sendFile(path.join(rootDir, 'views', 'admin', 'add-product.html'));
    res.render('admin/edit-product', { pageTitle: 'Add product', path: '/admin/add-product', editing: false });
};


exports.postAddProduct = (req, res, next) => {
    //console.log(req.body); //req.body is NOT parsed. We need to register a parser.
    
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product(null, title, imageUrl, price, description); //null means we still don't have an id (because a new prod is created)
    product.save();
    
    //products.push({title: req.body.title});
    
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', { 
            pageTitle: 'Edit product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesciption = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesciption);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            pageTitle: 'Admin products', 
            prods: products, 
            path: '/admin/products'
        });
    });
};