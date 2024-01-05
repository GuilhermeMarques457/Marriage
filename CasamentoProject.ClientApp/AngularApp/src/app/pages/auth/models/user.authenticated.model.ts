export class UserAuthenticated {
  constructor(
    email: string,
    personName: string,
    token: string,
    expiration: Date,
    refreshToken: string,
    refreshTokenExpirationDateTime: Date
  ) {
    this.email = email;
    this.expiration = expiration;
    this.personName = personName;
    this.token = token;
    this.refreshToken = refreshToken;
    this.refreshTokenExpirationDateTime = refreshTokenExpirationDateTime;
  }

  token: string;
  email: string;
  personName: string;
  expiration: Date;
  refreshToken: string;
  refreshTokenExpirationDateTime: Date;
}
