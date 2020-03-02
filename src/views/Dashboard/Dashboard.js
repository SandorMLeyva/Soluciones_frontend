import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Chart from "components/Charts";


const useStyles = makeStyles(styles);

export default function Dashboard() {
  return (
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
  );
}
