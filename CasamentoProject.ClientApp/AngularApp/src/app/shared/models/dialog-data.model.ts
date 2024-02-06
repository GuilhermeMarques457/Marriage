export class DialogData {
  Message: string | null;
  Title: string | null;

  constructor(title: string, message: string) {
    this.Message = message;
    this.Title = title;
  }
}
