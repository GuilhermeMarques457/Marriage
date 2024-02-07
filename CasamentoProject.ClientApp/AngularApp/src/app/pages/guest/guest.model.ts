export interface Guest {
  id?: number;
  name: string;
  confirmed: boolean;
  giftGiven: boolean;
  numberOfFamilyMembers: number;
  familyMembers: string[] | null;
  marriageId: string;
  // marriage: Marriage | null;
  // gift: Gift | null;
  // giftMoney: GiftMoney | null;
}
