export class Marriage {
  public id: string | null;
  public photoOfCouplePath: string;
  public date: Date;
  public moneyRaised: number;
  public moneyExpected: number;
  public street: string;
  public neighborhood: string;
  public numberAddress: number;
  public fiances: [];
  public gifts: [];
  public guestsPlusFamily: [];

  constructor(
    photoOfCouplePath: string,
    date: Date,
    moneyExpected: number,
    street: string,
    neighborhood: string,
    numberAddress: number,
    id?: string
  ) {
    this.id = id || null; // Set a default value if id is not provided
    this.date = date;
    this.street = street;
    this.neighborhood = neighborhood;
    this.numberAddress = numberAddress;
    this.moneyExpected = moneyExpected;
    this.photoOfCouplePath = photoOfCouplePath;

    this.fiances = [];
    this.gifts = [];
    this.guestsPlusFamily = [];
  }
}
