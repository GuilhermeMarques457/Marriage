export class HourValidator {
  static validate(control) {
    const hourRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (control.value && !hourRegex.test(control.value)) {
      return { invalidFormat: true };
    }

    return null;
  }
}
