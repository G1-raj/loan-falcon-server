import express from 'express';
import signup from '../controllers/auth/signup.controller.js';
import logIn from '../controllers/auth/login.controller.js';
import createClient from '../controllers/client.controller.js';
import setEmi from '../controllers/emi.controller.js';
import getClientData from '../controllers/getClientData.js';
import getClientsId from '../controllers/getClientsId.js';
import getUserDetail from '../controllers/getUserDetail.js';
import getEmiData from '../controllers/getEmi.controller.js';
import getUsersWithoutId from '../controllers/getUsersWithoutId.controller.js';
import updateEmiStatus from '../controllers/updateEmiStatus.controller.js';
import forgotPassword from '../controllers/auth/forgotpassword.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', logIn);
router.post('/registerclient', createClient);
router.post('/emidata', setEmi);
router.post('/getclientdata', getClientData);
router.post('/getclientsid', getClientsId);
router.post('/userdetail', getUserDetail);
router.post('/getemidata', getEmiData);
router.get("/getallusers", getUsersWithoutId);
router.patch("/updateemistatus", updateEmiStatus);
router.patch("/forgotpassword", forgotPassword);
export default router;