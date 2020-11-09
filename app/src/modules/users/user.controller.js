const router = require('express').Router();
const { jwtGuard } = require('../auth/auth.guard');

module.exports = (validators, userService) => {
  const { updateValidator } = validators;
  /**
   * @swagger
   * components:
   *  securitySchemes:
   *    bearerAuth:
   *      type: http
   *      scheme: bearer
   *      bearerFormat: JWT
   *  schemas:
   *    UserDto:
   *      type: object
   *      properties:
   *        id:
   *          type: number
   *        email:
   *          type: string
   *          format: email
   *        username:
   *          type: string
   *        password:
   *          type: string
   *          format: password
   *        createdAt:
   *          type: string
   *          format: date-time
   *        updatedAt:
   *          type: string
   *          format: date-time
   *      required:
   *        - email
   *        - username
   *        - password
   *    CreateUserDto:
   *      type: object
   *      properties:
   *        email:
   *          type: string
   *          format: email
   *        username:
   *          type: string
   *        password:
   *          type: string
   *          format: password
   *      required:
   *        - email
   *        - username
   *        - password
   *    LoginDto:
   *      type: object
   *      properties:
   *        email:
   *          type: string
   *          format: email
   *        password:
   *          type: string
   *          format: password
   *      required:
   *        - email
   *        - password
   *    UpdateUserDto:
   *      type: object
   *      properties:
   *        email:
   *          type: string
   *          format: email
   *        username:
   *          type: string
   */

  /**
   * @swagger
   * paths:
   *  /users:
   *    get:
   *      description: Get all users with pagination
   *      summary: Get all users
   *      tags:
   *        - Users
   *      parameters:
   *        - in: query
   *          name: limit
   *          schema:
   *            type: integer
   *        - in: query
   *          name: page
   *          schema:
   *            type: integer
   *      responses:
   *        '200':
   *          description: List of users with pagination.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  items:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/UserDto'
   *                  limit:
   *                    type: number
   *                  pages:
   *                    type: number
   *                  itemsCount:
   *                    type: number
   *                  pagesCount:
   *                    type: number
   *                  prewPage:
   *                    type: string
   *                  nextPage:
   *                    type: string
   */
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

  /**
   * @swagger
   * paths:
   *  /users/profile:
   *    get:
   *      security:
   *        - bearerAuth: []
   *      description: User profile
   *      summary: User profile
   *      tags:
   *        - Users
   *      responses:
   *        '200':
   *          description: Profile.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/UserDto'
   */

  router.get('/profile', jwtGuard, async (req, res) => {
    res.status(200).json(req.user);
  });

  /**
   * @swagger
   * paths:
   *  /users/{id}:
   *    get:
   *      description: Profile user with id
   *      summary: Profile user with id
   *      tags:
   *        - Users
   *      parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *            type: number
   *      responses:
   *        '200':
   *          description: Profile user with id.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/UserDto'
   */
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

  /**
   * @swagger
   * paths:
   *  /users:
   *    put:
   *      security:
   *        - bearerAuth: []
   *      description: User profile
   *      summary: User profile
   *      tags:
   *        - Users
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UpdateUserDto'
   *      responses:
   *        '204':
   *          description: The User was updated
   */
  router.put('', jwtGuard, async (req, res) => {
    const { user } = req;
    if (Object.keys(req.body).length) {
      const updUser = req.body;
      const { status, error } = updateValidator(updUser);
      if (status) {
        userService.update(user.id, updUser);
        res.status(200).send();
      } else {
        res.status(400).json({ msg: 'error', details: error });
      }
    } else {
      res.status(400).json({ msg: 'error', details: 'invalid body in request' });
    }
  });

  /**
   * @swagger
   * paths:
   *  /users:
   *    delete:
   *      security:
   *        - bearerAuth: []
   *      description: User profile
   *      summary: User profile
   *      tags:
   *        - Users
   *      responses:
   *        '204':
   *          description: The User was deleted
   */

  router.delete('', jwtGuard, async (req, res) => {
    const { user } = req;
    userService.remove(user.id);
    res.status(200).send();
  });

  return router;
};
