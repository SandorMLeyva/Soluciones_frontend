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
    const { update, onSave, onCancel } = props;

    const [client, setClient] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        if (update) {
            setComment("");
            setId(update.id);
            setPhone(update.phone);
            setClient(update.client);
        }
    }, [update]);

    const [handleMutation] = useMutation(update ? UPDATE_ENTRY : CREATE_ENTRY);

    const handleClickGuardar = () => {
        handleMutation({
            variables: {
                entryConditions: comment,
                userId: "1",
                id: id,
                phoneNumber: phone,
                clientId: "1",
                hardwareId: "1"
            }
        });
        onSave();
    }

    const handleClickCancel =  onCancel;

    return (
        <form onSubmit={handleClickGuardar}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={styles.cardTitleWhite}>Agregar Entrada</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            {/* Change for autocomplete */}
                            <CustomInput
                                labelText="Cliente"
                                id="client"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: client,
                                    onChange: ({ target }) => setClient(target.value),
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Teléfono"
                                id="phone"
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
                                id="comment"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,
                                    value: comment,
                                    onChange: ({ target }) => setComment(target.value),
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <Button onClick={handleClickCancel}>Cancel</Button >
                    <button hidden type="submit"></button>
                    <Button color="primary" onClick={handleClickGuardar}>Guardar</Button >
                </CardFooter>
            </Card >
        </form>
    );
};

FormEntry.propTypes = {
    update: PropTypes.any,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
};
FormEntry.defaultProps = {
    update: false
};

export default FormEntry;