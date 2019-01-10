var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');
var ctrlOrder = require('../controllers/order');
var wallet = require('../models/WalletController');


console.log("hiiiiiiii");
// profile
router.get('/profile', auth, ctrlProfile.profileRead);
// authentication
router.post('/users/register', ctrlAuth.register);
router.post('/users/login', ctrlAuth.login);
router.post('/users/update_profile', auth, ctrlProfile.profileUpdate);
router.post('/users/wallet', ctrlAuth.wallet);
router.post('/sellOrder', ctrlOrder.sellOrder);
router.post('/approveOrder', ctrlOrder.approveOrder);
router.post('/rejectOrder', ctrlOrder.rejectOrder);
router.post('/buyOrder', ctrlOrder.buyOrder)
router.post('/addAsset', ctrlOrder.addAsset)

router.get('/userDetails', ctrlOrder.userDetails);
router.get('/getListAllOrder', ctrlOrder.getListAllOrder);
router.get('/getSellOrderListByUserId', ctrlOrder.getSellOrderListByUserId);
router.get('/getBuyOrderListByUserId', ctrlOrder.getBuyOrderListByUserId);
router.get('/getSellRequestListByUserId', ctrlOrder.getSellRequestListByUserId);
router.get('/getAssetOrderListByUserId', ctrlOrder.getAssetOrderListByUserId);
router.get('/listBuyPlaceOrder', ctrlOrder.listBuyPlaceOrder);
router.get('/listSellPlaceOrder', ctrlOrder.listSellPlaceOrder);
router.get('/getUserBuyOrderList', ctrlOrder.getUserBuyOrderList);
router.get('/getUserSellOrderList', ctrlOrder.getUserSellOrderList);

router.get('/getWalletInfo', wallet.getWalletInfo);



module.exports = router;
