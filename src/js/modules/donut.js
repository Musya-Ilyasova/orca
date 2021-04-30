let data;
let other;
let myDonut;
let breakdown = 0;
let names = [];
let partsList = [];
let donutMap = new Object();
let colors=['#5579f7', '#e965cb', '#ff7688', '#ffab58', '#dfc84f', '#acca53', '#73c866', '#0bc381', '#b26ee7', '#ff66a9', '#ff8f6b', '#f7c655', '#c6c94f', '#91c95b', '#50c673', '#0bc381'] ;

function collectDonutObj(shareRequest) {
  data=[];
  other=[];
  let breakdownsParts = shareRequest.breakdowns[breakdown].parts;

  for(let i=0; i<=breakdownsParts.length-1; i++){
    if(breakdownsParts[i].percent<7){
      other.push(breakdownsParts[i].percent);
    }else {
      data.push(Math.round(breakdownsParts[i].percent));
    }
  }
  let otherSum = 0;
  let dataSum = 0;
  for(let i=0; i<=other.length-1; i++) {
    otherSum+=other[i];
  };
  otherSum = Math.round(otherSum);
  data.push(Math.round(shareRequest.breakdowns[breakdown].cash.percent));
  for(let i=0; i<=data.length-1; i++) {
    dataSum+=data[i];
  }
  if(dataSum+otherSum-100<0) {
    otherSum-dataSum+otherSum-100;
  } else if(dataSum+otherSum-100>0) {
    otherSum+dataSum+otherSum-100;
  }
  if(otherSum>0) {
    data.push(otherSum);
  };

  data.sort(function(a,b) {
    return b-a;
  });
}




function addSectors(shareRequest) {
  let sectorsList = document.querySelector('.breakdown-donut-volums-list');
  partsList = [];
  names=[];
  let otherItem = {
    name: 'Other',
    count: 0,
    percent: 0,
  };
  let cash = {
    name: 'Cash',
    percent: 0,
  };
  let partsObj = shareRequest.breakdowns[breakdown].parts;
  let countOther = 0;
  for(let i =0; i<=partsObj.length-1; i++) {
    if(partsObj[i].percent<7) {
      countOther++;
    }
  };
  if(countOther<=1) {
    for(let i =0; i<=partsObj.length-1; i++) {
      partsList.push(partsObj[i]);
    };
  } else if(countOther>1) {
    for(let i =0; i<=partsObj.length-1; i++) {
      if(partsObj[i].percent<7) {
        otherItem.count+=partsObj[i].count;
        otherItem.percent+=partsObj[i].percent;
      } else {
        partsList.push(partsObj[i]);
      };
    };
    partsList.push(otherItem);
  };

  cash.percent = shareRequest.breakdowns[0].cash.percent;
  partsList.push(cash);
  partsList=partsList.sort(function (a, b){
    if (a.percent < b.percent) return 1;
    if (a.percent > b.percent) return -1;
    return 0;
  });
  for (let i=0; i<=partsList.length-1; i++) {
    names.push(partsList[i].name);
    let li = document.createElement('li');
    li.classList.add('breakdown-donut-volums-list-item');
    li.setAttribute('data-nameBreakdown', shareRequest.breakdowns[breakdown].name);
    let spanTitle = document.createElement('span');
    spanTitle.classList.add('breakdown-donut-volums-list-item__title');
    spanTitle.innerText = partsList[i].name;
    let spanAssets= document.createElement('span');
    spanAssets.classList.add('breakdown-donut-volums-list-item__assets');
    spanAssets.innerText = partsList[i].count + " assets";
    let spanVolume= document.createElement('span');
    spanVolume.classList.add('breakdown-donut-volums-list-item__volume');
    spanVolume.innerText = Math.round(partsList[i].percent) + "%";
    li.appendChild(spanTitle);
    li.appendChild(spanVolume);
    li.appendChild(spanAssets);
    sectorsList.appendChild(li);
    li.style.borderColor=colors[i];

    if(partsList[i].name==="Cash") {
      spanAssets.innerText="";
    }
  }
  showAll(sectorsList);
}

function addDonutBox(shareRequest) {
  donutMap = [];
  let labels = colors.slice(0, data.length);
  for(let i=0; i<=data.length-1; i++) {
    donutMap.push({
      name: names[i],
      y: data[i],
      color: labels[i]
    });
  };
  Highcharts.chart('myDonut', {
    chart: {
      plotBackgroundColor: 'black',
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      borderColor: null,
      events: {
        load: function() {
          const series = this.series[0];
          const points = series.data;
          const chart = this;
          // points.forEach(function(point) {
          //     if (point.y > 7) {
          //     const myOffset = 50;
          //     const {x: centerX, y: centerY} = point.graphic.attr();
          //     const {x, y} = point.dataLabel.attr();
          //     const angle = point.angle;
          //     point.dataLabel.attr({
          //       x: x + Math.cos(angle) * myOffset,
          //       y: y + Math.sin(angle) * myOffset
          //     });
          //   }
          // });
        }
      }
    },
    exporting: {
      enabled: false
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: 'Persent: <b>{point.y}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          distance: -40,
          format: '{y} %',
          className : 'donutPersent'
        },
        shadow: false,
      }
    },
    series: [{
      name: 'Persent',
      colorByPoint: true,
      innerSize: '43%',
      data: donutMap,
      colors: labels,
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        }
      }
    }]
  });
}



