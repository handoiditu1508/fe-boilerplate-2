import axios, { AxiosInstance } from "axios";

class AuthenticationService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3001/api",
      timeout: 5000
    })
  }

  async login(loginForm: any) {
    var response = await this.client.post("/login", loginForm);
    return response.data;
  }
}

export default new AuthenticationService();