const expres = require('express');
const router = expres.Router();

const {createAccount} = require('../controllers/createAccount');
const {getAccountDetails, login, getLoginDeatail} = require('../controllers/getAccountDetails');
const {createOrder} = require('../controllers/createOrder');
const {getOrders} = require('../controllers/getOrders');
const { updateAccount } = require('../controllers/updateAccount');



router.post('/createAccount',createAccount);
router.get('/getAccounts',getAccountDetails);
router.post('/createOrder',createOrder);
router.get('/getOrders',getOrders);
router.put('/updateAccount/:email',updateAccount);
router.post('/login',login);
router.get('/getLoginDetail/:email',getLoginDeatail);


module.exports = router;