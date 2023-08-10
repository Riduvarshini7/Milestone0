var {Customer} = require("../../src/model/Customer");
var {ShoppingCart} = require("../../src/model/ShoppingCart");
var {Product}  = require("../../src/model/Product");

console.log(Customer.name);

describe("Shopping cart should checkout", () => {

    it("Should calculate correct total and loyalty points for 20% discounted products under electronics category", () => {
        const customer = new Customer("Harry Styles");
        const products = [new Product(64, "electronics", "WD 2TB Elements Portable External Hard Drive - USB 3.0")];
        const shoppingCart = new ShoppingCart(customer, products);
        
        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(51.20);
        expect(order.loyaltyPoints).toBe(6.40);
    });

    it("Should calculate correct total and loyalty points for 10% discounted products under men's clothing category", () => {
        const customer = new Customer("Taylor Swift");
        const products = [new Product(22.3, "men's clothing", "Mens Casual Premium Slim Fit T-Shirts")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(20.07);
        expect(order.loyaltyPoints).toBe(1.49);
    });

    it("Should calculate correct total and loyalty points for non discounted products", () => {
        const customer = new Customer("AR Rahman");
        const products = [new Product(10.99, "jewelery", "Pierced Owl Rose Gold Plated Stainless Steel Double")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(10.99);
        expect(order.loyaltyPoints).toBe(2.2);
    });

 });

 describe("Shopping cart should modify products", () => {
    it("Should add another product to the cart", () => {
        const customer = new Customer("Ramya");
        const products = [new Product(15.99, "men's clothing", "Mens Casual Slim Fit")];
        const shoppingCart = new ShoppingCart(customer, products);

        shoppingCart.addProduct(new Product(55.99, "men's clothing", "Mens Cotton Jacket"));

        expect(shoppingCart.products).toEqual([
            new Product(15.99, "men's clothing", "Mens Casual Slim Fit"),
            new Product(55.99, "men's clothing", "Mens Cotton Jacket")
        ]);
    });
});
