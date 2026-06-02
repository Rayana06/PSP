import { ModelDetailPage } from "../model-detail/model-detail.js";

export class LecturerPage {
  constructor(parent, teacher, onBack) {
    this.parent = parent;
    this.teacher = teacher;
    this.onBack = onBack;
  }

  render() {
    this.parent.innerHTML = `
      <div class="header">
        <button class="home-btn">Домой</button>
        <h2>Информация о преподавателе</h2>
      </div>

      <div class="details-card">
        <img src="${this.teacher.image}" class="details-photo" alt="${this.teacher.name}" />

        <div class="info-row"><b>ФИО:</b> ${this.teacher.name}</div>
        <div class="info-row"><b>Предмет:</b> ${this.teacher.subject}</div>
        <div class="info-row"><b>Кафедра:</b> ${this.teacher.department}</div>
        <div class="info-row"><b>Стаж:</b> ${this.teacher.experience}</div>
        <div class="info-row"><b>Email:</b> ${this.teacher.email}</div>
        <div class="info-row"><b>Описание:</b> ${this.teacher.description}</div>

        <br />
        <button class="model-btn">3D модель</button>
      </div>
    `;

    document.querySelector(".home-btn").addEventListener("click", () => this.onBack());

    document.querySelector(".model-btn").addEventListener("click", () => {
      new ModelDetailPage(this.parent, this.teacher.model, () => this.render()).render();
    });
  }
}
