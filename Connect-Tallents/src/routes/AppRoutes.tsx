import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Integrantes from "../pages/Integrantes";
import Sobre from "../pages/Sobre";
import Contato from "../pages/Contato";
import Global from "../pages/Global";
import Colaboracao from "../pages/Colaboracao";
import Experiencia from "../pages/Experiencia";
import Preparacao from "../pages/Preparacao";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Perfil from "../pages/Perfil";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            }
            ,
            {
                path: "/integrantes",
                element: <Integrantes />
            }
            ,
            {
                path: "/sobre",
                element: <Sobre />
            }
            ,
            {
                path: "/contato",
                element: <Contato />
            }
            ,
            {
                path: "/global",
                element: <Global />
            }
            ,
            {
                path: "/colaboracao",
                element: <Colaboracao />
            }
            ,
            {
                path: "/experiencia",
                element: <Experiencia />
            }
            ,
            {
                path: "/preparacao",
                element: <Preparacao />
            }
            ,
            {
                path: "/login",
                element: <Login />
            }
            ,
            {
                path: "/cadastro",
                element: <Cadastro />
            }
            ,
            {
                path: "/perfil",
                element: <Perfil />
            }
        ]
    }
])
