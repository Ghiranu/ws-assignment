import { TextField, Typography, Box, Stack, Button } from "@mui/material";
import useRegisterForm from "../containers/useRegisterForm";

const RegisterForm = () => {
  const {
    handleRegisterUser,
    handleChangeFieldValue,
    setFirstName,
    setLastName,
    setEmail,
    errors,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    firstName,
    lastName,
    email,
  } = useRegisterForm();
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        gap: "24px",
      }}
    >
      <Typography variant="h1">Register</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <TextField
          name={FIRST_NAME}
          error={Boolean(errors[FIRST_NAME])}
          helperText={errors[FIRST_NAME]}
          onChange={(event) => handleChangeFieldValue(event, setFirstName)}
          value={firstName}
          id="first-name"
          label="First Name"
          variant="outlined"
          size="small"
        />
        <TextField
          name={LAST_NAME}
          value={lastName}
          error={Boolean(errors[LAST_NAME])}
          helperText={errors[LAST_NAME]}
          onChange={(event) => handleChangeFieldValue(event, setLastName)}
          id="last-name"
          label="Last Name"
          variant="outlined"
          size="small"
        />
        <TextField
          name={EMAIL}
          id="e-mail"
          helperText={errors[EMAIL]}
          label="E-mail"
          variant="outlined"
          size="small"
          value={email}
          error={Boolean(errors[EMAIL])}
          onChange={(event) => handleChangeFieldValue(event, setEmail)}
        />
        <Button variant="contained" onClick={handleRegisterUser}>
          Register
        </Button>
      </Box>
    </Stack>
  );
};

export default RegisterForm;
