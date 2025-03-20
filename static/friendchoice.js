const middle_cards = ["atk sp.png", "atk.png"];
// cards constant should have 20 cards in total
var buffer_cards = ["buffer.png", "buffer 2.png", "buffer 3.png",
    "buffer 4.png", "buffer 5.png", "buffer 6.png"];
var character_cards = ["char bumblebadger.png", "char cat.png", "char chick.png", "char degoose.png", "char eledrowsy.png", 
    "char frog.png", "char GOAT.png", "char hippowerhouse.png", "char mole.png", "char peaparrot.png", "char pigeon.png", "char platy.png", 
    "char scharecrow.png", "char shark.png", "char stingray.png"];

var char_cards_properties = {
    "char bumblebadger" : {
        "hp" : 35, 
        "atk" : 10, 
        "atk sp" : 15, 
        "sp" : 10
    }, 
    "char cat" : {
        "hp" : 40, 
        "atk" : 10, 
        "atk sp" : 20, 
        "sp" : 10
    }, 
    "char chick" : {
        "hp" : 25, 
        "atk" : 20, 
        "atk sp" : 25, 
        "sp" : 20
    }, 
    "char degoose" : {
        "hp" : 30, 
        "atk" : 0, 
        "atk sp" : 50, 
        "sp" : 10
    }, 
    "char eledrowsy" : {
        "hp" : 40, 
        "atk" : 10, 
        "atk sp" : 20, 
        "sp" : 5
    }, 
    "char frog" : {
        "hp" : 60, 
        "atk" : 10, 
        "atk sp" : 15, 
        "sp" : 10
    }, 
    "char GOAT" : {
        "hp" : 70, 
        "atk" : 50, 
        "atk sp" : 70, 
        "sp" : 10
    }, 
    "char hippowerhouse" : {
        "hp" : 45, 
        "atk" : 50, 
        "atk sp" : 15, 
        "sp" : 10
    }, 
    "char mole" : {
        "hp" : 20, 
        "atk" : 5, 
        "atk sp" : 20, 
        "sp" : 10
    }, 
    "char peaparrot" : {
        "hp" : 50, 
        "atk" : 5, 
        "atk sp" : 5, 
        "sp" : 5
    }, 
    "char pigeon" : {
        "hp" : 60, 
        "atk" : 5, 
        "atk sp" : 0, 
        "sp" : 20
    }, 
    "char platy" : {
        "hp" : 35, 
        "atk" : 15, 
        "atk sp" : 25, 
        "sp" : 5
    }, 
    "char scharecrow" : {
        "hp" : 40, 
        "atk" : 20, 
        "atk sp" : 20, 
        "sp" : 5
    }, 
    "char shark" : {
        "hp" : 20, 
        "atk" : 10, 
        "atk sp" : 25, 
        "sp" : 5
    },
    "char stingray" : {
        "hp" : 35, 
        "atk" : 5, 
        "atk sp" : 40, 
        "sp" : 5
    } 
}

var buffer_map = {
    "buffer" : {
        "property" : "atk",
        "multiplier" : 2
    },
    "buffer 2": {
        "property" : "sp. atk",
        "multiplier" : 3
    },
    "buffer 3": {
        "property" : "atk",
        "multiplier" : 3
    },
    "buffer 4": {
        "property" : "hp",
        "multiplier" : 3
    },
    "buffer 5": {
        "property" : "sp atk",
        "multiplier" : 2
    },
    "buffer 6": {
        "property" : "hp",
        "multiplier" : 2
    }
}


var path_prefix = "images\\";
var start=false;

var myCharCardsCounter = 0;
var myBuffCardsCounter = 0;
var myAtkCardsCounter = 0;

var friendCharCardsCounter = 0;
var friendBuffCardsCounter = 0;
var friendAtkCardsCounter = 0;

const maxCharCards = 2;
const maxBufferCards = 1;
const maxAtkCards = 1;

var myDice = 0;
var friendDice = 0;

var myScore = 0;
var friendScore = 0;

