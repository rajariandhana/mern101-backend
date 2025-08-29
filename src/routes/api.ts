import express from 'express';

import { Request, Response } from 'express';

import authController from '../controllers/auth.controller';
import dummyController from '../controllers/dummy.controller';

import { ROLES } from '../utils/constant';
import authMiddleware from '../middleware/auth.middleware';
import aclMiddleware from '../middleware/acl.middleware';
import mediaMiddleware from '../middleware/media.middleware';
import mediaController from '../controllers/media.controller';
import categoryController from '../controllers/category.controller';

const router = express.Router();

router.get('/dummy', dummyController.dummy);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.me);
router.post('/auth/activation', authController.activation);

router.post('/category', [authMiddleware, aclMiddleware([ROLES.ADMIN])], categoryController.create);
router.get('/category', categoryController.findAll);
router.get('/category/:id', categoryController.findOne);
router.put('/category/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])],categoryController.update);
router.delete('/category/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])],categoryController.remove);

router.get('/test-acl',
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  (req:Request,res:Response) =>{
    res.status(200).json({
      data:"success",
      message:"OK"
    })
  }
);

router.post('/media/upload-single', [
  authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), mediaMiddleware.single("file"), mediaController.single
]);
router.post('/media/upload-multiple', [
  authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), mediaMiddleware.multiple("files"), mediaController.multiple
]);
router.delete('/media/remove', [
  authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), mediaController.remove
]);

export default router;