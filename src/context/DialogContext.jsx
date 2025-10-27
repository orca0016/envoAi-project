import { createContext } from "react";

export const DialogContext = createContext({
  isDialogOpen: false,
  currentDataId: -1,
  setCurrentDataId: ()=>{},
  setIsDialogOpen: () => {},
});
