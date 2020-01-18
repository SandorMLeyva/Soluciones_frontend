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


export default class FormClient extends Component {

    constructor(props) {
        super(props);
        const { update } = props;
        if (update) {
            this.state = {
                name: update.name,
                addr: update.addr,
                phone: update.phone,
                municip: update.municip,
                source: update.source,
                comment: update.comment
            }

        }
        else {
            this.state = {
                name: "",
                addr: "",
                phone: "",
                municip: "",
                source: "",
                comment: ""
            }
        }

        this.handleName = this.handleName.bind(this);
        this.handleAddr = this.handleAddr.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleMunicip = this.handleMunicip.bind(this);
        this.handleSource = this.handleSource.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    handleComment(comment) {
        this.setState({
            comment: comment
        })
    }

    handleSource(source) {
        this.setState({
            source: source
        })
    }

    handleMunicip(municip) {
        this.setState({
            municip: municip
        })
    }

    handlePhone(phone) {
        this.setState({
            phone: phone
        })
    }

    handleName(name) {
        this.setState({
            name: name
        })
    }
    handleAddr(addr) {
        this.setState({
            addr: addr
        })
    }

    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={styles.cardTitleWhite}>Agregar Cliente</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
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
                                    <GridItem xs={12} sm={12} md={6}>
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
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Dirección"
                                            id="address"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: this.state.addr,
                                                onChange: (e) => this.handleAddr(e.target.value)
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Municipio"
                                            id="municipality"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                autoWidth: true,
                                                value: this.state.municip,
                                                onChange: (e) => this.handleMunicip(e.target.value)
                                            }}
                                            select
                                        >
                                            <MenuItem value="Arroyo Naranjo">Arroyo Naranjo</MenuItem>
                                            <MenuItem value="Boyeros">Boyeros</MenuItem>
                                            <MenuItem value="Centro Habana">Centro Habana</MenuItem>
                                            <MenuItem value="Cerro">Cerro</MenuItem>
                                            <MenuItem value="Cotorro">Cotorro</MenuItem>
                                            <MenuItem value="10 de Octubre">10 de Octubre</MenuItem>
                                            <MenuItem value="Guanabacoa">Guanabacoa</MenuItem>
                                            <MenuItem value="Habana del Este">Habana del Este</MenuItem>
                                            <MenuItem value="Habana Vieja">Habana Vieja</MenuItem>
                                            <MenuItem value="La Lisa">La Lisa</MenuItem>
                                            <MenuItem value="Marianao">Marianao</MenuItem>
                                            <MenuItem value="Playa">Playa</MenuItem>
                                            <MenuItem value="Plaza de la Revolucion">Plaza de la Revolucion</MenuItem>
                                            <MenuItem value="Regla">Regla</MenuItem>
                                            <MenuItem value="San Miguel del Padron">San Miguel del Padron</MenuItem>
                                        </CustomInput>

                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={8}>
                                        <CustomInput
                                            labelText="Fuente"
                                            id="source"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                autoWidth: true,
                                                onChange: (e) => this.handleSource(e.target.value),
                                                value: this.state.source
                                            }}
                                            select
                                        >
                                            {/* TODO: estos items cargarlos del back */}
                                            <MenuItem value="revolico">revolico</MenuItem>
                                            <MenuItem value="porlalivre">porlalivre</MenuItem>
                                        </CustomInput>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Comentario sobre el cliente "
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
                            </CardBody>
                            <CardFooter>
                                <Button color="primary">Guardar</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

FormClient.propTypes = {
    update: PropTypes.object, 
};
FormClient.defaultProps = {
    update : false
};





