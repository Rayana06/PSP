export class BackButtonComponent{
constructor(parent){this.parent=parent;}
render(listener){
this.parent.insertAdjacentHTML("beforeend",
'<button class="btn btn-secondary back-btn">Назад</button>');
this.parent.querySelector("button").addEventListener("click",listener);
}
}
