import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useQuery, useMutation } from "@apollo/react-hooks";
import CustomInput from "components/CustomInput/CustomInput.js";
import { MenuItem } from "@material-ui/core";

import moment from "moment";
import { GET_WORKSHOP_SERVICES, DELETE_SERVICE } from "Query";
import _ from "lodash";
import { COOLORS } from "helpers"
import FlowWorkshopEntry from "containers/FlowWorkshopEntry";


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

export default function Services() {
    const classes = useStyles();

    const [state, setState] = React.useState("ALL");
    const [handleDelete] = useMutation(DELETE_SERVICE, {
        update(cache, { data: { deleteService } }) {
            const { services } = cache.readQuery({ query: GET_WORKSHOP_SERVICES });
            cache.writeQuery({
                query: GET_WORKSHOP_SERVICES,
                data: { services: services.filter(e => e.id !== deleteService.service.id) }
            });
        }
    }
    );
    const { loading, error, data } = useQuery(GET_WORKSHOP_SERVICES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    const price = (fix) => {
        if (fix) {
            let value = Number.parseFloat(fix.basePrice);
            let pieces_value = fix.pieces ? fix.pieces.map(e => Number.parseFloat(e.price)) : [];
            let otherPieces_value = fix.otherPieces ? fix.otherPieces.map(e => Number.parseFloat(e.price)) : [];
            value += _.sum(pieces_value) + _.sum(otherPieces_value);
            return value;
        }
        return 0;
    }

       
    const tableData = data.services.filter(item => state === "ALL" ? true : item.state === state).map(item => ({
        id: item.id,
        user: item.user ? item.user.username : "No tiene asignado técnico",
        client: item.entry.client.name,
        hardware: `${item.entry.hardware.type} ${item.entry.hardware.brand} `,
        price: price(item.fix),
        date: moment(item.date).format("DD-MM-YYYY"),
        color: COOLORS[item.state]
    }));

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Servicios en el taller</h4>
                        <p className={classes.cardCategoryWhite}>
                            Listado de servicios
                                        </p>
                    </CardHeader>
                    <CardBody>
                        <CustomInput
                            labelText="Estado"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                autoWidth: true,
                                value: state,
                                onChange: ({ target }) => setState(target.value)
                            }}
                            select
                        >
                            <MenuItem value="ALL">Todos los estados</MenuItem>
                            <MenuItem value="UPEN">Pendiente sin Asignar</MenuItem>
                            <MenuItem value="APEN">Pendiente Asignado</MenuItem>
                            <MenuItem value="PROC">En Proceso</MenuItem>
                            <MenuItem value="FIN">Finalizado</MenuItem>
                            <MenuItem value="WARR">Garantía</MenuItem>
                            <MenuItem value="NO_WARR">Sin Garantía</MenuItem>
                        </CustomInput>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={[
                                {
                                    name: "Cliente",
                                    id: "client"
                                },
                                {
                                    name: "Equipo",
                                    id: "hardware"
                                },
                                {
                                    name: "Técnico",
                                    id: "user"
                                },
                                {
                                    name: "Precio",
                                    id: "price"
                                },
                                {
                                    name: "Fecha",
                                    id: "date"
                                }
                            ]}
                            tableData={tableData}
                            editable={true}
                            addForm={FlowWorkshopEntry}
                            // add={false}
                            onDeleteRow={handleDelete}
                            urlDetails={"/detalle/servicio/taller"}
                        />
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>

    );
}
