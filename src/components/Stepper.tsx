import * as React from 'react';

import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import { Button } from './ui/button';

interface IconStepperProps {
    setActiveStep: (step: number) => void;
    activeStep: number;
    steps: { label: string; icon: React.ElementType }[];
    strongColor?: string;
    weakColor?: string;
}

const IconStepper: React.FC<IconStepperProps> = ({
    setActiveStep, activeStep, steps, strongColor = '#ff8c00', weakColor = '#f5bc75'
}) => {

    return (
        <Stepper
            size="md"
            sx={{
                width: '100%',
                '--StepIndicator-size': '3rem',
                '--Step-connectorInset': '0px',
                [`& .${stepIndicatorClasses.root}`]: {
                    borderWidth: 4,
                },
                [`& .${stepClasses.root}::after`]: {
                    height: 4,
                },
                [`& .${stepClasses.completed}`]: {
                    [`& .${stepIndicatorClasses.root}`]: {
                        borderColor: weakColor,
                        color: weakColor,
                    },
                    '&::after': {
                        bgcolor: weakColor,
                    },
                },
                [`& .${stepClasses.active}`]: {
                    [`& .${stepIndicatorClasses.root}`]: {
                        borderColor: 'currentColor',
                    },
                },
                [`& .${stepClasses.disabled} *`]: {
                    color: 'neutral.outlinedDisabledColor',
                },
            }}
        >
            {steps.map((step, index) => (
                <Step
                    key={step.label}
                    orientation="vertical"
                    completed={activeStep > index}
                    active={activeStep === index}
                    indicator={
                        <Button variant='unstyled' onClick={() => setActiveStep(index)}>
                            <StepIndicator variant="outlined" sx={
                                { color: activeStep < index ? 'neutral.outlinedDisabledColor' : strongColor, }
                            }>
                                <step.icon />
                            </StepIndicator>
                        </Button>
                    }
                >

                    <span className='dark:text-white font-century-gothic'>
                        {step.label}
                    </span>

                </Step>
            ))}
        </Stepper>
    );
}

export default IconStepper;
