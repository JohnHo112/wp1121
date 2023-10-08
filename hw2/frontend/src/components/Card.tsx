import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export type CardProps = {
  name: string;
  singer: string;
  link: string;
}


const Card = ({ name, singer, link }: CardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
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
  );
};

export default Card;