var cardsToConfirm = {
    "character": "",
    "buffer": "",
    "middle": "",
    "target": ""
}

var turn = null;

var myFirstMove = true;
var friendFirstMove = true;

function updateNotification(){
    document
    .getElementById("notification")
    .innerHTML = "Friend roll " + friendDice + " Your roll " + myDice + " | Turn: " + turn;
}

function showHP(){
    document
    .getElementById("HPboard")
    .style.visibility = "visible"     
}

function updateHPDisplay(){
    // show hp of all the cards in players' display board

    myHPtext = "My HP: "
    oppHPtext = "Friend's HP: "

    const myDisplay = document.getElementById("right-display-board");
    var myCards = myDisplay.getElementsByTagName('img');
    
    for (var i = 0; i < myCards.length; i++){
        let cardSrc = decodeURIComponent(myCards[i].src.split(/[/\\]/).pop());

        // if the card you're looking at is a character card
        if (character_cards.includes(cardSrc)){
            cardSrc = cardSrc.replace(".png", "");
            myHPtext = myHPtext + cardSrc + " = " + char_cards_properties[cardSrc]["hp"] + "<br />"
        }
    }

    const oppDisplay = document.getElementById("left-display-board");
    var oppCards = oppDisplay.getElementsByTagName('img');
    
    for (var i = 0; i < oppCards.length; i++){
        let cardSrc = decodeURIComponent(oppCards[i].src.split(/[/\\]/).pop());

        // if the card you're looking at is a character card
        if (character_cards.includes(cardSrc)){
            cardSrc = cardSrc.replace(".png", "");
            oppHPtext = oppHPtext + cardSrc + " = " + char_cards_properties[cardSrc]["hp"] + "<br />"
        }
    }

    document
    .getElementById("HPboard") 
    .innerHTML = myHPtext + "<br />" + oppHPtext
}

//stores two randomly generated integers as myDice and friendDice to determine who goes first and then 
//writes what each integer is 
function rollRandomDice(){
    // pick rand num from 1 to 9
    while (myDice == friendDice){
        myDice = Math.floor(Math.random() * 9) + 1;
        friendDice = Math.floor(Math.random() * 9) + 1;
    }
    
    if (friendDice > myDice){
        turn = "friend"
    }
    else{
        turn = "me"
    }
    updateNotification()
}

// shuffle the elements in the array randomly
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

//if the game has been started/roll has been pressed, shuffle the buffer cards (call shuffle()) and character cards and distribute to each player
//chooses two random integers for friend and user roll i.e. calls rollRandomDice(), and then makes roll button disappear
function play(){
    if (!start) {
        start = true;
        
        // shuffle the card in random order
        shuffle(buffer_cards);
        shuffle(character_cards);
        
        
        // random distribution of cards to each player
        let my_cards = document.getElementsByClassName('my-card');
        let friend_cards = document.getElementsByClassName('friend-card');
        let idx = 0;


        // distribute buffer cards
        for(let i = 0; i < 6; ++i){
            if(i % 2 == 0){
                my_cards[idx].src = path_prefix + buffer_cards[i];
            }
            else{
                friend_cards[idx].src = path_prefix + buffer_cards[i];
                idx++;
            }
        }
        // distribute character cards
        for(let i = 0; i < 14; ++i){
            if(i % 2 == 0){
                my_cards[idx].src = path_prefix + character_cards[i];
            }
            else{
                friend_cards[idx].src = path_prefix + character_cards[i];
                idx++;
            }
        }
        rollRandomDice();
        const button = document.getElementById("playButton");
        button.style.visibility = "hidden";
        
        const board = document.getElementById("board");
        board.style.visibility = "visible";
    }
}

function gameOver(){
    if(myScore == 3 || friendScore == 3){
        if (myScore == 3) {
            winner = "me"
        }
        if (friendScore == 3){
            winner = "friend"
        }
        document.getElementById('alert').style.display = 'block';
        document.getElementById('gameOver').innerHTML = "The game is over. <br /> The winner is [" + winner + "]. <br /> To start the game again, please reload the page";
    }
}

