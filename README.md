![](https://media.giphy.com/media/jKlOG7dKhAUKc/source.gif)

# Compare Animals

This page let you pick some animals and compare different statistics about them. E.g. Speed, Age, Legs etc.

# Installation

Clone this repo.
Start php-server in repo folder.
Open server adress in browser. (localhost:XXXX)
Page can also be found here: http://itisalbin.com/compare-animals/

# Code Review

Code review written by [Oliver Davis](https://github.com/DavisDavisDavis).

1. `style-index.css` - Try dividing up the CSS into different files for each section E.g one file for media queries or another for css variables.
2. `style-index.css:275` - Super small detail but when scaling down into mobile view the numbers stop being in the center.
3. `style-index.css` - When comparing two animals with two long names the text can overlap
![image](https://user-images.githubusercontent.com/89775852/140076278-9127a042-bb3d-46e3-92e0-aa9dd8fd33e2.png)
5. `style.css:210-211` - Just an empty css class 🐱  
6. `index.php:28` - For readability it could be useful to change the variable from $i to $j because the variable is also shared with the for loop above (line 17).

This was a super fun website and probably the most unique one in our class! 👍 Can't wait to see what you will do next.

# Testers

Tested by the following people:

1. Nelly Svarvare Petrén
2. Oliver Davis
