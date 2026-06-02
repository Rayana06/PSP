class Api {
  async get(url) {
    const response = await fetch(url);
    return await response.json();
  }

  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await response.json();
  }

  async patch(url, data) {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await response.json();
  }

  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE"
    });

    return response.ok;
  }
}

export const ajax = new Api();
