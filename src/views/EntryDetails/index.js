import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from "@apollo/react-hooks";
import { GET_WORKSHOP_ENTRY_BY_ID } from "Query";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    dividerInset: {
        margin: `5px 0 0 ${theme.spacing(9)}px`,
    },
    description: {
        marginLeft: '30px'
    }
}));



export default function RoadEntryDetail(props) {
    const classes = useStyles();
    const { match: { params: { id } } } = props;

    const { loading, error, data } = useQuery(GET_WORKSHOP_ENTRY_BY_ID, {
        variables: { id: id }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>No se encontro esta entrada</p>;

    const { entry } = data;

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemText primary={entry.client.name} secondary={entry.phoneNumber} />
            </ListItem>
            <div className={classes.description}><h6>Condiciones de entrada: </h6><p>{entry.entryConditions}</p></div>
            <ListItem>
                <ListItemText primary="Dirección" secondary={entry.address} />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText primary={entry.hardware.type} secondary={`Marca: ${entry.hardware.brand}`} />
                <ListItemText secondary={`Modelo: ${entry.hardware.model}`} />
            </ListItem>
            <Divider component="li" variant="inset" />

            <ListItem>
                <ListItemText primary={"Agregado por"} secondary={entry.user ? entry.user.username : ""} />
            </ListItem>
        </List>
    );
}

