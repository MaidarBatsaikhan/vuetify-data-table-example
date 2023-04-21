import axios from "axios";

export default axios.create({
  // baseURL: "http://macregister.uni/service/index.php/api",
  baseURL: "http://systemsupport.uni/service/index.php/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
