import { Box, Step, StepLabel, Stepper as MuiStepper } from '@mui/material';

type Props = {
  steps: Array<string>;
  activeStep: number;
};

const Stepper = ({ activeStep, steps }: Props) => (
  <Box sx={{ width: '100%' }}>
    <MuiStepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step data-testid="step-container" key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  </Box>
);

export default Stepper;
