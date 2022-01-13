import { Product, ProductVariant } from "../models";
export interface IProductSearchProps {
  id : number,
  createdAt : Date,
  sku: string,
  name: string,
  overallReview: number,
  price: number,
  imgPaths:string[],
  brand: {
    id: number;
    name: string;
  },
  category: {
    id: number;
    name: string;
  }
}
export interface IVariantInfo {
  id: number;
  productId: number;
  quantity: number;
  color: {
    id: number;
    name: string;
    code: string;
  },
  size: {
    id: number;
    name: string;
  }
}
export interface IProductInfo extends IProductSearchProps {
  summary: string;
  variants: IVariantInfo[]
}

export class ProductMapper {

  public static toVariantInfo(variant: ProductVariant): IVariantInfo {
    return {
      id: variant.id,
      productId: variant.productId,
      quantity: variant.quantity,
      color: {
        id: variant.colorId,
        name: variant.color.name,
        code: variant.color.code
      },
      size: {
        id: variant.sizeId,
        name: variant.size.name
      }
    }
  }
  public static toProductSearchProps(product: Product): IProductSearchProps {
    return {
      id : product.id,
      createdAt : product.createdAt,
      sku: product.sku,
      name: product.name,
      overallReview: product.overallReview,
      price: product.price,
      imgPaths: product.imgPaths,
      brand: {
        id: product.brand.id,
        name: product.brand.name
      },
      category: {
        id: product.category.id,
        name: product.category.name
      }
    }
  }
  public static toProductInfo(product: Product): IProductInfo {
    const result: IProductInfo = {
      id : product.id,
      createdAt : product.createdAt,
      sku: product.sku,
      name: product.name,
      overallReview: product.overallReview,
      price: product.price,
      imgPaths: product.imgPaths,
      brand: {
        id: product.brandId,
        name: product.brand.name
      },
      category: {
        id: product.categoryId,
        name: product.category.name
      },
      summary: product.summary,
      variants: []
    };
    product.variants.forEach(variant => {
      result.variants.push(this.toVariantInfo(variant))
    })

    return result
  }
}