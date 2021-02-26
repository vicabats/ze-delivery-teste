import gql from "graphql-tag";

export const CATEGORYLIST = gql`
query allCategoriesSearch {
  allCategory{
    title
    id
  }
}
`

export interface Category {
  id: number;
  title: string;
}

export enum CategoryName {
  Beer = 'Cervejas',
  Distilled = 'Destilados',
  Wine = 'Vinhos',
  Alcoholess = 'Não Alcóolicos',
  Snacks = 'Para matar a fome',
  Others = 'Outros'
}