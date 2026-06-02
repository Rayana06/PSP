import {
    isEqual,
    isPalindromeReverse
} from "../../utils/lecturer-utils.js";

export class LecturerCardComponent {

    constructor(parent) {
        this.parent = parent;
    }

getHTML() {
    let homeworkHTML = "";

    if (this.data.id === 1) {
        const teacher1 = {
            name: "Иванов И.И.",
            subject: "Микроэкономика",
            department: "Кафедра экономики"
        };

        const teacher2 = {
            name: "Иванов И.И.",
            subject: "Микроэкономика",
            department: "Кафедра экономики"
        };

        const result = isEqual(teacher1, teacher2);

        homeworkHTML = `
            <div class="homework-block">
                <h4>Задание 2.12</h4>

                <p>
                    <b>Проверка совпадения данных преподавателя</b>
                </p>

                <p>
                    ${teacher1.name}<br>
                    ${teacher1.subject}<br>
                    ${teacher1.department}
                </p>

                <p>
                    Результат проверки:
                    <b>${result}</b>
                </p>
            </div>
        `;
    }

    if (this.data.id === 2) {
        const cabinet = "404";
        const result = isPalindromeReverse(cabinet);

        homeworkHTML = `
            <div class="homework-block">
                <h4>Задание 3.8</h4>

                <p>
                    <b>Проверка номера кабинета</b>
                </p>

                <p>
                    Кабинет: ${cabinet}
                </p>

                <p>
                    Результат проверки:
                    <b>${result}</b>
                </p>
            </div>
        `;
    }

    return `
        <div class="card-item">

            <div class="card-top">

                <img
                    src="${this.data.image}"
                    class="teacher-photo"
                >

                <div class="card-info">

                    <h3>${this.data.name}</h3>

                    <p>${this.data.subject}</p>

                </div>

            </div>

            ${homeworkHTML}

            <div class="card-buttons">

                <button class="open-btn">
                    Подробнее
                </button>

                <button class="delete-btn">
                    Удалить
                </button>

            </div>

        </div>
    `;
}

    render(data, onOpen, onDelete) {
        this.data = data;

        const wrapper = document.createElement("div");

        wrapper.innerHTML = this.getHTML(data);

        const element = wrapper.firstElementChild;

        this.parent.appendChild(element);

        element
            .querySelector(".open-btn")
            .addEventListener("click", onOpen);

        element
            .querySelector(".delete-btn")
            .addEventListener("click", onDelete);
    }
}
