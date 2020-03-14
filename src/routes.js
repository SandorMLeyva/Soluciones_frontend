/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import WorkshopEntry from "views/WorkshopEntry";
import RoadEntry from "views/RoadEntry";
import RoadEntryDetail from "views/RoadEntryDetails";
import EntryDetail from "views/EntryDetails";
import Services from "views/WorkshopService";
// core components/views for RTL layout

export const navBar = [
  {
    path: "inicio",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/"
  },
  {
    path: "trabajostaller",
    name: "Trabajos en el Taller",
    icon: Person,
    component: WorkshopEntry,
    layout: "/"
  },
  {
    path: "trabajoscalle",
    name: "Trabajos en la Calle",
    icon: Person,
    component: RoadEntry,
    layout: "/"
  },
  {
    path: "servicios",
    name: "Servicios",
    icon: "content_paste",
    component: Services,
    layout: "/"
  },
  {
    path: "almacen",
    name: "Almacen",
    icon: "content_paste",
    component: TableList,
    layout: "/"
  },
  {
    path: "estadisticas",
    name: "Estadísticas",
    icon: LibraryBooks,
    component: Typography,
    layout: "/"
  },
  {
    path: "cuentas",
    name: "Cuentas",
    icon: LibraryBooks,
    component: Typography,
    layout: "/"
  },
  {
    path: "clientes",
    name: "Clientes",
    icon: BubbleChart,
    component: Icons,
    layout: "/"
  },
  
];

const routes = [
  {
    path: "detalle/taller/:id",
    component: EntryDetail,
    layout: "/"
  },
  {
    path: "detalle/calle/:id",
    component: RoadEntryDetail,
    layout: "/"
  },
  ...navBar
];

export default routes;
