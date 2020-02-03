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

import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";

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

const query = gql`
    {
    entries{
      id
      client{
        name
      }
      phoneNumber
      entryConditions
      hardware{
        brand
        model
        type
      }
      datetime
    }
  }
`;

export default function TableList() {
    const classes = useStyles();
    return (
        <Query query={query}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error...</p>;
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
                                            tableData={
                                                data.entries.map(item => ({
                                                    id: item.id,
                                                    client: item.client.name,
                                                    phone: item.phoneNumber,
                                                    hardware: item.hardware.brand,
                                                    date: item.datetime
                                                }))

                                            }
                                            editable={true}
                                            editForm={FormEntry}
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>

                        </GridContainer>

                    )
                }}</Query>);
}
