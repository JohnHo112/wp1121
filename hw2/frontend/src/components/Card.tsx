import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import CardDialog from "@/components/CardDialog";

export type CardProps = {
  id: string;
  name: string;
  singer: string;
  link: string;
  listId: string
}


const Card = ({ id, name, singer, link, listId }: CardProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleClickOpen}>
        <Paper className="flex w-full flex-col p-2" elevation={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControlLabel
                control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                label=""
              />
            </Grid>
            <Grid item>
              <span>name: {name}</span>
            </Grid>
            <Grid item>
              <span>singer: {singer}</span>
            </Grid>
            <Grid item>
              <span>link: {link}</span>
            </Grid>
          </Grid>
        </Paper>
      </button>
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