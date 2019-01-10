var mongoose = require('mongoose');
var passport = require('passport');
var Order = require('../models/Order')
var User = mongoose.model('User');
var UserProfile = mongoose.model('UserProfile');
var Order = mongoose.model('Order');
var Buy = mongoose.model('Buy');
var Asset = mongoose.model('Asset');
var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
  // host: 'localhost',
  port: 18443,
  // user: 'kb',
  // pass: '123'
});


var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.buyOrder = function (req, res) {
  console.log("inside api  ", req.body);

  console.log(req.headers.authorization.split(" ")[1])
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("+++++++buy order", userid, req.body)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  // else if (userid) {
  //   User.find({ _id: userid }, function (err, data) {
  //     console.log('ISMATCH IS: ', data)
  //     if (err) {
  //       console.log('THIS IS ERROR RESPONSE')
  //       res.json(err)
  //     } else {
  //       console.log('THIS IS ISMATCH RESPONSE', data._id)
  //       console.log('THIS IS ISMATCH RESPONSE', data[0].keys.publicKey)
  //       console.log('THIS IS ISMATCH RESPONSE11111111111', data._id)

  //       res.json(data)
  //     }
  //   })
  // }

  else {
    var buy = new Buy();
    buy.userId = userid;
    buy.btc = req.body.btc;
    buy.avgPrice = req.body.avgPrice;
    buy.inr = req.body.inr;
    buy.reQinr = req.body.reQinr;
    buy.aviLinr = req.body.aviLinr;
    buy.save(function (err, buy) {
      if (err) {
        return console.log("error inside buy order place ", err);
      }
      else {
        console.log("buy order successfull placed ", buy)

        


        res.status(200);
        res.json({
          "status": "success"
        })
        const RpcClient = require('node-json-rpc2').Client;
        

        const config = {
          protocol: 'http',//Optional. Will be http by default
          host: '10.10.4.204',//Will be 127.0.0.1 by default
          user: 'admin1',//Optional, only if auth needed
          password: '123',//Optional. Can be named 'pass'. Mandatory if user is passed.
          port: 19001,//Will be 8443 for https or 8080 for http by default
          method: 'POST'//Optional. POST by default
        };


        var client = new RpcClient(config);
        client.call({
          method: 'sendtoaddress',//Mandatory
          params: ["2NFfiLSXRHsTYHBt1ibCbbZAG4f6d5kcvd3", buy.btc],//Will be [] by default
          id: 'curltest',//Optional. By default it's a random id
          jsonrpc: '1.0'//Optional. By default it's 2.0
        },function (err, result2){
            console.log("TRANSFER success",result2);
        }
        )
      }
    })
  }

// 

var RpcClient = require('node-json-rpc2').Client;  
var config = {
  protocol: 'http',//Optional. Will be http by default
  host: '10.10.4.204',//Will be 127.0.0.1 by default
  user: 'admin1',//Optional, only if auth needed
  password: '123',//Optional. Can be named 'pass'. Mandatory if user is passed.
  port: 19001,//Will be 8443 for https or 8080 for http by default
  method: 'POST'//Optional. POST by default
};
var client = new RpcClient(config);

client.call({
  method: 'getaccount',//Mandatory
  params: ["2NFfiLSXRHsTYHBt1ibCbbZAG4f6d5kcvd3"],//Will be [] by default
  id: 'curltest',//Optional. By default it's a random id
  jsonrpc: '1.0'//Optional. By default it's 2.0
},function (err, result2){
    console.log("MYgetaccount\n",result2);
})
client.call({
  method: 'getaccountaddress',//Mandatory
  params: ["2NFfiLSXRHsTYHBt1ibCbbZAG4f6d5kcvd3"],//Will be [] by default
  id: 'curltest',//Optional. By default it's a random id
  jsonrpc: '1.0'//Optional. By default it's 2.0
},function (err, result2){
    console.log("MYgetaccountaddress\n",result2);
})
client.call({
  method: 'getaddressesbyaccount',//Mandatory
  params: ["2NFfiLSXRHsTYHBt1ibCbbZAG4f6d5kcvd3"],//Will be [] by default
  id: 'curltest',//Optional. By default it's a random id
  jsonrpc: '1.0'//Optional. By default it's 2.0
},function (err, result2){
    console.log("MYgetaddressesbyaccount\n",result2);
})


//

}









