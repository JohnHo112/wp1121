import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import CardDialog from "@/components/CardDialog";

export type CardProps = {
  id: string;
  name: string;
  singer: string;
  link: string;
  listId: string;
}

export type CardPropsI = {
  id: string;
  name: string;
  singer: string;
  link: string;
  listId: string;
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const Card = ({ id, name, singer, link, listId, handleClick, isChecked }: CardPropsI) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <>
        <Paper className="flex w-full flex-col p-2" elevation={6}>
          <Grid container spacing={5} alignItems="center">
            <Grid item>
              <input type="checkbox" id={id} onChange={handleClick} checked={isChecked}></input>
            </Grid>
            <Grid item>
              <button onClick={handleClickOpen}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    {name}
                  </Grid>
                  <Grid item>
                    {singer}
                  </Grid>
                  <Grid item>
                    {link}
                  </Grid>
                </Grid>
              </button>
            </Grid>
          </Grid>
        </Paper>
      <CardDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        listId={listId}
        cardId={id}
        name={name}
        singer={singer}
        link={link}
      />
    </>
  );
};

export default Card;