import React, { useState, useEffect } from "react";
// @material-ui/core components
import { MenuItem } from "@material-ui/core"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { GET_WORKSHOP_SERVICES, UPDATE_SERVICE, CREATE_SERVICE, GET_USERS } from "Query";
import { useMutation, useQuery } from "@apollo/react-hooks";

import PropTypes from "prop-types";


const styles = {
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const FormService = (props) => {
    const { update, onSave, onCancel, autoClean } = props;

    const [user, setUser] = useState("");
    const [state, setState] = useState("");
    const [entry, setEntry] = useState("");
    const [staffNotes, setStaffNotes] = useState("");
    const [fix, setFix] = useState("");
    const [seal, setSeal] = useState("");
    const [id, setId] = useState("");


    useEffect(() => {
        if (update) {
            setUser(update.user ? update.user.username : "");
            setState(update.state ? update.state : "");
            setEntry(update.entryId ? update.entryId : "");
            setStaffNotes(update.staffAnnotations ? update.staffAnnotations : "");
            // setFix(update.fix ? update.fix.id : "");
            // setSeal(update.seal ? update.seal : "");
            setId(update.id ? update.id : "");
        }
    }, [update]);
    const [handleMutation] = useMutation(id ? UPDATE_SERVICE : CREATE_SERVICE, {
        update(cache, { data }) {
            const { services } = cache.readQuery({ query: GET_WORKSHOP_SERVICES });

            if (!id) {
                cache.writeQuery({
                    query: GET_WORKSHOP_SERVICES,
                    data: { services: services.concat(data.createService.service) }
                });
            }

        }
    });

    const autoCleanStates = () => {
        if (autoClean) {
            setUser("");
            setState("");
            setEntry("");
            setStaffNotes("");
            // setFix("");
            // setSeal("");
            setId("");
        }
    }


    const handleClickGuardar = () => {
        handleMutation({
            variables: {
                entryId: entry,
                userId: user,
                id: id,
                state: user ? "APEN" : "UPEN",
                staffAnnotations: staffNotes
            }
        }).then(({ data }) => {
            autoCleanStates();
            onSave(id ? data.updateService.service : data.createService.service);
        });
    }

    const { loading, error, data } = useQuery(GET_USERS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    const handleClickCancel = onCancel;

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={styles.cardTitleWhite}>Agregar Servicio</h4>
            </CardHeader>
            <CardBody>
                <GridContainer>
                    {/* <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            labelText="Técnico"
                            id="user"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: user,
                                onChange: (e) => setUser(e.target.value),
                            }}
                        />
                    </GridItem> */}

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Técnico"
                            id="user"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                autoWidth: true,
                                value: user,
                                onChange: (e) => setUser(e.target.value)
                            }}
                            select
                        >
                            {data.users.map(item => (
                                <MenuItem key={item.id} value={item.id}>{item.username}</MenuItem>
                            ))}

                        </CustomInput>
                    </GridItem>
                </GridContainer>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Anotaciones"
                            id="staff-notes"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                onChange: (e) => setStaffNotes(e.target.value),
                                value: staffNotes
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </CardBody>
            <CardFooter>
                <Button color="primary" onClick={handleClickGuardar}>Guardar</Button>
            </CardFooter>
        </Card>
    );



}

FormService.propTypes = {
    update: PropTypes.object,
};
FormService.defaultProps = {
    update: false
};

export default FormService;





