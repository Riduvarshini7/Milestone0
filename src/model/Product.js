//export default class Product {
class Product {
    constructor(price, category, name) {
        this.price = price;
        this.category = category;
        this.name = name;
    }
};

module.exports = {Product}