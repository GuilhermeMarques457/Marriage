export class PhoneValidator {
  static validate(control) {
    const telefoneRegex = /^\d{11}$/;

    if (control.value && !telefoneRegex.test(control.value)) {
      return { invalidFormat: true };
    }

    return null;
  }
}
