const router = require('express').Router();
const UserService = require('./user.service');

module.exports = (repo, entity) => {
  const { createValidator, updateValidator } = entity;
  const userService = UserService(repo);
  router.post('', async (req, res) => {
    if (Object.keys(req.body).length) {
      const user = req.body;
      const { status, message } = createValidator(user);
      if (status) {
        const isExist = await userService.findByEmail(user.email);
        if (isExist) {
          res.status(400).json({ msg: 'error', details: `User with email ${user.email} already exists` });
        } else {
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

  router.get('', async (req, res) => {
    let { page, limit } = req.query;
    if ((page && (+page < 1 || Number.isNaN(+page)))
      || (limit && (+limit < 1 || Number.isNaN(+limit)))) {
      res.status(400).json({ msg: 'error', details: 'invalid query in request' });
    } else {
      page = +page ? +page : 1;
      limit = +limit ? +limit : 10;
      const list = await userService.list(limit, page);
      list.prewPage = list.page > 1 ? `${req.baseUrl}?limit=${list.limit}&page=${list.page - 1}` : '';
      list.nextPage = list.pagesCount > list.page ? `${req.baseUrl}?limit=${list.limit}&page=${list.page + 1}` : '';
      res.status(200).json(list);
    }
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (+id < 1 || Number.isNaN(+id)) {
      res.status(400).json({ msg: 'error', details: 'invalid params in request' });
    } else {
      const user = await userService.findById(+id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ msg: 'error', details: `User with ID=${id} not found` });
      }
    }
  });

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (+id < 1 || Number.isNaN(+id)) {
      res.status(400).json({ msg: 'error', details: 'invalid params in request' });
    } else if (Object.keys(req.body).length) {
      const updUser = req.body;
      const { status, error } = updateValidator(updUser);
      if (status) {
        const user = await userService.findById(+id);
        if (user) {
          await userService.update(+id, updUser);
          res.status(200).send(user.reload());
        } else {
          res.status(404).json({ msg: 'error', details: `User with ID=${id} not found` });
        }
      } else {
        res.status(400).json({ msg: 'error', details: error });
      }
    } else {
      res.status(400).json({ msg: 'error', details: 'invalid body in request' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (+id < 1 || Number.isNaN(+id)) {
      res.status(400).json({ msg: 'error', details: 'invalid params in request' });
    } else {
      const user = await userService.findById(+id);
      if (user) {
        await userService.remove(+id);
        res.status(204).send();
      } else {
        res.status(404).json({ msg: 'error', details: `User with ID=${id} not found` });
      }
    }
  });

  return router;
};
