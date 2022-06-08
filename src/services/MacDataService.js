import http from "../http-common";

class MacDataService {
  login(userLogin) {
    return http.post("/login", userLogin);
  }
  getAll() {
    return http.get("/get_list");
  }

  get(id) {
    return http.get(`/get_list/${id}`);
  }

  create(data) {
    return http.post("/register_mac", data);
  }

  update(data) {
    return http.post("/update_mac", data);
  }

  delete(data) {
    return http.post("/delete_mac", data);
  }

  deleteAll() {
    return http.delete(`/get_list`);
  }

  findByTitle(title) {
    return http.get(`/get_list?search=${title}`);
  }
}

export default new MacDataService();
