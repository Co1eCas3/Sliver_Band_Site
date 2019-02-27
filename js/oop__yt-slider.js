const vids = Array.from(document.getElementById('vids__slider-container').children);
vids[0].className = 'vids__slider-current';

const descript = document.getElementById('vids__descript');
const vidCapts = ['Get our E.P. on <a href="https://itunes.apple.com/us/album/sliver-ep/1363591550">iTunes</a> or stream it on <a href="https://open.spotify.com/album/5lTh2egXFG5RT2CT25MhSn?si=x0fiaadtQZmmv9G_85QQLg">Spotify</a>',
    'Preview our single now!!',
    'A demo vid for interested parties ;)'];
descript.innerHTML = vidCapts[0];
  
const vidSliderControls = Array.from(document.querySelectorAll('.vids__slider-arrow'));
for(arrow in vidSliderControls) {
  vidSliderControls[arrow].addEventListener('click', slideVids);
}

const vidsLocate = document.getElementById('vids__locate');
 
for(let vid = 0; vid < vids.length; vid++){
  let vidsLocatePoint = document.createElement('li');

  vidsLocatePoint.className = 'vids__locate-point';

  if(vid === 0){
    vidsLocatePoint.innerHTML = '&#9679;';
  } else {
    vidsLocatePoint.innerHTML = '&#9675;';
  }

  vidsLocate.appendChild(vidsLocatePoint);
}

function slideVids() {
  for(arrow in vidSliderControls) {
    vidSliderControls[arrow].removeEventListener('click', slideVids);
  }

  const locatePoints = document.querySelectorAll('.vids__locate-point');
  let vidOn = vids.indexOf(document.querySelectorAll('.vids__slider-current')[0]);
  let nextVid,
      slideDir,
      vidSlideParam;

  if(this.id === 'vids__slider-right') {
    slideDir = 'slide-left';
    vidSlideParam = '-100%';

    if(vidOn === vids.length - 1) {
      nextVid = 0;
    } else {
      nextVid = vidOn + 1;
    }

  } else {
    slideDir = 'slide-right';
    vidSlideParam = '100%';
    
    if(vidOn === 0) {
      nextVid = vids.length - 1;
    } else {
      nextVid = vidOn - 1;
    }
  }

  const sliderRule = `
    @keyframes ${slideDir} {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(${vidSlideParam})
      }
    }`;

  const vidItems = {
    vidFrom: vids[vidOn],
    captFrom: vidCapts[vidOn],
    pointFrom: locatePoints[vidOn],
    vidTo: vids[nextVid],
    captTo: vidCapts[nextVid],
    pointTo: locatePoints[nextVid],
  }

  vidItems.pointFrom.innerHTML = '&#9675;';
  vidItems.pointTo.innerHTML = '&#9679;'

  const writtenSliderRule = new NewRule(document.styleSheets, slideDir, sliderRule);
  writtenSliderRule.grabSheet();

  vidItems.vidFrom.classList += ' main__anims-trans';

  firstAnimHandler = () => nextSlideIn(event, vidItems, slideDir, writtenSliderRule);
  vidItems.vidFrom.addEventListener('animationend', firstAnimHandler);

  vidItems.vidFrom.style = `animation-name: ${slideDir}; animation-timing-function: ease-in;`;
  descript.className = 'home__anims-vidDescriptFade';
}

function nextSlideIn(e, objs, ruleName, writtenRule) {
  objs.vidFrom.removeAttribute('class');
  objs.vidFrom.removeAttribute('style');
  objs.vidFrom.removeEventListener('animationend', firstAnimHandler);
  descript.innerHTML = objs.captTo;
  writtenRule.resetRule();

  let initPos,
      secSlideParams;

  if(ruleName === 'slide-left') {
    initPos = '100%';
  } else {
    initPos = '-100%';
  }

  secSlideParams = `
    @keyframes ${ruleName} {
      from {
        transform: translateX(${initPos});
      }
      to {
        transform: translateX(0);
      }
    }`;

  const secWrittenRule = new NewRule(document.styleSheets, ruleName, secSlideParams);
  secWrittenRule.grabSheet();
  secondAnimHandler = () => resetVidSlider(event, objs, secWrittenRule);

  objs.vidTo.addEventListener('animationend', secondAnimHandler);
  objs.vidTo.className = 'vids__slider-current main__anims-trans';
  objs.vidTo.style = `animation-name: ${ruleName}; animation-timing-function: ease-out; transform: translateX(${initPos};);`
}

function resetVidSlider(e, objs, writtenRule) {
  objs.vidTo.className = 'vids__slider-current';
  objs.vidTo.removeAttribute('style');
  objs.vidTo.removeEventListener('animationend', secondAnimHandler);
  descript.removeAttribute('class');
  writtenRule.resetRule();

  for(arrow in vidSliderControls) {
    vidSliderControls[arrow].addEventListener('click', slideVids);
  }
}