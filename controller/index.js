const fs = require("fs");
const path = require("path");
const { VERSION } = require('../config/version')
const { INDEX } = require('../config/index')
const indexStatic = {
  INDEX,
  VERSION
}
const { HEADER } = require('../config/header')
const headerStatic = {
  HEADER,
  VERSION
}


const { Liquid } = require('liquidjs');
const engine = new Liquid({
  root: path.join(__dirname, '../templates'), // for layouts and partials
  extname: '.liquid'
});


function home(req, res, next) {
  const domain = req.query.domain || 'chenbin'
  const data = JSON.parse(fs.readFileSync(`config/${domain}/head.json`));
  const banners = JSON.parse(fs.readFileSync(`config/${domain}/banner.json`));
  res.render('index-3', {
    data,
    indexStatic,
    banners,
    headerStatic,
    INDEX
  })
  engine.renderFile("index-3", {
    data,
    indexStatic,
    banners,
    headerStatic
  }).then(function (dataVal) {
    let file = path.resolve(path.join(__dirname, '../', '/build'), './index-3.html');
    fs.writeFile(file, dataVal, { encoding: 'utf8' }, err => { });
  });
}


module.exports = {
  home
}