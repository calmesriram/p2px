//import dependency
const express = require('express');
const cors = require('cors');
var mongoose = require('mongoose');
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
//register test for user
//creatingWalletForNewUser
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
        console.log("inside else block *******************")
        User.find({ _id: userid }, function (err, data) {
            console.log('ISMATCH IS: ', data)
            if (err) {
                console.log('THIS IS ERROR RESPONSE')
                res.json(err)
            } else {
                console.log("data value are ", data[0].keys)
                // var json = JSON.stringify(data);
                // console.log('THIS IS ISMATCH RESPONSE*****', data[0].email)
                if (!data[0].keys.publicKey) {
                    console.log("public key not generated")
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
                            console.log("result   ---- ", result)
                            console.log('getnewaddress:+++++++', result.result)//Json parsed.
                            var x = result.result
                            console.log("value of x ", x)
                            var myquery = { _id: userid };
                            var newvalues = { $set: { keys: { publicKey: x, privateKey: x } } };
                            User.updateOne(myquery, newvalues, function (err, data) {
                                if (err) {
                                    console.log("error to update ", err)
                                }
                                else {
                                    console.log("successfully updated", data)
                                }
                            });
                            return res.result;
                            // res.send(result);
                        }
                    })
                }
            }
        })
    }
}

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
        console.log("inside else block *******************")
        User.find({ _id: userid }, function (err, data) {
            console.log('ISMATCH IS: ', data)
            if (err) {
                console.log('THIS IS ERROR RESPONSE')
                res.json(err)
            } else {
                console.log("data value are ", data[0].keys)
                // var json = JSON.stringify(data);
                // console.log('THIS IS ISMATCH RESPONSE*****', data[0].email)
                if (!data[0].keys.publicKey) {
                    console.log("public key not generated")
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
                            console.log("result   ---- ", result)
                            console.log('getnewaddress:+++++++', result.result)//Json parsed.
                            var x = result.result
                            console.log("value of x ", x)
                            var myquery = { _id: userid };
                            var newvalues = { $set: { keys: { publicKey: x, privateKey: x } } };
                            User.updateOne(myquery, newvalues, function (err, data) {
                                if (err) {
                                    console.log("error to update ", err)
                                }
                                else {
                                    console.log("successfully updated", data)
                                }
                            });
                            return res.result;
                            res.send(result);
                        }
                    })
                }
            }
        })
    }
}
