class ServiceUrls {
  constructor() {
    this.baseUrl = "http://localhost:3001";
  }

  getLecturers(hours = "") {
    if (hours) {
      return `${this.baseUrl}/lecturers?hours=${hours}`;
    }

    return `${this.baseUrl}/lecturers`;
  }

  getLecturerById(id) {
    return `${this.baseUrl}/lecturers/${id}`;
  }

  deleteLecturer(id) {
    return `${this.baseUrl}/lecturers/${id}`;
  }

  addComment(id) {
    return `${this.baseUrl}/lecturers/${id}/comments`;
  }

  getServices() {
    return this.getLecturers();
  }

  getServiceById(id) {
    return this.getLecturerById(id);
  }
}

export const serviceUrls = new ServiceUrls();
