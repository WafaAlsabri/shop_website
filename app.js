import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express()




const port = 8080

// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// Serve Static Files from /public
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/product-detail_01', (req, res) => {
    res.render('product-detail_01')
})

app.get("/products?:p_id", (req, response) => {
    if (!req.query.p_id) {
        fetch('https://dummyjson.com/products?select=title,price,rating,discountPercentage,thumbnail')
            .then(res => res.json())
            .then(res => response.render('product', { Products: res.products }))
    } else {

        fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price,rating,discountPercentage,thumbnail')
            .then(res => res.json())
            .then(r => {
                fetch('https://dummyjson.com/products/' + req.query.p_id)
                    .then(res => res.json())
                    .then(res => response.render('product-detail_01', { Product: res, Products: r.products }))
            })

    }
})



app.get('/shopping-cart', (req, res) => {
    res.render('shopping-cart')
})
app.get('/product-detail_01', (req, res) => {
    res.render('product-detail_01')
})


app.get('/index-header-2', (req, res) => {
    res.render('index-header-2')
})

app.get('/checkout', (req, res) => {
    res.render('checkout')
})
app.get('/blog-detail_01', (req, res) => {
    res.render('blog-detail_01')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/people/:id', (req, res) => {
    // Database operation to get data...
    let data = {
        id: req.params.id,
        name: "Ahmad Badr",
        age: 19,
        friends: ["Saif", "Hisham", "Yusuf"]
    }
    res.render('person', data)
})

app.listen(port, function() {
    console.log(`listening on port ${port}...`)
})