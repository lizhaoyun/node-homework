const fs = require("fs");
const path = require("path");
var argin = process.argv[2];

switch(argin){
    case 'list':
        showFileInfo();
        break;
    case 'mkdir':
        createDir()
        break;
    default:
        console.log("命令行参数错误");
        break;
}
function showFileInfo(){
    var list =[];
    var dirarr = fs.readdirSync(__dirname);
    for(var i=0;i<dirarr.length;i++){
        var objlist = {};
        var filepath = path.join(__dirname,dirarr[i]);
        var statobj = fs.statSync(filepath);
        objlist.fileName = dirarr[i];
        objlist.fileSize = statobj.size;
        list.push(objlist);
    }
    console.log(list);

}
function createDir(){
    if(process.argv[3] == 'folder'){
        fs.mkdirSync("folder");
    }
    else{
        console.log("命令行参数错误");
    }
}