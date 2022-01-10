import { IOrderDetailCreateProps } from "../models";

export class ValidateOrderDetailModel {
    /**
     * @isInt
     * @minimum 0
     */
    orderId?: number;
    /**
     * @isInt
     * @minimum 0
     */
    productVariantId: number;
    /**
     * @isInt
     * @minimum 0
     */
    quantity: number;
    /**
     * @minimum 0
     */
    unitPrice: number;

    constructor(variantId: number, quantity: number, unitPrice: number, orderId?: number) {
        this.productVariantId = variantId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.orderId = orderId
    }
}
export class ValidateOrderUpdateModel {
    details: ValidateOrderDetailModel[];
    constructor(details: ValidateOrderDetailModel[]) {
        this.details = details;
    }
}
export class ValidateOrderCreateModel extends ValidateOrderUpdateModel {
    /**
     * @isInt
     * @minimum 0
     */
    userId: number;

    constructor(userId: number, details: ValidateOrderDetailModel[]) {
        super(details)
        this.userId = userId;
 
    }
}

export class ValidateUpdateQuantityModel {
    /**
     * @isInt
     * @minimum 0
     */
    quantity: number;

    constructor(quantity: number) {
        this.quantity = quantity
    }
}
