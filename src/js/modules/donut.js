// function addDonutBox(shareRequest) {
//   let ctx2 = document.getElementById("myDonut").getContext("2d");
//   let breakdownsParts = shareRequest.breakdowns[0].parts;
//   let data = [];
//   let colors=['#5579f7', '#e965cb', '#ff7688', '#ffab58', '#dfc84f', '#acca53', '#73c866', '#0bc381', '#b26ee7', '#ff66a9', '#ff8f6b', '#f7c655', '#c6c94f', '#91c95b', '#50c673', '#0bc381'] ;
//   for(let i=0; i<=breakdownsParts.length-1; i++){
//     data.push(breakdownsParts[i].percent);
//   }
//   data.sort(function(a,b) {
//     return b-a;
//   });
//   data.push(shareRequest.breakdowns[0].cash.percent);
//   let labels = colors.slice(0, data.length);


//   // ctx.fillText(value, posX - w_offset, posY + h_offset);

//   let myDonut = new Chart(ctx2, {
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//       cutout: "47%",
//     },
//     showTooltips: false,
//     type: 'doughnut',
//     data: {
//       datasets: [{
//         data: data,
//         backgroundColor: labels,
//         backgroundOpacity: 1,
//         borderColor: 'transparent',
//         showTooltips: false,
//       }],
//       labels: labels,
//     },
//   });
// }
function addDonutBox(shareRequest) {
  // var canvas = document.getElementById("myDonut");
  var ctx2 = document.getElementById("myDonut").getContext('2d');
  // Chart.defaults.global.defaultFontColor = 'black';
  // Chart.defaults.global.defaultFontSize = 16;
  let breakdownsParts = shareRequest.breakdowns[0].parts;
  let datas = [];
  let colors=['#5579f7', '#e965cb', '#ff7688', '#ffab58', '#dfc84f', '#acca53', '#73c866', '#0bc381', '#b26ee7', '#ff66a9', '#ff8f6b', '#f7c655', '#c6c94f', '#91c95b', '#50c673', '#0bc381'] ;
  for(let i=0; i<=breakdownsParts.length-1; i++){
    datas.push(breakdownsParts[i].percent);
  }
  datas.sort(function(a,b) {
    return b-a;
  });
  datas.push(shareRequest.breakdowns[0].cash.percent);
  let labels = colors.slice(0, datas.length);
  var theHelp = Chart.helpers;
  var data = {
    labels: labels,
    datasets: [{
      fill: true,
      backgroundColor: labels,
      data: datas,
      borderColor: ['black', 'black'],
      borderWidth: [2, 2]
    }]
  };
  var options = {
    title: {
      display: true,
      text: 'What happens when you lend your Hoodie to a girl ?',
      position: 'top'
    },
    // rotation: -0.7 * Math.PI,
    legend: {
      display: false,
      // generateLabels changes from chart to chart,  check the source,
      // this one is from the doughut :
      // https://github.com/chartjs/Chart.js/blob/master/src/controllers/controller.doughnut.js#L42
      labels: {
        generateLabels: function(chart) {
          var data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map(function(label, i) {
              var meta = chart.getDatasetMeta(0);
              var ds = data.datasets[0];
              var arc = meta.data[i];
              var custom = arc && arc.custom || {};
              var getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
              var arcOpts = chart.options.elements.arc;
              var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
              var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
              var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                return {
                // And finally :
                text: ds.data[i] + "% of the time " + label,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                index: i
              };
            });
          }
          return [];
        }
      }
    }
  };

  // Chart declaration:
  var myDonut = new Chart(ctx2, {
    type: 'doughnut',
    data: data,
    options: options
  });

  console.log(myDonut.generateLegend());



  //Plugin from githubExample:
  //https://github.com/chartjs/Chart.js/blob/master/samples/data_labelling.html


  Chart.plugins.register({
    afterDatasetsDraw: function(chartInstance, easing) {
      // To only draw at the end of animation, check for easing === 1
      var ctx = chartInstance.chart.ctx;
      chartInstance.data.datasets.forEach(function(dataset, i) {
        var meta = chartInstance.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = 'grey';
            var fontSize = 16;
            var fontStyle = 'normal';
            var fontFamily = 'Helvetica Neue';
            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            // Just naively convert to string for now
            var dataString = dataset.data[index].toString();
            // Make sure alignment settings are correct
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var padding = 5;
            var position = element.tooltipPosition();
            ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
          });
        }
      });
    }
  });

}
