 export default (product, { productVariantId, quantity}) => {
     console.log(product)
        let item = {
            product: {}
        };
        item.quantity = quantity;
        item.unitPrice = product.price;
        item.productVariantId = productVariantId;
        item.product.name = product.name;
        item.product.imgPaths = product.imgPaths;
        item.product.brand = product.brand.name;
        const variant = product.variants.find(x => x.id === productVariantId);
        item.product.size = variant.size.name;
        item.product.color = variant.color.name;  

    return item;
}

