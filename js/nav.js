const navLinks = Array.from(document.querySelectorAll('.nav__link'));
const sections = Array.from(document.getElementsByTagName('section'));
const headers = Array.from(document.getElementById('title').children);
const toggler = document.getElementById('nav__media-toggle');

sections[0].className = 'sect__current';
headers[0].className = 'sect__current';
navLinks[0].firstElementChild.classList += ' nav__current';


navLinks.forEach(function(el) {
  if(el.id != 'nav__media') {
    el.addEventListener('click', navigate);
  } else {
    el.addEventListener('click', toggleMedia);
  }
});

function navigate() {
  if(toggler.checked === true) {
    toggleMedia();
  }

  const sectOn = navLinks.indexOf(document.querySelectorAll('.nav__current')[0].parentElement);
  const sectSelected = navLinks.indexOf(this);

  const navItems = {
    linkFrom : navLinks[sectOn].firstElementChild,
    sectFrom : sections[sectOn],
    headFrom : headers[sectOn],
    linkTo : navLinks[sectSelected].firstElementChild,
    sectTo : sections[sectSelected],
    headTo : headers[sectSelected]
  };

  navItems.sectFrom.classList += ' main__anims-trans';
  navItems.headFrom.classList += ' main__anims-trans';

  let blurRule = 'blur-out';
  let blurParams = 
    `@keyframes ${blurRule} {
      from {
        filter: blur(0);
      }
      to {
        filter: blur(20px);
      }
    }`;

  let navTransRule = new NewRule(document.styleSheets, blurRule, blurParams);
  navTransRule.grabSheet();

  firstAnimHandler = event => nextSection(event, navItems, blurRule, blurParams, navTransRule);
  navItems.headFrom.addEventListener('animationend', firstAnimHandler);

  navItems.sectFrom.style = `animation-name: ${blurRule}; animation-timing-function: ease-in;`;
  navItems.headFrom.style = `animation-name: ${blurRule}; animation-timing-function: ease-in;`;
  navItems.linkFrom.setAttribute('class', 'nav__icons');
}

function nextSection(e, objs, ruleName, ruleParams, rule){
  objs.sectFrom.removeAttribute('class');
  objs.sectFrom.removeAttribute('style');
  objs.headFrom.removeAttribute('class');
  objs.headFrom.removeAttribute('style');
  objs.headFrom.removeEventListener('animationend', firstAnimHandler);
  rule.resetRule();

  objs.sectTo.className = 'main__anims-trans';
  objs.headTo.className = 'main__anims-trans';

  ruleName = 'blur-in';
  ruleParams = 
    `@keyframes ${ruleName} {
      from {
        filter: blur(20px);
      }
      to {
        filter: blur(0);
      }
    }`;

  rule = new NewRule(document.styleSheets, ruleName, ruleParams);
  rule.grabSheet();

  secondAnimHandler = event => resetSections(event, objs, rule);

  objs.headTo.addEventListener('animationend', secondAnimHandler);
  objs.sectTo.classList += ' sect__current';
  objs.sectTo.style = `animation-name: ${ruleName}; animation-timing-function: ease-out;`;
  objs.headTo.classList += ' sect__current';
  objs.headTo.style = `animation-name: ${ruleName}; animation-timing-function: ease-out;`;
  objs.linkTo.classList += ' nav__current';
}

function resetSections(e, objs, rule) {
  objs.sectTo.className = 'sect__current';
  objs.headTo.className = 'sect__current';
  objs.sectTo.removeAttribute('style');
  objs.headTo.removeAttribute('style');
  objs.headTo.removeEventListener('animationend', secondAnimHandler);
  rule.resetRule();
}

function toggleMedia(e) {
  if(this.id === 'nav__media') {
    e.preventDefault();
  }
  const navList = document.getElementById('nav');
  const backdrop = document.getElementById('nav__open-backdrop');

  let navHandler;

  if(toggler.checked === false) {
    navHandler = event => setNavOpen(event, navList, this);
    toggler.checked = true;
    navList.className = 'nav__list-open';
    backdrop.className = 'nav__list-open';
    backdrop.addEventListener('click', toggleMedia);
  } else {
    closeNav();
  }

  function closeNav() {
    navList.className = 'nav__list-open nav__list-close';
    backdrop.className = 'nav__list-open nav__list-close';
    navHandler = event => resetNav(event, navList, this);
    toggler.checked = false;
  }

  navList.addEventListener('animationend', navHandler);

  function setNavOpen(e, nav, handler) {
    nav.style.transform = 'translateY(0)';
    nav.removeAttribute('class');
    backdrop.style.transform = 'translateY(0)';
    backdrop.removeAttribute('class');
    nav.removeEventListener('animationend', handler);
  }

  function resetNav(e, nav, handler) {
    nav.removeAttribute('style');
    nav.removeAttribute('class');
    backdrop.removeAttribute('style');
    backdrop.removeAttribute('class');
    nav.removeEventListener('animationend', handler);
    backdrop.removeEventListener('click', closeNav);
  }
}