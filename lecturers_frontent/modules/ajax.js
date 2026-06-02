class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                callback(data);
            }
        };
    }

    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                callback(response);
            }
        };
    }
}

// экспортируем экземпляр
export const ajax = new Ajax();
