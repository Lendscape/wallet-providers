import React from 'react'
import { Grid } from '@mui/material';

// styles
import useStyles from '../assets/styles/notFound-style'

// images
import notFoundImage from '../assets/imgs/404.png'

export default function NotFound() {

    const styles = useStyles();

    return (
        <Grid>
            <img className={styles.notFoundImage} src={notFoundImage} alt="404 page not found" />
        </Grid>
    )
}
