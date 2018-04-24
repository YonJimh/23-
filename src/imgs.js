const cheerio = require('cheerio');
const fs = require('fs');
var http = require('http');
const path = require("path");
const async = require("async");
const request = require("request");
const moment = require("moment");
const jq = require("jquery");
//异步
//不行的版本
// var writeStream = fs.createWriteStream('./as.html');
// fs.readFile('../data/as.json', (err, data) => {
//     // console.log(data.toString('utf8'));
//     datas = JSON.parse(data.toString('utf8'));
//     console.log(datas);
//   });

// var datas = JSON.parse(fs.readFileSync('../data/as.json','utf8'));

// function getUrl(url,file){
//   http.get(url,res=>{
//     res.pipe(fs.createWriteStream(file));
//   })
// }


// datas.forEach(function(val,i){
//   console.log(i)
//   // clearInterval(asd);
//   var file = path.join("./html", val.url.split('http://www.23ciyuan.com/')[1]); 
//   var write = fs.createWriteStream(file);
//   var asd = setTimeout(getUrl, 3000, val.url ,file);
//   // http.get(val.url,res=>{
//   //   res.pipe(fs.createWriteStream(file));
//   // })
// })


// function sleep(n) { //n表示的毫秒数
//   var start = new Date().getTime();
//   while (true) if (new Date().getTime() - start > n) break;
// }

// var concurrencyCount = 0;
// var fetchUrl = function (url, callback) {
//   // delay 的值在 2000 以内，是个随机的整数
//   var delay = parseInt((Math.random() * 10000000) % 2000, 10);
//   concurrencyCount++;
//   console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
//   setTimeout(function () {
//     concurrencyCount--;
//     callback(null, url + ' html content');
//   }, delay);
// };


var concurrencyCount = 0;
//可以的版本
var requestAndwrite=function(url,callback){
  var file = path.join("./img",concurrencyCount+".jpg"); 
  //      http.get(url,res=>{
  //   res.pipe(fs.createWriteStream(file)).on('finish',()=>{
  //     callback(null,"successful !");
  //   });
  // })
    request.get(url).pipe(fs.createWriteStream(file)).on('finish',()=>{
          callback(null,"successful !");
        });;
  }


var urls = JSON.parse(fs.readFileSync('./data/imgs.json','utf8'));
async.mapLimit(urls, 5, function (a, callback) {
  // fetchUrl(url.url, callback);
  concurrencyCount++
  var s = a.thumb;
  requestAndwrite(s,callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});

