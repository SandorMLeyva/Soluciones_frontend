import React, { useState, useEffect } from "react";
// @material-ui/core components
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

import { CREATE_HARDWARE, UPDATE_HARDWARE } from "Query";
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

const FormHardware = (props) => {
    const { update, onSave, onCancel, autoClean } = props;

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [serial, setSerial] = useState("");
    const [type, setType] = useState("");
    const [id, setId] = useState("");
    const [errorForm, setErrorForm] = useState("");

    useEffect(() => {
        if (update) {
            setBrand(update.brand);
            setModel(update.model);
            setSerial(update.serialNumber);
            setType(update.type);
            setId(update.id);
        }
    }, [update]);

    const [handleMutation] = useMutation(id ? UPDATE_HARDWARE : CREATE_HARDWARE);

    const clearStates = () => {
        if (autoClean) {
            setBrand("");
            setModel("");
            setSerial("");
            setType("");
            setId("");
        }
    }


    const handleClickGuardar = () => {
        if (!(brand && serial && model && type)) {
            setErrorForm("No pueden haber campos vacíos");
            return;
        }
        handleMutation({
            variables: {
                brand: brand,
                serialNumber: serial,
                model: model,
                type: type,
                id: id
            }
        }).then(({data}) => {
            clearStates();
            onSave(id? data.updateHardware.hardware: data.createHardware.hardware);
        });
    }

    const handleClickCancel = () => {
        clearStates();
        onCancel();
    };

    return (

            <Card>
                <CardHeader color="primary">
                    <h4 classbrand={styles.cardTitleWhite}>Agregar Equipo</h4>
                    {errorForm ? <h4>{errorForm}</h4> : null}
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Marca"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: brand,
                                    onChange: ({ target }) => setBrand(target.value)
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Modelo"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: model,
                                    onChange: ({ target }) => setModel(target.value)
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Tipo"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: type,
                                    onChange: ({ target }) => setType(target.value)
                                }}

                            />
                        </GridItem>

                    </GridContainer>
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Número de serie"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: serial,
                                    onChange: ({ target }) => setSerial(target.value)
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
                <CardFooter>
                    <Button onClick={handleClickCancel}>Cancel</Button >
                    <Button color="primary" onClick={handleClickGuardar}>Guardar</Button >
                </CardFooter>
            </Card>
      
    );
}



FormHardware.propTypes = {
    update: PropTypes.any,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    autoClean: PropTypes.bool
};
FormHardware.defaultProps = {
    update: false,
    autoClean: true,
    onSave: () => console.log("No tiene implementado onSave"),
    onCancel: () => console.log("No tiene implementado onCancel")
};
export default FormHardware;





