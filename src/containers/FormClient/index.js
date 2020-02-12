import React, { useEffect, useState } from "react";
// core components
import { MenuItem } from "@material-ui/core"
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PropTypes from "prop-types";
import { CREATE_CLIENT, UPDATE_CLIENT, GET_SOURCES } from "Query";
import { useMutation, useQuery } from "@apollo/react-hooks";



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

const FormClient = (props) => {
    const { update, onSave, onCancel } = props;

    const [name, setName] = useState("");
    const [addr, setAddr] = useState("");
    const [phone, setPhone] = useState("");
    const [municip, setMunicip] = useState("");
    const [source, setSource] = useState("");
    const [comment, setComment] = useState("");
    const [id, setId] = useState(0);

    useEffect(() => {
        if (update) {
            setName(update.name);
            setAddr(update.addr);
            setPhone(update.phone);
            setMunicip(update.municip);
            setSource(update.source);
            setComment(update.comment);
            setId(update.id);
        }
    }, [update]);

    const [handleMutation] = useMutation(update ? UPDATE_CLIENT : CREATE_CLIENT);
    const { loading, error, data } = useQuery(GET_SOURCES);

    if(loading)return "Loading...";
    if(error)return "Error...";


    const handleClickGuardar = () => {
        handleMutation({
            variables: {
                sourceId: source,
                municipality: municip,
                phoneNumber: phone,
                comment: comment,
                address: addr,
                name: name,
                id: id
            }
        });
        onSave();
    }

    const handleClickCancel = onCancel;

    return (
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
                                value: name,
                                onChange: ({ target }) => setName(target.value)
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            labelText="Dirección"
                            id="address"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: addr,
                                onChange: ({ target }) => setAddr(target.value)
                            }}
                        />
                    </GridItem>

                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Municipio"
                            id="municipality"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                autoWidth: true,
                                value: municip,
                                onChange: ({ target }) => setMunicip(target.value)
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
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Teléfono"
                            id="phone"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: phone,
                                onChange: ({ target }) => setPhone(target.value)
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Fuente"
                            id="source"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                autoWidth: true,
                                value: source,
                                onChange: ({ target }) => setSource(target.value)
                            }}
                            select>
                            {data.sources.map(({ id, name }) => (< MenuItem key={id} value={id} > {name}</MenuItem>))}


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
                                value: comment,
                                onChange: ({ target }) => setComment(target.value)
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </CardBody>
            <CardFooter>
                <Button color="primary" onClick={handleClickGuardar}>Guardar</Button >
                <button hidden type="submit"></button>
                <Button onClick={handleClickCancel}>Cancel</Button >
            </CardFooter>
        </Card >)

}


FormClient.propTypes = {
    update: PropTypes.any,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
};
FormClient.defaultProps = {
    update: false,
    onSave: ()=>console.log("No tiene implementado onSave"),
    onCancel: ()=>console.log("No tiene implementado onCancel")
};
export default FormClient;





