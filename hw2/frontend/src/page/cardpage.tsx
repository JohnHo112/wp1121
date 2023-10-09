import { useContext, useState, useRef, useEffect } from "react";

import { Add as AddIcon, Delete as DeleteIcon} from "@mui/icons-material";
import { Button } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { selectedListContext } from "@/App"
import useCards from "@/hooks/useCards";
import Card from "@/components/Card"
import CardDialog from "@/components/CardDialog";
import DeleteCardDialog from "@/components/DeleteCardDialog";
import { updateList } from "@/utils/client";
import { CardProps } from "@/components/Card";

export default function Cardpage(){
  const { selectedList, setSelectedList } = useContext(selectedListContext)
  const { fetchLists, fetchCards } = useCards();
  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [openDeleteCardDialog, setOpenDeleteCardDialog] = useState(false);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [list, setList] = useState<CardProps[]>([]);

  useEffect(() => {
    setList(selectedList.cards);
  }, [list]);

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.currentTarget;
    console.log(id)
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  const namesFromIsCheck = isCheck.map(id => {
    const card = list.find(item => item.id === id);
    return card ? card.name : '';
  });


  const handleUpdateName = async () => {
    if (!nameInputRef.current) return;

    const newName = nameInputRef.current.value;
    if (newName !== selectedList.name) {
      try {
        await updateList(selectedList.id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setSelectedList({id: selectedList.id, name: newName, description: selectedList.description, cards: selectedList.cards})
    setEditingName(false);
  };

  const handleUpdateDescription = async () => {
    if (!descriptionInputRef.current) return;

    const newdescriptio = descriptionInputRef.current.value;
    if (newdescriptio !== selectedList.description) {
      try {
        await updateList(selectedList.id, { description: newdescriptio });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setSelectedList({id: selectedList.id, name: selectedList.name, description: newdescriptio, cards: selectedList.cards})
    setEditingDescription(false);
  };
  

  return(
    <>
      {editingName ? (
        <ClickAwayListener onClickAway={handleUpdateName}>
          <Input
            autoFocus
            defaultValue={selectedList.name}
            className="grow"
            placeholder="Enter a new name for this list..."
            sx={{ fontSize: "2rem" }}
            inputRef={nameInputRef}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => setEditingName(true)}
          className="w-full rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="text-start" variant="h4">
            Name: {selectedList.name}
          </Typography>
        </button>
      )}
      {editingDescription ? (
        <ClickAwayListener onClickAway={handleUpdateDescription}>
          <Input
            autoFocus
            defaultValue={selectedList.description}
            className="grow"
            placeholder="Enter a new description for this list..."
            sx={{ fontSize: "2rem" }}
            inputRef={descriptionInputRef}
          />
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => setEditingDescription(true)}
          className="w-full rounded-md p-2 hover:bg-white/10"
        >
          <Typography className="text-start" variant="h4">
            Description:{selectedList.description}
          </Typography>
        </button>
      )}

      <br/>

      <Paper className="flex flex-col p-2" elevation={24}>
        <Grid container spacing={10} alignItems="center">
          <Grid item>
            <input type="checkbox" onChange={handleSelectAll} checked={isCheckAll}></input>
          </Grid>
          <Grid item>
            <span>name</span>
          </Grid>
          <Grid item>
            <span>singer</span>
          </Grid>
          <Grid item>
            <span>link</span>
          </Grid>
        </Grid>
      </Paper>
      <br/>

      <div className="flex flex-col gap-4">
        {
          selectedList.cards.map((card) => (
            <Card 
              key={card.id} 
              id={card.id} 
              name={card.name} 
              singer={card.singer} 
              link={card.link} 
              listId={card.listId} 
              handleClick={handleClick}
              isChecked={isCheck.includes(card.id)}/>
          ))
        }
      </div>
      <div>
				<Button variant="contained" className="w-50" onClick={() => setOpenNewCardDialog(true)}>
					<AddIcon className="mr-2" />
					Add
				</Button>
				<Button variant="contained" className="w-50" onClick={() => setOpenDeleteCardDialog(true)}>
					<DeleteIcon className="mr-2" />
					Delete
				</Button>
			</div>

      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={selectedList.id}
      />
      <DeleteCardDialog
        open={openDeleteCardDialog}
        onClose={() => setOpenDeleteCardDialog(false)}
        deleteNames={namesFromIsCheck}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </>
	)
}