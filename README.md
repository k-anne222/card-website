# card-website
make website to play a card game

## Frontend
1. HTML (the create and design structures and components)
2. Maybe Javascript?

## Backend
3. A tool to control sound
4. A tool to control Log In and Log Out
4. A tool to control the game algorithm

## Rule of Game
receive a total of 10 cards in the beginning 

if speed is 20, able to use 2 cards in one turn, if 10, user is able to immediately use card at their turn but if speed is 5, have to skip their turn 

each 'character' card has spd, hp, atk, sp. atk attributes, each 'potion' card gives a buffer (def or spd or atk multiplier) and each 'spell' card tells user which atk to use (atk or sp.atk) 
[all spell cards have 20 spd]

game carries on every round until user.Score + op.Score = 11

whoever has highest percentage of character cards left wins the round
