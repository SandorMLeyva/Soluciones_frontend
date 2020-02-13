import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import FormClient from 'containers/FormClient';
import FormHardware from 'containers/FormHardware';
import FormEntry from 'containers/FormEntry';
import CustomInput from "components/CustomInput/CustomInput.js";
import { MenuItem } from "@material-ui/core";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';


import { GET_CLIENTS_NAME } from 'Query';
import { useQuery } from "@apollo/react-hooks";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Selecciona cliente', 'Crea Equipo', 'Crea Entrada'];
}


export default function FlowWorkshopEntry(props) {
    const { onFinish, update } = props;
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [createClient, setCreateClient] = React.useState(false);
    const steps = getSteps();

    const [object1, setObject1] = React.useState({})
    const [client, setClient] = React.useState({})
    const [object2, setObject2] = React.useState({})
    const [object3, setObject3] = React.useState({})

    const { loading, error, data } = useQuery(GET_CLIENTS_NAME);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;


    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = (obj) => {
        const newActiveStep = isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);


    };


    const handleStep = step => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };


    const getStepContent = (step) => {
        switch (step) {
            case 0:
                if (createClient)
                    return (<React.Fragment>

                        <div style={{ position: 'absolute', zIndex: '1', right: '8vw', top: '28vh' }}>
                            <Fab color="primary" aria-label="add" onClick={() => {
                                setCreateClient(false)
                            }}>
                                <CheckIcon />
                            </Fab>
                        </div>
                        <FormClient update={object1} onSave={(obj) => {
                            handleComplete();
                            setObject1(obj);
                            setObject3({
                                ...object3,
                                clientId: obj.id
                            });
                        }} autoClean={false} />
                    </React.Fragment>
                    );
                else
                    return (
                        <Card>
                            <CardBody>
                                <GridContainer>
                                    <div style={{ position: 'absolute', right: ' 8vw', top: ' -29px', zIndex: '5' }}>
                                        <Fab color="primary" aria-label="add" onClick={() => {
                                            setCreateClient(true)
                                        }}>
                                            <AddIcon />
                                        </Fab>
                                    </div>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div><CustomInput
                                            labelText="Cliente"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                autoWidth: true,
                                                value: client,
                                                onChange: ({ target }) => {
                                                    setClient(target.value);
                                                    setObject3({
                                                        ...object3,
                                                        clientId: target.value
                                                    })
                                                }
                                            }}
                                            select>
                                            {data.clients.map(({ name, id }) => <MenuItem value={id} key={id} >{name}</MenuItem>)}
                                        </CustomInput></div>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button color="primary" onClick={handleComplete}>Siguiente</Button >
                            </CardFooter>
                        </Card>)

            case 1:
                return <FormHardware update={object2} onSave={(obj) => {
                    handleComplete();
                    setObject2(obj);
                    setObject3({
                        ...object3,
                        hardwareId: obj.id
                    });
                }} autoClean={false} />;
            case 2:
                return <FormEntry update={object3} onSave={(obj) => {
                    handleComplete();
                    setObject3(obj);
                }} />;
            default:
                return onFinish();
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            {getStepContent(activeStep)}
        </div>
    );
}

FlowWorkshopEntry.propTypes = {
    onFinish: PropTypes.func,
    update: PropTypes.any
};

FlowWorkshopEntry.defaultProps = {
    onFinish: () => console.log("onFinish not implemented"),
    update: false

}
