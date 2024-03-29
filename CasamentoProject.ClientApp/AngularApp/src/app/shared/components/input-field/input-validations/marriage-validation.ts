import { InputError } from '../../../models/input-error.model';

export class MarriageErrors {
  static photoErrors = [
    new InputError('Photo do casal é obrigatória', 'required'),
  ];

  static dateErrors = [new InputError('Data é obrigatória', 'required')];

  static hourErrors = [new InputError('Horário é obrigatório', 'required')];

  static neighborhoodErrors = [
    new InputError('Bairro do casamento é obrigatório', 'required'),
  ];

  static streetErrors = [
    new InputError('Rua do casamento é obrigatório', 'required'),
  ];

  static numberAddresssErrors = [
    new InputError('Numero de endereço do casamento é obrigatório', 'required'),
  ];

  static groomErrors = [
    new InputError('O nome do noivo é obrigatório', 'required'),
  ];

  static groomAgeErrors = [
    new InputError('Idade do noivo é obrigatório', 'required'),
  ];

  static brideErrors = [
    new InputError('O nome da noiva é obrigatório', 'required'),
  ];

  static brideAgeErrors = [
    new InputError('Idade da noiva é obrigatório', 'required'),
  ];
}
