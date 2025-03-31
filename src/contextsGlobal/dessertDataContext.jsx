import { createContext, useContext, useState, useEffect } from "react";
import dessertData from "./dessertData";
const dessertDataContextContext = createContext();
export const DessertDataContext = ({ children }) => {
 const [filteredList, setFilteredList] = useState([]);
 useEffect(() => {
  // Load data from dessertData and initialize filteredList
  if (dessertData && Array.isArray(dessertData)) {
   // Create a copy of dessertsData to initialize filteredList
   setFilteredList([...dessertData]);
  } else {
   console.warn("dessertsData is not an array or is undefined. Check your data source.");
   // Optionally initialize with an empty array or handle the error differently
   setFilteredList([]);
  }
 }, []); // useEffect runs once on component mount to initialize data

 //start of return
 return (
  <dessertDataContextContext.Provider value={{
        filteredList, // This will be an array of dessert objects
        setFilteredList
      }}>
   {children}
  </dessertDataContextContext.Provider>
 );
 //end of return

};

export const useDessertDataContext = () => useContext(dessertDataContextContext);