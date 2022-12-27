export interface Product {
  publish: boolean;
  _id: string;
  name: string;
  desc: string;
  image: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
}
