
import { PaymentMethod, Status } from "../models";
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
export class ValidateOrderStatusModel {
    paymentMethod!: PaymentMethod;
    paymentCheck!: boolean;
    status!: Status 
}
export class ValidateOrderPlacementModel{
     /**
    * @pattern ^(?!\s*$).+ Address must not be empty
    */
    address: string;
    paymentMethod: PaymentMethod;
    paymentCheck?: boolean;
    note?: string;
    shipping?: number;

    constructor(address: string, method: PaymentMethod, check?: boolean, note?: string, shipping?: number) {
        this.address = address;
        this.paymentCheck = check;
        this.paymentMethod = method;
        this.note = note;
        this.shipping = shipping;
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
     */
    quantity: number;

    constructor(quantity: number) {
        this.quantity = quantity
    }
}
