//note: the search is NOT case sensitive

const fs = require("fs");
var argumentList = process.argv;
var searchParameter = null;
var searchExtention = null;

// as understood, all extentions are aloud for search!
if(argumentList[2] === undefined || argumentList[3] === undefined){
    console.log("USAGE: node search [EXT] [TEXT]");
}else if(argumentList[3] != undefined){
    searchExtention = argumentList[2];
    searchParameter = argumentList[3];
    var directory =  __dirname;
    checkFiles(searchExtention,searchParameter,directory);
}

function checkFiles(ext,param,directory){

    //read the directory

    var dirBuf = Buffer.from(directory);
    fs.readdir(dirBuf,function(err,files){
        if(err){
            console.log(err.message);
            return;
        }    
        //loop all the files            
        for(var i = 0; i < files.length; i++){ 
         //finding a folder and call again to checkFiles function
        if (fs.statSync(directory +"\\"+ files[i]).isDirectory()) {
            var inner_directory =  directory +"\\"+ files[i];
            checkFiles(ext,param,inner_directory);
            continue;
        }else{
            checkFilesContent(files[i],ext,directory,param);
        }
      }        
    });
}

function checkFilesContent(file,extention,directory,param){
    var arryOfMatch = '';
    var get_files = file.toLowerCase();
    var file_ext = get_files.split(".");
    if(file_ext[1] === extention.toLowerCase()){
        var stats = fs.lstatSync(directory + "\\" + file);
        // console.log(directory + "\\" + files[i]);
        var content = fs.readFileSync(directory + "\\" + file, 'utf8');
        content = content.toLowerCase();
        var lower_case_param = param.toLowerCase();
        //check if the file contains the word
        if(content.includes(lower_case_param)){
            arryOfMatch = directory + "\\" + file + "\r\n" ;
            console.log("The file: " + arryOfMatch + " including => " + param );
        }      
    }
}


           















