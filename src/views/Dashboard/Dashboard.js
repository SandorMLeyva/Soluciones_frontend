// import React from "react";
// // react plugin for creating charts
// // @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
// // @material-ui/icons
// // core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// import Chart from "components/Charts";
// import Chip from '@material-ui/core/Chip';

// const useStyles = makeStyles(styles);

// export default function Dashboard() {
//   return (
// <div>
//   <GridContainer>
//     <GridItem xs={12} sm={12} md={4}>
//       <Card chart>
//         <CardHeader color="success">
//         </CardHeader>
//         <CardBody>
//           <Chart doughnut x={[1, 2, 3, 4]} y={['sand', 'mar', 'tin', 'ley']} />
//         </CardBody>
//       </Card>
//     </GridItem>
//     <GridItem xs={12} sm={12} md={4}>
//       <Card chart>
//         <CardHeader color="warning">
//         </CardHeader>
//         <CardBody>
//           <Chart poly x={[1, 2, 3, 4]} y={['sand', 'mar', 'tin', 'ley']} />
//         </CardBody>
//       </Card>
//     </GridItem>
//     <GridItem xs={12} sm={12} md={4}>
//       <Card chart>
//         <CardHeader color="danger">
//         </CardHeader>
//         <CardBody>
//           <Chart bar x={[1, 2, 3, 4]} y={['sand', 'mar', 'tin', 'ley']} />
//         </CardBody>
//       </Card>
//     </GridItem>
//   </GridContainer>
//   <Chip color="secondary" label="25 Servicios sin asignar" clickable href="#chip" />
//   <Chip color="primary" label="12 Servicios Asignados" clickable href="#chip" />
//   <Chip color="default" label="15 Servicios en proceso" clickable href="#chip" />



// </div>
//   );
// }
import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { GET_COUNT_SERVICE } from "Query";
import { useQuery } from "@apollo/react-hooks";
import Chart from "components/Charts";


import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const upen = useQuery(GET_COUNT_SERVICE, {
    variables: { state: "UPEN" }
  });

  const apen = useQuery(GET_COUNT_SERVICE, {
    variables: { state: "APEN" }
  });

  const proc = useQuery(GET_COUNT_SERVICE, {
    variables: { state: "PROC" }
  });

  let fin = useQuery(GET_COUNT_SERVICE, {
    variables: { state: "FIN" }
  });
  if (upen.loading) return <p>Loading...</p>;
  if (upen.error) return <p>No se encontro esta entrada</p>;
  const UPEN = upen.data.servicesCount.count;
  if (apen.loading) return <p>Loading...</p>;
  if (apen.error) return <p>No se encontro esta entrada</p>;
  const APEN = apen.data.servicesCount.count;
  if (proc.loading) return <p>Loading...</p>;
  if (proc.error) return <p>No se encontro esta entrada</p>;
  const PROC = proc.data.servicesCount.count;
  if (fin.loading) return <p>Loading...</p>;
  if (fin.error) return <p>No se encontro esta entrada</p>;
  const FIN = fin.data.servicesCount.count;


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger " stats icon>
              <CardIcon color="danger">
                <h5>Servicios sin asignar</h5>
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {UPEN}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <h4>Servicios asignados</h4>
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {APEN}
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <h5>Servicios en proceso</h5>
              </CardIcon>
              <h3 className={classes.cardTitle}>{PROC}</h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <h5>Servicios finalizados</h5>
              </CardIcon>
              <h3 className={classes.cardTitle}>{FIN}</h3>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
              </CardHeader>
              <CardBody>
                <Chart doughnut x={[1, 2, 3, 4]} y={['sand', 'mar', 'tin', 'ley']} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
              </CardHeader>
              <CardBody>
                <Chart poly x={[1, 2, 3, 4]} y={['sand', 'mar', 'tin', 'ley']} />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
              </CardHeader>
              <CardBody>
                <Chart bar x={[1, 2, 3, 4]} y={['sand', 'mar', 'tin', 'ley']} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
