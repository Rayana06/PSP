const lecturersService = require('../services/lecturersService');

const getAll = (req, res) => {
  const { hours } = req.query;
  const lecturers = lecturersService.findAll(hours);

  res.json(lecturers);
};

const getById = (req, res) => {
  const item = lecturersService.findOne(parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({
      error: 'Преподаватель не найден'
    });
  }

  res.json(item);
};

const create = (req, res) => {
  const { name, subject, hours } = req.body;

  if (!name || !subject || !hours) {
    return res.status(400).json({
      error: 'Не все поля заполнены'
    });
  }

  const result = lecturersService.create({
    name,
    subject,
    hours
  });

  res.status(201).json(result);
};

const update = (req, res) => {
  const result = lecturersService.update(
    parseInt(req.params.id),
    req.body
  );

  if (!result) {
    return res.status(404).json({
      error: 'Преподаватель не найден'
    });
  }

  res.json(result);
};

const remove = (req, res) => {
  const success = lecturersService.remove(
    parseInt(req.params.id)
  );

  if (!success) {
    return res.status(404).json({
      error: 'Преподаватель не найден'
    });
  }

  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
