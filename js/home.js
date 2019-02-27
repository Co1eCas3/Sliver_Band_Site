const musicTab = document.getElementById('home__tab-music');
const vidTab = document.getElementById('home__tab-vids');

musicTab.addEventListener('click', changeTab);
vidTab.addEventListener('click', changeTab);

function changeTab() {
  const container = document.getElementById('home__container');
  const divider = document.getElementById('home__tab-divider');

  if(this === musicTab){
    container.className = 'home__anims home__anims-shiftBgToMusic';
    divider.className = 'home__anims home__anims-shiftDivToMusic';
    container.addEventListener('animationend', setContToMusic);
    divider.addEventListener('animationend', setDivToMusic);
  } else {
    container.className = 'home__anims home__anims-shiftBgToVids';
    divider.className = 'home__anims home__anims-shiftDivToVids';
    container.addEventListener('animationend', contReset);
    divider.addEventListener('animationend', divReset);
  }
}

function setContToMusic() {
  this.className = 'home__cont-onMusic';
  this.removeEventListener('animationend', setContToMusic);
}

function setDivToMusic() {
  this.className = 'home__div-onMusic';
  this.removeEventListener('animationend', setDivToMusic);
}

function contReset() {
  this.className = '';
  this.removeEventListener('animationend', contReset);
}

function divReset() {
  this.className = '';
  this.removeEventListener('animationend', divReset);
}