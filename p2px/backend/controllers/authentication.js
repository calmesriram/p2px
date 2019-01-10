var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var UserProfile = mongoose.model('UserProfile');



// const RpcClient = require('node-json-rpc2').Client;
// const config = {
//   protocol: 'http',//Optional. Will be http by default
//   host: '127.0.0.1',//Will be 127.0.0.1 by default
//   user: 'admin1',//Optional, only if auth needed
//   password: '123',//Optional. Can be named 'pass'. Mandatory if user is passed.
//   port: 19001,//Will be 8443 for https or 8080 for http by default
//   method: 'POST'//Optional. POST by default
// };

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
console.log(
client.call({
    method: 'getblockcount',//Mandatory
    params: [],//Will be [] by default
    id: 'curltest',//Optional. By default it's a random id
    jsonrpc: '1.0'//Optional. By default it's 2.0
  }, (err, result) => {
  	console.log(result)
  }),"MYbitcoindata");

var client = new RpcClient(config);
var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};




// var client = new RpcClient(config);
// console.log(
// client.call({
//     method: 'generate',//Mandatory
//     params: [],//Will be [] by default
//     id: 'curltest',//Optional. By default it's a random id
//     jsonrpc: '1.0'//Optional. By default it's 2.0
//   }, (err, result) => {
//   	console.log(result)
//   }),"GETINFO");

// var client = new RpcClient(config);
// var sendJSONresponse = function (res, status, content) {
//   res.status(status);
//   res.json(content);
// };




module.exports.register1 = function (req, res) {
  console.log(req.body);
  console.log("register entered");
  client.call({
    method: 'getnewaddress',//Mandatory
    params: [],//Will be [] by default
    id: 'curltest',//Optional. By default it's a random id
    jsonrpc: '1.0'//Optional. By default it's 2.0
  }, (err, result) => {
    console.log(result,"myresultone");
    if (err) {
      //Do something
      console.log("there is error")
      res.send('result', err);
    }
    else {
      console.log("register data path arrived");
      // return result.result;
      var user = new User();

      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.phone = req.body.phonenumber;
      user.email = req.body.email;
      user.keys.publicKey = result.result;
      user.setPassword(req.body.password);

      user.save((err, result) => {
        if (err) {
          console.log("errroooo", err)
        }

        else {
          console.log("result for address", result)
          alert(result);
          res.status(200);
          res.json({
            "result": result
          })
        }
         res.end();
      })

    }
  })

};




module.exports.register = function (req, res) {
  console.log(req.body);
  console.log("register entered");
  client.call({
    method: 'getbalance',//Mandatory
    params: [],//Will be [] by default
    id: 'curltest',//Optional. By default it's a random id
    jsonrpc: '1.0'//Optional. By default it's 2.0
  }, (err, result) => {
    console.log(result,"myresultone");
    if (err) {
      //Do something
      console.log("there is error")
      res.send('result', err);
    }
    else {
      console.log("register data path arrived");
      // return result.result;
      var user = new User();

      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.phone = req.body.phonenumber;
      user.email = req.body.email;
      user.keys.publicKey = result.result;
      user.images=req.body.profilephoto;
      // user.keys.privateKey = get
      user.setPassword(req.body.password);

      user.save((err, result) => {
        if (err) {
          console.log("errroooo", err)
        }

        else {
          console.log("result for address", result)


          // alert(result);
          res.status(200);
          res.json({
            "result": result
          })
        }
         res.end();
      })

    }
  })

};


module.exports.login = function (req, res) {
  console.log("sriram............................")
  console.log(req.body)
  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {

      token = user.generateJwt();
      res.status(200);
      res.json({
        // "ram":user,
        "token": token,
        "user id": user._id,
        "img":user.images
      });
      console.log("user---||->", user)
      // console.log(".................",res)
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.wallet = function (req, res) {
  console.log("token   ::::", req.body.email)

  var verifyEmail = {};

  if (!req.body.email) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  User.findByIdAndUpdate(req.body.email, { $set: email }, function (err, newuser) {
    console.log("newuser", newuser);
    VerifyEmail.update({ subdomain: req.body.email }, { $set: verifyEmail }, function (err, newuserProfile) {
      res.status(200).json({ msg: "success" });
    });
  });
};
//2MywrsM9ozRbcd77SJDQR84qaf7qiJ8Sv4y

