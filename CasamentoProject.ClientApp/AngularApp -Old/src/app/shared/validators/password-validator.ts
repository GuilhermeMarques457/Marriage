export class PasswordValidator {
  static validate(control) {
    const horaRegex = /^\d{4}$/;

    if (control.value && !horaRegex.test(control.value)) {
      return { invalidFormat: true };
    }

    return null;
  }

  stat;
}
