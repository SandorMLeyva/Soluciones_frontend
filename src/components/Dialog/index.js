import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function SimpleDialog(props) {
    const { open, title, ChildComponent, childProps } = props;
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <ChildComponent {...childProps} />
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool.isRequired,
    ChildComponent: PropTypes.any.isRequired,
    childProps: PropTypes.any.isRequired
};

SimpleDialog.defaultProps = {
    childProps: [],
}