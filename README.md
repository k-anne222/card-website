# Two Players Card Game Website
make a website to play a card game <!--give a more clear and detail but brief description about what this game is about-->

## Frontend
1. HTML (the create and design structures and components)
2. Maybe Javascript?

## Backend
3. A tool to control sound
4. A tool to control Log In and Log Out (no)
5. A tool to control the game algorithm

## Rule of Game
1. Receive a total of 10 cards of character and potion(booster) cards at the beginning as card distribution
   - 7 character cards
   - 3 potion(booster) card

2. Each player rolls the dice to decide which player goes first; they then take whatever is given on the stack i.e. sp attack / attack
   - you roll the dice only once when we start the game; just to choose which player goes first!

3. Each player has to pick up attack cards from the middle pile

4. The max number of cards each player can place on their display board = 4 cards (i.e. 2 char, 1 buffer, 1 middle)

5. Depending on the speed of the character:

     Selecting a character card from the "inventory" (not the display board!) to move to the display board:

   a. if the selected character's card speed is 20, the user can use the character card with/without one of the booster cards in one turn but must with atk/sp.atk

   b. if the character speed is 10, the user is able to immediately use one character card at their turn with atk/sp.atk

   c. if the character speed is 5, the player skips their own turn
        (1. if the speed of the character card you selected to move from the inventory and place to the display board...)

Each 'character' card has spd, hp, atk, sp.atk attributes, each 'potion' card gives a buffer (def or spd or atk multiplier) and each 'spell' card tells the user which atk to use (atk or sp.atk) 

## Win Condition
- The game carries on every round until user.Score + op.Score = 11

- Whoever has the highest percentage of character cards left wins the round

<!-- getElementByClass("my-card") (but more precisely the character card) onClick -->

<!-- appears on the displayBoard (remain/keep the rotation) -->

## About the Display Board: 

<!-- click one of the cards on the display board then it will be vibrated shortly indicate that it cannot be moved (give a motion) -->

<!-- top of the screen, give notification say, cannot be replaced! -->

Once the card is on the display board, it cannot be replaced nor removed (until it’s used); if you attempt, there will be a notification alarming that you can't

### Free Audio
src: https://pixabay.com/music/beats-night-detective-226857/

### Sources of Images Used
src: badger - microsoft edge, cat - pinterest, chick - pinterest, goose- microsoft edge, elephant - pinterest, frog - pinterest 
     goat - pinterest, hippo- microsoft edge, mole- pinterest, parrot- microsoft edge, pigeon- microsoft edge, platypus- pinterest, shark - pinterest
     scarecrow - pinterest, stingray- pinterest
