import { LoginForm, User } from "../../types";

import { HttpClient } from "../../common";

type LoginResponse = {
  token: string,
  expirationTime: Date,
  user: User
}

class AuthenticationService {
  client: HttpClient;

  constructor() {
    this.client = new HttpClient();
  }

  async login(loginForm: LoginForm): Promise<LoginResponse> {
    return await this.client.post<LoginResponse>("/login", loginForm);
  }
}

export default AuthenticationService;