const fs = require("fs");
const path = require("path");
const { VERSION } = require('../config/version')
const { INDEX } = require('../config/index')



const { Liquid } = require('liquidjs');
const engine = new Liquid({
  root: path.join(__dirname, '../templates'), // for layouts and partials
  extname: '.liquid'
});


function home(req, res, next) {
  const domain = req.query.domain
  const templateId = req.query.templateId
  console.log(domain, templateId)
  // const data = JSON.parse(fs.readFileSync(`config/${domain}/head.json`));
  // const banners = JSON.parse(fs.readFileSync(`config/${domain}/banner.json`));
  res.render('home', {
    // data,
    // indexStatic,
    // banners,
    // headerStatic,
    INDEX
  })
  engine.renderFile("home", {
    // data,
    // indexStatic,
    // banners,
    // headerStatic
    INDEX
  }).then(function (dataVal) {
    let file = path.resolve(path.join(__dirname, '../', '/build'), './home.html');
    fs.writeFile(file, dataVal, { encoding: 'utf8' }, err => { });
  });
}


module.exports = {
  home
}