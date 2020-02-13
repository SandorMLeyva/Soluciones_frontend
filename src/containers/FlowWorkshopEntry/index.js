import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import FormClient from 'containers/FormClient';
import FormHardware from 'containers/FormHardware';
import FormEntry from 'containers/FormEntry';

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


export default function FlowWorkshopEntry() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = getSteps();

    const [object1, setObject1] = React.useState({})
    const [object2, setObject2] = React.useState({})
    const [object3, setObject3] = React.useState({})


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
                return <FormClient update={object1} onSave={(obj) => {
                    handleComplete();
                    setObject1(obj);
                    setObject3({
                        ...object3,
                        clientId: obj.id
                    });
                }} autoClean={false} />;

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
                return 'Unknown step';
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
            <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            </div>
        </div>
    );
}