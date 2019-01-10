const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Transaction = require('../models/transaction');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var Web3 = require('web3');
var contract = require("truffle-contract");
var path = require('path');
var InrtTokenJSON  = require(path.join(__dirname, '../build/contracts/InrtToken.json'));

// Setup RPC connection
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//var InrtTokenContract = contract(InrtTokenJSON);
//InrtTokenContract.setProvider(web3);

//console.log(InrtTokenJSON.abi);

var contractAbi = web3.eth.contract(InrtTokenJSON.abi);
var InrtTokenContract = contractAbi.at("0xD57045EDe87d81b7DC4126D9cF946CB0393CB425");

//register test for user
router.post('/buyToken', (req, res, next) => {

  var _address = req.body.address;
  var _amount = req.body.amount * 100;
  var _userid;

  let buyToken = new Transaction({
    userId: _userid,
    address: _address,
    amount: _amount,
    status: 0
  });

  Transaction.buyToken(buyToken, (err, data) => {
      console.log(err);
      console.log(data);
      if (err) {
        res.json({success: false, msg: 'Failed To Create Order'});
      } else {
        InrtTokenContract.transfer.sendTransaction(_address, _amount ,{ from: web3.eth.accounts[0], gas: 4000000},
          function (error, result){
              if(!error){
                console.log(result);
                res.json({success: true, msg: "INRT sent to your address", transactionHash: result});
              } else {
                console.log(error);
                res.json({success: false, msg: "Failed To Send INRT"});
              }
        });
      }
  });

});

//register test for user
router.post('/sellToken', (req, res, next) => {
  // console.log("data" , req.body);
  var _address = req.body.address_sell;
  var _amount = req.body.amount_sell * 100;
  var _transaction_id = req.body.transaction_id;

  let buyToken = new Transaction({
    userId:req.body.email,
    address: _address,
    amount: _amount,
    status:0
  });
});

module.exports = router;
