_ = require('lodash');

function testData(){
    return JSON.stringify([{
        "0": [rand()],
        "1": [rand()]
    }, rand()])
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
    dataSets.push(testData())
}
console.log(dataSets)

var initialSet = dataSets[0];
var delimeters = [];

// goes over each char in initialSet
for(var i = 0; i < initialSet.length; i++){

    // Goes over each other dataSet
    var delimeterDistance = 0;
    for(var j = 1; j < dataSets.length; j++){

        for(var k=i; k < dataSets[j].length; k++){
            if(dataSets[j][k] !== initialSet[i]){
                delimeterDistance++;
            }else{
                break;
            }

            if(k === dataSets[j].length-1){delimeterDistance = Infinity}
        }
    }
    if(!delimeterDistance){
        delimeters.push(initialSet[i]);
    }else{
        delimeters.push([delimeterDistance, initialSet[i]])
    }


}

function isDelimeter(){

}

console.log(delimeters)