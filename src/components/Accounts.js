import React from 'react'
import { Grid } from "@mui/material"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Accounts = () => {
  const wallets = useSelector((state) => {
    console.log(state.wallets)
    return state.wallets.value
  });

  const walletItems = wallets.map((w, i) => 
    <Grid item xs={12} key={i}>
      <Item>{w.type} is connected</Item>
      <Item>{w.addresses}</Item>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Item>Accounts</Item>
      </Grid>
      {walletItems}
    </Grid>
  )
}

export default Accounts