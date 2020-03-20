import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_SERVICE_BY_ID, SET_STATE_SERVICE } from "Query";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { COOLORS, TEXTS, NEXT_TEXTS, PREV_TEXTS } from "helpers";
import FormService from 'containers/FormService';
import RegularButton from "components/CustomButtons/Button";
import FlowWorkshopEntry from "containers/FlowWorkshopEntry";
import Dialog from 'components/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import BuildIcon from '@material-ui/icons/Build';
import Fab from '@material-ui/core/Fab';
import "./style.css";



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



export default function ServiceDetail(props) {
    const [handleMutation] = useMutation(SET_STATE_SERVICE);
    const classes = useStyles();
    const { match: { params: { id } } } = props;


    const nextState = () => {
        handleMutation({
            variables: {
                setPrevious: false,
                serviceId: id
            }
        });
    };
    const prevState = () => {
        handleMutation({
            variables: {
                setPrevious: true,
                serviceId: id
            }
        });
    };

    const [showForm, setShowForm] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => setOpenDialog(false);
    const handleOpenDialog = () => setOpenDialog(true);





    const { loading, error, data } = useQuery(GET_SERVICE_BY_ID, {
        variables: { id: id }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>No se encontro esta entrada</p>;



    const { service } = data;

    return (
        <React.Fragment>
            <div style={{ position: 'absolute', top: '23vh', right: '6vw', zIndex: '1' }}>
                <Fab color="primary" aria-label="edit" onClick={handleOpenDialog}>
                    <EditIcon />
                </Fab>
            </div>
            <div style={{ position: 'absolute', top: '23vh', right: '12vw', zIndex: '1' }}>
                <Fab color="primary" aria-label="edit" onClick={handleOpenDialog}>
                    <BuildIcon />
                </Fab>
            </div>
            <List className={classes.root}>
                <div style={{ display: '-webkit-flex', display: 'flex', justifyContent: 'space-between', backgroundColor: COOLORS[service.state], textAlign: 'center', marginTop: '-29px' }}>
                    {service.state !== "UPEN" ? <div className={'hoverNext'} onClick={prevState} style={{ color: 'white', heigth: '100%' }}><h5>{TEXTS[PREV_TEXTS[service.state]]}</h5></div> : <div style={{ width: '33.3%' }}></div>}
                    <div style={{ color: 'white', width: "33%" }}><h3>{TEXTS[service.state]}</h3></div>
                    {service.state !== "WARR" ? <div className={'hoverNext'} onClick={nextState} style={{ color: 'white', heigth: '100%' }}><h5>{TEXTS[NEXT_TEXTS[service.state]]}</h5></div> : <div style={{ width: '33.3%' }}></div>}
                </div>
                <ListItem>
                    <ListItemText primary={service.entry.client.name} secondary={service.entry.phoneNumber} />
                </ListItem>
                <div className={classes.description}><h6>Condiciones de entrada: </h6><p>{service.entry.entryConditions}</p></div>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary={service.entry.hardware.type} secondary={`Marca: ${service.entry.hardware.brand}`} />
                    <ListItemText secondary={`Modelo: ${service.entry.hardware.model}`} />
                </ListItem>
                <Divider component="li" variant="inset" />

                <ListItem>
                    <ListItemText primary={"Agregado por"} secondary={service.entry.user ? service.entry.user.username : ""} />
                </ListItem>
            </List>
            <List className={classes.root}>
                <div className={classes.description}><h6>Anotaciones del staff: </h6><p>{service.staffAnnotations}</p></div>
                {service.user ?
                    (
                        <React.Fragment>

                            <div>Tecnico: {service.user.username}</div>

                            {showForm ?
                                <FormService
                                    header={false}
                                    onSave={() => { setShowForm(false) }}
                                    update={
                                        {
                                            entryId: service.entry.id,
                                            userId: service.user ? service.user.id : "",
                                            id: service.id,
                                            staffAnnotations: service.staffAnnotations,
                                            state: service.state
                                        }
                                    } /> : <RegularButton onClick={() => { setShowForm(true) }}>Cambiar tecnico</RegularButton>
                            }
                        </React.Fragment>

                    ) :
                    (
                        <div>Asignar tecnico tecnico
                            <FormService
                                header={false}
                                update={
                                    {
                                        entryId: service.entry.id,
                                        userId: service.user.id,
                                        id: service.id,
                                        staffAnnotations: service.staffAnnotations,
                                        state: service.state
                                    }
                                } />
                        </div>
                    )
                }
                +++++++            Falta crear arreglos de un servicio  +++++++++++++

                <Divider component="li" variant="inset" />
                <ListItem>
                    <ListItemText primary={"Sello"} secondary={service.sealNumber} />
                </ListItem>
            </List>

            <Dialog
                fullscreen={true}
                open={openDialog}
                onClose={handleCloseDialog}
                ChildComponent={FlowWorkshopEntry}
                handleClose={handleCloseDialog}
                childProps={{
                    onFinish: handleCloseDialog,
                    update: { id: id }
                }}
            />
        </React.Fragment >
    );
}

