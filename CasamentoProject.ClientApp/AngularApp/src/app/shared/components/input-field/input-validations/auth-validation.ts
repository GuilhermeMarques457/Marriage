import { InputError } from '../../../models/input-error.model';

export class AuthErrors {
  static emailErrors = [
    new InputError('Email não pode ser nulo', 'required'),
    new InputError('Email deve estar no formato de email', 'email'),
  ];

  static passwordErrors = [
    new InputError('Senha não pode ser nula', 'required'),
    new InputError('Senha tem que conter mais de 8 caracteres', 'minlength'),
  ];

  static nameErrors = [new InputError('Nome não pode ser nulo', 'required')];

  static phoneErrors = [
    new InputError('Telefone não pode ser nulo', 'required'),
    new InputError(
      'Telefone tem que estar no formato 99999999999',
      'invalidFormat'
    ),
  ];

  static confirmErrors = [
    new InputError('Confirmar senha não pode ser nulo', 'required'),
    new InputError('Confirmar senha e senha devem ser iguais', 'notMatch'),
  ];
}
