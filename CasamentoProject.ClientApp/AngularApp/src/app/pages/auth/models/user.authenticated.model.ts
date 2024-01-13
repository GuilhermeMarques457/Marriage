export class UserAuthenticated {
  constructor(
    id: string,
    email: string,
    personName: string,
    token: string,
    expiration: Date,
    refreshToken: string,
    refreshTokenExpirationDateTime: Date
  ) {
    this.id = id;
    this.email = email;
    this.expiration = expiration;
    this.personName = personName;
    this.token = token;
    this.refreshToken = refreshToken;
    this.refreshTokenExpirationDateTime = refreshTokenExpirationDateTime;
  }

  id: string;
  token: string;
  email: string;
  personName: string;
  expiration: Date;
  refreshToken: string;
  refreshTokenExpirationDateTime: Date;
}
