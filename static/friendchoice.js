function pickRandomNumbers(){
    // document.getElementById("rollButton")
    
    // pick rand num from 1 to 9
    myDice = Math.floor(Math.random() * 9) + 1;
    friendDice = Math.floor(Math.random() * 9) + 1;
    
    document
    .getElementById("notification")
    .innerHTML = "Your roll " + myDice + " Friend roll " + friendDice
}