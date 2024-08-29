const middle_cards = ["atk sp.png", "atk.png"];
// cards constant should have 20 cards in total
var cards = ["buffer.png", "buffer 2.png", "buffer 3.png",
    "buffer 4.png", "buffer 5.png", "buffer 6.png"];
var character_cards = [];

var executed=false;

function pickRandomNumbers(){
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
    if (!executed) {
        executed = true;
        
        // shuffle the card in random order
        shuffle(cards);
        shuffle(character_cardscards);
        
        // random distribution of cards to each player
        var my_cards = document.getElementsByClassName('my-card');
        var friend_cards = document.getElementsByClassName('friend-card');
        var idx = 0;
        var path_prefix = "images\\";

        // distribute normal cards
        for(var i = 0; i < cards.length; ++i){
            if(i % 2 == 0){
                my_cards[idx].src = path_prefix + cards[i];
            }
            else{
                friend_cards[idx].src = path_prefix + cards[i];
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
    pickRandomNumbers();
}

