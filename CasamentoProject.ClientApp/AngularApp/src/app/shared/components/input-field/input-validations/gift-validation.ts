import { InputError } from '../../../models/input-error.model';

export class GiftErrors {
  static nameErrors = [
    new InputError('Nome do presente não pode ser nulo', 'required'),
  ];

  static descriptionErrors = [
    new InputError('Descrição do presente não pode ser nulo', 'required'),
  ];

  static priceErrors = [
    new InputError('Preço do presente não pode ser nulo', 'required'),
  ];

  static giftUrlErrors = [
    new InputError('Link do presente não pode ser nulo', 'required'),
  ];
}
