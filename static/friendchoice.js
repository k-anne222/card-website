const middle_cards = ["atk sp.png", "atk.png"];
// cards constant should have 20 cards in total
var buffer_cards = ["buffer.png", "buffer 2.png", "buffer 3.png",
    "buffer 4.png", "buffer 5.png", "buffer 6.png"];
var character_cards = ["char bumblebadger.png", "char cat.png", "char chick.png", "char degoose.png", "char eledrowsy.png", 
    "char frog.png", "char GOAT.png", "char hippowerhouse.png", "char mole.png", "char peaparrot.png", "char pigeon.png", "char platy.png", 
    "char scharecrow.png", "char shark.png", "char stingray.png"];
    //badger - microsoft edge, cat - pinterest, chick - pinterest, goose- microsoft edge, elephant - pinterest, frog - pinterest 
    //goat - pinterest, hippo- microsoft edge, mole- pinterest, parrot- microsoft edge, pigeon- microsoft edge, platypus- pinterest, shark - pinterest
    //scarecrow - pinterest, stingray- pinterest

var path_prefix = "images\\";
var start=false;

var myCharCardsCounter = 0;
var myBuffCardsCounter = 0;
var myAtkCardsCounter = 0;

var friendCharCardsCounter = 0;
var friendBuffCardsCounter = 0;
var friendAtkCardsCounter = 0;

const maxCharCards = 2;

function rollRandomDice(){
    // pick rand num from 1 to 9
    let myDice = 0;
    let friendDice = 0;
    while (myDice == friendDice){
        myDice = Math.floor(Math.random() * 9) + 1;
        friendDice = Math.floor(Math.random() * 9) + 1;
    }
    
    document
    .getElementById("notification")
    .innerHTML = "Your roll " + myDice + " Friend roll " + friendDice;
}

// shuffle the elements in the array randomly
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

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
    }
}

function selectMyCard(cardId){
    // write a code here, that gets the selected card (using the parameter cardID!)
    const selectedCard = document.getElementById(cardId);

    // write a code here, that gets the display board where the card should be moved into
    const myDisplay = document.getElementById("right-display-board");

    // move the selectedCard to my display board
    let cardToBoard = selectedCard.cloneNode(true);
    myDisplay.appendChild(cardToBoard);

    selectedCard.style.visibility = 'hidden';
}

function selectFriendCard(cardId){
    const selectedOppCard = document.getElementById(cardId);
    const oppDisplay = document.getElementById("left-display-board")

    let cardToBoard = selectedOppCard.cloneNode(true)
    oppDisplay.appendChild(cardToBoard);
    
    selectedOppCard.style.visibility = 'hidden';

    if (selectedCard.style.visibility = 'hidden') {
        onclick(selectedCard.style.visibility = 'visible')
    }
    if (selectedCard.style.visibility = 'visible') {
        onclick(selectedCard.style.visibility = 'hidden')
    }
}

// as soon as the card distribution,
// roll the dice to choose which player goes first
// then take whatever given on the stack i.e. sp attack / attack

// getElementByClass("my-card") (but more precisely the charcter card) onClick
// appears on the displayBoard (remain/keep the rotation)
// max cards on display board = 4 cards (i.e. 2 char, 1 buffer, 1 middle)

// you only roll the dice once when we start the game just only to choose which player goes first!

/* display board: */
// click one of the cards on the display board then it will be vibrated shortly to indicate that it cannot be moved (give a motion)
// top of the screen, give notification say, cannot be replaced!
// once the card is on the display board, it cannot be replaced nor removed (until it’s used)