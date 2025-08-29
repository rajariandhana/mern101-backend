import express from 'express';

import { Request, Response } from 'express';

import authController from '../controllers/auth.controller';
import dummyController from '../controllers/dummy.controller';

import { ROLES } from '../utils/constant';
import authMiddleware from '../middleware/auth.middleware';
import aclMiddleware from '../middleware/acl.middleware';

const router = express.Router();

router.get('/dummy', dummyController.dummy);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.me);
router.post('/auth/activation', authController.activation);

router.get('/test-acl',
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  (req:Request,res:Response) =>{
    res.status(200).json({
      data:"success",
      message:"OK"
    })
  }
);

export default router;