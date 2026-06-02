import { LecturersPage } from "./pages/lecturers/lecturers.js";

const root = document.getElementById("root");
const lecturersPage = new LecturersPage(root);
lecturersPage.render();

// Слушаем изменение хэша, чтобы открывать одного преподавателя
window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  const match = hash.match(/^#edit\/(\d+)$/);
  if (match) {
    const id = parseInt(match[1]);
    const lecturer = lecturersPage.lecturers.find(l => l.id === id);
    if (lecturer) {
      lecturersPage.renderLecturer(lecturer);
    }
  } else {
    lecturersPage.render();
  }
});