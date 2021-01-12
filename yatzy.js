
let allDices = document.querySelectorAll(".dices h3"); // 
let allMinors = document.querySelectorAll(".minor");
let allNotChoosedMajors = document.querySelectorAll(".notChoosedMajor");
let allNotChoosedMinors = document.querySelectorAll(".notChoosedMinor");
let counter = 0;
let numberOfRolls = 0;

document.querySelector("button").addEventListener("click", function () {

    if (numberOfRolls < 3) { // 1-0 2-1 3-2  4-3 x

        let allNotChoosedDices = document.querySelectorAll(".notChoosed");
        for (let i = 0; i < allNotChoosedDices.length; i++)
            allNotChoosedDices[i].innerHTML = Math.floor(Math.random() * 6) + 1;//. random is between 0 and a number but we dont need the 0 so we add 1
        numberOfRolls++;

        // console.log(allNotChoosedMinors);
        let test = document.querySelectorAll(".notChoosedMinor");
        for (let i = 0; i < test.length; i++)
            test[i].innerHTML = "";


        calculateMinors();
        threeOfKind();
        fourOfKind();
        yatzy();
        chance();
        largeStraight();
        smallStraight();
        fullhouse();
    }


});

for (let i = 0; i < allDices.length; i++) {
    allDices[i].addEventListener("click", function () {

        if (this.classList.contains("notChoosed")) { //when click on a dice, it changes class to choosedDice((it is styled in CSS) and remove the original class)
            this.classList.add("choosedDice");
            this.classList.remove("notChoosed");
        }
        else {
            this.classList.remove("choosedDice");
            this.classList.add("notChoosed");
        }
    });
}


function calculateMinors() {
    let value = 0;
    let turn = "";
    turn = counter % 2 ;
    for (let i = 0; i < allDices.length; i++) {
        value = Number(allDices[i].innerHTML);
        if (document.querySelector(".minor" + value + turn).classList.contains("notChoosedMinor")) {
            if (document.querySelector(".minor" + value + turn).innerHTML == "")
                document.querySelector(".minor" + value + turn).innerHTML = value;
            else
                document.querySelector(".minor" + value + turn).innerHTML = Number(document.querySelector(".minor" + value + turn).innerHTML) + value;
        }
    }

}

function calculateSum() {

    let sum = 0;
    let turn = counter % 2;
    // 0   1
    let selectedMinors = document.querySelectorAll(".choosedMinor");
    for (let i = 0; i < selectedMinors.length; i++) {
        if (selectedMinors[i].innerHTML != "")
            if( selectedMinors[i].classList[0][6] == turn ){
                sum += Number(selectedMinors[i].innerHTML);
            }
    }

    //                             0   1   0  1
    // selected Miors => 4 elemnts [e1,e2,e3,e4]
    // sum += e1.innerHtml
    // e2= 1

    document.querySelector(".sum" + turn).innerHTML = sum;
    if (sum >= 63)
        document.querySelector(".bonus" + turn).innerHTML = "35";

    return sum;
}

for (let i = 0; i < allMinors.length; i++) {
    allMinors[i].addEventListener("click", function () {

        if (this.classList.contains("notChoosedMinor")) {

            if (this.innerHTML == "") {
                let answer = confirm("Are you really want to take the 0?");
                if (answer) {
                    this.innerHTML = "0";
                    this.classList.add("choosedMinor");
                    this.classList.remove("notChoosedMinor");
                    // from this line i'm restarting my elemnts
                    numberOfRolls = 0;

                    for (let i = 0; i < allDices.length; i++) {
                        allDices[i].innerHTML = "Dice";
                        if (allDices[i].classList.contains("choosedDice")) {
                            allDices[i].classList.remove("choosedDice");
                            allDices[i].classList.add("notChoosed");
                        }
                    }
                    let test = document.querySelectorAll(".notChoosedMajor");

                    for (let i = 0; i < test.length; i++)
                    test[i].innerHTML = "0";


                }

            }
            else {
                this.classList.add("choosedMinor");
                this.classList.remove("notChoosedMinor");
                // from this line i'm restarting my elemnts
                numberOfRolls = 0;

                for (let i = 0; i < allDices.length; i++) {
                    allDices[i].innerHTML = "Dice";
                    if (allDices[i].classList.contains("choosedDice")) {
                        allDices[i].classList.remove("choosedDice");
                        allDices[i].classList.add("notChoosed");
                    }
                }
                let test = document.querySelectorAll(".notChoosedMajor");

                    for (let i = 0; i < test.length; i++)
                    test[i].innerHTML = "0";
            }

            calculateSum();
        calculateTotal();
        displayWinner();
        counter++;
        playersTurn();
        }
        
    });
}

