export interface CategoryType {
  id: number;
  name: string;
}
export interface PostType {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  category: CategoryType;
  createdAt: string;
}
