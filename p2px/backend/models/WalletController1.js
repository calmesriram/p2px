var express = require('express');
const cors = require('cors');
var mongoose = require('mongoose');
var router = express.Router();
const app = express();
var bodyParser = require('body-parser');
var User = mongoose.model('User');
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


// var db = require('../db');


// var VerifyToken = require(__root + 'auth/VerifyToken');
// var User = require('../model/User');
const crypto = require('crypto');
const EC = require('elliptic').ec;
const RIPEMD160 = require('ripemd160');
const bs58 = require('bs58');
const buffer = require('buffer');
const ec = new EC('secp256k1');

function hasha256(data) {
  return crypto.createHash('sha256').update(data).digest();
} // A small function I created as there is a lot of sha256 hashing.

const addrVer = Buffer.alloc(1, 0x00); // 0x00 P2PKH Mainnet, 0x6f P2PKH Testnet
const wifByte = Buffer.alloc(1, 0x80); // 0x80 Mainnet, 0xEF Testnet

var key = ec.genKeyPair();
var privKey = key.getPrivate().toString('hex');
var pubPoint = key.getPublic();
var x = pubPoint.getX(); // elliptic x
var y = pubPoint.getY(); // elliptic y

// Private Key Hashing
var bufPrivKey = Buffer.from(privKey, 'hex');
var wifBufPriv = Buffer.concat([wifByte, bufPrivKey], wifByte.length + bufPrivKey.length);
var wifHashFirst = hasha256(wifBufPriv);
var wifHashSecond = hasha256(wifHashFirst);
var wifHashSig = wifHashSecond.slice(0, 4);
var wifBuf = Buffer.concat([wifBufPriv, wifHashSig], wifBufPriv.length + wifHashSig.length);
var wifFinal = bs58.encode(wifBuf);

// Public Key Hashing
var publicKey = pubPoint.encode('hex');
var publicKeyInitialHash = hasha256(Buffer.from(publicKey, 'hex'));
var publicKeyRIPEHash = new RIPEMD160().update(Buffer.from(publicKeyInitialHash, 'hex')).digest('hex');
var hashBuffer = Buffer.from(publicKeyRIPEHash, 'hex');
var concatHash = Buffer.concat([addrVer, hashBuffer], addrVer.length + hashBuffer.length);
var hashExtRipe = hasha256(concatHash);
var hashExtRipe2 = hasha256(hashExtRipe);
var hashSig = hashExtRipe2.slice(0, 4);
var bitcoinBinaryStr = Buffer.concat([concatHash, hashSig], concatHash.length + hashSig.length);

var bitcoinWifAddress = wifFinal.toString('hex');
var bitcoinAddress = bs58.encode(Buffer.from(bitcoinBinaryStr));

// router.get('/getWallet', VerifyToken, function(req, res, next) {
//     User.findUserByID(User, req.userId)
//     .then (function (user, error) {
//       console.log("user  id given as ",user)
//       if (!user) throw { status: 404, json: { message: 'Not a valid user.' }, skip: true };
//       if (error) throw { status: 404, json: { message: "There was a problem finding the user." }, skip: true };
//       if(user.keys && user.keys.publickey){ return res.json({"Bitcoin Address : ": user.keys.publickey}); }
//       var publickey= bitcoinAddress.toString('hex');
//       var privatekey =bitcoinWifAddress.toString('hex');

//       user.keys={
//         publickey : publickey,
//         privatekey : privatekey
//       }
//       user.save(function(){
//         // console.log("WIF Private Key : ", privateKey);
//       console.log("Bitcoin Address : ", publickey);
//       console.log("user    ::",user);

//       return res.json({"Bitcoin Address : ": user.keys.publickey});
//       })
//       // Log our new Bitcoin Address and WIF
//     })
//     .catch(function (error) {
//       return res.json({"error:": "error occured"});
//     });
//   });
//   module.exports = router;

module.exports.getWalletInfo = function (req, res) {
  var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
  userid = userdetails._id;
  userName = userdetails.Name
  console.log("+++++++getWalletInfo", userid)
  if (!userid) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  }
  else {
    console.log("inside else block ")
    client.call({
      method: 'getnewaddress',//Mandatory
      params: [req.query.accountname],//Will be [] by default
      id: 'curltest',//Optional. By default it's a random id
      jsonrpc: '1.0'//Optional. By default it's 2.0
    }, (err, result) => {
      if (err) {
        //Do something
        console.log("there is error")
        res.send('result', err);
      }
      else {
        console.log('getnewaddress:', result)//Json parsed.
        // return res.result;
        res.send(result);
      }
      // })
    })
  }
}
// module.exports.getWalletInfo = function (req, res) {
//   var userdetails = JSON.parse(req.headers.authorization.split(" ")[1]);
//   userid = userdetails._id;
//   userName = userdetails.Name
//   console.log("+++++++getWalletInfo", userid)
//   if (!userid) {
//     res.status(401).json({
//       "message": "UnauthorizedError: private profile"
//     });
//   }
//   else {
//     var publickey = bitcoinAddress.toString('hex');
//     var privatekey = bitcoinWifAddress.toString('hex');
//     console.log("user    ::1");

//     console.log("Bitcoin Address publickey: ", publickey);
//     console.log("Bitcoin Address privatekey: ", privatekey);
//     User.find({ _id: userid }, function (err, data) {
//       console.log('ISMATCH IS: ', data)
//       if (err) {
//         console.log('THIS IS ERROR RESPONSE')
//         res.json(err)
//       } else {
//         console.log('-----------********')
//         res.json(data)
//       }
//     })

//     // console.log("user    ::", user);


//     user.keys = {
//       publickey: publickey,
//       privatekey: privatekey
//     }
//     user.save(function () {
//       // console.log("WIF Private Key : ", privateKey);
//       console.log("Bitcoin Address : ", publickey);
//       console.log("user    ::", user);
//     })
//   }
// }