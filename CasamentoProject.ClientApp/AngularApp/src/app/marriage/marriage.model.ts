import { Time } from '@angular/common';

export class Marriage {
  public Id: string;
  public PhotoOfCouplePath: string;
  public DateOfMarriage: Date;
  public HourOfMarriage: Time;
  public MoneyRaised: number;
  public MoneyExpected: number;
  public Local: string;
  // public ICollection<Fiance>? Fiances { get; set; }
  // public ICollection<Gift>? Gifts { get; set; }
  // public ICollection<Guest>? GuestsPlusFamily { get; set; }

  constructor(
    photoOfCouplePath: string,
    dateOfMarriage: Date,
    hourOfMarriage: Time,
    moneyRaised: number,
    moneyExpected: number,
    local: string,
    id?: string
  ) {
    this.Id = id || ''; // Set a default value if id is not provided
    this.DateOfMarriage = dateOfMarriage;
    this.Local = local;
    this.HourOfMarriage = hourOfMarriage;
    this.MoneyExpected = moneyExpected;
    this.MoneyRaised = moneyRaised;
    this.PhotoOfCouplePath = photoOfCouplePath;
  }
}
