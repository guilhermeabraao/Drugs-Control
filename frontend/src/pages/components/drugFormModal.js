import * as React from 'react';
import Backdrop, { backdropClasses } from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import DrugInfosForm from './Forms/drugInfosForm';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DrugImageForm from './Forms/drugImageForm';
import { api } from 'import/api/api';
import { useDrugContext } from 'import/contexts/drugContext';
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  color: 'black',
  backgroundColor: 'white',
  fontWeight: 'bold'
}

const formDiv = {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px'
}

const steps = ['Drug info', 'Select drug image', 'Finish'];

export default function DrugFormModal({ mode, drug }) {
  const [open, setOpen] = React.useState(false);
  const [backDrop, setBackDrop] = React.useState(false);
  const handleOpen = () => {
    if (mode === 'edit') {
      setDrugForm(drug);
    }
    setOpen(true);
  }
  const [drugForm, setDrugForm] = React.useState({
    name: '',
    price: '',
    expiration_date: '',
    image: ''
  })

  const [failedValidation, setFailedValidation] = React.useState(false);
  const { loadDrugs } = useDrugContext();


  const handleClose = () => {
    setOpen(false)
    setActiveStep(0);
    setDrugForm({
      name: '',
      price: '',
      expiration_date: '',
      image: ''
    })
    loadDrugs();
    setBackDrop(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const validateFields = () => {
    if (activeStep === 0 && (!(drugForm.name === '' || drugForm.price === '' || drugForm.expiration_date === '') || mode === 'edit')) {
      handleNext();
      return;
    }
    if (activeStep === 1 && (drugForm.image !== '' || mode === 'edit')) {
      if (mode === 'edit') {
        submitEdit();
        return
      }
      submitRegister();
      return;
    }
    if (activeStep === 2) {
      handleClose();
      return;
    }
    setFailedValidation(true)
  }

  const submitRegister = async () => {
    try {
      setBackDrop(true);
      await api.post('/drugs', drugForm)
      setBackDrop(false);
      return handleNext();
    } catch (error) {
      setBackDrop(false);
      console.log(error.message)
    }
  }

  const submitEdit = async () => {
    try {
      const editForm = Object.fromEntries(Object.entries(drugForm).filter(([key, value]) => {
        return value !== ''
      }));
      setBackDrop(true);
      await api.put('/drugs', editForm)
      setBackDrop(false);
      return handleNext();
    } catch (error) {
      setBackDrop(false);
      console.log(error.message)
    }
  }


  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }


  return (
    <div>
      <Button variant={mode === 'edit' ? "text" : "contained"} startIcon={mode === 'edit' ? '' : <AddBoxIcon />} style={buttonStyle} onClick={handleOpen}>
        {mode === 'edit' ? 'Edit' : 'Register'}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={formDiv}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                {steps[activeStep]}
              </Typography>
              <div>
                {activeStep === 0 && (<DrugInfosForm drug={drug} drugForm={drugForm} setDrugForm={setDrugForm} />)}
                {activeStep === 1 && (<DrugImageForm drug={drug} drugForm={drugForm} setDrugForm={setDrugForm} />)}
                {activeStep === 2 && (<Typography variant="h6" id="success" sx={{ mt: 2 }}>
                  {mode === 'edit' ? 'Drug successfully updated!' : 'Drug successfully registered!'}
                </Typography>)}
              </div>
            </div>

            <Box sx={{ width: '100%' }}>
              <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label) => {
                  const stepProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  {activeStep !== 2 && <Button
                    color="inherit"
                    onClick={activeStep === 0 ? handleClose : handleBack}
                    sx={{ mr: 1 }}
                  >
                    {activeStep === 0 ? 'Close' : 'Back'}
                  </Button>}
                  <Box sx={{ flex: '1 1 auto' }} />

                  <Button onClick={() => validateFields()}>
                    {activeStep === steps.length - 1 ? 'Finish' : activeStep === 1 ? 'Register' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>

            </Box>
            {failedValidation && <Snackbar open={failedValidation} autoHideDuration={3000} onClose={() => setFailedValidation(false)} >
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%', position: 'relative', top: '10vh' }}>
                Please fill in the fields correctly!
              </Alert>
            </Snackbar>}
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={backDrop}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}