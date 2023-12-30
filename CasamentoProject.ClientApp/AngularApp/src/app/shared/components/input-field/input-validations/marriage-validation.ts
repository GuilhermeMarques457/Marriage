import { InputError } from '../../../models/input-error.model';

export class MarriageErrors {
  static photoErrors = [
    new InputError('Photo do casal é obrigatória', 'required'),
  ];

  static dateErrors = [new InputError('Data é obrigatória', 'required')];

  static hourErrors = [new InputError('Horário é obrigatório', 'required')];

  static localErrors = [
    new InputError('Local do casamento é obrigatório', 'required'),
  ];
}
