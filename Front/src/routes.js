import ProdutosInfo from "views/ProdutosInfo.js";
import Produtos from "views/Produtos.js";
import Home from "views/Home.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import Login from "views/Login";
import Register from "views/Register";

var routes = [
  {
    path: "/Home",
    name: "Home",
    icon: "tim-icons icon-atom",
    component: Home,
    layout: "/user",
    admin: false,
  },
  {
    path: "/Produtos",
    name: "Produtos",
    icon: "tim-icons icon-atom",
    component: Produtos,
    layout: "/user",
    admin: true,
  },
  {
    path: "/Produtos/info",
    name: "Produtos info",
    icon: "tim-icons icon-atom",
    component: ProdutosInfo,
    layout: "/user",
    admin: true,
  },
  {
    path: "/notifications",
    name: "Categorias",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/user",
    admin: false,
  },
  {
    path: "/tables",
    name: "Banco de dados",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/user",
    admin: true,
  },
  {
    path: "/user-profile",
    name: "Conta",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/user",
    admin: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "tim-icons icon-chart-pie-36",
    component: Login,
    layout: "/auth",
    admin: false,
  },
  {
    path: "/register",
    name: "Registrar",
    icon: "tim-icons icon-chart-pie-36",
    component: Register,
    layout: "/auth",
    admin: false,
  },
];
export default routes;
