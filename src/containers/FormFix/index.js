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
import TransferList from "components/TransferList";
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


export default class FormFix extends Component {

    constructor(props) {
        super(props);
        const { update } = props;
        if (update) {
            this.state = {
                price: update.price,
                phone: update.phone,
                staffNotes: update.staffNotes
            }

        }
        else {
            this.state = {
                price: "",
                phone: "",
                staffNotes: ""
            }
        }

        this.handlePrice = this.handlePrice.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleStaffNotes = this.handleStaffNotes.bind(this);
    }

    handleStaffNotes(staffNotes) {
        this.setState({
            staffNotes: staffNotes
        })
    }



    handlePhone(phone) {
        this.setState({
            phone: phone
        })
    }

    handlePrice(price) {
        this.setState({
            price: price
        })
    }


    render() {
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={styles.cardTitleWhite}>Agregar Arreglo</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Precio Base"
                                id="price"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.price,
                                    onChange: (e) => this.handlePrice(e.target.value),
                                    type: "number"
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <TransferList />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <TransferList />
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

FormFix.propTypes = {
    update: PropTypes.object,
};
FormFix.defaultProps = {
    update: false
};





