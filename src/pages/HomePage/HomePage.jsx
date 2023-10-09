import React from "react";
//components
import { ItemListContainer } from "../../components/ItemListContainer/ItemListContainer";
export const HomePage = ({ addToCart }) => {
  return (
    <>
      <ItemListContainer addToCart={addToCart} />
    </>
  );
};
