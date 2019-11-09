const http=require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");

http.createServer((req,res)=>{
    var urlobj = url.parse(req.url,true);
    var pathname = urlobj.pathname;
    switch(pathname){
        case "/":
            showLogin(res);
            break;
        case "/login":
            loginIn(req,res);
            break;
    }
}).listen(8081);
console.log("server is listening 8081");

function showLogin(res){
    var filepath = path.join(__dirname,"login.html");
    var filecontent = fs.readFileSync(filepath);
    res.writeHead(200,{"content-type":"text/html"});
    res.write(filecontent);
    res.end(); 
}


function loginIn(req,res){
    switch(req.method){
        case 'POST':
            check(req,res);
            break;
        case 'GET':
            showLogin(res);
            break;
    }
    
}
function check(req,res){
    var formdata="";
    req.on("data",(chunk)=>{
        formdata += chunk;
    })

    req.on("end",()=>{
        console.log(formdata);
        var formobj = querystring.parse(formdata);
        let logincount = req.headers["cookie"];
        let sum;
        if(formobj.username == "zhangsan" && formobj.pwd == "123"){
            if(logincount===undefined || logincount.indexOf("logincount")===-1){
                res.setHeader("Set-Cookie",["logincount=1","username=zhang"]);
                res.writeHead(200,{'content-type':"text/text;charset=utf8"});
                res.end(formobj.username+"这是您第1次登陆");
            }
            else if(logincount.indexOf("logincount")>=0){
                let count = logincount.split(";");
                for(var i=0;i<count.length;i++){
                    if(count[i].indexOf("logincount=")>=0){
                        let num = count[i].split("=");
                        sum = parseInt(num[1])+1;
                        res.setHeader("Set-Cookie",["logincount="+sum,"username=zhang"]);
                        res.writeHead(200,{'content-type':"text/text;charset=utf8"});
                        res.end(formobj.username+"这是您第"+sum+"次登陆");
                        break;
                    }
                }
            }
        }
        else{
            res.end("login error");
        }
    })
}
