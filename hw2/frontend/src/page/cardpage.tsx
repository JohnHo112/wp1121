import { useContext, useState, useRef } from "react";

import { Add as AddIcon, Delete as DeleteIcon} from "@mui/icons-material";
import { Button } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { selectedListContext } from "@/App"
import useCards from "@/hooks/useCards";
import Card from "@/components/Card"
import CardDialog from "@/components/CardDialog";
import { updateList } from "@/utils/client";

export default function Cardpage(){
  const { selectedList, setSelectedList } = useContext(selectedListContext)
  const { fetchLists } = useCards();
  const [isChecked, setIsChecked] = useState(false);
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

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
      <Paper className="flex flex-col p-2" elevation={50}>
        <Grid container spacing={5} alignItems="center">
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
              label=""
            />
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
        <Card name="123" singer="456" link="798" />
        <Card name="abc" singer="def" link="ghi" />
      </div>
      <div>
				<Button variant="contained" className="w-50" onClick={() => setOpenNewCardDialog(true)}>
					<AddIcon className="mr-2" />
					Add
				</Button>
				<Button variant="contained" className="w-50">
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
    </>
	)
}