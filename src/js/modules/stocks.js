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
  addStocks(stocksObj);
}

function addStocks(listObj) {
  if(Object.keys(listObj).length>0) {
    console.log(listObj);
    for (i in listObj) {
      let li = document.createElement('li');
      li.classList.add('stocks-list-item')
      let img = document.createElement('img');
      img.src = stocksObj[i].logo;
      let title = document.createElement('span');
      title.classList.add('stocks-list-item__title');
      title.innerText = stocksObj[i].name;
      let percent= document.createElement('span');
      percent.classList.add('stocks-list-item__percent');
      if(listObj[i].change_percent<0) {
        percent.classList.add('down');
      };
      if() {
        
      }

      percent.innerText = listObj[i].change_percent;
    }
  }
}


