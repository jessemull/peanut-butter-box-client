import { createContext, useEffect, useState } from 'react'
import config from '../config'

const { cartItem } = config

interface Product {
  duration: string
  productId: string;
  quantity: number;
}

interface CartProviderProps {
  children: Array<JSX.Element> | JSX.Element
}

export const CartContext = createContext({
  addProduct: (product: Product): void => {}, // eslint-disable-line
  clearProducts: (): void => {}, // eslint-disable-line
  products: [] as Array<Product>,
  removeProduct: (product: Product): void => {}, // eslint-disable-line
})

const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem(cartItem) || '[]') as Array<Product>)
  }, [])

  const addProduct = (product: Product): void => {
    const next = [...products, product]
    localStorage.setItem(cartItem, JSON.stringify(next))
    setProducts(next)
  }

  const clearProducts = () => {
    localStorage.setItem(cartItem, JSON.stringify([]))
    setProducts([])
  }

  const removeProduct = (product: Product): void => {
    const filtered = products.filter(prd => prd.productId !== product.productId && prd.duration !== product.productId)
    localStorage.setItem(cartItem, JSON.stringify(filtered))
    setProducts(filtered)
  }

  return (
    <CartContext.Provider value={{
      addProduct,
      clearProducts,
      products,
      removeProduct
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
