document.querySelector("button").addEventListener("click",function(){
    let p1 = document.getElementById("p1").value;
    let p2 = document.getElementById("p2").value;

    if(p1 != "" && p2 != "")
    {
        sessionStorage.setItem("playerOneName",p1);
        sessionStorage.setItem("playerTwoName",p2);
        window.open('yatzy.html',"_self");
    }
    else
        alert("Enter Your Names");

});