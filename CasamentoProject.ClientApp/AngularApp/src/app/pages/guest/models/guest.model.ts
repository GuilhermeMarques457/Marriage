import { FamilyMember } from './family.model';

export interface Guest {
  id?: number;
  name: string;
  confirmed: boolean;
  giftGiven: boolean;
  numberOfFamilyMembers: number;
  familyMembers: FamilyMember[] | null;
  marriageId: string;
  // marriage: Marriage | null;
  // gift: Gift | null;
  // giftMoney: GiftMoney | null;
}
