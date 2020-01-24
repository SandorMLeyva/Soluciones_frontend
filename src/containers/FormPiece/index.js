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
                name: update.name,
                model: update.model,
                price: update.price,
                count: update.count,
                min_count: update.min_count
            }

        }
        else {
            this.state = {
                name: "",
                model: "",
                price: "",
                count: "",
                min_count: ""
            }
        }

        this.handleName = this.handleName.bind(this);
        this.handleModel = this.handleModel.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleCount = this.handleCount.bind(this);
        this.handleMinCount = this.handleMinCount.bind(this);
    }



    handleCount(count) {
        this.setState({
            count: count
        })
    }

    handlePrice(price) {
        this.setState({
            price: price
        })
    }

    handleName(name) {
        this.setState({
            name: name
        })
    }
    handleModel(model) {
        this.setState({
            model: model
        })
    }
    handleMinCount(min_count) {
        this.setState({
            min_count: min_count
        })
    }

    render() {
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 classbrand={styles.cardTitleWhite}>Agregar Pieza</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Nombre"
                                id="name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.name,
                                    onChange: (e) => this.handleName(e.target.value)
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
                                labelText="Cantidad"
                                id="count"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.count,
                                    onChange: (e) => this.handleCount(e.target.value),
                                    type: "number"
                                }}

                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Cantidad Mínima"
                                id="count"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.min_count,
                                    onChange: (e) => this.handleMinCount(e.target.value),
                                    type: "number"
                                }}

                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Precio"
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





