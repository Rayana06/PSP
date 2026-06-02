import { isPalindromeReverse } from "../../utils/lecturer-utils.js";

export class LecturerCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    const cabinetNumber = this.data.cabinet || "404";
    const resultReverse = isPalindromeReverse(cabinetNumber);

    return `
      <div class="card-item">
        <div class="card-top">
          <img src="${this.data.image}" class="teacher-photo" alt="${this.data.name}">

        <div class="card-info">
            <h3>${this.data.name}</h3>
            <p>${this.data.subject}</p>
            <p>Часы: ${this.data.hours}</p>
            </div>
        </div>

        <div class="homework-block">
          <p>Кабинет: ${cabinetNumber}</p>
          <p>Палиндром: <b>${resultReverse}</b></p>
        </div>

        <div class="card-buttons">
          <button class="open-btn">Подробнее</button>
          <button class="delete-btn">Удалить</button>
        </div>
      </div>
    `;
  }

  render(data, onOpen, onDelete) {
    this.data = data;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getHTML();

    const element = wrapper.firstElementChild;
    this.parent.appendChild(element);

    element.querySelector(".open-btn").addEventListener("click", onOpen);
    element.querySelector(".delete-btn").addEventListener("click", onDelete);
  }
}
