var tabMargin = 0;

function tabSwitch(btn) {
  var node = document.getElementById('main');

  if(tabMargin == 0) {
    node.style.margin = '0';
    btn.style.background = '#aaa';
    tabMargin = 1;
  }else {
    node.style.margin = '0 0 0 -150px';
    btn.style.background = '#fff';
    tabMargin = 0;
  }
}

function starting() {
  var node = document.getElementById('startPage');

  node.style.margin = '-100vh 0 0 0';
}
