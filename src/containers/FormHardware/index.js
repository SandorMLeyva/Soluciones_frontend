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


export default class FormHardware extends Component {

    constructor(props) {
        super(props);
        const { update } = props;
        if (update) {
            this.state = {
                brand: update.brand,
                model: update.model,
                serial: update.serial,
                type: update.type
            }

        }
        else {
            this.state = {
                brand: "",
                model: "",
                serial: "",
                type: ""
            }
        }

        this.handleBrand = this.handleBrand.bind(this);
        this.handleModel = this.handleModel.bind(this);
        this.handleSerial = this.handleSerial.bind(this);
        this.handleType = this.handleType.bind(this)
    }

   

    handleType(type) {
        this.setState({
            type: type
        })
    }

    handleSerial(serial) {
        this.setState({
            serial: serial
        })
    }

    handleBrand(brand) {
        this.setState({
            brand: brand
        })
    }
    handleModel(model) {
        this.setState({
            model: model
        })
    }

    render() {
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 classbrand={styles.cardTitleWhite}>Agregar Equipo</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Marca"
                                id="brand"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.brand,
                                    onChange: (e) => this.handleBrand(e.target.value)
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Modelo"
                                id="model"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.model,
                                    onChange: (e) => this.handleModel(e.target.value)
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Tipo"
                                id="type"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.type,
                                    onChange: (e) => this.handleType(e.target.value)
                                }}
                                
                            />
                        </GridItem>

                    </GridContainer>
                    <GridContainer>
                        
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Número de serie"
                                id="serial"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.serial,
                                    onChange: (e) => this.handleSerial(e.target.value)
                                }}
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

FormHardware.propTypes = {
    update: PropTypes.object,
};
FormHardware.defaultProps = {
    update: false
};





