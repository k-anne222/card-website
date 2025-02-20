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
        "sp atk" : 15, 
        "sp" : 10
    }, 
    "char cat" : {
        "hp" : 40, 
        "atk" : 10, 
        "sp atk" : 20, 
        "sp" : 10
    }, 
    "char chick" : {
        "hp" : 25, 
        "atk" : 20, 
        "sp atk" : 25, 
        "sp" : 20
    }, 
    "char dagoose" : {
        "hp" : 30, 
        "atk" : 0, 
        "sp atk" : 50, 
        "sp" : 10
    }, 
    "char eledrowsy" : {
        "hp" : 40, 
        "atk" : 10, 
        "sp atk" : 20, 
        "sp" : 5
    }, 
    "char frog" : {
        "hp" : 60, 
        "atk" : 10, 
        "sp atk" : 15, 
        "sp" : 10
    }, 
    "char GOAT" : {
        "hp" : 70, 
        "atk" : 50, 
        "sp atk" : 70, 
        "sp" : 10
    }, 
    "char hippowerhouse" : {
        "hp" : 45, 
        "atk" : 50, 
        "sp atk" : 15, 
        "sp" : 10
    }, 
    "char mole" : {
        "hp" : 20, 
        "atk" : 5, 
        "sp atk" : 20, 
        "sp" : 10
    }, 
    "char peaparrot" : {
        "hp" : 50, 
        "atk" : 5, 
        "sp atk" : 5, 
        "sp" : 5
    }, 
    "char pigeon" : {
        "hp" : 60, 
        "atk" : 5, 
        "sp atk" : 0, 
        "sp" : 20
    }, 
    "char platy" : {
        "hp" : 35, 
        "atk" : 15, 
        "sp atk" : 25, 
        "sp" : 5
    }, 
    "char scharecrow" : {
        "hp" : 40, 
        "atk" : 20, 
        "sp atk" : 20, 
        "sp" : 5
    }, 
    "char shark" : {
        "hp" : 20, 
        "atk" : 10, 
        "sp atk" : 25, 
        "sp" : 5
    },
    "char stingray" : {
        "hp" : 35, 
        "atk" : 5, 
        "sp atk" : 40, 
        "sp" : 5
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

var myScore = 0;
var friendScore = 0;

var cardsToConfirm = {
    "character": "",
    "buffer": "",
    "middle": ""
}

var turn = null;

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
    
    document
    .getElementById("notification")
    .innerHTML = "Friend roll " + friendDice + " Your roll " + myDice + " | Turn: " + turn;
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
    
    let cardToBoard = document.createElement('img');
    cardToBoard.id = selectedCard.src.replace(".png", "");
    cardToBoard.src = selectedCard.src;
    cardToBoard.className = selectedCard.className;

    // add event listener "selectToConfirm"
    
    const myDisplay = document.getElementById("right-display-board");
    const oppDisplay = document.getElementById("left-display-board");
    
    // if the roll number of friend is bigger
    // then the takeCard function must place the card to the friend's side
    if(myDice > friendDice){
        if(myAtkCardsCounter < maxAtkCards){
            // move the selectedCard to my display board
            // let cardToBoard = selectedCard.cloneNode(true);
            myDisplay.appendChild(cardToBoard);
            cardToBoard.addEventListener('click', function(){
                selectToConfirm(cardToBoard.id);
            });
            myAtkCardsCounter += 1;
            updateCardStack();
        }
        else if(friendAtkCardsCounter < maxAtkCards){
            // move the selectedCard to friend's display board
            // let cardToBoard = selectedCard.cloneNode(true);
            oppDisplay.appendChild(cardToBoard);
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
    // if the roll number of mine is bigger
    // then the takeCard function must place the card to the my side
    else{
        if(friendAtkCardsCounter < maxAtkCards){
            // move the selectedCard to friend's display board
            // let cardToBoard = selectedCard.cloneNode(true);
            oppDisplay.appendChild(cardToBoard);
            friendAtkCardsCounter += 1;
            updateCardStack();
        }
        else if(myAtkCardsCounter < maxAtkCards){
            // move the selectedCard to my display board
            // let cardToBoard = selectedCard.cloneNode(true);
            myDisplay.appendChild(cardToBoard);
            myAtkCardsCounter += 1;
            updateCardStack();
        }
        else{
            alert("no more attack cards can be placed");
        }
    }
}

//for user
//makes sure that after the chosen cards are in the display boards, that they can't be changed/swapped out
//also hides the original cards to make it look like they moved from og pos to display board
function selectMyCard(cardId){
    if (turn == "me"){
        // gets the selected card (using the parameter cardID!)
        const selectedCard = document.getElementById(cardId);

        // gets the display board where the card should be moved into
        const myDisplay = document.getElementById("right-display-board");

        /* 
            ensures that the selected/clicked card is not on the board
            if the card you selected/clicked is not on the board then it should be moved to the board
            otherwise, nothing should happen on the card as it is already on the board!
        */
        if (!myDisplay.contains(selectedCard)){
            // checks if the card seleted is a character card
            if (selectedCard.src.includes("char")){
                if (myCharCardsCounter == maxCharCards){
                    alert('cannot be replaced!!');
                    Break;
                }
                else{
                    myCharCardsCounter += 1;
                }
            }
            // checks if the card seleted is a buffer card
            else if(selectedCard.src.includes("buffer")){
                if (myBuffCardsCounter == maxBufferCards){
                    alert('cannot be replaced!!');
                    Break;
                }
                else{
                    myBuffCardsCounter += 1;
                }
            }
            // checks if the card seleted is a attack card
            else if (selectedCard.src.includes("atk")){
                if (myAtkCardsCounter == maxAtkCards){
                    alert('cannot be replaced!!');
                    Break;
                }
                else{
                    myAtkCardsCounter += 1;
                }
            }

            // move the selectedCard to my display board
            let cardToBoard = selectedCard.cloneNode(true);
            myDisplay.appendChild(cardToBoard);
        
            cardToBoard.removeAttribute('onclick');
            cardToBoard.addEventListener('click', function(){
                selectToConfirm(cardToBoard.id);
            });

            selectedCard.style.visibility = 'hidden';
        }
        else{
            // give a notification that warns the user
            // that the card, which is already placed on the board, cannot be removed or replaced
            alert("cannot be replaced!!");
        }
    }
    else{
        alert("It is not your turn")
    }
    if (myCharCardsCounter == maxCharCards && myBuffCardsCounter == maxBufferCards && myAtkCardsCounter == maxAtkCards){
        turn = "friend"
    }
    document
    .getElementById("notification")
    .innerHTML = "Friend roll " + friendDice + " Your roll " + myDice + "Turn: " + turn;
}

//for friend
//makes sure that after the chosen cards are in the display boards, that they can't be changed/swapped out
//also hides the original cards to make it look like they moved from og pos to display board
function selectFriendCard(cardId){
    if (turn == "friend"){
        const selectedCard = document.getElementById(cardId);
        const oppDisplay = document.getElementById("left-display-board")

        if (!oppDisplay.contains(selectedCard)){
            // checks if the card seleted is a character card
            if (selectedCard.src.includes("char")){
                if (friendCharCardsCounter == maxCharCards){
                    alert('cannot be replaced!!');
                    Break;
                }
                else{
                    friendCharCardsCounter += 1;
                }
            }
            // checks if the card seleted is a buffer card
            else if(selectedCard.src.includes("buffer")){
                if (friendBuffCardsCounter == maxBufferCards){
                    alert('cannot be replaced!!');
                    Break;
                }
                else{
                    friendBuffCardsCounter += 1;
                }
            }
            // checks if the card seleted is a attack card
            else if (selectedCard.src.includes("atk")){
                if (friendAtkCardsCounter == maxAtkCards){
                    alert('cannot be replaced!!');
                    Break;
                }
                else{
                    friendAtkCardsCounter += 1;
                }
            }

            // move the selectedCard to my display board
            // let cardToBoard = selectedCard.cloneNode(true);

            let cardToBoard = selectedCard.cloneNode(true);
            oppDisplay.appendChild(cardToBoard);

            cardToBoard.removeAttribute('onclick');
            cardToBoard.addEventListener('click', function(){
                selectToConfirm(cardToBoard.id);
            });
        
            selectedCard.style.visibility = 'hidden';
        }
        else{
            // give a notification that warns the user
            // that the card, which is already placed on the board, cannot be removed or replaced
            alert("cannot be replaced!!");
        }
    }
    else{
        alert("It is not friend's turn")
    }
    if (friendCharCardsCounter == maxCharCards && friendBuffCardsCounter == maxBufferCards && friendAtkCardsCounter == maxAtkCards){
        turn = "me"
    }
    document
    .getElementById("notification")
    .innerHTML = "Friend roll " + friendDice + " Your roll " + myDice + "Turn: " + turn;
}

// activated when click the card on the display board!
function selectToConfirm(cardId){
    // check where this selectToConfirm() is being activated from i.e. from right display board of left display board
    const selectedCard = document.getElementById(cardId);
    if (document.getElementById("right-display-board").contains(selectedCard) && turn == "me"){
        // ok
        let cardSrc = decodeURIComponent(selectedCard.src.split(/[/\\]/).pop().replace('.png', ''))

        cardSrcPNG = cardSrc + ".png";
        console.log(cardSrcPNG);

        if (character_cards.includes(cardSrcPNG)){
            cardsToConfirm["character"] = cardSrc
        }
        else if (buffer_cards.includes(cardSrcPNG)){ 
            cardsToConfirm["buffer"] = cardSrc
        }
        else if (middle_cards.includes(cardSrcPNG)){
            cardsToConfirm["middle"] = cardSrc
        }

        //shows what cards have been selected and prints out a message
        document
        .getElementById("board")
        .innerHTML = "Selected cards: " + cardsToConfirm["character"] + ", " + cardsToConfirm["buffer"] + ", " + cardsToConfirm["middle"];
    }
    else if (document.getElementById("left-display-board").contains(selectedCard) && turn == "friend"){
        // ok
        let cardSrc = decodeURIComponent(selectedCard.src.split(/[/\\]/).pop().replace('.png', ''))

        cardSrcPNG = cardSrc + ".png";
        console.log(cardSrcPNG);

        if (character_cards.includes(cardSrcPNG)){
            cardsToConfirm["character"] = cardSrc
        }
        else if (buffer_cards.includes(cardSrcPNG)){ 
            cardsToConfirm["buffer"] = cardSrc
        }
        else if (middle_cards.includes(cardSrcPNG)){
            cardsToConfirm["middle"] = cardSrc
        }

        //shows what cards have been selected and prints out a message
        document
        .getElementById("board")
        .innerHTML = "Selected cards: " + cardsToConfirm["character"] + ", " + cardsToConfirm["buffer"] + ", " + cardsToConfirm["middle"];
    }
    else{
        // invalid action: you cannot select cards on the wrong display board!
        alert("invalid action: you cannot select cards on the wrong display board!")
    }

    

    // get the property of the selected card
    // 1. handle differently based on the "sp"(speed) of the card e.g. if the sp is 5/10/20... etc.

    // if the card you selected is **not** character card, then it would not have "sp" property (it just does not make any sense!)
    // we need an if statement that first checks if the card we're looking at is character card or not!
} 

// when we confirm our selections, the program needs to hold the information about our selections
// i.e. holding the char card, buffer card, sp atk selected

// we might have to pass the parameter for the confirm() regardin whose turn it is
// but don't worry about this for now, just leave it - we'll look at this later (just leaving a note here for a reminder)
function confirm(){
    if (cardSrc in char_cards_properties){
        if (char_cards_propertie[cardSrc][sp] == 5){
            //5 spd = the character can only:
            //Skip at the first time (beginning) and then attack 1x after being attacked. then proceed as normal
            
            // turn = "" to someone else
            // for ex. if turn was me then this should be friend (vice versa.)
            //  

            // calculation about s
        }
        else if (char_cards_properties[cardSrc][sp] == 10){
            //10 spd = the character can only do:  
            //a. Char A attack 1x but with no buffer card
        }
        else if (char_cards_properties[cardSrc][sp] == 20){
            //20 spd = the character can do either: 
            //a. Char A attack 2x but both with no buffer cards
            //b. Char A attack 1x with buffer card 
            //c. Char A attack 1x & Char B attack 1x 
        }
    }
    else{
        // the card you're looking at is either 1. buffer card 2. middle card
        // you might leave this empty if you don't have any idea of what to do with it
        // otherwise, you'll have some ideas?
    }
}