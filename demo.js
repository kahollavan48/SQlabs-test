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
    /**
     * Creating array of found elements
     */
    var allFound = [];

    /**
     * Getting all files listed in specific directory
     */
    fs.readdir( __dirname+"/TextFiles", function( err, items ) {

        /**
         * Creating recursive function in order to find required text within every file
         * @param {} index
         */
        function search(index){

            /**
             * Stopping statement
             */
            if (index>=items.length){
                /**
                 * Printing results once found all required strings
                 */
                console.log(allFound)
                return;
            }

            var fileName = items[ index ];

            /**
             * Read each file and search for required string
             */
            fs.readFile( __dirname + "/TextFiles/" + fileName, function( err, data ) {
                if ( err ) throw err;

                /**
                 * If we managed to find our string, we push it to our array
                 */
                if ( data.indexOf( param ) !== -1 ) {
                    allFound.push({
                        "filePath":__dirname + "/" + fileName,
                        "stringStartsAt":data.indexOf( param )
                    })
                } 

                /**
                 * Moving to the next file
                 */
                index++
                search(index);
            } );
        }

        search(0);
    } );

    //read the directory
    // var directory = "TextFiles";
    // var dirBuf = Buffer.from(directory);
    // fs.readdir(dirBuf,function(err,files){
    //     if(err){
    //         console.log(err.message);
    //         return;
    //     }

    //     var foundInFileNum = null;
    //     for(var i = 0; i < files.length; i++){
    //         //print all existing files
    //         // console.log(i +"->"+files[i]);
    //         //verify the world inside the files
    //         if (foundInFileNum){
    //             return;
    //         }
    //         var fileName = files[i];
    //         fs.readFile(directory +"/"+ files[i],function(err,data){
    //             console.log(data.toString() === param)
    //             if(data.indexOf(param) >= 0){
    //                 // console.log(i,data.indexOf(param),files[i])
    //                 // foundInFileNum = i;
    //                 console.log("The param: " + param + " is found in: " + i);
    //                 // console.log(data.indexOf(param));
    //                 return;
    //             }
    //         });
    //     }
        
    // })

}


// if(err){
//     console.log(err.message);
// }else if(data.indexOf(param) >= 0){
//     console.log("The param: " + param + " is found in: " + fileName);
// }