// makes middle pile of atk and sp atk cards be randomly generated each time it's clicked
// between the two of them, randomly generated one will appear on the top of the card stack
function updateCardStack(){
    const atkCardsPile = document.getElementById("card-stack");
    
    // 0.1 * 2 = 0.2 -> 0
    // 0.3 * 2 = 0.6 -> 0
    // 0.5 * 2 = 1.0 -> 1
    // 0.7 * 2 = 1.4 -> 1
    // 0.9 * 2 = 1.8 -> 1
    
    // flooring (= rounding down to the nearest whole number)
    const randomCardIndex = Math.floor(Math.random() * middle_cards.length);

    // update the image of the card <- middle_cards[randomCardIndex]    
    atkCardsPile.src = path_prefix + middle_cards[randomCardIndex];
}

//function for when user clicks a middle stack card (sp atk / atk) - adds the card to the display board
//and makes sure only one atk/sp atk cards can be added to display board
function takeCardFromTheMiddleStack(){
    const selectedCard = document.getElementById("card-stack");
    
    const myDisplay = document.getElementById("right-display-board");
    const oppDisplay = document.getElementById("left-display-board");
    
    if(turn == "me"){
        if(myAtkCardsCounter < maxAtkCards){
            // move the selectedCard to my display board
            let cardToBoard = selectedCard.cloneNode(true);
            myDisplay.appendChild(cardToBoard);

            cardToBoard.id += "-right";
            
            cardToBoard.removeAttribute('onclick');
            cardToBoard.addEventListener('click', function(){
                selectToConfirm(cardToBoard.id);
            });
                        
            myAtkCardsCounter += 1;
            updateCardStack();
        }
        else if(friendAtkCardsCounter < maxAtkCards){
            // move the selectedCard to friend's display board
            let cardToBoard = selectedCard.cloneNode(true);
            oppDisplay.appendChild(cardToBoard);

            cardToBoard.id += "-left";
            
            cardToBoard.removeAttribute('onclick');
            cardToBoard.addEventListener('click', function(){
                selectToConfirm(cardToBoard.id);
            });
            
            friendAtkCardsCounter += 1;
            updateCardStack();
        }
        else{
            alert("no more attack cards can be placed");
        }
    }
    else{
        if(friendAtkCardsCounter < maxAtkCards){
            // move the selectedCard to friend's display board
            let cardToBoard = selectedCard.cloneNode(true);
            oppDisplay.appendChild(cardToBoard);

            cardToBoard.id += "-left";

            cardToBoard.removeAttribute('onclick');
            cardToBoard.addEventListener('click', function(){
                selectToConfirm(cardToBoard.id);
            });

            friendAtkCardsCounter += 1;
            updateCardStack();

        }
        else if(myAtkCardsCounter < maxAtkCards){
            // move the selectedCard to my display board
            let cardToBoard = selectedCard.cloneNode(true);
            myDisplay.appendChild(cardToBoard);

            cardToBoard.id += "-right";
            
            cardToBoard.removeAttribute('onclick');
            cardToBoard.addEventListener('click', function(){
                selectToConfirm(cardToBoard.id);
            });

            myAtkCardsCounter += 1;
            updateCardStack();
        }
        else{
            alert("no more attack cards can be placed");
        }
    }
}

// moves the selected card to the corresponding display board
function moveToDisplayBoard(selectedCard, displayBoard){
    let cardToBoard = selectedCard.cloneNode(true);
    displayBoard.appendChild(cardToBoard);
            
    cardToBoard.removeAttribute('onclick');
    cardToBoard.addEventListener('click', function(){
        selectToConfirm(cardToBoard.id);
    });
            
    selectedCard.style.visibility = 'hidden';
}

