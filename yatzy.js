document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("sum").addEventListener("click", function(){
    let onesOfOnes = document.getElementById("playerOneOfOnes");
    let OnesOfOnesToNumber = number(onesOfOnes.value);
    let onesOfTwos = document.getElementById("playerOneOfTwos");
    let OnesOfTwosToNumber = number(onesOfTwos.value);
    let OnesOfThrees = document.getElementById("playerOneOfThrees");
    let OnesOfThreesToNumber = number(onesOfThrees.value);
    let onesOfFours = document.getElementById("playerOneOfFours");
    let OnesOfFoursToNumber = number(onesOfFours.value);
    let onesOfFives = document.getElementById("playerOneofFives");
    let OnesOfFivesToNumber = number(onesOfFives.value);
    let onesOfSixes = document.getElementById("playerOneofSixes");
    let OnesOfSixesToNumber = number(onesOfSixes.value);
           
            
    let sumOfPlayerOne = (OnesOfOnesToNumber + OnesOfTwosToNumber + OnesOfThreesToNumber +  OnesOfFoursToNumber + OnesOfFivesToNumber +
    OnesOfSixesToNumber);
    console.log(sumOfPlayerOne);
            
        
        })
    });
    