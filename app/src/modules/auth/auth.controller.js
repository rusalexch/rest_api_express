const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validators, userService } = require('../users/user.module');

module.exports = (localGuard) => {
  /**
   * @swagger
   * paths:
   *  /auth/login:
   *    post:
   *      description: Login
   *      summary: Login
   *      tags:
   *        - Auth
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoginDto'
   *      responses:
   *        '200':
   *          description: return user token
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  token:
   *                    type: string
   */
  router.post('/login',
    localGuard,
    (req, res) => {
      const payload = { sub: req.user.id };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
      res.status(200).json({ token });
    });

  /**
   * @swagger
   * paths:
   *  /auth/signup:
   *    post:
   *      description: Sign Up
   *      summary: Sign Up
   *      tags:
   *        - Auth
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserDto'
   *      responses:
   *        '200':
   *          description: return user token
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  token:
   *                    type: string
   */
  router.post('/signup', async (req, res) => {
    if (Object.keys(req.body).length) {
      const user = req.body;
      const { status, message } = validators.createValidator(user);
      if (status) {
        const isExist = await userService.findByEmail(user.email);
        if (isExist) {
          res.status(400).json({ msg: 'error', details: `User with email ${user.email} already exists` });
        } else {
          user.password = await bcrypt.hash(user.password, 13);
          const newUser = await userService.create(user);
          const payload = { sub: newUser.id };
          const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
          res.status(201).send(token);
        }
      } else {
        res.status(400).json({ msg: 'error', details: message });
      }
    } else {
      res.status(400).json({ msg: 'error', details: 'invalid body in request' });
    }
  });

  return router;
};