function sumAllDices() {
    let sum = 0;
    for (let i = 0; i < allDices.length; i++)
        sum += Number(allDices[i].innerHTML);

    return sum;
}

function threeOfKind() {
    let turn = counter%2;
    let threeOfKindPosition = document.querySelector(".threeOfKind"+turn);

    if (threeOfKindPosition.classList.contains("notChoosedMajor")) {
        let sortedArray = [];
        for (let i = 0; i < allDices.length; i++)
            sortedArray.push(allDices[i].innerHTML);

        sortedArray = sortedArray.sort();
        // i should return the sum of all dices but if we got at least 3 same values
        //                  5   0 1 2 
        for (let i = 0; i < sortedArray.length - 2; i++) {

            if (sortedArray[i] == sortedArray[i + 1] && sortedArray[i + 1] == sortedArray[i + 2]) {
                threeOfKindPosition.innerHTML = sumAllDices();
                return;
            }
            else
                threeOfKindPosition.innerHTML = "0";
        }
    }

}

function fourOfKind() {
    let turn = counter%2;

    let fourOfKindPosition = document.querySelector(".fourOfKind"+turn);

    if (fourOfKindPosition.classList.contains("notChoosedMajor")) {
        let sortedArray = [];
        for (let i = 0; i < allDices.length; i++)
            sortedArray.push(allDices[i].innerHTML);

        sortedArray = sortedArray.sort();
        // i should return the sum of all dices but if we got at least 3 same values
        //                  5   0 1 2 
        for (let i = 0; i < sortedArray.length - 3; i++) {

            if (sortedArray[i] == sortedArray[i + 1] && sortedArray[i + 1] == sortedArray[i + 2] && sortedArray[i] == sortedArray[i + 3]) {
                fourOfKindPosition.innerHTML = sumAllDices();
                return;
            }
            else
                fourOfKindPosition.innerHTML = "0";
        }
    }

}

function yatzy() {
    let turn = counter%2;

    let yatzy = document.querySelector(".yatzy" + turn);
    if (yatzy.classList.contains("notChoosedMajor")) {
        if (allDices[0].innerHTML == allDices[1].innerHTML && allDices[0].innerHTML == allDices[2].innerHTML && allDices[0].innerHTML == allDices[3].innerHTML && allDices[0].innerHTML == allDices[4].innerHTML)
            yatzy.innerHTML = "50";
        else
            yatzy.innerHTML = "0";
    }
}

function chance() {
    let turn = counter%2;

    let chance = document.querySelector(".chance"+ turn );
    if (chance.classList.contains("notChoosedMajor"))
        chance.innerHTML = sumAllDices();
}

function smallStraight() {
    let turn = counter%2;

    let smallStraighttPosition = document.querySelector(".smallStraight" + turn);

    if (smallStraighttPosition.classList.contains("notChoosedMajor")) {
        let sortedArray = [];
        for (let i = 0; i < allDices.length; i++)
            sortedArray.push(allDices[i].innerHTML);
        sortedArray = sortedArray.sort();

        // 1 2 3 4 , 2 3 4 5 , 3 4 5 6
        console.log(sortedArray);
        for (let i = 0; i < 2; i++) {
            if (sortedArray[0] == sortedArray[1] - 1 && sortedArray[1] == sortedArray[2] - 1 && sortedArray[2] == sortedArray[3] - 1)
                smallStraighttPosition.innerHTML = "30";
            else
                smallStraighttPosition.innerHTML = "0";
        }
    }

}

