import { ajax } from '../modules/ajax.js';
import { serviceUrls } from '../modules/serviceUrls.js';

// Получаем id из URL/hash
const id = window.location.hash.split('/')[1];

function loadService(id) {
    ajax.get(serviceUrls.getServiceById(id), (data) => {
        document.querySelector('#title').value = data.title;
        document.querySelector('#price').value = data.price;
        document.querySelector('#description').value = data.description;
    });
}

loadService(id);