'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { Cart, CartItem } from '@/data/types';
import { getProductById } from '@/data/products';
import { CART_STORAGE_KEY } from './constants';

const initialCart: Cart = { items: [], updatedAt: Date.now() };

type Action =
  | { type: 'HYDRATE'; cart: Cart }
  | { type: 'ADD'; productId: string }
  | { type: 'REMOVE'; productId: string }
  | { type: 'INC'; productId: string }
  | { type: 'DEC'; productId: string }
  | { type: 'CLEAR' };

function reducer(state: Cart, action: Action): Cart {
  switch (action.type) {
    case 'HYDRATE':
      return action.cart;
    case 'ADD': {
      const existing = state.items.find((i) => i.productId === action.productId);
      const items = existing
        ? state.items.map((i) =>
            i.productId === action.productId ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { productId: action.productId, quantity: 1 }];
      return { items, updatedAt: Date.now() };
    }
    case 'REMOVE':
      return {
        items: state.items.filter((i) => i.productId !== action.productId),
        updatedAt: Date.now(),
      };
    case 'INC':
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: i.quantity + 1 } : i
        ),
        updatedAt: Date.now(),
      };
    case 'DEC': {
      const items = state.items
        .map((i) =>
          i.productId === action.productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0);
      return { items, updatedAt: Date.now() };
    }
    case 'CLEAR':
      return { items: [], updatedAt: Date.now() };
    default:
      return state;
  }
}

interface CartContextValue {
  cart: Cart;
  hydrated: boolean;
  totalQty: number;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  incrementQty: (productId: string) => void;
  decrementQty: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, initialCart);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Cart>;
        if (parsed && Array.isArray(parsed.items)) {
          const validItems: CartItem[] = parsed.items.filter(
            (i): i is CartItem =>
              typeof i?.productId === 'string' &&
              typeof i?.quantity === 'number' &&
              i.quantity > 0 &&
              !!getProductById(i.productId)
          );
          dispatch({
            type: 'HYDRATE',
            cart: { items: validItems, updatedAt: parsed.updatedAt ?? Date.now() },
          });
        }
      }
    } catch {
      // localStorage tidak available atau JSON corrupt — biarkan cart kosong
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // private mode atau quota exceeded — abaikan
    }
  }, [cart, hydrated]);

  const addItem = useCallback((id: string) => {
    if (!getProductById(id)) return;
    dispatch({ type: 'ADD', productId: id });
  }, []);
  const removeItem = useCallback(
    (id: string) => dispatch({ type: 'REMOVE', productId: id }),
    []
  );
  const incrementQty = useCallback(
    (id: string) => dispatch({ type: 'INC', productId: id }),
    []
  );
  const decrementQty = useCallback(
    (id: string) => dispatch({ type: 'DEC', productId: id }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const totalQty = useMemo(
    () => cart.items.reduce((sum, i) => sum + i.quantity, 0),
    [cart.items]
  );

  const value: CartContextValue = {
    cart,
    hydrated,
    totalQty,
    addItem,
    removeItem,
    incrementQty,
    decrementQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