function largeStraight() {
    let turn = counter%2;

    let largeStraightPosition = document.querySelector(".largeStraight"+turn);

    if (largeStraightPosition.classList.contains("notChoosedMajor")) {
        let sortedArray = [];
        for (let i = 0; i < allDices.length; i++)
            sortedArray.push(allDices[i].innerHTML);
        sortedArray = sortedArray.sort();

        if (sortedArray[0] == sortedArray[1] - 1 && sortedArray[1] == sortedArray[2] - 1 && sortedArray[2] == sortedArray[3] - 1 && sortedArray[3] == sortedArray[4] - 1)
            largeStraightPosition.innerHTML = "40";
        else
            largeStraightPosition.innerHTML = "0";
    }

}

function fullhouse() {
    let turn = counter%2;

    let fullhousePosition = document.querySelector(".fullhouse" + turn);

    if (fullhousePosition.classList.contains("notChoosedMajor")) {
        let sortedArray = [];
        for (let i = 0; i < allDices.length; i++)
            sortedArray.push(allDices[i].innerHTML);
        sortedArray = sortedArray.sort();
        let threeFlag = false, twoFlag = false;

        // 2 2 3 3 3  => true enter the second if
        // 3 3 3 5 5  => fullhouse from first condition

        if (sortedArray[0] == sortedArray[1] && sortedArray[1] == sortedArray[2]) {
            if (sortedArray[3] == sortedArray[4]) {
                threeFlag = true;
                twoFlag = true;
            }
        }


        // the first array will enter in this if condition
        else if (sortedArray[0] == sortedArray[1]) {
            if (sortedArray[2] == sortedArray[3] && sortedArray[3] == sortedArray[4]) {
                threeFlag = true;
                twoFlag = true;
            }
        }


        // // looking for the two values
        // for(let i=0; i<sortedArray.length-1; i++){
        //     if( sortedArray[i] == sortedArray[i+1] )
        //         twoFlag = true;
        // }

        // // looking for the 3 values
        // for(let i=0; i<sortedArray.length-2; i++){
        //     if( sortedArray[i] == sortedArray[i+1] == sortedArray[i+2] )
        //         threeFlag = true;
        // }

        if (twoFlag && threeFlag)
            fullhousePosition.innerHTML = "25";
        else
            fullhousePosition.innerHTML = "0";
    }

}
for (let i = 0; i < allNotChoosedMajors.length; i++) {

    allNotChoosedMajors[i].addEventListener("click", function () {

        if( this.classList.contains("notChoosedMajor") ){

            if (this.innerHTML == "0" || this.innerHTML == "") {
                let x = confirm("Are you really want to take the 0?");
                if (x) {
                    this.innerHTML = "0";
                    this.classList.remove("notChoosedMajor");
                    this.classList.add("choosedMajor");
                    // from here i'm restarting the elemnts
                    numberOfRolls = 0;
    
                    for (let i = 0; i < allDices.length; i++) {
                        allDices[i].innerHTML = "Dice";
                        if (allDices[i].classList.contains("choosedDice")) {
                            allDices[i].classList.remove("choosedDice");
                            allDices[i].classList.add("notChoosed");
                        }
                    }
                    
                    let test1 = document.querySelectorAll(".notChoosedMinor");
                    for (let i = 0; i < test1.length; i++)
                    test1[i].innerHTML = "";
                    let test = document.querySelectorAll(".notChoosedMajor");
                    for (let i = 0; i < test.length; i++)
                        test[i].innerHTML = "0";
                }
            }
            else {
                this.classList.remove("notChoosedMajor");
                this.classList.add("choosedMajor");
                // from here i'm restarting the elemnts
                numberOfRolls = 0;
                for (let i = 0; i < allDices.length; i++) {
                    allDices[i].innerHTML = "Dice";
                    if (allDices[i].classList.contains("choosedDice")) {
                        allDices[i].classList.remove("choosedDice");
                        allDices[i].classList.add("notChoosed");
                    }
                }
                let test1 = document.querySelectorAll(".notChoosedMinor");
                    for (let i = 0; i < test1.length; i++)
                    test1[i].innerHTML = "";
                let test = document.querySelectorAll(".notChoosedMajor");
                for (let i = 0; i < test.length; i++)
                    test[i].innerHTML = "0";
            }
            calculateSum();
            calculateTotal();
            displayWinner();
            counter++;
            playersTurn();

        }
        
    });

}

