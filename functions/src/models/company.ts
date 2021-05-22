import { Base } from './base';

export class Company extends Base {
  name!: string;
  cnpj!: string;
  image?: string;
  phone!: string;
  email!: string;
  address: Address;
  partner: boolean;

  constructor() {
    super();
    this.partner = false;
    this.address = new Address();
  }
}

class Address {
  city!: string;
  state!: string;
  street!: string;
  number!: string;
  zipcode!: string;
  district!: string;
  complement?: string;
}
