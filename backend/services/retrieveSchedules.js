const router = require('express').Router();
const rp = require('request-promise');
const $ = require('cheerio');
const TOUR_URL = 'https://ibighit.com/bts/eng/tour/love_yourself';

router.route('/tour').get((req, res) => {
  rp(TOUR_URL)
  .then(function(html){
  //success!

  const dateHtml = $('#tab01 div ul li .tour-date p', html);
  const yearHtml = $('#tab01 div ul li .tour-date p .reg', html);
  const cityHtml = $('#tab01 div ul li .tour-title', html);
  const dates = dateHtml.length;
  var results = [];
  for (var i = 0; i < dates; i++) {
    const date = (dateHtml[i].children[0].data);
    const year = (yearHtml[i].children[0].data);
    const city = (cityHtml[i].children[1].children[0].data);
    const venue = (cityHtml[i].children[3].children[0].data);
    results.push({date:date, year:year, city:city, venue:venue});
  }
  const dateHtml2 = $('#tab02 div ul li .tour-date p', html);
  const yearHtml2 = $('#tab02 div ul li .tour-date p .reg', html);
  const cityHtml2 = $('#tab02 div ul li .tour-title', html);
  const dates2 = dateHtml2.length;
  for (var i = 0; i < dates2; i++) {
    const date = (dateHtml2[i].children[0].data);
    const year = (yearHtml2[i].children[0].data);
    const city = (cityHtml2[i].children[1].children[0].data);
    const venue = (cityHtml2[i].children[3].children[0].data);
    results.push({date:date, year:year, city:city, venue:venue});
  }
    res.send(results);
  })
  .catch(function(err){
    //handle error
    res.send("Error");
  });
})

module.exports = router;
