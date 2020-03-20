import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import PropTypes from "prop-types";


const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 300,
        minHeight: 250,
        maxHeight: 400,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));


export default function TransferList(props) {
    const { values, onChange } = props;
    const classes = useStyles();
    const [left, setLeft] = React.useState(values);
    const [right, setRight] = React.useState([]);

    const handleIncrement = value => {
        let rindex = right.indexOf(right.find(e => e.id === value.id));
        let lindex = left.indexOf(left.find(e => e.id === value.id));
        if (left[lindex].count >= 1) {

            left[lindex].count--;
            setLeft([...left]);
            if (rindex > -1) {
                right[rindex].count++;
                setRight([...right]);
            }
            else {
                setRight(right.concat({
                    ...value,
                    count: 1
                }));
            }
        }

    };

    const handleDecrement = value => {
        let rindex = right.indexOf(right.find(e => e.id === value.id));
        let lindex = left.indexOf(left.find(e => e.id === value.id));
        if (right[rindex].count > 1) {
            right[rindex].count--;
            setRight([...right]);
            if (lindex > -1) {
                left[lindex].count++;
                setLeft([...left]);
            }
            else {
                setLeft(left.concat({
                    ...value,
                    count: 1
                }));
            }
        }
        else {
            left[lindex].count++;
            right.splice(rindex, 1);
            setRight([...right]);
        }

    };

    const customList = (items, rightList) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map(value => {
                    const labelId = `transfer-list-item-${value.id}-label`;
                    return (
                        <ListItem key={value.id} role="listitem">
                            <ListItemText id={labelId} primary={value.name} />
                            <ListItemIcon>
                                <Chip label={value.count} component="a" clickable variant="outlined" onClick={() => rightList ? handleDecrement(value) : handleIncrement(value)} />
                            </ListItemIcon>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left, false)}</Grid>
            <Grid item />
            <Grid item>{customList(right, true)}</Grid>
        </Grid>
    );
}



TransferList.propTypes = {
    values: PropTypes.arrayOf(PropTypes.objectOf({
        id: PropTypes.number,
        name: PropTypes.string,
        count: PropTypes.number
    })),
    onChange: PropTypes.func
};
TransferList.defaultProps = {
    values: []
};