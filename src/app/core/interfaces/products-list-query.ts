import gql from "graphql-tag";

export const PRODUCTLIST = gql`
query poc($id: ID!, $categoryId: Int, $search: String){
  poc(id: $id) {
    id
    products(categoryId: $categoryId, search: $search) {
      id
      title
      rgb
      images {
        url
      }
      productVariants {
        availableDate
        productVariantId
        price
        inventoryItemId
        shortDescription
        title
        published
        volume
        volumeUnit
        description
        subtitle
        components {
          id
          productVariantId
          productVariant {
            id
            title
            description
            shortDescription
          }
        }
      }
    }
  }
}`

export interface Product {
  id: number;
  images: ProductImage[];
  productVariants: ProductVariants;
  title: string;
}

export interface ProductImage {
  url: string;
}

export interface ProductVariants {
  price: number;
  title: string;
  subtitle: string
}
