export class UserSignUp {
  constructor(
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
  ) {
    this.Email = email;
    this.PersonName = name;
    this.Password = password;
    this.ConfirmPassword = confirmPassword;
    this.PhoneNumber = phone;
  }

  PersonName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  ConfirmPassword: string;
}
