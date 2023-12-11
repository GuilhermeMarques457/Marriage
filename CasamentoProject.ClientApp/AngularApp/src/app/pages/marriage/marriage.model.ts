export class Marriage {
  public Id: string | null;
  public PhotoOfCouplePath: string;
  public DateOfMarriage: Date;
  public HourOfMarriage: string;
  public MoneyRaised: number;
  public MoneyExpected: number;
  public Local: string;
  public Fiances: [];
  public Gifts: [];
  public GuestsPlusFamily: [];

  constructor(
    photoOfCouplePath: string,
    dateOfMarriage: Date,
    hourOfMarriage: string,
    moneyRaised: number,
    moneyExpected: number,
    local: string,
    id?: string
  ) {
    this.Id = id || null; // Set a default value if id is not provided
    this.DateOfMarriage = dateOfMarriage;
    this.Local = local;
    this.HourOfMarriage = hourOfMarriage;
    this.MoneyExpected = moneyExpected;
    this.MoneyRaised = moneyRaised;
    this.PhotoOfCouplePath = photoOfCouplePath;

    this.Fiances = [];
    this.Gifts = [];
    this.GuestsPlusFamily = [];
  }
}