//for user
//makes sure that after the chosen cards are in the display boards, that they can't be changed/swapped out
//also hides the original cards to make it look like they moved from og pos to display board
function selectMyCard(cardId){
    if (turn == "me"){
        const selectedCard = document.getElementById(cardId);
        const myDisplay = document.getElementById("right-display-board");

        if (!myDisplay.contains(selectedCard)){
            // checks if the card seleted is a character card
            if (selectedCard.src.includes("char")){
                if (myCharCardsCounter == maxCharCards){
                    alert('cannot be replaced!!');
                    return;
                }
                else{
                    myCharCardsCounter += 1;
                }
            }
            // checks if the card seleted is a buffer card
            else if(selectedCard.src.includes("buffer")){
                if (myBuffCardsCounter == maxBufferCards){
                    alert('cannot be replaced!!');
                    return;
                }
                else{
                    myBuffCardsCounter += 1;
                }   
            }
            // checks if the card seleted is a attack card
            else if (selectedCard.src.includes("atk")){
                if (myAtkCardsCounter == maxAtkCards){
                    alert('cannot be replaced!!');
                    return;
                }
                else{
                    myAtkCardsCounter += 1;
                }
            }
            
            // move the selectedCard to my display board
            moveToDisplayBoard(selectedCard, myDisplay)
        }
        else{
            // give a notification to warn the user
            // that the card, which is already placed on the board, cannot be removed or replaced
            alert("cannot be replaced!!");
        }
        
        if (myCharCardsCounter == maxCharCards && myBuffCardsCounter == maxBufferCards && myAtkCardsCounter == maxAtkCards){
            if (myFirstMove){
                turn = "friend";
                myFirstMove = false;
            }
        }
        updateNotification()
    }
    else{
        alert("It is not your turn");
    }
}

//for friend
//makes sure that after the chosen cards are in the display boards, that they can't be changed/swapped out
//also hides the original cards to make it look like they moved from og pos to display board
function selectFriendCard(cardId){
    if (turn == "friend"){
        const selectedCard = document.getElementById(cardId);
        const oppDisplay = document.getElementById("left-display-board");

        if (!oppDisplay.contains(selectedCard)){
            // checks if the card seleted is a character card
            if (selectedCard.src.includes("char")){
                if (friendCharCardsCounter == maxCharCards){
                    alert('cannot be replaced!!');
                    return;
                }
                else{
                    friendCharCardsCounter += 1;
                }
            }
            // checks if the card seleted is a buffer card
            else if(selectedCard.src.includes("buffer")){
                if (friendBuffCardsCounter == maxBufferCards){
                    alert('cannot be replaced!!');
                    return;
                }
                else{
                    friendBuffCardsCounter += 1;
                }
            }
            // checks if the card seleted is a attack card
            else if (selectedCard.src.includes("atk")){
                if (friendAtkCardsCounter == maxAtkCards){
                    alert('cannot be replaced!!');
                    return;
                }
                else{
                    friendAtkCardsCounter += 1;
                }
            }

            moveToDisplayBoard(selectedCard, oppDisplay)
        }
        else{
            // give a notification to warn the user
            // that the card, which is already placed on the board, cannot be removed or replaced
            alert("cannot be replaced!!");
        }
        if (friendCharCardsCounter == maxCharCards && friendBuffCardsCounter == maxBufferCards && friendAtkCardsCounter == maxAtkCards){
            if (friendFirstMove){
                turn = "me";
                friendFirstMove = false;
            }
        }
        updateNotification()
    }
    else{
        alert("It is not friend's turn");
    }
}

function updateSelectedCardsRecord(selectedCard){
    let cardSrc = decodeURIComponent(selectedCard.src.split(/[/\\]/).pop().replace('.png', ''));

    cardSrcPNG = cardSrc + ".png";

    if (character_cards.includes(cardSrcPNG)){
        cardsToConfirm["character"] = cardSrc;
    }
    else if (buffer_cards.includes(cardSrcPNG)){ 
        cardsToConfirm["buffer"] = cardSrc;
    }
    else if (middle_cards.includes(cardSrcPNG)){
        cardsToConfirm["middle"] = cardSrc;
    }

    // shows what cards have been selected and prints out a message
    document
    .getElementById("board")
    .innerHTML = "Selected cards: " + cardsToConfirm["character"] + ", " + cardsToConfirm["buffer"] + ", " + cardsToConfirm["middle"] + "<br />" + "Target: " + cardsToConfirm["target"];
}

