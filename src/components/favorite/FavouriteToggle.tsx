import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { FavouritesContext } from '../../context/FavouritesContext';
import { Bill } from '../../types/Bill';

export function FavouriteToggle({ bill }: { bill: Bill }): React.ReactElement | null {
  const context = useContext(FavouritesContext);
  if (!context) return null;
  const { isFavourite, toggleFavourite } = context;

  function handleClick(): void {
    toggleFavourite(bill);
  }

  const isFav = isFavourite(bill.id);

  return (
    <IconButton onClick={handleClick} aria-label="favourite">
      {isFav ? <StarIcon color="primary" /> : <StarBorderIcon />}
    </IconButton>
  );
}
