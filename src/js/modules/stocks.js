function filterStocks(shareRequest) {
  let stocksObj = [],
  etfObj = [],
  i = 0;
  let stocksList = document.querySelector('.stocks-list'),
  etfList = document.querySelector('.stocks-list_etf');
  let symbolsObj = shareRequest.symbols;
  for(i in symbolsObj) {
    let symbol = symbolsObj[i];
    if(symbol.type === "EQUITY") {
      stocksObj.push(symbol);
    } else  {
      etfObj.push(symbol)
    };
  };
  addStocks(stocksObj, stocksList);
  addStocks(etfObj, etfList);
  addStocksTags(stocksObj);
  toggleStocksTags(stocksObj);
  overflowTitlesStocks();
}

function addStocks(listObj, appendList) {
  if(Object.keys(listObj).length>0) {
    let i=0;
    for (i in listObj) {
      let li = document.createElement('li');
      li.classList.add('stocks-list-item')
      let img = document.createElement('img');
      img.src = listObj[i].logo;
      img.classList.add('stocks-list-item__img');
      let title = document.createElement('span');
      title.classList.add('stocks-list-item__title');
      title.innerText = listObj[i].name;
      let percent= document.createElement('span');
      percent.classList.add('stocks-list-item__percent');
      if(listObj[i].change_percent<0) {
        percent.classList.add('down');
      };
      percent.innerText = (Math.round(listObj[i].change_percent*100)/100) + '%';
      li.appendChild(img);
      li.appendChild(title);
      li.appendChild(percent);
      if(appendList.dataset.list == "EQUITY") {
        li.setAttribute("data-industry", listObj[i].industry);
      };
      appendList.appendChild(li);
    }
  } else {
    hideEtf(appendList);
  }
}
function hideEtf(appendList) {
  appendList.style.display="none";
  let listVal = appendList.dataset.list;
  let listTitle = document.querySelector(`.stocks__subtitle[data-title="${listVal}"]`)
  listTitle.style.display="none";
}
function showEtf(appendList) {
  appendList.style.display="";
  let listVal = appendList.dataset.list;
  let listTitle = document.querySelector(`.stocks__subtitle[data-title="${listVal}"]`)
  listTitle.style.display="";
}

function addStocksTags(stocksObj) {
  let i=0;
  let industry = [];
  for(i in stocksObj) {
    industry.push(stocksObj[i].industry);
  }
  industry = industry.filter(function (e, i, industry) {
    return industry.lastIndexOf(e) === i;
  });
  let stocksTags = document.querySelector('.stocks-tags');
  for(i=0; i<=industry.length-1; i++) {
    let li = document.createElement('li');
    li.classList.add('stocks-tags-item');
    let a = document.createElement('a');
    a.innerText = industry[i];
    a.classList.add('stocks-tags-item__link');
    li.appendChild(a);
    stocksTags.appendChild(li);
  }
  tagsWidth(stocksTags);
}

function tagsWidth(stocksTags) {
  let stockTagsWidth = stocksTags.scrollWidth;
  if (window.innerWidth < 768) {
    stocksTags.style.width=stockTagsWidth + 20 + 'px';
  } else {
    stocksTags.style.width="";
  }
  window.addEventListener('resize', function(event){
    if (window.innerWidth < 768) {
      stocksTags.style.width=stockTagsWidth + 20 + 'px';
    } else {
      stocksTags.style.width="";
    }
  });
}


function toggleStocksTags(stocksObj) {
  let tag = document.querySelectorAll('.stocks-tags-item__link');
  let stockListItem = document.querySelectorAll('.stocks-list-item');
  let etfList = document.querySelector('.stocks-list_etf');
  tag.forEach((item) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      tag.forEach((i) => {
        i.classList.remove('active');
      });
      item.classList.add('active');
      if(item.dataset.category === 'all'){
        stockListItem.forEach((i) => {
          i.style.display = '';
        });
        if(etfList.hasChildNodes()) {
          showEtf(etfList);
        };
      } else {
        if(etfList.hasChildNodes()) {
          hideEtf(etfList);
        };
        stockListItem.forEach((i) => {
          if(item.innerText===i.dataset.industry) {
            i.style.display = '';
          }else {
            i.style.display = 'none';
          }
        });
      };
    });
  });
};

function overflowTitlesStocks() {
  let title = document.querySelectorAll('.stocks-list-item__title'),
  size = 12;
  title.forEach((i)=>{
    let newTitle = i.innerText;
    let temporary = i.innerText;
    if(newTitle.length > size){
      i.classList.add('long');
      newTitle = newTitle.slice(0, size) + '...';
      i.innerText=newTitle;
      i.addEventListener('mouseover', function(){
        i.innerText = temporary;
        i.style.overflow="visible";
        i.style.width="125px";
      });
      i.addEventListener('mouseout', function(){
        i.innerText=newTitle;
        i.style.overflow="hidden";
        i.style.width="";
      })
    };
  });
};



