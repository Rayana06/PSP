import { LecturerCardComponent } from "../../components/lecturer-card/lecturer-card.js";
import { LecturerPage } from "../lecturer/lecturer.js";
import { ajax } from "../../modules/ajax.js";

export class LecturersPage {
  constructor(parent) {
    this.parent = parent;
    this.lecturers = [];
    this.filteredLecturers = [];
  }

  // Загружаем преподавателей с backend
  loadData() {
    ajax.get("http://localhost:3000/lecturers", (data) => {
      this.lecturers = data;
      this.filteredLecturers = [...this.lecturers];
      this.renderCards();
    });
  }

  getHTML() {
    return `
      <div class="header">
        <button class="home-btn">Домой</button>
        <h2>Список преподавателей</h2>
      </div>

      <div class="controls">
        <input id="search-input" type="text" placeholder="Поиск по имени или предмету" />
        <button id="search-btn">Найти</button>
        <button id="add-btn">Добавить</button>
      </div>

      <div class="cards-container" id="main"></div>
    `;
  }

  renderCards() {
    const main = document.getElementById("main");
    main.innerHTML = "";

    this.filteredLecturers.forEach(item => {
      new LecturerCardComponent(main).render(
        item,
        () => this.openCard(item.id),
        () => this.deleteCard(item.id)
      );
    });
  }

  // Метод для отображения одного преподавателя
  renderLecturer(lecturer) {
    this.parent.innerHTML = "";
    new LecturerPage(this.parent, lecturer, () => this.render()).render();
  }

  openCard(id) {
    const lecturer = this.lecturers.find(item => item.id === id);
    this.renderLecturer(lecturer);
  }

  deleteCard(id) {
    this.lecturers = this.lecturers.filter(item => item.id !== id);
    this.filteredLecturers = [...this.lecturers];
    this.renderCards();
  }

  addCard() {
    const newLecturer = { ...this.lecturers[0], id: Date.now() };
    this.lecturers.push(newLecturer);
    this.filteredLecturers = [...this.lecturers];
    this.renderCards();
  }

  filterCards(value) {
    const searchValue = value.toLowerCase();
    this.filteredLecturers = this.lecturers.filter(item =>
      item.name.toLowerCase().includes(searchValue) ||
      item.subject.toLowerCase().includes(searchValue)
    );
    this.renderCards();
  }

  addEventListeners() {
    document.getElementById("add-btn").addEventListener("click", () => this.addCard());
    document.getElementById("search-btn").addEventListener("click", () => {
      this.filterCards(document.getElementById("search-input").value);
    });
    document.querySelector(".home-btn").addEventListener("click", () => this.render());
  }

  render() {
    this.parent.innerHTML = this.getHTML();
    this.loadData();
    this.addEventListeners();
  }
}
