import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


export default function SimpleDialog(props) {
    const { open, title, ChildComponent, childProps, handleClose, fullScreen } = props;

    const classes = useStyles();


    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} fullScreen={fullScreen} >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <ChildComponent {...childProps} />
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool.isRequired,
    ChildComponent: PropTypes.any.isRequired,
    childProps: PropTypes.any.isRequired,
    handleClose: PropTypes.func,
    fullScreen: PropTypes.bool,
};

SimpleDialog.defaultProps = {
    childProps: [],
    title: "",
    fullScreen: false
}