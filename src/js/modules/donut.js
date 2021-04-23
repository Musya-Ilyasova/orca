let data = [];
let other = [];
let myDonut;
let breakdown = 0;

let colors=['#5579f7', '#e965cb', '#ff7688', '#ffab58', '#dfc84f', '#acca53', '#73c866', '#0bc381', '#b26ee7', '#ff66a9', '#ff8f6b', '#f7c655', '#c6c94f', '#91c95b', '#50c673', '#0bc381'] ;

function collectDonutObj(shareRequest) {
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
  data.push(otherSum);
  data.sort(function(a,b) {
    return b-a;
  });
}

function addDonutBox(shareRequest) {
  let ctx2 = document.getElementById("myDonut").getContext("2d");
  let labels = colors.slice(0, data.length);
  myDonut = new Chart(ctx2, {
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          usePointStyle: true,
          callbacks: {
            label: function(context) {
              context.dataset.fill=false;
              var label = context.label || '';
              return label = Math.round(context.parsed * 100) / 100 + '%';
            },
          },
          intersect: false,
          displayColors: false,
        },
      },
      cutout: "47%",
    },
    showTooltips: false,
    type: 'doughnut',
    data: {
      datasets: [{
        data: data,
        backgroundColor: labels,
        backgroundOpacity: 1,
        borderColor: 'transparent',
        showTooltips: false,
      }],
      labels: labels,
    },
  });
}

function addSectors(shareRequest) {
  let sectorsList = document.querySelector('.breakdown-donut-volums-list');
  let partsList = [];
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

  for(let i =0; i<=partsObj.length-1; i++) {
    if(partsObj[i].percent<7) {
      otherItem.count+=partsObj[i].count;
      otherItem.percent+=partsObj[i].percent;
    } else {
      partsList.push(partsObj[i]);
    };
  };

  partsList.push(otherItem);
  cash.percent = shareRequest.breakdowns[0].cash.percent;
  partsList.push(cash);
  partsList=partsList.sort(function (a, b){
    if (a.percent < b.percent) return 1;
    if (a.percent > b.percent) return -1;
    return 0;
  });

  for (let i=0; i<=partsList.length-1; i++) {
    let li = document.createElement('li');
    li.classList.add('breakdown-donut-volums-list-item');
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

function showAll(partList) {
  let btn = document.querySelector('.breakdown-donut-volums__btn');
  if (partList.childNodes.length>5) {
    partList.style.height = "324px";
    btn.style.display = "block";
  }
  btn.addEventListener('click', function() {
    partList.style.height = "";
    this.style.display = "";
  })
}


function toggleDonutLink(breakdownsParts) {
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
      addSectors(breakdownsParts);
      // sharedFieldInner(shareRequest);
      // dataTimeInner(shareRequest);
      // myChart.destroy();
      // addChartBox(shareRequest);
    })
  });
}
