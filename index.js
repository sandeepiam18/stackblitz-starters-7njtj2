const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());

const port = 3000;

// Constants for calculations
let taxRate = 5;
let discountPercentage = 10;
// let loyaltyRate = 2; // per spend of $1

// Endpoint to calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let item1Price = 0; 
  let item2Price = 0;
  let item3Price = 0;

  let totalCartValue = newItemPrice + item1Price + item2Price + item3Price + cartTotal;
  res.send(totalCartValue.toString());
});

function calculateDiscountedPrice(cartTotal, isMember) {
  const discount = isMember ? 0.1 : 0;
  return cartTotal - cartTotal * discount;
}

// Endpoint to apply membership discount
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  let finalPrice = calculateDiscountedPrice(cartTotal, isMember);
  res.send(finalPrice.toString());
});

// Function to calculate discounted price
function calculateDiscountedPrice(cartTotal, isMember) {
  let discount = isMember ? 0.1 : 0;
  return cartTotal - cartTotal * discount;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  let taxAmount = (cartTotal * taxRate) / 100;
  res.send(taxAmount.toString());
});

function calculateDeliveryDays(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    return distance / 50;
  } else {
    return distance / 100;
  }
}

// Endpoint to estimate delivery time
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod?.toLowerCase();
  let distance = parseFloat(req.query.distance);

  // Calculate delivery days
  let deliveryDays = calculateDeliveryDays(shippingMethod, distance);
  res.send(deliveryDays.toString());
});

// formula to find shipping cost
function shippingCost(weight, distance) {
  return weight * distance * 0.1;
}

// Endpoint to estimate shipping cost
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCostFinal = shippingCost(weight, distance);
  res.send(shippingCostFinal.toString());
});

let loyaltyRate = 2; // Loyalty points per $1 spent

// Function to calculate loyalty points
function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = calculateLoyaltyPoints(purchaseAmount);
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
