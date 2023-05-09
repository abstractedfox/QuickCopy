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
            fillPageBetter(results);
        }
    }
}

function dragOverHandler(event){
    event.preventDefault();
}

function fillPageBetter(contents){
    var elementTitleMarker = "####";
    var template = "<div class=\"copyItemContainer\"><h4>title</h4><div onclick=\"htmlToClipboard(this)\" id=\"copyItem\">copyitem</div></div>";
    var results = "";
    
    while (contents.length > 0){
        var thisElement = contents.indexOf(elementTitleMarker);
        var titleLineEnd = getLineEndingPosition(contents, thisElement);
        var newEntry = template;
        var elementEnd = contents.indexOf(elementTitleMarker, titleLineEnd);
        
        if (elementEnd != -1){
            var newvalue = contents.substring(thisElement + elementTitleMarker.length, titleLineEnd);
            newEntry = newEntry.replace("title", newvalue);
            
            newvalue = contents.substring(titleLineEnd + 1, elementEnd - 1);
            newEntry = newEntry.replace("copyitem", newvalue);
        }
        else{
            var newvalue = contents.substring(thisElement + elementTitleMarker.length, titleLineEnd);
            newEntry = newEntry.replace("title", newvalue);
            
            newvalue = contents.substring(titleLineEnd);
            newEntry = newEntry.replace("copyitem", newvalue);
            results += newEntry;
            break;
        }
        results += newEntry;
        contents = contents.substring(elementEnd);
    }
    
    document.getElementById("outputdiv").innerHTML = results;
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
    var output = html.innerHTML;
    while (output[0] == " " || output[0] == "\n" || output[0] == "\r") output = output.substring(1);
    while (output[output.length - 1] == "\n" || output[output.length - 1] == "\r" || output[output.length - 1] == " ") output = output.substring(0, output.length - 1);
    navigator.clipboard.writeText(output);
    html.style["background-color"] = "#55ff55";
}

function resetColors(){
    let tags = document.getElementsByTagName("div");
    //tags.forEach(item => item.style["background-color"]) = "#ffffff";
    
    for (tag of tags){
        if (tag.id == "copyItem"){
            tag.style["background-color"] = "#ffffff";
        }
    }
}

function clearwarning(){
    var element = document.getElementById("notthere");
    element.innerHTML = "";
}

function showwarning(event){
    event.preventDefault();
    var element = document.getElementById("notthere");
    element.innerHTML = "No, not that one";
}
