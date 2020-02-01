import React, { Component, useState, useEffect } from "react";
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

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

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


export default class FormRoadEntry extends Component {

    constructor(props) {
        super(props);
        const { update } = props;
        if (update) {
            this.state = {
                client: update.client,
                phone: update.phone,
                comment: update.comment,
                address: update.address,
                date_appoiment: update.date_appoiment
            }

        }
        else {
            this.state = {
                client: "",
                phone: "",
                comment: "",
                address: "",
                date_appoiment: ""
            }
        }
        // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

        this.handleClient = this.handleClient.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleComment(comment) {
        this.setState({
            comment: comment
        })
    }

    handleAddress(addr) {
        this.setState({
            address: addr
        })
    }



    handlePhone(phone) {
        this.setState({
            phone: phone
        })
    }

    handleClient(client) {
        this.setState({
            client: client
        })
    }


    handleDateChange = date => {
        this.setState({
            date_appoiment: date
        });
    };

    render() {
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={styles.cardTitleWhite}>Agregar Entrada de la calle</h4>
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
                                    value: this.state.client,
                                    onChange: (e) => this.handleClient(e.target.value),
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
                                    value: this.state.phone,
                                    onChange: (e) => this.handlePhone(e.target.value)
                                }}
                            />
                        </GridItem>


                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Dirección"
                                id="address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,
                                    onChange: (e) => this.handleAddress(e.target.value),
                                    value: this.state.address
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Observaciones del cliente"
                                id="comment"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 5,
                                    onChange: (e) => this.handleComment(e.target.value),
                                    value: this.state.comment
                                }}
                            />
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <DayPickerInput onDayChange={day => alert(day)} />
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
                    <Button color="primary">Guardar</Button>
                </CardFooter>
            </Card>
        );
    }
}

FormRoadEntry.propTypes = {
    update: PropTypes.object,
};
FormRoadEntry.defaultProps = {
    update: false
};





