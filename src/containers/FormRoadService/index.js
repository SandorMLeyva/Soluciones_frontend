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


export default class FormRoadService extends Component {

    constructor(props) {
        super(props);
        const { update } = props;
        if (update) {
            this.state = {
                user: update.user,
                state: update.state,
                staffNotes: update.staffNotes
            }

        }
        else {
            this.state = {
                user: "",
                state: "",
                staffNotes: ""
            }
        }

        this.handleUser = this.handleUser.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleStaffNotes = this.handleStaffNotes.bind(this);
    }

    handleStaffNotes(staffNotes) {
        this.setState({
            staffNotes: staffNotes
        })
    }

   
    
    handleState(state) {
        this.setState({
            state: state
        })
    }

    handleUser(user) {
        this.setState({
            user: user
        })
    }
   

    render() {
        return (
            <Card>
                <CardHeader color="primary">
                    <h4 className={styles.cardTitleWhite}>Agregar Servicio en la calle</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            {/* Change for autocomplete */}
                            <CustomInput
                                labelText="Técnico"
                                id="user"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: this.state.user,
                                    onChange: (e) => this.handleUser(e.target.value),
                                }}
                            />
                        </GridItem>
                        
                        <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                                labelText="Estado"
                                id="state"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    autoWidth: true,
                                    value: this.state.state,
                                    onChange: (e) => this.handleState(e.target.value)
                                }}
                                select
                            >
                                {/* TODO: Poner los estados cargados del back */}
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="Asignado">Asignado</MenuItem>
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
                                    onChange: (e) => this.handleStaffNotes(e.target.value),
                                    value: this.state.staffNotes
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

FormRoadService.propTypes = {
    update: PropTypes.object,
};
FormRoadService.defaultProps = {
    update: false
};





