export interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  insertDate: string;
  imageFile?: File;
  imagePath?: string;
  published: boolean;
}

