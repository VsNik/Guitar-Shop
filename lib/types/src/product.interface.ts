export enum GuitarType {
  Electro = 'electro',
  Acoustic = 'acoustic',
  Ukulele = 'ukulele',
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  type: GuitarType;
  stringCount: number;
  price: number;
  ean: string;
  createdAt: string;
}
