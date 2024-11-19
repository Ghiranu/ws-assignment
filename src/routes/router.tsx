import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterForm from "../authentication/components/RegisterForm";
import TaskList from "../tasks/components/TaskList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  { path: "/tasks", element: <TaskList /> },
]);
