import { LecturerCardComponent } from "../../components/lecturer-card/lecturer-card.js";
import { LecturerPage } from "../lecturer/lecturer.js";

export class LecturersPage {

    constructor(parent) {

        this.parent = parent;

        this.lecturers = this.getData();

        this.filteredLecturers = [...this.lecturers];
    }

    getData() {

    return [

        {
            id: 1,

            name: "Иванов И.И.",

            subject: "Микроэкономика",

            image: "assets/belodedov.png",

            department: "Кафедра экономики",

            experience: "12 лет",

            email: "ivanov@bmstu.ru",

            description:
                "Преподаватель микроэкономики. Занимается исследованием рыночных структур и поведения потребителей."
        },

        {
            id: 2,

            name: "Бондарь В.В.",

            subject: "Экономическая география",

            image: "assets/maslennicov.png",

            department: "Кафедра географии",

            experience: "8 лет",

            email: "bondar@bmstu.ru",

            description:
                "Специалист по экономической географии и мировой логистике. Изучает международные экономические связи."
        },

        {
            id: 3,

            name: "Смирнов А.И.",

            subject: "Математический анализ",

            image: "assets/kanev.png",

            department: "Кафедра высшей математики",

            experience: "15 лет",

            email: "smirnov@bmstu.ru",

            description:
                "Преподаватель математического анализа. Ведет курсы по пределам, интегралам и дифференциальным уравнениям."
        },

        {
            id: 4,

            name: "Кузнецов Д.А.",

            subject: "Программирование",

            image: "assets/js-teacher.png",

            department: "Кафедра информатики",

            experience: "10 лет",

            email: "kuznecov@bmstu.ru",

            description:
                "Преподаватель программирования и веб-разработки. Изучает JavaScript, архитектуру веб-приложений и frontend-разработку."
        }
    ];
}

    getHTML() {

        return `
            <div class="header">

                <button class="home-btn">
                    Домой
                </button>

                <h2>
                    Список преподавателей
                </h2>

            </div>

            <div class="controls">

                <input 
                    id="search-input" 
                    type="text" 
                    placeholder="Поиск по имени или предмету"
                >

                <button id="search-btn">
                    Найти
                </button>

                <button id="add-btn">
                    Добавить
                </button>

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

    openCard(id) {

        new LecturerPage(this.parent, id).render();
    }

    deleteCard(id) {

        this.lecturers =
            this.lecturers.filter(item => item.id !== id);

        this.filteredLecturers = [...this.lecturers];

        this.renderCards();
    }

    addCard() {

        if (this.lecturers.length === 0) return;

        const newLecturer = {
            ...this.lecturers[0]
        };

        newLecturer.id = Date.now();

        this.lecturers.push(newLecturer);

        this.filteredLecturers = [...this.lecturers];

        this.renderCards();
    }

    filterCards(value) {

        const searchValue = value.toLowerCase();

        this.filteredLecturers =
            this.lecturers.filter(item =>
                item.name.toLowerCase().includes(searchValue) ||
                item.subject.toLowerCase().includes(searchValue)
            );

        this.renderCards();
    }

    addEventListeners() {

        document
            .getElementById("add-btn")
            .addEventListener("click", () => {

                this.addCard();

            });

        document
            .getElementById("search-btn")
            .addEventListener("click", () => {

                const value =
                    document.getElementById("search-input").value;

                this.filterCards(value);

            });

        document
            .querySelector(".home-btn")
            .addEventListener("click", () => {

                this.render();

            });
    }

    render() {

        this.parent.innerHTML = this.getHTML();

        this.renderCards();

        this.addEventListeners();
    }
}
