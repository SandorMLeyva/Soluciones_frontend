import React, { useEffect, useState } from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PropTypes from "prop-types";
import { CREATE_ENTRY, UPDATE_ENTRY } from "Query";
import { useMutation } from "@apollo/react-hooks";


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


const FormEntry = (props) => {
    const { update, onSave, onCancel, autoClean } = props;

    const [client, setClient] = useState("");
    const [phone, setPhone] = useState("");
    const [entryConditions, setEntryConditions] = useState("");
    const [id, setId] = useState("");
    const [hardware, setHardware] = useState("");
    const [errorForm, setErrorForm] = useState("");


    useEffect(() => {
        if (update) {
            setEntryConditions(update.entryConditions ? update.entryConditions : "");
            setId(update.id ? update.id : "");
            setPhone(update.phoneNumber ? update.phoneNumber : "");
            setClient(update.clientId ? update.clientId : "");
            setHardware(update.hardwareId ? update.hardwareId : "");
        }
    }, [update]);

    const [handleMutation] = useMutation(id ? UPDATE_ENTRY : CREATE_ENTRY);

    const autoCleanStates = () => {
        if (autoClean) {
            setEntryConditions("");
            setId("");
            setPhone("");
            setClient("");
            setHardware("");
        }
    }


    const handleClickGuardar = () => {
        if (!phone) {
            setErrorForm("Teléfono no puede quedar vacío")
            return;
        }

        handleMutation({
            variables: {
                entryConditions: entryConditions,
                // TODO: poner aqui el usuario
                userId: "1",
                id: id,
                phoneNumber: phone,
                clientId: client,
                hardwareId: hardware
            }
        }).then(({ data }) => {
            autoCleanStates();
            onSave(id ? data.updateEntry.entry : data.createEntry.entry);
        });
    }

    const handleClickCancel = onCancel;

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={styles.cardTitleWhite}>Agregar Entrada</h4>
                {errorForm ? <h4>{errorForm}</h4> : null}

            </CardHeader>
            <CardBody>
                <GridContainer>
                    {/* <GridItem xs={12} sm={12} md={6}>
                        
                        <CustomInput
                            labelText="Cliente"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: client,
                                onChange: ({ target }) => setClient(target.value),
                            }}
                        />
                    </GridItem> */}

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Teléfono"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: phone,
                                onChange: ({ target }) => setPhone(target.value),
                            }}
                        />
                    </GridItem>
                </GridContainer>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Condiciones de Entrada "
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                value: entryConditions,
                                onChange: ({ target }) => setEntryConditions(target.value),
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </CardBody>
            <CardFooter>
                <Button onClick={handleClickCancel}>Cancel</Button >
                <Button color="primary" onClick={handleClickGuardar}>Guardar</Button >
            </CardFooter>
        </Card >
    );
};

FormEntry.propTypes = {
    update: PropTypes.any,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    autoClean: PropTypes.bool,
};
FormEntry.defaultProps = {
    autoClean: true,
    update: false
};

export default FormEntry;