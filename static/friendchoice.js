const middle_cards = ["atk sp.png", "atk.png"];
// cards constant should have 20 cards in total
var buffer_cards = ["buffer.png", "buffer 2.png", "buffer 3.png",
    "buffer 4.png", "buffer 5.png", "buffer 6.png"];
var character_cards = ["char bumblebadger.png", "char cat.png", "char chick.png", "char degoose.png", "char eledrowsy.png", 
    "char frog.png", "char GOAT.png", "char hippowerhouse.png", "char mole.png", "char peaparrot.png", "char pigeon.png", "char platy.png", 
    "char scharecrow.png", "char shark.png", "char stingray.png"];

var cardDistributed=false;

function rollRandomDice(){
    // pick rand num from 1 to 9
    myDice = Math.floor(Math.random() * 9) + 1;
    friendDice = Math.floor(Math.random() * 9) + 1;
    
    document
    .getElementById("notification")
    .innerHTML = "Your roll " + myDice + " Friend roll " + friendDice;
}

// shuffle the elements in the array randomly
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function roll(){
    if (!cardDistributed) {
        cardDistributed = true;
        
        // shuffle the card in random order
        shuffle(buffer_cards);
        console.log(buffer_cards)
        shuffle(character_cards);
        console.log(character_cards)
        
        // random distribution of cards to each player
        var my_cards = document.getElementsByClassName('my-card');
        var friend_cards = document.getElementsByClassName('friend-card');
        var idx = 0;
        var path_prefix = "images\\";

        // console.log(my_cards)
        // console.log(friend_cards)

        // distribute buffer cards
        for(var i = 0; i < buffer_cards.length; ++i){
            if(i % 2 == 0){
                my_cards[idx].src = path_prefix + buffer_cards[i];
            }
            else{
                friend_cards[idx].src = path_prefix + buffer_cards[i];
                idx++;
            }
        }
        // distribute character cards
        for(var i = 0; i < character_cards.length; ++i){
            if(i % 2 == 0){
                my_cards[idx].src = path_prefix + character_cards[i];
            }
            else{
                friend_cards[idx].src = path_prefix + character_cards[i];
                idx++;
            }
        }
    }
    rollRandomDice();
}

// as soon as the card distribution,
// each player puts the char card on their display board (ofc choose which one)
// roll the dice to choose which player goes first
// then take whatever given on the stack i.e. sp attack / attack

// getElementByClass("my-card") (but more precisely the charcter card) onClick
// appears on the displayBoard (remain/keep the rotation)
// max cards on display board = 4 cards (i.e. 2 char, 1 buffer, 1 middle)