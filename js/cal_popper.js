class CalDate {
  constructor(date_list, venue_list, band_list) {
    this.date_list = date_list;
    this.venue_list = venue_list;
    this.band_list = band_list;
    this.dates = [];
    this.imgs = [];
    this.titles = [];
    this.times = [];
    this.covers = [];
    this.descripts = [];
    this.events = [];
    this.promos = [];
    this.venue_names = [];
    this.venue_addresses = [];
    this.venue_fbs = [];
    this.venue_sites = [];
    this.venue_events = [];
    this.band_infos = [];
  }

  fillDatesList() {
    for(let dateObj in this.date_list){
      for(let date in this.date_list[dateObj]) {
          this.dates.push(date);
      }
    }

    this.dates.forEach(function(date) {
      let d = new Date(date);
      let a = d.getUTCMonth();
      let t = d.getUTCDate();
      let e = `${a + 1}/${t}`;
      
      const datesList = document.getElementById('cal__dates');

      let dateTab = document.createElement('li');
      dateTab.setAttribute('class', 'dates__date');
      dateTab.innerHTML = e;

      datesList.appendChild(dateTab);
    });

    this.grabDateInfos();
  }

  grabDateInfos() {
    for(let dateObj in this.date_list) {
      for(let date in this.date_list[dateObj]) {
        for(let infoObj in this.date_list[dateObj][date]) {
          switch(infoObj) {
            case 'Image':
              this.imgs.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'Title':
              this.titles.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'Time':
              this.times.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'Cover':
              this.covers.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'Descript':
              this.descripts.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'FBEvent':
              this.events.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'VenueEvent':
              this.venue_events.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'Promo':
              this.promos.push(this.date_list[dateObj][date][infoObj]);
              break;
            case 'VenueId':
              let venue = this.grabVenue(this.date_list[dateObj][date][infoObj]);

              this.venue_names.push(venue[0].Name);
              this.venue_addresses.push(venue[0].Address);
              this.venue_fbs.push(venue[0].Facebook);
              this.venue_sites.push(venue[0].Website);
              break;
            case 'OtherBands':
              let bandIds = this.date_list[dateObj][date][infoObj];
              let dateBandInfos;

              if(bandIds[0] != "") {
                dateBandInfos = this.grabBandsWith(bandIds);
              }

              this.band_infos.push(dateBandInfos);
              break;
          }
        }
      }
    }

    this.fillDateInfo();
  }

  grabVenue(id) {
    let dateVenue = [];

    for(let venue in this.venue_list) {
      if(id == this.venue_list[venue].ID) {
        dateVenue.push(this.venue_list[venue]);
      }
    }
    return dateVenue;
  }

  grabBandsWith(ids) {
    let dateBandInfos = [];

    for(let id = 0; id < ids.length; id++) {
      for(let band in this.band_list) {
        if(ids[id] == this.band_list[band].ID) {
          dateBandInfos.push(this.band_list[band]);
        }
      }
    }

    return dateBandInfos;
  }

  fillDateInfo() {
    const sectCont = document.getElementById('sect__cal-cont');

    for(let d = 0; d < this.dates.length; d++) {
      // Create flyer container
      let newFlyerCont = document.createElement('div');
      newFlyerCont.setAttribute('class', 'cal__flyer-cont');

      // Create flyer details section
      let flyerDeets = document.createElement('figure');
      flyerDeets.setAttribute('class', 'flyer__details');
      flyerDeets.innerHTML = `
        <div style="background-image: url(${this.imgs[d]})" class="flyer__img"></div>
        <h3 class="flyer__title">${this.titles[d].split("'").join("&#39")}</h3>
        <aside class="flyer__event-locate">
          <h6 class="flyer__venue">${this.venue_names[d].split("'").join("&#39")}</h6>
          <p class="flyer__time">${this.times[d]}</p>
          <p class="flyer__cover">${coverOrNot(this.covers[d])}</p>
        </aside>
        <figcaption class="flyer__descript">${this.descripts[d].split("'").join("&#39")}</figcaption>
      `;

      function coverOrNot(cover) {
        if(cover != null) {
          let coverText = `Cover: &#36;${cover}`;
          return coverText;
        } else {
          let ph = `FREE SHOW!`;
          return ph;
        }
      }

      // Create flyer links section
      let dateLinks = document.createElement('figure');
      dateLinks.setAttribute('class', 'flyer__links-cont');

      dateLinks.innerHTML = `
        <ul>
          <li><h4>More in Social Media:</h4></li>
          <li><a href="${this.events[d]}" target="_blank">${eventOrNot(this.events[d])}</a></li>
          ${promoOrNot(this.promos[d])}
        </ul>
        <ul>
          <li><h4>Check Out The Venue:</h4></li>
          <li><a href="https://www.google.com/maps/place/${this.venue_addresses[d].split(" ").join("+")}" target="_blank">Get Directions</a></li>
          <li><a href="${this.venue_fbs[d]}" target="_blank">Venue&#39s FaceBook</a></li>
          ${venueEventOrNot(this.venue_events[d])}
          ${venueSiteOrNot(this.venue_sites[d])}
        </ul>
        ${otherBandsOrNot(this.band_infos[d])}
      `;

      function eventOrNot(fbEvent) {
        if(fbEvent == 'https://www.facebook.com/pg/SliverRocks/events/?ref=page_internal') {
          return 'Keep Tabs On Our Events Page';
        } else {
          return 'RSVP To Our FaceBook Event';
        }
      }

      function promoOrNot(promo) {
        if(promo != null) {
          let link = `
            <li><a href="${promo}" target="_blank">Additional Promo</a></li>
          `;

          return link;
        } else {
          return `<li style="display: none;"></li>`;
        }
      }

      function venueEventOrNot(venueEvent) {
        if(venueEvent != null) {
          let venueEventLink = `
            <li><a href="${venueEvent}">RSVP To The Venue&#39s FaceBook Event</a></li>
          `;
          return venueEventLink;
        } else {
          return `<li style="display: none;"></li>`;
        }
      }

      function venueSiteOrNot(venueSite) {
        if(venueSite != null) {
          let venueSiteLink = `
            <li><a href="${venueSite}">Venue&#39s Website</a></li>
          `;

          return venueSiteLink;
        } else {
          return `<li style="display: none;"></li>`;
        }
      }

      function otherBandsOrNot(bandsWith) {
        if(bandsWith != undefined) {
          let bandLinksCont = `
            <ul>
              <li>${bandsWith.length > 1 ? `Check Out The Other Bands:` : `Check Out The Other Band:`}</li>
              ${createBandLinks(bandsWith)}
            </ul>
          `;

          function createBandLinks(bands) {
            let bandLinks = [];
            for(let band in bands) {
              let bandLink = `
                <li><a href="${bands[band].Facebook}" target="_blank">${bands[band].Name.split("'").join("&#39")}</a></li>
              `;

              bandLinks.push(bandLink);
            }

            return bandLinks.reduce((a,b) => a + b);
          }
          return bandLinksCont;
        } else {
          return `<ul style="display: none;"></ul>`;
        }
      }
      
      // Attach subsections to new flyer
      newFlyerCont.appendChild(flyerDeets);
      newFlyerCont.appendChild(dateLinks);

      // Attach whole new flyer to section container
      sectCont.appendChild(newFlyerCont);
    }  //  END FILLDATEINFO LOOP

    this.addCalScripts();
  }  //  END FILLDATEINFO

  addCalScripts() {
    const scripts = document.getElementsByTagName('script');
    const lastScript = scripts.length - 1;
    const calScript = document.createElement('script');
    calScript.src = 'js/cal__consol-ed.js';

    scripts[lastScript].insertAdjacentElement('afterend', calScript);
  }
}  //  END CALDATE CLASS

let DBInfo;
let Cal;

window.onload = function() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', '/admin/date-maker.php', true);

  xhr.onload = function() {
    if(this.status === 200){
      DBInfo = JSON.parse(this.response);
      Cal = new CalDate(DBInfo[0].Dates, DBInfo[0].Venues, DBInfo[0].Bands);
      const loader = document.getElementById('loading-ph');
      loader.parentElement.removeChild(loader);
      Cal.fillDatesList();
    }
  };

  xhr.send();
}