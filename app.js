import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import axios from 'axios';

const app = express()




const port = process.env.PORT|| 8080;

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

/*app.get("/products?:p_id", (req, response) => {
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
})*/

app.get('/products',async (req, res, next) => {
    try {
      let response = await axios.get('https://dummyjson.com/products');
      res.render('products', {
        products: response.data.products,
      });
    } catch (err) {
      console.log(err);
    }
});

app.get('/products/categories',async(req, res, next) => {
  try {
    
    let response = await axios.get(
      `https://dummyjson.com/products/categories`
    );
    res.render('categories', {
      products: response.data,
    });
  } catch (err) {
    console.log(err);
  }
});


app.get('/products/category/:category',async(req, res, next) => {
  try {
    const category = req.params.category;
    let response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    res.render('category', {
      products: response.data,
    });
  } catch (err) {
    console.log(err);
  }
});


app.get('/products/search', async (req, res, next) => {
    try {
      const query = req.query.q;
      let response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
  
      res.render('search', {
        products: response.data.products,
      });
    } catch (err) {
      console.log(err);
      res.send('<h1>Sorry There are no products to display.....</h1>')
    }
});
  

app.get('/products/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    let response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );

    res.render('product', {
      product: response.data,
    });
  } catch (err) {
    console.log(err);
    res.send('<h1>Sorry There are no products to display.....</h1>')
  }
});



app.get('/shopping-cart', (req, res) => {
    res.render('shopping-cart')
})

app.get('/categories', (req, res) => {
  res.render('categories')
})
app.get('/category', (req, res) => {
  res.render('category')
})
app.get('/product-detail_01', (req, res) => {
    res.render('product-detail_01')
})
app.get('/product', (req, res) => {
  res.render('product')
})

app.get('/index-header-2', (req, res) => {
    res.render('index-header-2')
})

app.get('/register', (req, res) => {
  res.render('register')
})
app.get('/checkout', (req, res) => {
    res.render('checkout')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/blog-detail_01', (req, res) => {
    res.render('blog-detail_01')
})
app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/checkout', (req, res) => {
  res.render('checkout')
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