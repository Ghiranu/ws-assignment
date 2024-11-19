import { Box, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { ROUTES, CURRENT_USER_LOCAL_STORAGE_KEY_NAME } from "./utils/constants";

function App() {
  const navigate = useNavigate();

  const handleNavigateToRegisterPage = () => {
    navigate(ROUTES.REGISTER);
  };

  const handleLogin = () => {
    const currentUser = localStorage.getItem(
      CURRENT_USER_LOCAL_STORAGE_KEY_NAME
    );
    const isUserDefined = currentUser !== null;
    if (isUserDefined) {
      navigate(ROUTES.TASK);
    } else {
      navigate(ROUTES.REGISTER);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", gap: "24px", justifyContent: "center" }}>
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
        <Button onClick={handleNavigateToRegisterPage} variant="contained">
          Register
        </Button>
      </Box>
      <Outlet />
    </>
  );
}

export default App;
