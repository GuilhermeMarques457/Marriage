import { InputError } from '../../../models/input-error.model';

export class GuestErrors {
  static nameErrors = [
    new InputError('Nome do convidado é obrigatório', 'required'),
  ];
}
