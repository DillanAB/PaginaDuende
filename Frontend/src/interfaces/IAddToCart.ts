import { Product } from "src/shared/models/Product"

export interface IAddToCart {
    productId: string
    quantity: number
    // price: number
    cartId: string
}

// export interface IAddToCartInput {
//     product: Product
//     quantity: number
//     cartId: string
// }