_ = require('lodash');

function testData(){
    return JSON.stringify([{
        "0": [rand()],
        "1": [rand()]
    }, rand()]);
}

function rand(){
    var num = Math.random()
    for(var i = 0; i < 4; i++){
        num *= Math.random();
    }
    return Math.round(num*10000);
}

// Create dataSets
var dataSets = [];
for(var i = 0; i < 10; i++){
    var data = testData();
    console.log(data)
    dataSets.push(data.split(''));
}




var initialSet = dataSets[0];
var delimeters = [];

var chars = {};

var lastDelimeterIndex = 0;
var validDelimeter;

// goes over each char in initialSet
for(var i = 0; i < initialSet.length; i++){

    chars[initialSet[i]] = true;
    validDelimeter = true;

    // Goes over each other dataSet
    var delimeterDistance = 0;

    for(var j = 1; j < dataSets.length; j++){
        for(var k=lastDelimeterIndex; k < dataSets[j].length; k++){
            if(chars[dataSets[j][k]]){
                break;
            }
            if(!chars[dataSets[j][k]] && k === dataSets[j].length-1){
                validDelimeter = false;
            }
        }
    }

    if(validDelimeter){
        delimeters.push(initialSet[i])
        chars = {};
        lastDelimeterIndex = i;
    }
    // console.log(chars)
}





console.log('delimeters', delimeters.join(''))












