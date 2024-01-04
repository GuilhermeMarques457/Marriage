export class Marriage {
  public Id: string | null;
  public PhotoOfCouplePath: string;
  public DateOfMarriage: Date;
  public HourOfMarriage: string;
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
    dateOfMarriage: Date,
    hourOfMarriage: string,
    moneyExpected: number,
    street: string,
    neighborhood: string,
    numberAddress: number,
    id?: string
  ) {
    this.Id = id || null; // Set a default value if id is not provided
    this.DateOfMarriage = dateOfMarriage;
    this.Street = street;
    this.Neighborhood = neighborhood;
    this.NumberAddress = numberAddress;
    this.HourOfMarriage = hourOfMarriage;
    this.MoneyExpected = moneyExpected;
    this.PhotoOfCouplePath = photoOfCouplePath;

    this.Fiances = [];
    this.Gifts = [];
    this.GuestsPlusFamily = [];
  }
}
