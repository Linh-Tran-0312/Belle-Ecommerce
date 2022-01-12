import { IVariant} from "../interfaces";
import { ProductVariant } from "../models";

export class ProductMapper {

  public static toVariantDetails(variant: ProductVariant): IvariantBasicProps {
      return {
        id:variant.id,
        status: variant.status,
        paymentMethod: variant.paymentMethod,
        paymentCheck: variant.paymentCheck,
        address: variant.address,
        total: variant.total,
        shipping: variant.shipping!,
        variantAt: variant.variantAt,
      }
  }
}