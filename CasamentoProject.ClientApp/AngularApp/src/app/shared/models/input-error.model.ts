export class InputError {
  constructor(error: string, errorType: string) {
    this.Message = error;
    this.Type = errorType;
  }

  Message: string;
  Type: string;
}
