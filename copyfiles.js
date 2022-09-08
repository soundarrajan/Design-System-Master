

var fs = require('fs');

var copydir = require('copy-dir');

var copyy=require('cpy');

var folders=require('./theme-extractor.json');

//fonts-bundling
copydir('src/assets', 
        'dist/assets',
        function(stat, filepath, fileOrFoldername){
            
            var requiredFolders=new RegExp('\\b(?:'+folders.foldersToCopy.join('|')+')\\b', 'gi');
            if (stat === 'directory'){
                
                //Checking folders listed in foldersToCopy array in theme-extractor.json
                if(requiredFolders.test(fileOrFoldername)){

                    const subItemsOfCurrentFolder=fs.readdirSync(filepath);

                    subItemsOfCurrentFolder.forEach(subItemElement => {
                        var statSubItemElement = fs.statSync(filepath +'\\' + subItemElement);

                        if(statSubItemElement.isDirectory()){
                               
                                (async () => {
                                    await copyy([filepath+'\\**\\*.{css,CSS,less,scss,eot,png,PNG,svg,SVG,ttf,TTF,woff,woff2,otf,jpg,JPG,GIF,gif}'], 'dist\\assets\\'+fileOrFoldername);
                                    console.log('Files copied!');
                                })();

                                return false;

                        }

                    });

                    return true;
                
                }
            }
            
            else if(stat==='file' && fileOrFoldername!='.gitkeep'){
                return true;
            }

        }, 
        function(err){
            if(err){
                console.log('ERROR in copy-dir' + err);
            } else {
                console.log('copy-dir ok');
            }
});

//themes-bundling
copydir('src/themes', 
        'dist/assets/themes',
        function(stat, filepath, filename){
            var requiredFolders=new RegExp('\\b(?:'+folders.defaultwebToCopy.join('|')+')\\b', 'gi');
            var skipFiles=new RegExp('\\b(?:'+folders.themeFilesToSkip.join('|')+')\\b', 'gi');            
            if (stat === 'directory'){

                
                if(requiredFolders.test(filename))
                {
 
                    return true;
                    
                }
                
                
            }
            
                        
            else if(stat==='file' && skipFiles.test(filename)){
                return true;
            }
            
        }, 
        function(err){
            if(err){
                console.log('ERROR in copy-dir assets/themes/defaultweb' + err);
            } else {
                console.log('copy-dir assets/themes/defaultweb ok');
            }
});