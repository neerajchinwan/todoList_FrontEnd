import './App.css';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import {  Container }  from 'react-bootstrap';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  }
]);
function App() {
  return (
    <Container fluid>
      <RouterProvider router={router} />
    </Container>
    
  );
}

export default App;
