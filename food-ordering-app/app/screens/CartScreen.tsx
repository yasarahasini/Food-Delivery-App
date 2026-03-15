import { createContext, useState, ReactNode } from "react";

export type Food = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type CartContextType = {
  cart: Food[];
  addToCart: (item: Food) => void;
};

export const CartContext = createContext<CartContextType>(null!);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Food[]>([]);

  const addToCart = (item: Food) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
