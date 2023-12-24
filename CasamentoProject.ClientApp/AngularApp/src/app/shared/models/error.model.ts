export class ErrorAuthenticated {
  constructor(message: string, details: string, statusCode: string) {
    this.Message = message;
    this.Details = details;
    this.StatusCode = statusCode;
  }

  Message: string;
  Details: string;
  StatusCode: string;
}
