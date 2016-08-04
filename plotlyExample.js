var plotly = require('plotly')('InchanHwang','zm8tfmlhyx');

//var plotly = require('https://cdn.plot.ly/plotly-latest.min.js');
var data = [
  {
    x: ["giraffes", "orangutans", "monkeys"],
    y: [20, 14, 23],
    type: "bar"
  }
];
var graphOptions = {filename: "basic-bar", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
