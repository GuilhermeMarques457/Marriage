export class ErrorResponse {
  error: {
    Message: string | null;
    Details: string | null;
    StatusCode: string | null;
  };

  constructor(message: string, details: string, status: string) {
    this.error = {
      Message: message,
      Details: details,
      StatusCode: status,
    };
  }
}
