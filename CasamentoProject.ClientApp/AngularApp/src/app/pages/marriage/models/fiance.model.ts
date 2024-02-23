export class Fiance {
  id: string;
  name: string;
  age: number;
  photoPath: string;
  marriageId: string;

  constructor(
    name: string,
    age: number,
    photoPath?: string,
    id?: string,
    marriageId?: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.photoPath = photoPath;
    this.marriageId = marriageId;
  }
}
