const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
  dataFilePath = filePath;
};

const findAll = (hours) => {
  const lecturers = fileService.readData(dataFilePath);

  if (hours) {
    return lecturers.filter(item =>
      item.hours === parseInt(hours)
    );
  }

  return lecturers;
};

const findOne = (id) => {
  const lecturers = fileService.readData(dataFilePath);
  return lecturers.find(item => item.id === id);
};

const create = (lecturerData) => {
  const lecturers = fileService.readData(dataFilePath);

  const newId = lecturers.length > 0
    ? Math.max(...lecturers.map(item => item.id)) + 1
    : 1;

  const newLecturer = {
    id: newId,
    ...lecturerData
  };

  lecturers.push(newLecturer);
  fileService.writeData(dataFilePath, lecturers);

  return newLecturer;
};

const update = (id, lecturerData) => {
  const lecturers = fileService.readData(dataFilePath);
  const index = lecturers.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  lecturers[index] = {
    ...lecturers[index],
    ...lecturerData,
    id
  };

  fileService.writeData(dataFilePath, lecturers);

  return lecturers[index];
};

const remove = (id) => {
  const lecturers = fileService.readData(dataFilePath);
  const filteredLecturers = lecturers.filter(item => item.id !== id);

  if (filteredLecturers.length === lecturers.length) {
    return false;
  }

  fileService.writeData(dataFilePath, filteredLecturers);
  return true;
};

const addComment = (lecturerId, comment) => {
  const lecturers = fileService.readData(dataFilePath);

  const lecturer = lecturers.find(
    item => item.id === lecturerId
  );

  if (!lecturer) {
    return null;
  }

  if (!lecturer.comments) {
    lecturer.comments = [];
  }

  lecturer.comments.push({
    author: comment.author || "Аноним",
    text: comment.text,
    createdAt: new Date().toISOString()
  });

  fileService.writeData(dataFilePath, lecturers);

  return lecturer;
};
module.exports = {
  init,
  findAll,
  findOne,
  create,
  update,
  remove,
  addComment
};