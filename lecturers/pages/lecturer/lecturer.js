import { LecturersPage } from "../lecturers/lecturers.js";

export class LecturerPage {

    constructor(parent, id) {

        this.parent = parent;

        this.id = id;

        this.teacher = this.getTeacher();
    }

    getTeacher() {

    const teachers = [

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

    return teachers.find(item => item.id === this.id);
}

    render() {

        this.parent.innerHTML = `
            <div class="header">

                <button class="home-btn">
                    Домой
                </button>

                <h2>
                    Информация о преподавателе
                </h2>

            </div>

            <div class="details-card">

                <img 
                    src="${this.teacher.image}"
                    class="details-photo"
                >

                <div class="info-row">
                    <b>ФИО:</b> ${this.teacher.name}
                    </div>

                    <div class="info-row">
                        <b>Предмет:</b> ${this.teacher.subject}
                    </div>

                    <div class="info-row">
                        <b>Кафедра:</b> ${this.teacher.department}
                    </div>

                    <div class="info-row">
                        <b>Стаж:</b> ${this.teacher.experience}
                    </div>

                    <div class="info-row">
                        <b>Email:</b> ${this.teacher.email}
                    </div>

                    <div class="info-row">
                        <b>Описание:</b> ${this.teacher.description}
                    </div>
                <br>

                <button class="model-btn">
                    3D модель
                </button>

            </div>
        `;

        this.addListeners();
    }

    addListeners() {

        document
            .querySelector(".home-btn")
            .addEventListener("click", () => {

                new LecturersPage(this.parent).render();

            });

        document
            .querySelector(".model-btn")
            .addEventListener("click", () => {

                location.href =
                    "project-root/detail.html?id=teacher-model&type=default";

            });
    }
}
