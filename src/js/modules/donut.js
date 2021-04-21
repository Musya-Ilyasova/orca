let data = [];
let colors=['#5579f7', '#e965cb', '#ff7688', '#ffab58', '#dfc84f', '#acca53', '#73c866', '#0bc381', '#b26ee7', '#ff66a9', '#ff8f6b', '#f7c655', '#c6c94f', '#91c95b', '#50c673', '#0bc381'] ;
function addDonutBox(shareRequest) {
  let ctx2 = document.getElementById("myDonut").getContext("2d");
  let breakdownsParts = shareRequest.breakdowns[0].parts;
  for(let i=0; i<=breakdownsParts.length-1; i++){
    data.push(breakdownsParts[i].percent);
  }
  data.sort(function(a,b) {
    return b-a;
  });
  data.push(shareRequest.breakdowns[0].cash.percent);
  let labels = colors.slice(0, data.length);

  let myDonut = new Chart(ctx2, {
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
              return label = Math.floor(context.parsed * 100) / 100 + '%';
            },
          },
          // backgroundColor: 'rgba(0, 0, 0, 0.0)',
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
  let partsList = shareRequest.breakdowns[0].parts;
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
    spanVolume.innerText = Math.floor(partsList[i].percent) + "%";
    li.appendChild(spanTitle);
    li.appendChild(spanVolume);
    li.appendChild(spanAssets);
    sectorsList.appendChild(li);
    li.style.borderColor=colors[i];
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

