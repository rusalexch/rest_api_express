const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validators, userService } = require('../users/user.module');

module.exports = (localGuard) => {
  router.post('/login',
    localGuard,
    (req, res) => {
      const payload = { sub: req.user.id };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
      res.status(200).json({ token });
    });

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
          res.status(201).send(newUser);
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
