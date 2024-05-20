export type ModalTypes = { 
  regular: string;
  alt_description: string;
  likes: number;
  [key: string]: unknown };



export type  ArticleTypes={
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  likes: number;
  [key: string]: unknown;
}