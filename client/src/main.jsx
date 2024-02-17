import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "../src/components/layout.jsx"
import ErrorPage from "../src/components/errorPage.jsx"
import HomePage from './components/homePage.jsx'
import LoginPage from "./components/loginPage.jsx"
import SignUpPage from './components/signUpPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: "login", element: <LoginPage/>},
      {path: "signup", element: <SignUpPage/>},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
