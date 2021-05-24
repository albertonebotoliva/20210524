import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    error: {
        background: "white",
        color: "red",
        height: "100vh",
        textAlign: "center"
    }
});

const ErrorBox = ({ error, resetErrorBoundary }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} className={classes.error} >
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
            </Grid>
        </Grid>
    )
}

ErrorBox.propTypes = {
    error: PropTypes.object,
    resetErrorBoundary: PropTypes.func.isRequired
};

ErrorBox.defaultProps = {
    error: {},
    resetErrorBoundary: () => { }
};

export default ErrorBox;