module.exports.buyOrder1= function (req, res) {
  console.log("inside api  ", req.body);

  console.log(req.headers.authorization.split(" ")[1])
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("+++++++buy order", userid, req.body)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  

  else {
    var buy = new Buy();
    buy.userId = userid;
    buy.btc = req.body.btc;
    buy.avgPrice = req.body.avgPrice;
    buy.inr = req.body.inr;
    buy.reQinr = req.body.reQinr;
    buy.aviLinr = req.body.aviLinr;
    buy.save(function (err, buy) {
      if (err) {
        return console.log("error inside buy order place ", err);
      }
      else {
        console.log("buy order successfull placed ", buy)

        


        res.status(200);
        res.json({
          "status": "success"
        })
        const RpcClient = require('node-json-rpc2').Client;
        

        const config = {
          protocol: 'http',//Optional. Will be http by default
          host: '10.10.4.204',//Will be 127.0.0.1 by default
          user: 'admin1',//Optional, only if auth needed
          password: '123',//Optional. Can be named 'pass'. Mandatory if user is passed.
          port: 19001,//Will be 8443 for https or 8080 for http by default
          method: 'POST'//Optional. POST by default
        };


        var client = new RpcClient(config);
        client.call({
          method: 'gettransaction',//Mandatory
          params: ["e806f5e5469e48d4066aab4d4ece284ef2b953a2d61af79c0bf8ea69194c8cb7"],//Will be [] by default
          id: 'curltest',//Optional. By default it's a random id
          jsonrpc: '1.0'//Optional. By default it's 2.0
        },function (err, result2){
            console.log("LIST",result2);
        }
        )
      }
    })
  }
}














module.exports.sellOrder = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    var order = new Order();
    order.userId = userid;
    order.btc = req.body.btc;
    order.price = req.body.price;
    order.reQinr = req.body.reQinr;
    order.aviLinr = req.body.aviLinr;
    order.save(function (err, sell) {
      if (err) {
        return console.log("error inside buy order place ", err);
      }
      else {
        console.log("order successfull placed ", sell)
        res.status(200);
        res.json({
          "status": "success"
        })
      }
    })
  }
};
module.exports.addAsset = function (req, res) {
  // console.log("inside api  ",req.headers.authorization)
  // console.log(req.headers.authorization.split(" ")[1])
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  // console.log("+++++++",userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {

    var asset = new Asset();
    asset.Name = req.body.Name;
    asset.price = req.body.price;
    asset.quantity = req.body.quantity;
    asset.orderId = req.body.orderId;
    asset.userId = userid
    asset.status = 0;
    asset.save(function (err, user) {
      if (err) {
        return console.log("error", err);
      }
      else {
        console.log("data asset :+", user);
        res.status(200);
        res.json({
          "status": "success asset"
        });

      }
    });
  }
};
module.exports.approveOrder = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("+++++++approveOrder", req.body)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  if (req.body.status == 0) {
    console.log("req.body.status", req.body.status, req.body.orderId)
    console.log("req.body", req.body)
    Id = req.body._id;
    console.log("orderid  ::", Id)
    var myquery = { _id: Id };
    var newvalues = { $set: { status: 1 } };
    Buy.updateOne(myquery, newvalues, function (err, data) {
      if (err) {
        console.log("error to update ", err)
      }
      else {
        console.log("successfully updated", data)
      }
    });
  }
  var asset = new Asset();
  asset.Name = req.body.Name;
  asset.orderId = req.body.orderId
  asset.price = req.body.price;
  asset.quantity = req.body.quantity;
  asset.max = req.body.max;
  asset.userId = req.body.userId2;
  asset.status = 1;
  asset.save(function (err, user) {
    if (err) {
      return console.log("error", err);
    }
    else {
      console.log("asset save data :+", user);
      res.status(200);
      res.json({
        "status": "success"
      });

    }
  });
}
module.exports.rejectOrder = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("+++++++rejectOrder", req.body)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  if (req.body.status == 0) {
    console.log("req.body.status", req.body.status, req.body.orderId)
    Id = req.body._id;
    console.log("orderid  ::", Id)
    var myquery = { _id: Id };
    var newvalues = { $set: { status: 2 } };
    Buy.updateOne(myquery, newvalues, function (err, data) {
      if (err) {
        console.log("error to update ", err)
      }
      else {
        console.log("successfully updated", data)
      }
    });
  }
  // var asset = new Asset();
  // asset.Name= req.body.Name;
  // asset.orderId=req.body.orderId
  // asset.Price= req.body.Price;
  // asset.quantity = req.body.quantity;
  // asset.max= req.body.max;
  // asset.userId=req.body.userId2;
  // asset.status=1;
  // asset.save(function(err,user) {
  //   if(err){
  //     return console.log("error",err);
  //   }
  //   else{
  //       console.log("data :+",user);
  //       res.status(200);
  //        res.json({
  //           "status": "success"
  //               });

  //   }
  // });
}

