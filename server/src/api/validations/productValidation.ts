export class ValidateNameModel {
    /**
     * @pattern ^(?!\s*$).+ Blog category must not be empty
     */
    name: string;
    constructor(name: string) {
        this.name = name
    }
}
export class ValidateBrandModel {
    /**
   * @pattern ^(?!\s*$).+ Brand must not be empty
   */
    name: string;
    imgPath?: string;
    constructor(name: string, imgPath: string) {
        this.name = name;
        this.imgPath = imgPath
    }
}

export class ValidateCategoryModel {
    /**
    * @pattern ^(?!\s*$).+ Category must not be empty
    */
    name: string;
    imgPath?: string;
    constructor(name: string, imgPath: string) {
        this.name = name;
        this.imgPath = imgPath
    }
}

export class ValidateColorModel  {
    /**
    * @pattern ^(?!\s*$).+ Category must not be empty
    */
     name: string;
    /**
     * @maxLength 7
     * @pattern ^[#]\w{6} Color code must be HEX format
     */
    code: string;
    constructor(name: string, code: string) {
        this.name = name;
        this.code = code
    }
}

export class ValidateSizeModel  {
    /**
    * @pattern ^(?!\s*$).+ Size must not be empty
    */
     name: string;
    constructor(name: string) {
        this.name = name;
    }
}

export class ValidateProductModel {
    /**
    * @pattern ^(?!\s*$).+ Product name must not be empty
    */
    name: string;
    sku?: string;
    /**
     * @isInt Category id must be an integer
     * @minimum 0 Category id value must be at least 0
     */
    categoryId: number;
    /**
     * @isInt Brand id must be an integer
     * @minimum 0 Brand id value must be at least 0
     */
    brandId: number;
    /**
    * @isArray Image list must be an array
    * @minItems 0
    */
    imgPaths?: string[];
    summary?: string;
    description?: string;
    /**
     * @minimum 0 Price value must be at least 0
     */
    price: number;

    constructor(
        categoryId: number,
        brandId: number,
        summary: string,
        price: number,
        name: string,
        sku?: string,
        description?: string,
        imgPaths?: Array<string>,
    ) {
        this.name = name;
        this.sku = sku;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.imgPaths = imgPaths;
        this.summary = summary;
        this.description = description;
        this.price = price;
    }

}
export class ValidateVariantUpdateModel {
    /**
     * @isInt Size id must be an integer
     * @minimum 0 Size id value must be at least 0
    */
    sizeId: number;
    /**
     * @isInt Color id must be an integer
     * @minimum 0 Color id value must be at least 0
    */
    colorId: number;
    /**
     * @isInt Quantity must be an integer
     * @minimum 0 Quantity value must be at least 0
    */
    quantity: number;

    constructor(sizeId: number, colorId: number, quantity: number) {
        this.sizeId = sizeId;
        this.colorId = colorId;
        this.quantity = quantity;
    }
}
export class ValidateVariantCreateModel extends ValidateVariantUpdateModel {
    /**
     * @isInt Product id must be an integer
     * @minimum 0 Product id value must be at least 0
    */
    productId: number;

    constructor(productId: number, sizeId: number, colorId: number, quantity: number) {
        super(sizeId, colorId, quantity)
        this.productId = productId;
    }
}