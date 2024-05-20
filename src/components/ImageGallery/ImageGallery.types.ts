
export type InfoList = {
  items: ArticleTypes[];
  openModal: (info:{regular:string,alt_description:string,likes:number})=>void
}
export type  ArticleTypes={

    id: string;
    urls:{ 
      small:string,
      regular: string;}
    alt_description: string;
    likes: number;
    [key: string]: unknown
}