// activated when the card (on the display board) is clicked to be selected
function selectToConfirm(cardId){    
    const selectedCard = event.target; // get the clicked card directly

    if(turn == "me"){
        if (document.getElementById("left-display-board").contains(selectedCard)){
            // that selected "character" card is the target to attack
            let cardSrc = decodeURIComponent(selectedCard.src.split(/[/\\]/).pop().replace('.png', ''));
            cardSrcPNG = cardSrc + ".png";

            // check if the selected card is a character card
            if (character_cards.includes(cardSrcPNG)){
                cardsToConfirm["target"] = cardSrc
            }
            else{
                alert("Choose a character card for your target")
            }

            document
            .getElementById("board")
            .innerHTML = "Selected cards: " + cardsToConfirm["character"] + ", " + cardsToConfirm["buffer"] + ", " + cardsToConfirm["middle"] + "<br />" + "Target: " + cardsToConfirm["target"];
        }
        else if (document.getElementById("right-display-board").contains(selectedCard)){
            updateSelectedCardsRecord(selectedCard)
        }
    }
    else{
        if (document.getElementById("right-display-board").contains(selectedCard)){
            // that selected "character" card is the target to attack
            let cardSrc = decodeURIComponent(selectedCard.src.split(/[/\\]/).pop().replace('.png', ''));

            cardSrcPNG = cardSrc + ".png";

            if (character_cards.includes(cardSrcPNG)){
                cardsToConfirm["target"] = cardSrc

                document
                .getElementById("board")
                .innerHTML = "Selected cards: " + cardsToConfirm["character"] + ", " + cardsToConfirm["buffer"] + ", " + cardsToConfirm["middle"] + "<br />" + "Target: " + cardsToConfirm["target"];
            }
            else{
                alert("Choose a character card for your target")
            }
        }
        else if (document.getElementById("left-display-board").contains(selectedCard) && turn == "friend"){
                updateSelectedCardsRecord(selectedCard)
        }
    }
} 

function flushCardsToConfirm(){
    cardsToConfirm["character"] = ""
    cardsToConfirm["buffer"] = ""
    cardsToConfirm["middle"] = ""
    cardsToConfirm["target"] = ""
    
    // clear the board 
    document
    .getElementById("board")
    .innerHTML = "Selected cards: " + cardsToConfirm["character"] + ", " + cardsToConfirm["buffer"] + ", " + cardsToConfirm["middle"] + "<br />" + "Target: " + cardsToConfirm["target"];
}

// when we confirm our selections, the program needs to hold the information about our selections
// i.e. holding the char card, buffer card, sp atk selected

// we might have to pass the parameter for the confirm() regarding whose turn it is

function sectionSp5(displayBoard){
    var cards = displayBoard.getElementsByTagName('img');
    for (var i = 0; i < cards.length; i++){
        let cardSrc = decodeURIComponent(cards[i].src.split(/[/\\]/).pop().replace('.png', ''));

        if (cardSrc == cardsToConfirm["buffer"]){
            cards[i].remove();
            if (turn == "me"){
                myBuffCardsCounter -= 1
            }
            else{ friendBuffCardsCounter -= 1}
        }
    }

    for (var i = 0; i < cards.length; i++){
        let cardSrc = decodeURIComponent(cards[i].src.split(/[/\\]/).pop().replace('.png', ''));

        if (cardSrc == cardsToConfirm["middle"]){
            cards[i].remove();
            if (turn == "me"){
                myAtkCardsCounter -= 1
            }
            else{ friendAtkCardsCounter -= 1}
        }
    }
}

