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

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

import PropTypes from "prop-types";
import { UPDATE_ROAD_ENTRY, CREATE_ROAD_ENTRY, GET_ROAD_ENTRIES } from "Query"
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";


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

const FormRoadEntry = (props) => {
    const { update, onSave, onCancel, autoClean } = props;

    const [client, setClient] = useState("");
    const [phone, setPhone] = useState("");
    const [customerObservation, setCustomerObservation] = useState("");
    const [id, setId] = useState("");
    const [address, setAddress] = useState("");
    const [appoimentDate, setAppoimentDate] = useState("");
    const [hardware, setHardware] = useState("");
    const [errorForm, setErrorForm] = useState("");


    useEffect(() => {
        if (update) {
            setCustomerObservation(update.customerObservation ? update.customerObservation : "");
            setId(update.id ? update.id : "");
            setPhone(update.phoneNumber ? update.phoneNumber : "");
            setClient(update.client ? update.client.id : "");
            setHardware(update.hardware ? update.hardware.id : "");
            setAddress(update.address ? update.address : "");
            setAppoimentDate(update.appoimentDate ? update.appoimentDate : "");
        }
    }, [update]);
    const [handleMutation] = useMutation(id ? UPDATE_ROAD_ENTRY : CREATE_ROAD_ENTRY, {
        update(cache, { data }) {
            const { roadentry } = cache.readQuery({ query: GET_ROAD_ENTRIES });

            if (!id) {
                cache.writeQuery({
                    query: GET_ROAD_ENTRIES,
                    data: { roadentry: roadentry.concat(data.createRoadentry.roadentry) }
                });
            }

        }
    });

    const autoCleanStates = () => {
        if (autoClean) {
            setCustomerObservation("");
            setId("");
            setPhone("");
            setClient("");
            setHardware("");
            setAddress("");
            setAppoimentDate("");
        }
    }
    

    const handleClickGuardar = () => {
        if (!phone) {
            setErrorForm("Teléfono no puede quedar vacío")
            return;
        }
        handleMutation({
            variables: {
                customerObservation: customerObservation,
                // TODO: poner aqui el usuario
                userId: "1",
                id: id,
                phoneNumber: phone,
                clientId: client,
                hardwareId: hardware,
                // TODO: date format YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ]
                appointmentDatetime: "2020-02-27 23:03:59",
                // appointmentDatetime: appoimentDate,
                fixedAppointmentDatetime: "2020-02-27 23:03:59",
                // fixedAppointmentDatetime: appoimentDate,
                address: address
            }
        }).then(({ data }) => {
            console.log(data)
            autoCleanStates();
            onSave(id ? data.updateRoadentry.roadentry : data.createRoadentry.roadentry);
        }).catch((err)=>{
            console.log(err);
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
                            labelText="Dirección "
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                value: address,
                                onChange: ({ target }) => setAddress(target.value),
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Observacopnes del cliente"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                value: customerObservation,
                                onChange: ({ target }) => setCustomerObservation(target.value),
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <DayPickerInput onDayChange={day => {
                            let a = moment(new Date(day)).format("YYYY-MM-DD HH:MM:ss");
                            console.log(a);
                            setAppoimentDate(a);
                        }} value={appoimentDate} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <TimePicker
                            showSecond={false}
                            onChange={e => console.log(e)}
                            format="h:mm a"
                            use12Hours
                            inputReadOnly
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

FormRoadEntry.propTypes = {
    update: PropTypes.any,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    autoClean: PropTypes.bool,
};
FormRoadEntry.defaultProps = {
    autoClean: true,
    update: false
};

export default FormRoadEntry;