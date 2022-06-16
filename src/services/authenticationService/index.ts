import { LoginForm, User } from "../../types";
import axios, { AxiosInstance } from "axios";

import config from "../../config";

type LoginResponse = {
  token: string,
  expirationTime: Date,
  user: User
}

class AuthenticationService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: 5000
    })
  }

  async login(loginForm: LoginForm) {
    var response = await this.client.post<LoginResponse>("/login", loginForm);
    return response.data;
  }
}

export default AuthenticationService;