// module.exports.buyOrder = function (req, res) {
//   console.log("inside api  ", req.body)

//   // // console.log(req.headers.authorization.split(" ")[1])
//   // var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
//   // userid = userdetails._id;
//   // console.log("+++++++buy order", userid, req.body)
//   // if (!userid) {
//   //   res.status(401).json({
//   //     "message": "UnauthorizedError: private profile"
//   //   });
//   // }
//   // if (req.body.quantity != 0) {
//   //   console.log("req.body.quantity", req.body.quantity)
//   //   orderId = req.body.orderId;
//   //   count = req.body.quantity;
//   //   console.log("orderid  ::", orderId, count)
//   //   var myquery = { _id: orderId };
//   //   var newvalues = { $inc: { max: -count } };
//   //   Order.updateOne(myquery, newvalues, function (err, data) {
//   //     if (err) {
//   //       console.log("error to update ", err)
//   //     }
//   //     else {
//   //       console.log("successfully updated", data)
//   //     }
//   //   });
//   // }
//   // var buy = new Buy();
//   // buy.Name = req.body.Name;
//   // buy.userId2 = userid;
//   // buy.userId = req.body.userId;
//   // buy.orderId = req.body.orderId;
//   // buy.price = req.body.price;
//   // buy.quantity = req.body.quantity;
//   // buy.totalAmount = req.body.totalAmount;
//   // buy.collateral = req.body.collateral;
//   // buy.status = 0;
//   // buy.save(function (err, buy) {
//   //   if (err) {
//   //     return console.log("error inside buy order place ", err);
//   //   }
//   //   else {
//   //     console.log("buy order successfull palced ", buy)
//   //     res.status(200);
//   //     res.json({
//   //       "status": "success"
//   //     })
//   //   }
//   // })

// };

module.exports.userDetails = function (req, res) {
  console.log("userDetails");
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("+++++++", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    User.find({ _id: userid }, function (err, data) {
      console.log('ISMATCH IS: ', data)
      if (err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } else {
        console.log('THIS IS ISMATCH RESPONSE')
        res.json(data)
      }
    })
  }
};


module.exports.getListAllOrder = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("getHistory", req.headers.authorization.split(" ")[1], userid);
  // userid=
  Order.find({ userId: { $nin: userid } }, function (err, data) {
    if (err) {
      res.json({ success: false, msg: 'Failed To Get list' });
    } else {
      console.log("data>>>>>>>>.", data)
      res.json({ success: true, msg: data });
    }
  });
};
// Order.find({userId:{$nin :userid}}, function(err, data) {
//   console.log('ISMATCH IS: ', data)
//   if(err) {
//     console.log('THIS IS ERROR RESPONSE')
//     res.json(err)
//   } else {
//     console.log('THIS IS ISMATCH RESPONSE')
//     res.json(data)
//   }
// })

module.exports.getSellOrderListByUserId = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("+++++++", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    Order.find({ userId: userid }, function (err, data) {
      console.log('ISMATCH IS: ', data)
      if (err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } else {
        console.log('THIS IS ISMATCH RESPONSE')
        res.json(data)
      }
    })
  }
};

