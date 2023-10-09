import { useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { createCard, deleteCard, updateCard } from "@/utils/client";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewCardDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  listId: string;
};

type EditCardDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  listId: string;
  cardId: string;
  name: string;
  singer: string;
  link: string;
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function CardDialog(props: CardDialogProps) {
  const { variant, open, onClose, listId } = props;
  const name = variant === "edit" ? props.name : "";
  const singer = variant === "edit" ? props.singer : "";
  const link = variant === "edit" ? props.link : "";

  const [editingName, setEditingName] = useState(variant === "new");
  const [editingSinger, setEditingSinger] = useState(variant === "new");
  const [editingLink, setEditingLink] = useState(variant === "new",);

  const [newName, setNewName] = useState(name);
  const [newSinger, setNewSinger] = useState(singer);
  const [newLink, setNewLink] = useState(link);
  const [newListId, setNewListId] = useState(listId);

  const { lists, fetchCards } = useCards();

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (variant === "new") {
        await createCard({
          name: newName,
          singer: newSinger,
          link: newLink,
          list_id: listId,
        });
      } else {
        if (
          newName === name &&
          newSinger === singer &&
          newLink === link &&
          newListId === listId
        ) {
          return;
        }
        
        await updateCard(props.cardId, {
          name: newName,
          singer: newSinger,
          link: newLink,
          list_id: listId,
        });
      }
      fetchCards();
    } catch (error) {
      alert("Error: Failed to save card");
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (variant !== "edit") {
      return;
    }
    try {
      await deleteCard(props.cardId);
      fetchCards();
    } catch (error) {
      alert("Error: Failed to delete card");
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        <Select
          value={newListId}
          onChange={(e) => setNewListId(e.target.value)}
        >
          {lists.map((list) => (
            <MenuItem value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select>
        {variant === "edit" && (
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="w-[600px]">
        {editingName ? (
            <ClickAwayListener
              onClickAway={() => {
                if (variant === "edit") {
                  setEditingName(false);
                }
              }}
            >
              <Input
                autoFocus
                defaultValue={name}
                onChange={(e) => setNewName(e.target.value)}
                className="grow"
                placeholder="Enter a name for this card..."
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start">{newName}</Typography>
            </button>
        )}
        <br/>
        {editingSinger ? (
            <ClickAwayListener
              onClickAway={() => {
                if (variant === "edit") {
                  setEditingSinger(false);
                }
              }}
            >
              <Input
                autoFocus
                defaultValue={name}
                onChange={(e) => setNewSinger(e.target.value)}
                className="grow"
                placeholder="Enter a singer for this card..."
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEditingSinger(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start">{newSinger}</Typography>
            </button>
        )}
        <br/>
        {editingLink ? (
            <ClickAwayListener
              onClickAway={() => {
                if (variant === "edit") {
                  setEditingLink(false);
                }
              }}
            >
              <Input
                autoFocus
                defaultValue={name}
                onChange={(e) => setNewLink(e.target.value)}
                className="grow"
                placeholder="Enter a link for this card..."
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEditingLink(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start">{newLink}</Typography>
            </button>
        )}
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
