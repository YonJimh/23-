const cheerio = require('cheerio');
const fs = require('fs');
var http = require('http');
// var writeStream = fs.createWriteStream('../data/as.html');

function filterChapters(html){
	var $=cheerio.load(html);
    var chapters=$('#content').eq(0).find('li');  
    // [
    //     {
    //     title:"",
    //     url:""  
    //      }
    //  ]
    var coutseData=[];
    chapters.each(function(){
        var Alist = $(this).children('a');
        // console.log(Alist.attr('href'));
        coutseData.push({
            title:Alist.attr('title'),
            url:Alist.attr('href')
        })
    })
    // console.log(coutseData)
    fs.writeFile('../data/as.html',JSON.stringify(coutseData),{
        encoding:'utf8'
    },err=>{
        if(err) throw  err;
        console.log('外遇了！');
    })

}



var write = http.get('http://www.23ciyuan.com/sitemap.html',function(res){
    // res.pipe(fs.createWriteStream('./as.html'))
    var html='';
    res.on('data',function(chunk){
        html+=chunk;
        // writeStream.write(chunk);
    })
    res.on('end',function(){
        filterChapters(html);
        // console.log(html)
    })
    }).on('error',function(){
        console.log("获取失败");
})

