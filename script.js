//Copyright 2023 Chris/abstractedfox.
//This work is not licensed for use as source or training data for any language model, neural network,
//AI tool or product, or other software which aggregates or processes material in a way that may be used to generate
//new or derived content from or based on the input set, or used to build a data set or training model for any software or
//tooling which facilitates the use or operation of such software.

function dropHandler(event){
    event.preventDefault();
    
    if (event.dataTransfer.files){
        var file = event.dataTransfer.files[0];
        var fileContents = new FileReader();
        fileContents.readAsText(file);
    
        fileContents.onloadend = function(){
            var results = fileContents.result;
            fillPage(results);
        }
    }
}

function dragOverHandler(event){
    event.preventDefault();
}

function fillPage(contents){
    var elementTitleMarker= "####";
    
    
    var closeLastDiv = false;
    
    while (contents.indexOf(elementTitleMarker) > -1){
        var offset = contents.indexOf(elementTitleMarker);
        if (!closeLastDiv){
            contents = contents.replace(elementTitleMarker, "<div class=\"copyItemContainer\"><h4>");
        }
        else{
            contents = contents.replace(elementTitleMarker, "</div></div><div class=\"copyItemContainer\"><h4>");
        }
        
        var lineEnd = getLineEndingPosition(contents, offset);
        contents = stringInsert(contents, "</h4><div onclick=\"htmlToClipboard(this)\" id=\"copyItem\">", lineEnd);
        
        closeLastDiv = true;
    }
    
    contents += "</div></div>";
    
    document.getElementById("outputdiv").innerHTML = contents;
    
}

function getLineEndingPosition(sourceString, startIndex){
    for (let i = startIndex; i < sourceString.length; i++){
        if (sourceString[i] == '\n' || sourceString[i] == '\r'){
            return i;
        }
    }
    
    return -1;
}

//Returns a new string
function stringInsert(source, stringToInsert, offset){
    var result = source.substring(0, offset);
    result += stringToInsert;
    result += source.substring(offset);
    return result;
}

function htmlToClipboard(html){
    //The div contains leading and trailing linebreaks for formatting, but we don't want those in the output
    navigator.clipboard.writeText(html.innerHTML.substring(1, html.innerHTML.length - 2));
}
