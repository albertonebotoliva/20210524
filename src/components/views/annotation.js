import React, { useReducer } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBox from './../layout/errorBox'
import Drawer from './../layout/drawer';
import Canvas from './../layout/canvas';
import { reducer, initialState } from '../../stores';

const useStyles = makeStyles({
    content: {
        background: "white",
        borderRight: "1px solid #ccc",
        height: "100vh"
    },
    centered: {
        textAlign: "center"
    }
});

const ErrorFallback = props => <ErrorBox {...props} />

const Layout = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => { }}
        >
            <Grid container spacing={0}>
                <Grid item xs={9} className={classes.content} >
                    <Canvas
                        {...state}
                        dispatch={dispatch}
                    />
                </Grid>
                <Grid item xs={3} >
                    <Drawer
                        {...state}
                        dispatch={dispatch}
                    />
                </Grid>
            </Grid>
        </ErrorBoundary>
    )
}

Layout.propTypes = {}

Layout.defaultProps = {}

export default Layout;
