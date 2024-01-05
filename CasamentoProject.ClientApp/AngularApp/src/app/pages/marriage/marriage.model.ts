export class Marriage {
  public Id: string | null;
  public PhotoOfCouplePath: string;
  public Date: Date;
  public MoneyRaised: number;
  public MoneyExpected: number;
  public Street: string;
  public Neighborhood: string;
  public NumberAddress: number;
  public Fiances: [];
  public Gifts: [];
  public GuestsPlusFamily: [];

  constructor(
    photoOfCouplePath: string,
    date: Date,
    moneyExpected: number,
    street: string,
    neighborhood: string,
    numberAddress: number,
    id?: string
  ) {
    this.Id = id || null; // Set a default value if id is not provided
    this.Date = date;
    this.Street = street;
    this.Neighborhood = neighborhood;
    this.NumberAddress = numberAddress;
    this.MoneyExpected = moneyExpected;
    this.PhotoOfCouplePath = photoOfCouplePath;

    this.Fiances = [];
    this.Gifts = [];
    this.GuestsPlusFamily = [];
  }
}