function removeSectors() {
  let sectorsList = document.querySelector('.breakdown-donut-volums-list');
  let li  = sectorsList.querySelectorAll('li');
  li.forEach(i=>sectorsList.removeChild(i));
}

function showAll(partList) {
  let btn = document.querySelector('.breakdown-donut-volums__btn');
  let items = document.querySelectorAll('.breakdown-donut-volums-list-item');
  let height=0;
  if (partList.childNodes.length>5) {
    for(let i=0;i<=4; i++) {
      height += items[i].offsetHeight + 20;
    }
    partList.style.height = height + "px";
    btn.style.display = "block";
  }else {
    partList.style.height = "";
    btn.style.display = "";
  }
  btn.addEventListener('click', function() {
    partList.style.height = "";
    this.style.display = "";
  })
}


function toggleDonutLink(shareRequest) {
  let donutLink = document.querySelectorAll('.breakdown-donut-list__item');
  donutLink.forEach((item)=> {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      for(let i=0; i<=donutLink.length-1; i++) {
        donutLink[i].classList.remove('active');
      };
      breakdown=Number(this.dataset.breakdown);
      this.classList.add('active');
      myDonut.destroy();
      removeSectors();
      addSectors(shareRequest);
      collectDonutObj(shareRequest);
      addDonutBox(shareRequest);
    })
  });
}


// function addDonutBox(shareRequest) {
//   let ctx2 = document.getElementById("myDonut").getContext("2d");
//   let labels = colors.slice(0, data.length);
//   myDonut = new Chart(ctx2, {
//     options: {
//       responsive: true,
//       layout: {
//         padding: {
//           top: 10,
//           bottom: 10
//         }
//       },
//       events: [],
//       showTooltips: false,
//       animation: {
//         onComplete: function () {
//           let ctx2 = this.ctx;
//           let midX = this.width-20;
//           let midY = this.height+25;
//           let cut = Number(this.options.cutout.replace('%',''))/100;

//           let start_angle=4.4,
//           slice_angle=0,
//           total_value = 100;
//           this.data.datasets.forEach(function(dataset) {
//             for (let i = 0; i < dataset.data.length; i++) {
//               let val = dataset.data[i];
//               if (val>7) {
//                 slice_angle = 2 * Math.PI * val / total_value;
//                 let pieRadius = Math.min(midX/2, midY/2);
//                 let labelX =midX/2 + midY/4 * Math.cos(start_angle + slice_angle/2);
//                 let labelY = midY/2 + midY/4 * Math.sin(start_angle + slice_angle/2);
//                 var offset = (pieRadius * cut) / 2-5;
//                 labelX = midX/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
//                 labelY = midY/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
//                 var labelText = Math.round(100 * val / total_value);
//                 ctx2.fillStyle = "white";
//                 ctx2.font = "bold 21px Inter";
//                 if ((start_angle<5 || start_angle>9) && slice_angle>2) {
//                   labelY+=20;
//                 } else if(start_angle>9 && slice_angle<0.8) {
//                   labelY-=10;
//                 } else if(start_angle>9 && slice_angle>0.8 && slice_angle<2) {
//                   labelY-=20;
//                 } else if(start_angle>5 && start_angle<=7 && slice_angle<2) {
//                   labelX-=25;


//                 } else if(start_angle>7 && start_angle<=9 && slice_angle<2) {
//                   labelX-=15;
//                   labelY+=20;
//                 } else if(start_angle>7 && start_angle<=9 && slice_angle>=2) {
//                   labelX+=10;
//                   labelY+=10;
//                 };
//                 if(start_angle<5 && slice_angle>3) {
//                   labelY-=10;
//                   labelX-=20;
//                 } else if(start_angle>7 && start_angle<=9 && slice_angle<2) {
//                   labelY-=35;
//                 } else if(start_angle>7 && start_angle<=9 && slice_angle>=2) {
//                   labelY-=45;
//                 } else if(start_angle>9 && slice_angle<2) {
//                   labelY+=10;
//                 };

//                 ctx2.fillText(labelText+"%", labelX, labelY);
//                 start_angle += slice_angle;
//               }
//             }
//           });
//         }
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         tooltip: {
//           enabled: false,
//         },
//         // tooltip: {
//         //   // usePointStyle: true,
//         //   // displayColors: false,
//         //   // callbacks: {
//         //   //   label: function(context) {
//         //   //     context.dataset.fill=false;
//         //   //     var label = context.label || '';
//         //   //     return label = Math.round(context.parsed * 100) / 100 + '%';
//         //   //   },
//         //   // },
//         //   intersect: false,
//         //   displayColors: false,
//         // },
//       },
//       cutout: "47%",
//     },
//     type: 'doughnut',
//     data: {
//       datasets: [{
//         data: data,
//         backgroundColor: labels,
//         backgroundOpacity: 1,
//         borderColor: 'transparent',
//         // hoverOffset: 4
//       }],
//       labels: labels,
//     },
//   });
// }


