import React, { createContext, useState } from 'react';
import { Bill } from '../types/Bill';

interface FavouritesContextType {
  favourites: Bill[];
  toggleFavourite: (bill: Bill) => void;
  isFavourite: (id: string) => boolean;
}

export const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<Bill[]>([]);

  function toggleFavourite(bill: Bill): void {
    setFavourites(prev => {
      const exists = prev.find(b => b.id === bill.id);
      if (exists) {
        console.log(`Mock: Removing favourite for bill ${bill.id}`);
        return prev.filter(b => b.id !== bill.id);
      } else {
        console.log(`Mock: Adding favourite for bill ${bill.id}`);
        return [...prev, bill];
      }
    });
  }

  function isFavourite(id: string): boolean {
    return favourites.some(b => b.id === id);
  }

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
