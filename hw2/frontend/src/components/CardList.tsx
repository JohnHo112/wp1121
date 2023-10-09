import { useContext } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import useCards from "@/hooks/useCards";
import type { CardProps } from "./Card";
import { pageControlContext, selectedListContext } from "@/App"
import { deleteList } from "@/utils/client";

export type CardListProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
};

export type CardListPropsI = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
  deleteMode: boolean;
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>
};


export type SelectedListProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
}


const CardList = ({id, name, description, cards, deleteMode, setDeleteMode}: CardListPropsI) => {
  const { setCardPageOpen } = useContext(pageControlContext)
  const { setSelectedList } = useContext(selectedListContext)
  const { fetchLists } = useCards();

  const handleIconButtonClick = () => {
    const selectedList: SelectedListProps = {
      id: id,
      name: name,
      description: description,
      cards: cards,
    }
    setSelectedList(selectedList);
    setCardPageOpen(true);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deleteList(id);
      fetchLists();
      console.log("delete list~")
    } catch (error) {
      alert("Error: Failed to delete list");
    }
    setDeleteMode(false)
  };

  return (
    <>
      <Paper className="w-100 p-6" sx={{ position: "relative" }}>
        <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleIconButtonClick}
        >
          <div className="flex gap-4">
            Name: {name}
            <br/>
            num of songs: {cards.length}
            <br/>
            description: {description}
            <br/>
            
          </div>
        </IconButton>
        {deleteMode && (<IconButton
          color="error"
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDeleteButtonClick}
        >
          <DeleteIcon />
        </IconButton>)}
      </Paper>
    </>
  );
}

export default CardList;
