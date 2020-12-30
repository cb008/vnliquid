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
  const domain = req.query.domain || 'chenbin'
  const templateId = req.query.templateId || 1
  console.log(domain, templateId)
  // const data = JSON.parse(fs.readFileSync(`config/${domain}/head.json`));
  // const banners = JSON.parse(fs.readFileSync(`config/${domain}/banner.json`));
  var useTemplate = ''
  if (templateId == 1) {
    useTemplate = 'home_template1'
  } else if (templateId == 2) {
    useTemplate = 'home_template2'
  } else {
    useTemplate = 'home_template2'
    console.log('home_template2')
  }
  console.log(useTemplate)
  res.render(useTemplate, {
    INDEX
  })
  mkdir(domain)
  engine.renderFile(useTemplate, {
    INDEX
  }).then(function (dataVal) {
    let file = path.resolve(path.join(__dirname, '../', '/build/', domain), './home.html'); //在对应的店铺文件下生成一个html
    fs.writeFile(file, dataVal, { encoding: 'utf8' }, err => {
      console.log('html文件创建失败!')
    });
  });
}



function mkdir(dirname) {
  fs.mkdir(path.join(__dirname, '../', '/build/', dirname), function (err) {
    if (err) {
      console.log('目录已存在!');
    } else {
      console.log('创建文件成功!');
    }
  })
}


module.exports = {
  home
}