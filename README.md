![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | Canvas Flappy Bird

## Introduction

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_6706fdbfdce80220b94fc6c04e2c990d.jpg)

The famous FlappyBird is a game developed by Vietnamese video game artist and programmer Dong Nguyen, under his game development company [dotGEARS](https://en.wikipedia.org/wiki/DotGEARS).

The objective is to direct a flying bird, named "Faby", who moves continuously to the right, between sets of pipes. If the player touches the pipes, they lose. Faby briefly flaps each time upward that the player clicks on the spacebar; if the screen is not tapped, Faby falls because of gravity.

If you want to understand better the game, go ahead and play a bit [here](http://flappybird.io/)

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```
  git add .
  git commit -m "done"
  git push origin master
  ```

- Create Pull Request so your TAs can check up your work.

## Instructions

### Iteration 1: Create the board

The canvas tag is already part of the HTML starter code provided in the `index.html` file. Your first assignment is to add the `background`. In the `images` folder, you will find the file you should use for it.

:wink: Check the previous lesson to remember how to make an infinite loop with an image!

### Iteration 2: Create the Player

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_5279ab3427a72a2fbf77cbc9e2b32664.png)

We have the `canvas` with our beautiful background. Now we need to add ´Faby´.

Remember he should have the following properties:

- `width`
- `height`
- `speedX`
- `speedY`
- `gravity`
- `gravitySpeed`

And the functions `update` and `newPos` to keep updating its position in every update.

We should also check the user iteration when he clicks the **spacebar**. Every time the **spacebar** is clicked, the `gravity` of 'Faby' should change to negative, and after the user removes the clicking finger, set the `gravity` to positive again.

### Iteration 3: Create obstacles

<img src="https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_032b5d79ab1c7412e747473b679f0b59.png" alt="" style="width:450px; float:right; margin-left: 50px"/>

You need to add some obstacles to make this fun. If you notice every time we create obstacles, we should create two of them and position one at the top, and the other at the bottom, and of course, make a gap between them where 'Faby' could pass.

It might be a good idea to create an array to store all our obstacles. This will help us later to move them, and check if 'Faby' crash with one of them.

For now, just push them into the array.

### Iteration 4: Update the canvas

This is the most important function in our project. The `update` function should do the following:

- Clear the `canvas`
- Update obstacles position
- Update our player position
- Create new obstacles

:bulb: For creating **new obstacles**, we recommend doing it every certain amount of updates. You should consider adding a counter to see how many times we update our `canvas`.

### Iteration 5: Check the collision

When 'Faby' crashes into one of the obstacles or goes out of the `canvas` the game should stop.

In this iteration, your goal is to create this functionality. For that purpose, you can use the array of obstacles we had to create, iterating over it and checking their position comparing to the position of the bird.

### BONUS: Add points

If we want to challenge somebody, we need to know who makes more points. Go ahead and add it to the game.

:bulb: You can use the counter we add to the update function!

<br>

**Happy coding!** :heart:
