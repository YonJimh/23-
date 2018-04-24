
const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');
var dirs = fs.readdirSync("./html");
// const getImgSrc = require("./imgs");


[{
    "title":"",
    "small_title":"",
    "catid":"",
    "keywords":"",
    "content":"",
    "copyfrom":"0",
    "thumb":"",
    "description":""
}]

var datas = [];

function filterChapters(html,i){
    var $ = cheerio.load(html);
    
    var data = {
        "title":"",
        "small_title":"",
        "catid":"",
        "keywords":"",
        "content":"",
        "copyfrom":"0",
        "thumb":"",
        "description":""
    }
    
    // console.log($('h1.title').text())
    data.keywords = data.small_title = data.title = $('h1.title').text();

    //catid
    var catids = $('.postcat').children('a');
    var catidsV = catids.text();
    if(catidsV.indexOf("音乐") != -1 ){
        data.catid = "15";
    }else if(catidsV.indexOf("图片") != -1 || catidsV.indexOf("写真") != -1){
        data.catid = "17";
    }else if(catidsV.indexOf("下载") != -1 || catidsV.indexOf("无修") != -1){
        data.catid = "16";
    }else{
        data.catid = "21";
    }

    //thumb
    var chapters = $('.post');
    var img = chapters.find('img').eq(0);    
   
    // data.thumb = "upload/imgs/"+(i+1)+".jpg";
    data.thumb = img.attr('src');

    // console.log(data.thumb);
    //content
    // console.log($('.post-content *').not('.page-links,.u-left-group,.huoduan_hide_box,.u-post-share-wrap,.u-float-trigger ,.post-options,.next-prev-posts').html());
    // console.log($('.post-content p').html());    
    // data.content = '';
    // data.content = $('.post-content').html().replace(/\"/g, "");
    var htmlContent = '';
    $('.post-content').children()
    .not('.page-links,.u-left-group,.huoduan_hide_box,.u-post-share-wrap,.u-float-trigger ,.post-options,.next-prev-posts,.dxseo-anchor')
    .each(function(){
      htmlContent += $.html($(this));
    })
    data.content = (htmlContent);
    data.description = $('.post-content p').eq(0).text();
    datas.push(data);
}

// console.log(dirs.length)
// console.log(dirs)
dirs.forEach(function(url,i){
    // fs.readFile("./html/"+url, (err,data)=>{
    //     filterChapters(data.toString('utf8'));
    // })
// console.log(i)
    filterChapters(fs.readFileSync("./html/"+url),i);
      if(i%50 == 0 && i >= 50){
        fs.writeFileSync('./data/'+i+'.json',JSON.stringify(datas));
        datas = [];
    }else if(i == dirs.length - 1){
         fs.writeFileSync('./data/'+i+'.json',JSON.stringify(datas));
    }
})

// console.log(datas);

// function htmlspecialchars(str)    
// {    
//     var s = "";  
//     if (str.length == 0) return "";  
//     for   (var i=0; i<str.length; i++)  
//     {  
//         switch (str.substr(i,1))  
//         {  
//             case "<": s += "&lt;"; break;  
//             case ">": s += "&gt;"; break;  
//             case "&": s += "&amp;"; break;  
//             case " ":  
//                 if(str.substr(i + 1, 1) == " "){  
//                     s += " &nbsp;";  
//                     i++;  
//                 } else s += " ";  
//                 break;  
//             case "\"": s += "&quot;"; break;  
//             case "\n": s += "<br>"; break;  
//             default: s += str.substr(i,1); break;  
//         }  
//     }  
//     return s;  
// }  