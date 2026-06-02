import { LecturerCardComponent } from "../../components/lecturer-card/lecturer-card.js";
import { LecturerPage } from "../lecturer/lecturer.js";
import { ajax } from "../../modules/ajax.js";
import { serviceUrls } from "../../modules/serviceUrls.js";

export class LecturersPage {
  constructor(parent) {
    this.parent = parent;
    this.lecturers = [];
    this.filteredLecturers = [];
  }

  getHTML() {
    return `
      <div class="header">
        <button class="home-btn">Домой</button>
        <h2>Список преподавателей</h2>
      </div>

      <div class="controls">
        <input id="search-input" type="text" placeholder="Поиск по имени или предмету" />
        <input id="hours-input" type="number" placeholder="Количество часов" />
        <button id="search-btn">Найти</button>
        <button id="add-btn">Добавить</button>
      </div>

      <div class="cards-container" id="main"></div>
    `;
  }

  async loadData(hours = "") {
  const data = await ajax.get(
    serviceUrls.getLecturers(hours)
  );

  this.lecturers = Array.isArray(data) ? data : [];
  this.filteredLecturers = [...this.lecturers];

  this.renderCards();
}

  renderCards() {
    const main = document.getElementById("main");
    main.innerHTML = "";

    this.filteredLecturers.forEach((item) => {
      new LecturerCardComponent(main).render(
        item,
        () => this.openCard(item.id),
        () => this.deleteCard(item.id)
      );
    });
  }

  async openCard(id) {
  const lecturer = await ajax.get(
    serviceUrls.getLecturerById(id)
  );

  new LecturerPage(
    this.parent,
    lecturer,
    () => this.render()
  ).render();
}

  async deleteCard(id) {
  await ajax.delete(
    serviceUrls.deleteLecturer(id)
  );

  this.loadData();
}

  addCard() {
    const base = this.lecturers[0];

    if (!base) return;

    const newLecturer = {
      ...base,
      id: Date.now(),
      name: base.name,
      subject: base.subject,
      image: base.image,
      cabinet: base.cabinet || "101"
    };

    this.lecturers.push(newLecturer);
    this.filteredLecturers = [...this.lecturers];
    this.renderCards();
  }

  filterCards(value) {
    const searchValue = value.toLowerCase();

    this.filteredLecturers = this.lecturers.filter((item) =>
      item.name.toLowerCase().includes(searchValue) ||
      item.subject.toLowerCase().includes(searchValue)
    );

    this.renderCards();
  }

  addEventListeners() {
  document.querySelector(".home-btn").addEventListener("click", () => {
    this.render();
  });

  document.getElementById("search-btn").addEventListener("click", () => {
    const hours = document.getElementById("hours-input").value;
    const searchValue = document.getElementById("search-input").value;

    if (hours) {
      this.loadData(hours);
    } else {
      this.filterCards(searchValue);
    }
  });

  document.getElementById("add-btn").addEventListener("click", () => {
    this.addCard();
  });
}
  render() {
    if (this.pollingId) {
    clearInterval(this.pollingId);
    }
    clearInterval(this.pollingId);
    this.parent.innerHTML = this.getHTML();
    this.addEventListeners();
    this.loadData();
  }
}
