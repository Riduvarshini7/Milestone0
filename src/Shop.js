//import Product from "./model/Product.js";

const axios = require("axios");
var https = require("https");
const { map } = require("lodash");
var {Product}  = require("./model/Product");
var {Customer} = require("./model/Customer");
var {ShoppingCart} = require("./model/ShoppingCart");
const prompt=require("prompt-sync")({sigint:true});

// import * as promptSync from 'prompt-sync';
// import axios from 'axios';
// import * as https from 'http';

let globalData;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});


//let cate = "men's clothing";
console.log("\nEnter category to Shop: \n\n| electronics | jewelery | men's clothing | women's clothing |\n")
let cate = prompt(" ");

axios
  .get(`https://fakestoreapi.com/products/category/${cate}`, { httpsAgent })
  .then((response) => {
    globalData = response.data;
    console.log(globalData);

    let input = prompt("Enter a list of items separated by commas:");
    let array = input.split(",").map(Number);
    //console.log(array);

    // const obj = JSON.parse(JSON.stringify(globalData[0]));
    // console.log(obj); 

    const indexes = new Map();

    for(let i=0; i<globalData.length;i++)
    {
      //console.log(globalData[i].id);
      indexes.set(globalData[i].id,i);
    }
    //console.log(indexes);

    const customer = new Customer("Priya");

    const products = [];
    const shoppingCart = new ShoppingCart(customer, products);

    for(let i = 0; i<array.length; i++)
    {
      let ind = indexes.get(array[i]);
      let prod = new Product(globalData[ind].price,globalData[ind].category,globalData[ind].title);
      shoppingCart.addProduct(prod);
    }

    console.log(shoppingCart.displaySummary())

    const order = shoppingCart.checkout();
    console.log(order.displaySummary())

  });





