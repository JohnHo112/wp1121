import { useEffect, useState} from "react";

import { Add as AddIcon, Delete as DeleteIcon} from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList"
import NewListDialog from "@/components/NewListDialog"
import useCards from "@/hooks/useCards";

const Homepage = () => {
	const { lists, fetchLists, fetchCards } = useCards();
	const [newListDialogOpen, setNewListDialogOpen] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

	const handleDeleteMode = () => setDeleteMode(!deleteMode);

	return(
		<>
			<div>
				<Button variant="contained" className="w-50" onClick={() => setNewListDialogOpen(true)}>
					<AddIcon className="mr-2" />
					ADD
				</Button>
				{
					deleteMode ? 
					<Button variant="contained" className="w-50" onClick={handleDeleteMode}>
						<DeleteIcon className="mr-2" />
						DONE
					</Button>
					:	
					<Button variant="contained" className="w-50" onClick={handleDeleteMode}>
						<DeleteIcon className="mr-2" />
						DELETE
					</Button>
				}
			</div>
			<main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
				{
					lists.map((list) => (
						<CardList key={list.id} {...list} deleteMode={deleteMode} setDeleteMode={setDeleteMode}/>
					))
				}
			</main>
			<NewListDialog
				open={newListDialogOpen}
				onClose={() => setNewListDialogOpen(false)}
      />
		</>
	)
}

export default Homepage