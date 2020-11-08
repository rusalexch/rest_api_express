const router = require('express').Router();
const { jwtGuard } = require('../auth/auth.guard');

module.exports = (validators, userService) => {
  const { updateValidator } = validators;

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
      const result = JSON.parse(JSON.stringify(list));
      result.items = result.items.map(({ password, ...item }) => item);
      res.status(200).json(result);
    }
  });

  router.get('profile', jwtGuard, async (req, res) => {
    res.status(200).json(req.user);
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

  router.put('', jwtGuard, async (req, res) => {
    const { user } = req;
    if (Object.keys(req.body).length) {
      const updUser = req.body;
      const { status, error } = updateValidator(updUser);
      if (status) {
        res.status(200).send(await userService.update(user.id, updUser));
      } else {
        res.status(400).json({ msg: 'error', details: error });
      }
    } else {
      res.status(400).json({ msg: 'error', details: 'invalid body in request' });
    }
  });

  router.delete('', jwtGuard, async (req, res) => {
    const { user } = req;
    await userService.remove(user.id);
    res.status(200).send('Goodbye');
  });

  return router;
};
