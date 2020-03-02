import React, { useEffect, useState } from "react";
// core components
import { MenuItem } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import PropTypes from "prop-types";
import { GET_USERS } from "Query";
import { useQuery } from "@apollo/react-hooks";
import Button from "components/CustomButtons/Button.js";




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
    const { update, onSave, onCancel, autoClean, header } = props;

    const [user, setUser] = useState("");


    useEffect(() => {
        if (update) {
            setUser(update.user ? update.user : "");

        }
    }, [update]);

    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return "Loading...";
    if (error) return "Error...";

    const autoCleanStates = () => {
        if (autoClean) {
            setUser("");
        }
    }

    const handleClickGuardar = () => {
        onSave(user);
    };

    const handleClickCancel = () => {
        autoCleanStates();
        onCancel();
    };

    return (

        <Card>
            {header ? <CardHeader color="primary">
                <h4 className={styles.cardTitleWhite}>Seleccionar Técnico</h4>
            </CardHeader> : null}
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Técnico"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                autoWidth: true,
                                value: user,
                                onChange: ({ target }) => setUser(target.value)
                            }}
                            select
                        >
                            {data.users.map(({ id, username }) => <MenuItem key={id} value={id}>{username}</MenuItem>)}

                        </CustomInput>
                    </GridItem>
                </GridContainer>


            </CardBody>
            <CardFooter>
                <Button onClick={handleClickCancel}>Cancel</Button >
                <Button color="primary" onClick={handleClickGuardar}>Guardar</Button >
            </CardFooter>
        </Card >
    )

}


FormClient.propTypes = {
    update: PropTypes.any,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    autoClean: PropTypes.bool,
    header: PropTypes.bool,
};
FormClient.defaultProps = {
    update: false,
    autoClean: true,
    header: false,
    onSave: () => console.log("No tiene implementado onSave"),
    onCancel: () => console.log("No tiene implementado onCancel")
};
export default FormClient;





