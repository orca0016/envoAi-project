import { useState } from "react";
import { DataContext } from "../context/DataContext";

const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([
    { id: 1, name: "Item 1", price: 10, quantity: 1 },
    { id: 2, name: "Item 2", price: 20, quantity: 2 },
    { id: 3, name: "Item 3", price: 15, quantity: 1 },
  ]);
  return (
    <>
      <DataContext.Provider
        value={{
          cart , setCart
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataProvider;
