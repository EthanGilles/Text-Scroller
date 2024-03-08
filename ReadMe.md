# Text Scroller

--------------------

## TO DO

- Make words randomized from a long list of words (currently they are being read in from a small array of like 5 words).
- Make words come at the user faster, with more than one word at a time
- Implement losing, and a reset button for when a word reaches the end of the screen
- Implement score system

--------------------

## LOG

### 3/6/24

- Started the project over using a different technique.
- Got the background working to how I want it.
- Update on background graphics:

<img src="https://github.com/EthanGilles/Text-Scroller/blob/2df19b8b669c08ac50a000e1f1f79ce17c07164f/screenshots/Background.gif">

### 3/7/24

- Made a word come from the left and explode once it is typed
- This animation is the main part of the game
- Graphic updates from today:

<img src="https://github.com/EthanGilles/Text-Scroller/blob/e61e367061fc7b6d485900b0fbf17e4b4bb72cfd/screenshots/Explosion.gif">

### 3/8/24

- Made it so there can be more than one word at a time
- This is a temporary change to test gamplay which is decently fun.


BIG NOTE:
The typing with more than one word is clunky at the moment. It depends on where the word is in the array which can be funky. This could be solved by making sure the words are in the same order on the screen as they are in the array. Then, the words will update in order they are typed so the word in front gets registered first. Currently it seems kinda random if more than one word has the same letter to type. This should be fixed for the front word if the words appear in the same order they are in the array.