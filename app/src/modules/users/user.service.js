function userService(model) {
  const findById = async (id) => model.findByPk(id);
  const findByEmail = async (email) => model.findOne({ where: { email } });
  const create = async (user) => model.create(user);
  const update = async (id, user) => model.update(user, { where: { id } });
  const remove = async (id) => model.destroy({ where: { id } });
  const list = async (limit = 10, page = 1) => {
    const { count, rows } = await model.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    });
    return {
      items: rows,
      limit,
      page,
      itemsCount: count,
      pagesCount: Math.ceil(count / limit),
    };
  };

  return {
    findById,
    findByEmail,
    create,
    update,
    remove,
    list,
  };
}

module.exports = userService;
