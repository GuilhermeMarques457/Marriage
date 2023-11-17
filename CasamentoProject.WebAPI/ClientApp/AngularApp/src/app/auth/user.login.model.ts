export class UserLogin {
  constructor(email: string, password: string) {
    this.Email = email;
    this.Password = password;
  }

  Email: string;
  Password: string;
}