function calculateTotal(){
    let turn = counter%2;
    let sum = 0;

    let allChoosedMinors = document.querySelectorAll(".choosedMinor");
    for(let i=0; i<allChoosedMinors.length; i++){
        if( allChoosedMinors[i].classList[0][6] == turn )
            sum += Number(allChoosedMinors[i].innerHTML) ;
    }
        
    let bonus = document.querySelector(".bonus" + turn);
    if( bonus.innerHTML != "" )
        sum += Number(bonus.innerHTML);

    sum += calculateSumOfMajors();

    let totalPosition = document.querySelector(".total"+turn);
    totalPosition.innerHTML = sum;
}

function calculateSumOfMajors(){
    let turn = counter % 2;
    let sum = 0;
    let allSelectedMajors = document.querySelectorAll(".choosedMajor");
    for( let i=0; i<allSelectedMajors.length; i++ ){
        if( allSelectedMajors[i].classList[0][ allSelectedMajors[i].classList[0].length-1 ] == turn ){
            sum += Number(allSelectedMajors[i].innerHTML);
        }
    }

    return sum;
}

function setNames(){
    document.getElementById("p1").innerHTML = sessionStorage.getItem("playerOneName");
    document.getElementById("p2").innerHTML = sessionStorage.getItem("playerTwoName");
}

setNames();

function displayWinner(){

    let allSelectedMinors = document.querySelectorAll(".choosedMinor");
    let allSelectedMajors = document.querySelectorAll(".choosedMajor");

    console.log(counter);
    if( counter == 25 ){
        let theWinner = "";
        let firstPlayerScore = Number(document.querySelector(".total0").innerHTML);
        let secondPlayerScore = Number(document.querySelector(".total1").innerHTML);
        if( firstPlayerScore > secondPlayerScore )
            theWinner = document.getElementById("p1").innerHTML + " wins.";
        else if( firstPlayerScore < secondPlayerScore )
            theWinner = document.getElementById("p2").innerHTML + " wins.";
        else
            theWinner = " it's a Draw";
        
        console.log(theWinner);
        endTheGame(theWinner);

    }

}
displayWinner();
function endTheGame(x){

    document.querySelector(".myBody").style.display = "none";
    document.querySelector(".ended").style.display = "flex";
    document.querySelector(".ended").style.justifyContent = "center";
    document.querySelector(".ended").style.alignItems = "center";
    document.querySelector(".ended").style.flexDirection = "column";

    document.querySelector(".ended h1").innerHTML = x;


}
function playersTurn(){
    if( counter % 2 == 0 )
    {
        document.getElementById("p1").style.backgroundColor = "violet";
        document.getElementById("p2").style.backgroundColor = "transparent";
    }
    else
    {
        document.getElementById("p2").style.backgroundColor = "violet";
        document.getElementById("p1").style.backgroundColor = "transparent";
    }

}
playersTurn();

document.querySelector(".restart").addEventListener("click",function(){

    window.open('index.html',"_self");

});
