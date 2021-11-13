 export default (product, { productVariantId, quantity}) => {
        let item = {
          productVariant: {
                product: {
                    imgPaths: [],
                    brand: {}
                },
                size: {
                    name: ""
                },
                color: {  name: ""}
            }  
        };
        item.quantity = quantity;
        item.unitPrice = product.price;
        item.productVariant.id = productVariantId;
        item.productVariant.product.name = product.name;
        item.productVariant.product.imgPaths = product.imgPaths;
        item.productVariant.product.brand.name = product.brand.name;
        const variant = product.variants.find(x => x.id === productVariantId);
        item.productVariant.size = variant.size;
        item.productVariant.color = variant.color;  

    return item;
}

