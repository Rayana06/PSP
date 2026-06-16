import {
    isEqualLecturerObj,
    countGroupPrefixes,
    fillLessonArray,
    isLecturerTextPalindrome
} from "../../utils/lecturer-utils.js";

export class LecturerCardComponent {

    constructor(parent) {
        this.parent = parent;
    }

getHTML() {

    let homeworkHTML = "";

    if (this.data.id === 1) {

        const lecturer1 = {
            name: "Иванов И.И.",
            subject: "Микроэкономика"
        };

        const lecturer2 = {
            name: "Бондарь В.В.",
            subject: "Экономическая география"
        };

        const result = isEqualLecturerObj(
            lecturer1,
            lecturer2
        );

        homeworkHTML = `
            <div class="homework-block">

                <h4>Практические задания</h4>

                <p>
                    <b>Сравнение преподавателей:</b><br>

                    ${lecturer1.name} и ${lecturer2.name}
                </p>

                <p>
                    Результат функции:
                    <b>${result}</b>
                </p>

            </div>
        `;
    }

    if (this.data.id === 2) {

        const prefixes = ["и", "иу", "иу5"];

        const result = countGroupPrefixes(
            prefixes,
            "иу5-41б"
        );

        homeworkHTML = `
            <div class="homework-block">

                <h4>Практические задания</h4>

                <p>
                    <b>Поиск префиксов группы:</b><br>

                    Строка: ИУ5-41Б
                </p>

                <p>
                    Найдено совпадений:
                    <b>${result}</b>
                </p>

            </div>
        `;
    }


    if (this.data.id === 3) {

        const lessons = fillLessonArray(
            3,
            {
                subject: "Консультация"
            }
        );

        homeworkHTML = `
            <div class="homework-block">

                <h4>Практические задания</h4>
                <p>
                    Консультация Консультация Консультация
                </p>
                    Создано консультаций:
                    <b>${lessons.length}</b>

            </div>
        `;
    }


    if (this.data.id === 4) {

        const palindrome =
            isLecturerTextPalindrome("121");

        homeworkHTML = `
            <div class="homework-block">

                <h4>Практические задания</h4>
                <p>
                    Проверка аудитории 121:
                    <b>${palindrome}</b>
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
