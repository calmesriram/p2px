var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../db');

var VerifyToken = require(__root + 'auth/VerifyToken');
var User = require('../model/User');
var Order = require('../model/Order');
var Buy = require('../model/Order');


router.use(bodyParser.urlencoded({ extended: true }));


router.post('/sellOrder', VerifyToken, function (req, res, next) {

  User.findUserByID(User, req.userId)
    .then(function (user, error) {

      if (!user) throw { status: 404, json: { message: 'Not a valid user.' }, skip: true };
      if (error) throw { status: 404, json: { message: "There was a problem finding the user." }, skip: true };
      console.log("server    ", req.body)
      var Name = req.body.Name;
      var Price = req.body.Price;
      var min = req.body.min;
      var max = req.body.max;
      var payment = req.body.payment;
      var Collateral = req.body.Collateral;
      var userId = req.userId;
      Order.findOne({ user: req.userId }, function (err, order) {
        if (err) {
          // console.log("...........",req.userId)
          return res.json({ "error:::": "error occured" });
        }

        if (!order)
          order = new Order({
            userId: userId,
            Name: Name,
            Price: Price,
            min: min,
            max: max,
            payment: payment,
            Collateral: Collateral
          })
        order.save(function (err, order) {
          return res.json({ "success:": order });
        })
      })
    })
    .catch(function (error) {
      return res.json({ status: 500, errors: err });

    });
});

router.get('/listAllOrder', function (req, res) {
  console.log("hi there")
  Order.find({}, function (err, orders) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(orders);
  });
});

router.post('/buyOrder', VerifyToken, function (req, res, next) {

  User.findUserByID(User, req.userId)
    .then(function (user, error) {

      if (!user) throw { status: 404, json: { message: 'Not a valid user.' }, skip: true };
      if (error) throw { status: 404, json: { message: "There was a problem finding the user." }, skip: true };
      var quantity = req.body.quantity;
      var orderId = req.body.orderId;

      Order.findOne({ order: req.orderId }, function (err, buyOrder) {
        if (err) {
          return res.json({ "error:::": "error occured" });
        }
        console.log("...........", buyOrder)
        if (!err)
          buy = new Buy({
            orderId: orderId,
            quantity: quantity,
          })
        buy.save(function (err) {
          console.log("order    ::", buy)
          return res.json({ "success:": buy });
        })
      })
    })
    .catch(function (error) {
      return res.json({ status: 500, errors: err });

    });
});




module.exports = router;