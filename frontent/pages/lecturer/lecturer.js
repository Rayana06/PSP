import { ModelDetailPage } from "../model-detail/model-detail.js";
import { countPrefixes } from "../../utils/lecturer-utils.js";

export class LecturerPage {
  constructor(parent, teacher, onBack) {
    this.parent = parent;
    this.teacher = teacher;
    this.onBack = onBack;
    this.pollingId = null;
  }

  render() {
    if (this.pollingId) {
      clearInterval(this.pollingId);
    }

    const words = ["м", "ми", "микро", "эко", "экономика"];
    const str = (this.teacher.subject || "").toLowerCase();

    const prefixCount = countPrefixes(words, str);

    this.parent.innerHTML = `
      <div class="header">
        <button class="home-btn">Домой</button>
        <h2>Информация о преподавателе</h2>
      </div>

      <div class="details-card">
        <img src="${this.teacher.image}" class="details-photo" alt="${this.teacher.name}" />

        <div class="info-row">
          <b>ФИО:</b>
          <input id="teacherName" class="edit-input" value="${this.teacher.name || ""}">
        </div>

        <div class="info-row">
          <b>Предмет:</b>
          <input id="teacherSubject" class="edit-input" value="${this.teacher.subject || ""}">
        </div>

        <div class="info-row">
          <b>Кафедра:</b>
          <input id="teacherDepartment" class="edit-input" value="${this.teacher.department || ""}">
        </div>

        <div class="info-row">
          <b>Стаж:</b>
          <input id="teacherExperience" class="edit-input" value="${this.teacher.experience || ""}">
        </div>

        <div class="info-row">
          <b>Email:</b>
          <input id="teacherEmail" class="edit-input" value="${this.teacher.email || ""}">
        </div>

        <div class="info-row">
          <b>Часы:</b>
          <input id="teacherHours" class="edit-input" value="${this.teacher.hours || ""}">
        </div>

        <div class="homework-block">
          <p><b>Проверка префиксов дисциплины</b></p>

          <p>
            Дисциплина: ${this.teacher.subject}
          </p>

          <p>
            Массив префиксов:
            м, ми, микро, эко, экономика
          </p>

          <p>
            Количество совпадающих префиксов:
            <b>${prefixCount}</b>
          </p>
        </div>

        <div class="comments-section">
          <h3>Комментарии</h3>

          <div id="comments-list"></div>

          <input
            id="comment-author"
            class="edit-input"
            placeholder="Ваше имя"
          >

          <textarea
            id="comment-text"
            class="edit-textarea"
            placeholder="Комментарий"
          ></textarea>

          <div class="details-buttons">
            <button id="add-comment-btn" class="action-btn">Добавить комментарий</button>
            <button id="save-btn" class="action-btn">Сохранить</button>
            <button class="model-btn">3D модель</button>
          </div>
    `;

    const renderComments = (comments = []) => {
      const list = document.getElementById("comments-list");

      if (!list) return;

      if (!comments.length) {
        list.innerHTML = `<p>Комментариев пока нет</p>`;
        return;
      }

      list.innerHTML = comments.map(comment => `
        <div class="homework-block">
          <p><b>${comment.author}</b></p>
          <p>${comment.text}</p>
          <small>${new Date(comment.date).toLocaleString()}</small>
        </div>
      `).join("");
    };

    const loadLecturer = async () => {
  const response = await fetch(`/lecturers/${this.teacher.id}`);

  if (!response.ok) return;

  const data = await response.json();

  this.teacher = data;
  renderComments(data.comments || []);
};

document.querySelector(".home-btn").addEventListener("click", () => {
  clearInterval(this.pollingId);
  this.onBack();
});

document.querySelector(".home-btn").addEventListener("click", () => {
  clearInterval(this.pollingId);
  this.onBack();
});

    document.querySelector(".model-btn").addEventListener("click", () => {
      clearInterval(this.pollingId);

      new ModelDetailPage(
        this.parent,
        this.teacher.model,
        () => this.render()
      ).render();
    });

    document.getElementById("save-btn").addEventListener("click", async () => {
      const updatedTeacher = {
        name: document.getElementById("teacherName").value,
        subject: document.getElementById("teacherSubject").value,
        department: document.getElementById("teacherDepartment").value,
        experience: document.getElementById("teacherExperience").value,
        email: document.getElementById("teacherEmail").value,
        description: document.getElementById("teacherDescription").value,
        hours: Number(document.getElementById("teacherHours").value),
        image: this.teacher.image,
        model: this.teacher.model,
        cabinet: this.teacher.cabinet,
        comments: this.teacher.comments || []
      };

      await fetch(`/lecturers/${this.teacher.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTeacher)
      });

      alert("Изменения сохранены");
      await loadLecturer();
    });

    document.getElementById("add-comment-btn").addEventListener("click", async () => {
      const author = document.getElementById("comment-author").value.trim();
      const text = document.getElementById("comment-text").value.trim();

      if (!text) {
        alert("Введите комментарий");
        return;
      }

      await fetch(`/lecturers/${this.teacher.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          author,
          text
        })
      });

      document.getElementById("comment-author").value = "";
      document.getElementById("comment-text").value = "";

      await loadLecturer();
    });

    renderComments(this.teacher.comments || []);

this.pollingId = setInterval(async () => {
  console.log("polling работает");

  const response = await fetch(`/lecturers/${this.teacher.id}`);
  const data = await response.json();

  console.log("обновленные данные:", data.comments);

  this.teacher.comments = data.comments || [];
  renderComments(this.teacher.comments);
}, 2500);
  }
}
