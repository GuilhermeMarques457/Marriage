export class UserAuthenticated {
  constructor(id: string, email: string, personName: string, token: string) {
    this.id = id;
    this.email = email;
    this.personName = personName;
    this.token = token;
  }

  id: string;
  token: string;
  email: string;
  personName: string;
}
