const fs = require("fs");
const path = require("path");
const stat = fs.stat

const { Liquid } = require('liquidjs');
const engine = new Liquid({
  root: path.join(__dirname, '../templates'), // for layouts and partials
  extname: '.liquid'
});

const { VERSION } = require('../config/version')
const { INDEX1 } = require('../config/index1')
const { INDEX2 } = require('../config/index2');
const { Console } = require("console");

var template = 'home_template1'
var domain = 'chenbin'
var language = 'it'
var DATA = INDEX1
var templateAssets = 'template1'
function home(req, res, next) {
  const data = JSON.parse(fs.readFileSync(`config/${domain}/head.json`));
  const banners = JSON.parse(fs.readFileSync(`config/${domain}/banner.json`));
  domain = req.query.domain
  language = req.query.language
  if (req.query.templateId == 1) {
    template = 'home_template1'
    DATA = INDEX1
    templateAssets = 'template1'
  } else {
    template = 'home_template2'
    DATA = INDEX2
    templateAssets = 'template2'
  }
  console.log(DATA)
  res.render(template, { INDEX: DATA, data, banners }, (err, html) => {
    if (err) {
      console.log('模板渲染失败!' + err)
    } else {
      mkdir(domain)
      copy(path.join(__dirname, '../', '/assets/', templateAssets), path.join(__dirname, '../', '/build/', domain, '/assets'))
      let file = path.resolve(path.join(__dirname, '../', '/build/', domain), './home.html'); //在对应的店铺文件下生成一个html
      fs.writeFile(file, html, { encoding: 'utf8' }, err => {
        console.log('html文件创建失败!')
      });
    }
    next()
  })
  // mkdir(domain)
  // engine.renderFile(useTemplate, {
  //   INDEX
  // }).then(function (dataVal) {
  //   let file = path.resolve(path.join(__dirname, '../', '/build/', domain), './home.html'); //在对应的店铺文件下生成一个html
  //   fs.writeFile(file, dataVal, { encoding: 'utf8' }, err => {
  //     console.log('html文件创建失败!')
  //   });
  // });
}



function mkdir(dirname) {
  fs.mkdir(path.join(__dirname, '../', '/build/', dirname), function (err) {
    if (err) {
      console.log(dirname + '文件目录已存在!');
    } else {
      fs.mkdir(path.join(__dirname, '../', '/build/', dirname, '/assets'), function (err) {
        if (err) {
          console.log('assets目录已存在!');
        } else {
          console.log('assets创建文件成功!');
        }
      })
      console.log(dirname + '文件创建文件成功!');
    }
  })
}

function copy(src, dst) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    console.log(paths)
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      var _src = src + '/' + path;
      var _dst = dst + '/' + path;
      var readable;
      var writable;
      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }

        if (st.isFile()) {
          readable = fs.createReadStream(_src);//创建读取流
          writable = fs.createWriteStream(_dst);//创建写入流
          readable.pipe(writable);
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy);
        }
      });
    });
  });
}

function exists(src, dst, callback) {
  //测试某个路径下文件是否存在
  fs.exists(dst, function (exists) {
    if (exists) {//不存在
      callback(src, dst);
    } else {//存在
      fs.mkdir(dst, function () {//创建目录
        callback(src, dst)
      })
    }
  })
}


module.exports = {
  home
}