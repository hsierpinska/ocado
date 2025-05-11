import { createContext, useContext, useState } from 'react'

type ShoppingCardProviderProps = {
  children: React.ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCardProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  
  

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const increaseCartQuantity = (id: number) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        }
        )
      }
    })
  };

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      const item = currItems.find(item => item.id === id)

      if (item?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => 
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => currItems.filter(item => item.id !== id))
  }



  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
