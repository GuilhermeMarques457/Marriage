export interface Gift {
  name: string;
  description: string | null;
  price: number | null;
  recieved: boolean;
  photoPath: string;
  giftUrl: string;
  guestId: string | null;
}
