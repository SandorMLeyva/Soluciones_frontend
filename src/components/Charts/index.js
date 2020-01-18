import React from "react";
import { Bar, Doughnut, Line} from "react-chartjs-2";
import PropTypes from "prop-types";
import { getRndInteger } from "../../helpers";


const Chart = (props) => {
    const {bar, doughnut, poly, label, x, y } = props;

    // TODO: replace colors
    let data = {
        labels: y,
        datasets: [
            {
                label: label,
                data: x,
                fill: true,
                backgroundColor: x.map(_=> `rgb(${getRndInteger(0,255)},${getRndInteger(0,255)},${getRndInteger(0,255)},0.7)`),
                borderColor: x.map(_=> `rgb(${getRndInteger(0,255)},${getRndInteger(0,255)},${getRndInteger(0,255)})`),
                borderWidth: 1
            }
        ]
    };

    if(bar)    
        return <Bar data={data} height={300} />
    if(doughnut)    
        return <Doughnut data={data} height={300} />
    if(poly)    
        return <Line data={data} height={300} />
}

Chart.propTypes = {
    bar: PropTypes.bool,
    doughnut: PropTypes.bool,
    poly: PropTypes.bool,
    label: PropTypes.string,
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.string),
    
};
Chart.defaultProps = {
    bar: false,
    doughnut: false,
    poly: false,
    label: "",
    y: [],
    x: []
};

export default Chart;