module.exports.getBuyOrderListByUserId = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  console.log("+++++++getBuyOrderListByUserId", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    Buy.find({ userId2: userid }, function (err, data) {
      console.log('ISMATCH IS: ', data)
      if (err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } else {
        console.log('THIS IS ISMATCH RESPONSE')
        res.json(data)
      }
    })
  }
};
module.exports.getSellRequestListByUserId = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  userName = userdetails.Name
  console.log("+++++++getSellRequestListByUserId", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    Buy.find({ userId: userid }, function (err, data) {
      console.log('ISMATCH IS: ', data)
      if (err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } else {
        console.log('THIS IS ISMATCH RESPONSE')
        res.json(data)
      }
    })
  }
};
module.exports.getAssetOrderListByUserId = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  userName = userdetails.Name
  console.log("userdetails", userdetails)
  console.log("+++++++getAssetOrderListByUserId", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    Asset.find({ userId: userid }, function (err, data) {
      console.log('ISMATCH IS:::: ', data)
      if (err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } else {
        console.log('THIS IS ISMATCH RESPONSE')
        res.json(data)
      }
    })
  }
};
module.exports.listBuyPlaceOrder = function (req, res) {
  // var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  // userid = userdetails._id;
  // userName = userdetails.Name
  // console.log("userdetails", userdetails)
  // console.log("+++++++listBuyPlaceOrder", userid)
  // if (!userid) {
  //   res.status(401).json({
  //     "message": "UnauthorizedError: private profile"
  //   });
  // }
  // else {
  //{ userId: { $nin: userid } }
  Buy.find().sort({ 'inr': -1 }).exec(function (err, data) {
    console.log('ISMATCH IS:::: >', err, data);
    if (err) {
      console.log('THIS IS ERROR RESPONSE')
      res.json(err)
    } else {
      console.log('THIS IS ISMATCH RESPONSE')
      res.json(data)
    }
  });
  // }
};

// module.exports.listSellPlaceOrder = function (req, res) {
//   var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
//   userid = userdetails._id;
//   userName = userdetails.Name
//   console.log("userdetails", userdetails)
//   console.log("+++++++listBuyPlaceOrder", userid)
//   if (!userid) {
//     res.status(401).json({
//       "message": "UnauthorizedError: private profile"
//     });
//   }
//   else {
//     Order.find({ userId: userid }).sort({ 'price': -1 }).exec(function (err, data) {
//       console.log('ISMATCH IS:::: >', err, data);
//       if (err) {
//         console.log('THIS IS ERROR RESPONSE')
//         res.json(err)
//       } else {
//         console.log('THIS IS ISMATCH RESPONSE')
//         res.json(data)
//       }
//     });
//   }
// };

module.exports.listSellPlaceOrder = function (req, res) {
  // var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  // userid = userdetails._id;
  // userName = userdetails.Name
  // console.log("userdetails", userdetails)
  // console.log("+++++++listBuyPlaceOrder", userid)
  // if (!userid) {
  //   res.status(401).json({
  //     "message": "UnauthorizedError: private profile"
  //   });
  // }
  // else {
  Order.find().sort({ 'price': -1 }).exec(function (err, data) {
    console.log('ISMATCH IS:::: >', err, data);
    if (err) {
      console.log('THIS IS ERROR RESPONSE')
      res.json(err)
    } else {
      console.log('THIS IS ISMATCH RESPONSE')
      res.json(data)
    }
  });
  // }
};

module.exports.getUserBuyOrderList = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  userName = userdetails.Name
  console.log("userdetails", userdetails)
  console.log("+++++++getUserBuyOrderList", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    Order.find({ userId: userid }).sort({ 'price': -1 }).exec(function (err, data) {
      console.log('ISMATCH IS:::: >', err, data);
      if (err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } else {
        console.log('THIS IS ISMATCH RESPONSE')
        res.json(data)
      }
    });
  }
};
module.exports.getUserSellOrderList = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  userName = userdetails.Name
  console.log("userdetails", userdetails)
  console.log("+++++++listBuyPlaceOrder", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    // { userId: { $nin: userid } }
    Buy.find({ userId: userid }).sort({ 'inr': -1 }).exec(function (err, data) {
      console.log('ISMATCH IS:::: >', err, data);
      if (err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json(err)
      } else {
        console.log('THIS IS ISMATCH RESPONSE')
        res.json(data)
      }
    });
    // }
  };

}
