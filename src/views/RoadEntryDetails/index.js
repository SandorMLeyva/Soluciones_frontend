import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ROAD_ENTRY_BY_ID } from "Query";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import RegularButton from "components/CustomButtons/Button";
import FormSelectUser from "containers/FormSelectUser";
import Dialog from 'components/Dialog';


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

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const { loading, error, data } = useQuery(GET_ROAD_ENTRY_BY_ID, {
        variables: { id: id }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>No se encontro esta entrada</p>;

    const { roadentry } = data;

    return (
        <React.Fragment>
            <List className={classes.root}>
                <ListItem>
                    <ListItemText primary={roadentry.client.name} secondary={roadentry.phoneNumber} />
                </ListItem>
                <div className={classes.description}><h6>Opinión sobre el cliente: </h6><p>{roadentry.customerObservation}</p></div>
                <ListItem>
                    <ListItemText primary="Dirección" secondary={roadentry.address} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary={roadentry.hardware.type} secondary={`Marca: ${roadentry.hardware.brand}`} />
                    <ListItemText secondary={`Modelo: ${roadentry.hardware.model}`} />
                </ListItem>
                <Divider component="li" variant="inset" />
                <ListItem>
                    {roadentry.user ? <ListItemText primary={"Técnico"} secondary={roadentry.user.username} /> : <RegularButton onClick={() => setOpenDialog(true)}>Agregar Técnico</RegularButton>}
                </ListItem>

            </List>
            <Dialog
                open={openDialog}
                handleClose={handleCloseDialog}
                title={"Seleccionar técnico"}
                ChildComponent={FormSelectUser}
                childProps={{
                    onCancel: handleCloseDialog
                    
                }}
            />
        </React.Fragment>
    );
}

