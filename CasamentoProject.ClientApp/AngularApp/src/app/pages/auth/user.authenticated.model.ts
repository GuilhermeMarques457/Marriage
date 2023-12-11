export class UserAuthenticated {
  constructor(
    email: string,
    personName: string,
    expiration: Date,
    refreshToken: string,
    refreshTokenExpirationDateTime: Date
  ) {
    this.email = email;
    this.expiration = expiration;
    this.personName = personName;
    this.refreshToken = refreshToken;
    this.refreshTokenExpirationDateTime = refreshTokenExpirationDateTime;
  }

  email: string;
  personName: string;
  expiration: Date;
  refreshToken: string;
  refreshTokenExpirationDateTime: Date;
}
