//import _ from "lodash";
//import Order from "./Order.js";
const { _ } = require("lodash");
var {Order}  = require("./Order");
class ShoppingCart {
    constructor(customer, products) {
        this.customer = customer;
        this.products = products;
    };

    addProduct = (product) => {
        this.products.push(product);
    };

    removeProduct = (product) => {
        _.remove(this.products, product);
    };

    checkout = () => {
        let totalPrice = 0;
        let loyaltyPointsEarned = 0;

        this.products.forEach(product => {
            let discount = 0;
            if (product.category == "electronics") {
                discount = product.price * 0.2;
                loyaltyPointsEarned += product.price / 10;
            } else if (product.category == "men's clothing") {
                discount = product.price * 0.1;
                loyaltyPointsEarned += product.price / 15;
            } else if (product.category == "women's clothing") {
                discount = product.price * 0.15;
                loyaltyPointsEarned += product.price / 15;
            } 
            else {
                loyaltyPointsEarned += product.price / 5;
            }

            totalPrice += product.price - discount;
            //totalPrice = totalPrice.toFixed(2)
        });

        return new Order(Number(totalPrice.toFixed(2)), Number(loyaltyPointsEarned.toFixed(2)));
    };

    displaySummary = () =>  {
        return "\nCustomer: " + this.customer.name + "\n\n" + 
            "Bought:  \n\n" + this.products.map(p => "- " + p.name + ", " + p.price).join('\n');
    }
};

module.exports = {ShoppingCart}