function updateScoreAndDefeatedTarget(defeatedDisplayBoard, scoreId){
    if(char_cards_properties[cardsToConfirm["target"]]["hp"] <= 0){
        // update score record
        if (turn == "me"){
            myScore += 1
            // display the updated score record
            document.getElementById(scoreId).innerHTML = "Score: " + myScore
        }
        else{ 
            friendScore += 1
            document.getElementById(scoreId).innerHTML = "Score: " + friendScore
        }

        // remove the target card defeated
        var cards = defeatedDisplayBoard.getElementsByTagName('img');
        for (var i = 0; i < cards.length; i++){
            let cardSrc = decodeURIComponent(cards[i].src.split(/[/\\]/).pop().replace('.png', ''));
                        
            if (cardSrc == cardsToConfirm["target"]){
                cards[i].remove();
                if (turn == "me"){friendCharCardsCounter-=1}
                else{myCharCardsCounter-=1}
            }
        }  
    }   
}

function sectionSp10(displayBoard){
    var cards = displayBoard.getElementsByTagName('img');
    for (var i = 0; i < cards.length; i++){
        let cardSrc = decodeURIComponent(cards[i].src.split(/[/\\]/).pop().replace('.png', ''));
                    
        if (cardSrc == cardsToConfirm["middle"]){
            // get atk stat of my character card
            var atkStat = char_cards_properties[cardsToConfirm["character"]][cardSrc]
            // get hp stat of opponent's character card
            // and reduce the hp to (hp-atk)
            char_cards_properties[cardsToConfirm["target"]]["hp"] -= atkStat
                        
            cards[i].remove(); 
            if(turn=="me"){myAtkCardsCounter-=1}
            else{friendAtkCardsCounter-=1}
        }
    }
}

function caseAC(cards){
    for (var i = 0; i < cards.length; i++){
        let cardSrc = decodeURIComponent(cards[i].src.split(/[/\\]/).pop().replace('.png', ''));
        if (cardSrc == cardsToConfirm["middle"]){
            // get atk stat of my character card i.e. "atk" or "sp atk"
            var atkStat = char_cards_properties[cardsToConfirm["character"]][cardSrc]
            // get hp stat of opponent's character card
            // and reduce the hp to (hp-atk)
            char_cards_properties[cardsToConfirm["target"]]["hp"] -= atkStat
                    
            cards[i].remove();
            if(turn=="me"){myAtkCardsCounter-=1}
            else{friendAtkCardsCounter-=1}
        }
    } 
}

function caseB(cards){
    for (var i = 0; i < cards.length; i++){
        let cardSrc = decodeURIComponent(cards[i].src.split(/[/\\]/).pop().replace('.png', ''));
            
        if (cardSrc == cardsToConfirm["middle"]){
            // get the card's sp atk/atk stat
            // you decide to attack the target with the char's atk or sp atk

            // gives the value of "atk" or "sp atk" of the card
            var atkStat = char_cards_properties[cardsToConfirm["character"]][cardSrc]

            cards[i].remove();
            if(turn=="me"){myAtkCardsCounter-=1}
            else{friendAtkCardsCounter=-1} 
        }
    }
    for (var i = 0; i < cards.length; i++){
        let cardSrc = decodeURIComponent(cards[i].src.split(/[/\\]/).pop().replace('.png', ''));
        
        if (cardSrc == cardsToConfirm["buffer"]){
            /*
                buffer, buffer 2, buffer 3, buffer 4, buffer 5, buffer 6
                atk * 2, sp atk * 3, atk * 3, hp * 3, sp atk * 2, hp * 2
            */
            
            /*
                buffer_map[cardSrc] -> {
                    "property"
                    "multiplier"
                }
            */

            // what property of the char card are you trying to upgrade?
            var propertyToBuffer = buffer_map[cardSrc]["property"] // sp atk? atk? hp?
            var multiplierToBuffer = buffer_map[cardSrc]["multiplier"] // 2? 3?
    

            if (propertyToBuffer == "hp"){
                // if you activate "hp" buffer card -> it would do nothing about the attack stat (i.e. the attacking power remains the same)
                // but the "hp" of the char card you use for attacking goes up (healing/recover itself)
                char_cards_properties[cardsToConfirm["character"]]["hp"] *= multiplierToBuffer
                char_cards_properties[cardsToConfirm["target"]]["hp"] -= atkStat
            }
            // buffering up atk and sp atk values
            else{
                var bufferedStat = char_cards_properties[cardsToConfirm["character"]][propertyToBuffer] * multiplierToBuffer
                if (cardsToConfirm["middle"] == propertyToBuffer){
                    char_cards_properties[cardsToConfirm["target"]]["hp"] -= bufferedStat
                }
                else{
                    char_cards_properties[cardsToConfirm["target"]]["hp"] -= atkStat
                }
            }
            cards[i].remove(); 
            if(turn=="me"){myBuffCardsCounter-=1}
            else{friendBuffCardsCounter=-1} 
        }
    }
}

