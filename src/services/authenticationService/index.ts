import { LoginForm, User } from "../../types";
import axios, { AxiosInstance } from "axios";

type LoginResponse = {
  token: string,
  expirationTime: Date,
  user: User
}

class AuthenticationService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3001/api",
      timeout: 5000
    })
  }

  async login(loginForm: LoginForm) {
    var response = await this.client.post<LoginResponse>("/login", loginForm);
    return response.data;
  }
}

export default AuthenticationService;