import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import useCards from "@/hooks/useCards";
import {deleteCard} from "@/utils/client";

type DeleteCardDialogProps = {
  open: boolean;
  onClose: () => void;
  deleteNames: string[];
  isCheck: string[];
  setIsCheck: React.Dispatch<React.SetStateAction<string[]>>;
};

const DeleteCardDialog = ({ open, onClose, deleteNames, isCheck, setIsCheck}: DeleteCardDialogProps) => {
  const { fetchCards } = useCards();

  const handleDeleteCards = async () => {
    try {
      isCheck.forEach(async id => {
        await deleteCard(id);
      });
      setIsCheck([])
      fetchCards();
    } catch (error) {
      alert("Error: Failed to delete card");
    } finally {
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ARE YOU SURE?</DialogTitle>
      <DialogContent>
        {
          deleteNames.map((deleteName)=>
            (<p>{deleteName}</p>)
          )
        }
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCards}>DELETE</Button>
        <Button onClick={onClose}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteCardDialog;
