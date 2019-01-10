const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//create user schema
const TransactionSchema = mongoose.Schema({
    userId: {
      type: String,
      require: true
    },
    amount: {
      type: Number,
      require: true
    },
    address: {
      type: String,
      require: true
    },
    timestamps: {
       type: Number,
       default: new Date().getTime()
    },
    t_type: {
      type: String,
      require: true
    },
    status: {
      type: Number,
      require: true
    }
}, {
    timestamps: true
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

module.exports.getHistory = function (callback) {
  // Transaction.remove({}, callback);
  Transaction.find({}, callback);
}

module.exports.buyToken = function (buyData, callback) {
  buyData.save(callback);
}

module.exports.sellToken = function (sellData, callback) {
  sellData.save(callback);
}

module.exports.transferToken = function (transferData, callback) {
  transferData.save(callback);
}

module.exports.updateStatus = function (data, callback) {
  data.update(callback);
}

module.exports.getTotalSale = function (callback) {
  Transaction.aggregate([{
    // $match : { status : 0 },
    $match : { },
  },{
    $group : {
        _id : null,
        total : {
            $sum : "$amount"
        }
    }
  }],callback);
}

module.exports.getTotalSaleToday = function (callback) {
  Transaction.aggregate([{
    $match : { timestamps: { $gt: (Date.now() - 24*60*60*1000) } },
  },{
    $group : {
        _id : null,
        total : {
            $sum : "$amount"
        }
    }
  }],callback);
}

module.exports.getCurrentUserSale = function (_id, callback) {
  Transaction.aggregate([{
    $match : { userId: _id },
  },{
    $group : {
        _id : null,
        total : {
            $sum : "$amount"
        }
    }
  }],callback);
}
