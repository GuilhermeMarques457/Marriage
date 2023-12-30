export class TransformHourToCorrectFormat {
  static transform(str) {
    const hours = str.substring(0, 2);
    const minutes = str.substring(2);
    return `${hours}:${minutes}:00`;
  }
}
