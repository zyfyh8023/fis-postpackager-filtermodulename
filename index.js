/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

module.exports = function (content, file, conf) {
    var fs = require("fs");
    var fileName=conf.fileroot || 'moduleNames.txt';
    var filePath=fis.project.getProjectPath()+'/'+fileName;
    var matchArr=content.match(/data-moduleName=[\'|\"].*?[\'|\"]/g);
    if(matchArr){
        var tempStr=matchArr.join(',').replace(/\'|\"/g, '');
        var content=file.subpath+' -> '+tempStr+'\n\n';
        writeFile(fs, filePath, content);
    }
    return content;
};


function writeFile(fs, filePath, str){
  fs.exists(filePath,function(exists){
        if(exists){
            if(str){
               fs.writeFileSync(filePath, str, {flag:'a'});
            }
        }
        if(!exists){
            console.log(filePath+"文件不存在");
        }
    });
}