function confirm(){
    let myDisplay = document.getElementById("right-display-board");
    let oppDisplay = document.getElementById("left-display-board");   

    if (char_cards_properties[cardsToConfirm["character"]]["sp"] == 5){
            
        //5 spd = the character can only:
        //Skip at the first time (beginning) and then attack 1x after being attacked. then proceed as normal

        // once you use the sp = 5 card, the card is expired
        // character (sp = 5) -> stays on the display board (only leaves when the HP becomes 0)
        // buffer -> disappear from the display board
        // middle -> disappear from the display board
        if (turn == "me"){
            sectionSp5(myDisplay)
            // sectionSp5(myDisplay, myBuffCardsCounter, myAtkCardsCounter)
            turn = "friend";
        }
        else{
            sectionSp5(myDisplay)
            // sectionSp5(oppDisplay, friendBuffCardsCounter, friendAtkCardsCounter)
            turn = "me";
        }
    }
    else if (char_cards_properties[cardsToConfirm["character"]]["sp"] == 10){
        //10 spd = the character can only do:  
        //case A. Char A attack 1x but with no buffer card
        if (cardsToConfirm["buffer"] != ""){
            alert('character speed is only 10, you are unable to use a buffer card')
            cardsToConfirm["buffer"] = ""
        }
        else{
            if (turn == "me"){
                sectionSp10(myDisplay)
                updateScoreAndDefeatedTarget(oppDisplay, "myScore")
                turn = "friend"
            }

            /*
                should have a counter somehwere of how many opp cards and how many my cards are 0
                i meant like how many cards hp reaching 0 counter
                counter for deadOppCard / deadMyCard
                if opp cards hp reach 0, myscore += 1
                if my cards hp reach 0, oppscore += 1
                when one of the players' score = 5 wins
            */

            else{
                sectionSp10(oppDisplay)
                updateScoreAndDefeatedTarget(myDisplay, "friendScore")
                turn = "me"
            }    
        }
    }
    else if (char_cards_properties[cardsToConfirm["character"]]["sp"] == 20){
            //20 spd = the character can do either: 
            //case A. Char A (the same single) attack 2x (but both with no buffer cards)
            //case B. Char A attack 1x with buffer card 
            //case C. Char A attack 1x & Char B attack 1x (but both with no buffer cards)

        if (turn == "me"){
            var myCards = myDisplay.getElementsByTagName('img');
            // case A and C - middle, char (ensure contains no buffer)
            if (cardsToConfirm["buffer"] == ""){
                caseAC(myCards)
            }
            // case B - middle, buffer, char
            else{
                caseB(myCards)
                turn = "friend"
            }

            updateScoreAndDefeatedTarget(oppDisplay,"myScore")
        }
        else{
            var oppCards = oppDisplay.getElementsByTagName('img');
            // case A and C - middle, char (ensure contains no buffer)
            if (cardsToConfirm["buffer"] == ""){
                caseAC(oppCards)
            }
            // case B - middle, buffer, char
            else{
                caseB(oppCards)
                turn = "me" 
            }

            updateScoreAndDefeatedTarget(myDisplay, "friendScore")
        }
    }

    updateNotification()
    flushCardsToConfirm()
    updateHPDisplay()
    gameOver()
}