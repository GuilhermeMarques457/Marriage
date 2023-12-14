export class PhoneValidator {
  static validate(control) {
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    if (control.value && !senhaRegex.test(control.value)) {
      return { invalidFormat: true };
    }

    return null;
  }
}
