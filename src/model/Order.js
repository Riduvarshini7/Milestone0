class Order {
    constructor(totalPrice, loyaltyPoints) {
        this.totalPrice = totalPrice;
        this.loyaltyPoints = loyaltyPoints;
    }

    displaySummary = () => "\nTotal price: " + this.totalPrice + "\n" + "Will receive " + this.loyaltyPoints + " loyalty points\n";
}

module.exports = {Order}