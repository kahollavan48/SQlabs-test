# SQlabs-test
Solution


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
    checkFiles(searchExtention,searchParameter);
}

function checkFiles(ext,param){
    console.log("You are searching for: " + param + " in files with extention: " + ext);
    //read the directory
    var directory =  __dirname;
    // console.log(directory);
    var dirBuf = Buffer.from(directory);
    var arryOfMatch = '';
    fs.readdir(dirBuf,function(err,files){
        if(err){
            console.log(err.message);
            return;
        }        
        // console.log(files);        
        for(var i = 0; i < files.length; i++){
            //check file extention
            var get_files = files[i].toLowerCase();
            var file_ext = get_files.split(".");
            if(file_ext[1] === ext.toLowerCase()){
                var stats = fs.lstatSync(directory + "\\" + files[i]);
                // console.log(directory + "\\" + files[i]);

                //finding a folder 
                if (stats.isDirectory()) {
                    // var folder =  __dirname;
                    // console.log(folder);
                    // console.log("HELLO");
                    continue;
                }
                var content = fs.readFileSync(directory + "\\" + files[i], 'utf8');
                content = content.toLowerCase();
                var lower_case_param = param.toLowerCase();
                if(content.includes(lower_case_param)){
                    arryOfMatch += directory + "\\" + files[i] + "\r\n" ;
                }
            }
        }
        console.log("The files: " + arryOfMatch + " including => " + param );
         
    });
}
