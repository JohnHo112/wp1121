import { createContext, useState } from "react";

import HeaderBar from "@/components/HeaderBar";
import {SelectedListProps} from "@/components/CardList"

import Homepage from "@/page/homepage";
import Cardpage from "@/page/cardpage";

export type pageControlContextType = {
  cardPageOpen: boolean,
  setCardPageOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export const pageControlContext = createContext<pageControlContextType>({
  cardPageOpen: false,
  setCardPageOpen: ()=>{},
})

export type selectedListContextType = {
  selectedList: SelectedListProps,
  setSelectedList: React.Dispatch<React.SetStateAction<SelectedListProps>>
}

export const selectedListContext = createContext<selectedListContextType>({
  selectedList: {
    id: "",
    name: "",
    description: "",
    cards: [],
  },
  setSelectedList: ()=>{},
})

function App() {
  const [cardPageOpen, setCardPageOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<SelectedListProps>({
    id: "",
    name: "",
    description: "",
    cards: [],
  })

  return (
    <>
      <pageControlContext.Provider value={{cardPageOpen, setCardPageOpen}}>
        <HeaderBar />
          <selectedListContext.Provider value={{selectedList, setSelectedList}}>
            {
              cardPageOpen ? 
              <Cardpage />
              :
              <Homepage/>
            }  
          </selectedListContext.Provider>
      </pageControlContext.Provider>
    </>
  );
}

export default App;
