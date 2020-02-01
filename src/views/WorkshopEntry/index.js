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
import FormEntry from "containers/FormEntry";

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

export default function TableList() {
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Trabajos en el taller</h4>
                        <p className={classes.cardCategoryWhite}>
                            Listado de trabajos pendientes
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={[
                                {
                                    name: "Cliente",
                                    id: "client"
                                },
                                {
                                    name: "Teléfono",
                                    id: "phone"
                                },
                                {
                                    name: "Hardware",
                                    id: "hardware"
                                },
                                {
                                    name: "Fecha",
                                    id: "date"
                                }
                            ]}
                            tableData={[
                                {
                                    id: 1,
                                    client: "Sándor Martín Leyva",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 2,
                                    client: "Antonio Maceo Grajales",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 3,
                                    client: "Jose Julian Marti Perez",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 1,
                                    client: "Sándor Martín Leyva",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 2,
                                    client: "Antonio Maceo Grajales",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 3,
                                    client: "Jose Julian Marti Perez",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 1,
                                    client: "Sándor Martín Leyva",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 2,
                                    client: "Antonio Maceo Grajales",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 3,
                                    client: "Jose Julian Marti Perez",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 1,
                                    client: "Sándor Martín Leyva",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 2,
                                    client: "Antonio Maceo Grajales",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                },
                                {
                                    id: 3,
                                    client: "Jose Julian Marti Perez",
                                    phone: "52580801",
                                    hardware: 'Monitor AOC 22"',
                                    date: "24-2-2020"
                                }
                            ]}
                            editable={true}
                            editForm={FormEntry}
                        />
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    );
}
