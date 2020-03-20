import React, { useState, useEffect } from "react";
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
import { GET_PIECES, GET_OTHER_PIECES } from "Query";
import { useQuery } from "@apollo/react-hooks";



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

const Pieces = (props) => {
    const { loading, error, data } = useQuery(GET_PIECES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error cargando las piezas del almacen</p>;
    return (<TransferList values={data.pieces.map(item => (
        {
            id: Number.parseInt(item.id),
            name: `${item.name} ${item.model}`,
            count: item.count
        }
    ))} />);
};

const OtherPieces = () => {
    const { loading, error, data } = useQuery(GET_OTHER_PIECES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error cargando las piezas del almacen</p>;
    return (<TransferList values={data.otherpieces.map(item => (
        {
            id: Number.parseInt(item.id),
            name: `${item.name}`,
            count: item.count
        }
    ))} />);
};

const FormFix = (props) => {
    const { update, onSave } = props;
    const [price, setPrice] = useState(0);



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
                                value: price,
                                onChange: (e) => setPrice(Number.parseFloat(e.target.value)),
                                type: "number"
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Pieces />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <OtherPieces />
                    </GridItem>
                </GridContainer>
            </CardBody>
            <CardFooter>
                <Button color="primary" onClick={() => {
                    onSave();
                }}>Guardar</Button>
            </CardFooter>
        </Card>
    );
}


FormFix.propTypes = {
    update: PropTypes.object,
    onSave: PropTypes.func
};
FormFix.defaultProps = {
    update: false,
    onSave: () => console.log("No tiene implementado metodo onSave")
};



export default FormFix;

