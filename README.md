## :video_game: Let's play checkers! :video_game:

This is an updated version of [old checkers game](https://github.com/emanuellarini/checkers/tree/master)

Checkout the [new Trello board](https://trello.com/b/TJqoFT2R/checkers-20).

### Up & Running

Install dependencies:
```sh
$ yarn
```

Start application:
```sh
$ yarn start
```

### Tests

Run the below command to run integration/unit tests:
```sh
$ yarn test
```

Run the below command to run E2E tests:
```sh
$ yarn test:e2e
```

__ps: _don't forget to start the app in order to run E2E tests!___

<br/>

## Game Rules

### Turns

Each player have its own turn and once a player makes a move he/she can pass the turn.

### Movement

The Board has 64 (8x8) squares: `32 Dark` and `32 Light`.

It is positioned so that each player has a Light square on the right side corner closest to him or her.

### The Common Discs

There are two types of Common Discs: `Red` and `Black`, and each one represents a Player.

A Disc can:

- Move diagonally, only in Dark squares and towards the enemy
- Capture one enemy Disc by leaping through it but only if there is an empty square to land
- Capture multiple enemy Disc by leaping towards the enemy player and through them

### The King Discs

A very special Disc which is created after a special condition: a Common Disc
reach the furthest row from the Player who controls it.

They can do same movements as Common Discs but also move backwards.

## Win Conditions

Win the game who matches one of these statements:

- Captures all the opponent Discs
- Have one King Disc vs one opponent's Common Disc

### Rematch

Once it happens, a new game will start and the player who lost the last game will start in the new.

<br/>

## Introduction - a cool story to break the ice

I always enjoyed playing games since I was a kid but creating one is something that I never considered.

Well, sometimes life happens and in my first year of the Computer Science degree, while doing Algorithms I, the teacher asked us to make some games as a part of the tests.
And guess what? I sucked. I tried to make a tic-tac-toe game in Pascal and the final result was... terrible haha

After that, I kinda took a grudge about creating games. Many years after I decided to give it another chance - not to mention I was bored doing CRUDs!

At first, I thought about possibilities. I wanted to create a simple but not simpler game. So I started to consider doing Chess. But then, the reality check happened and I realized it would be too much for my "first" game.
So, what's the closest game possible? ***Checkers***.

Also, my idea was to use web development to make the game, I was curious to see if React would play well in a game.

So a few nights and commits later I was able to make it.

It was a two-player game but only playable within the same device and browser tab. The rules were not close to the main game - in Brazil, our Checkers rules are very crazy btw hahaha

But it was nice. I felt comfortable with the result at the time. Also, it helped to show my skills as a Frontend Developer.

And here are some of the things I've used on that project:
* React (CRA)
* Material-UI, Styled Components, React Beautiful Dnd
* Redux and Recompose
* React Testing Library and Puppeteer
* Husky, Prettier and Eslint
* CircleCI
* Netlify

If you're a web developer, guess you already know the interaction between them, right?

4 years after I finished it, I decided to challenge myself again. But this time the gaming stuff was not the priority.
Now, the idea was to make a code more readable and testable, a much better UX... well, with a proper architecture!
And also I wanted to make some docs to tell the story behind the process of making all of it happen.

### A cool story about decisions - WHY

I had a lot to consider when I started, even though I already had a working game.

First, I thought about moving everything to new standards like Typescript, dumping Redux, and updating the libraries.
Because my library of components was small I was able to create a second folder and start from scratch. All I had to do is copy the files and shazam!

Also, I went ahead and made some improvements in the code, I was doing too many unneeded checks when it comes to the movement of discs.

Not to mention there was too much CSS Flex, which is fine, but Grid is a much better approach for my use case.

After that, I started to think about the features.
Playing with a friend on the same computer is something that is not really cool, you know?
So, as a gamer, I wanted to play with a friend... online!

And as you might have already figured out, my project had no backend.
So I needed to add if I want to exchange information between players, and the best way I found was to introduce Sockets communication.

But the problem was... I have never played at that level with Sockets before!
If you know me, it might sound weird to you that I had never worked with it before.
It's been 7 years in the industry of web development and not having that skill started to make an itch.
Well, first profit: getting to know how to work with Sockets :)

Since I'm a pragmatic person, it came to my mind to use Firebase.
Why not?
By using it, I would be able to achieve what I wanted: real-time communication.
But then, where I would store the API key? Client-side? NOPE.

At that point, I realized I was taking the shortest path and if I wanted to know how to work with Sockets I would need to stop being too lazy.
So I knew I had to add a backend on my own and maybe use something like socket.io.

Since I had previous experience with NextJs I thought it would be nice to add it. So I started moving everything from CRA to NextJs.

I tried to follow a few tutorials, but none of them was better than creating a second folder, starting from scratch, and copying the components (same as I did before).
A few commits later I had a working NextJs repository.
Now I only needed to focus on Sockets.

In the meantime, one of my friends sent me [Colyseus](https://www.colyseus.io/) - thank you, [@hugo](https://github.com/holive)!
Colyseus is an impressive lib built to ease the process of creating multiplayer games with Node but still putting you as close as possible to socket concepts.

But then, the numbers started to not match. Because Next has no exposed configuration for its server-side and the Colyseus HTTP server needs to be started I had to create a custom server.
By that time I should have stopped everything and reconsidered my stack. But I didn't...
So the overengineering time has started :face-palm:

Then, a few commits later in dev, everything worked like a charm. So it was time to deploy to prod!

I thought about using two services: [Vercel](https://vercel.com/) and [Netlify](https://www.netlify.com/).
Since I made a custom server for NextJs I would not be able to use Vercel, so I focused on Netlify.

As soon as I tried to deploy it to Netlify it became very clear to me I was doing crazy stuff.
Well, I set Netlify to start understanding a NextJs project via configurations and with my first deployment, nothing was working anymore.
How could I forget how Netlify works? Jesus!
This is where I realized I was crazy to use NextJs for my project. Not to mention a game like that would never profit from Server Side Rendering!
In short, I was trying to use it to solve things it is not supposed to solve! (I told you about the overengineering a while ago haha)

Then I immediately stopped.
It became very clear to me that I was doing EVERYTHING wrong... AND SINCE THE BEGINNING!

So what happened?

The problem started because I lost focus! Somehow my intention with making this project changed in the middle and I became too obsessed.
Well, I won't be telling personal stuff here, but I've been through a lot in the last weeks.

If there is one thing I can guarantee you: it is impossible to work great if outside of it you're going through a lot.

So instead of stopping doing code, I became too obsessed and the result was really bad. Overengineering and multiple reworks ended up in bad code and architecture.

If you are in that kind of situation, take days off... go to the gym... see a therapist.. be smarter than me: don't destroy your psychological even more!

Well, after a good rest I came to look at what I was doing and I had bad news for myself: I needed to start over from the beginning.

This situation is kinda painful, especially for a Senior Engineer.
But it is also a great opportunity to be humble and admit I was TOTALLY wrong.
Also in the future, I'll come here again and feel proud for doing it.

So where do you think a project should start? I could resume it in a single word:`WHY`

Let me quote myself a few paragraphs above:
```
4 years after I finished it, I decided to challenge myself again. But this time the gaming stuff was not the priority.
Now, the idea was to make a code more readable and testable, a much better UX... well, with a proper architecture!
```

Alright, so let's put the plan into paper and stop doing things that I'm not supposed to do even if it's a hobby project.

As you can see I wasted so much time being wrong and not knowing my limits. I hope you have learned a bit and don't make the same mistake. :)

The sad part of the story told, now I can show you the winnings :)

So, now that I knew the `WHY`... I had to figure out the `WHAT`... or in a clearer way: the **Product**!

### Product - WHAT

We devs tend to think too much about the architecture, code, patterns, libraries... **but there is no architecture if there is no product, right? :)**

So let's talk about features! Forget the tech stuff and think more like a Product Owner.

In short, I expect this project to have:
* Two players being able to play a checkers game on separate devices
* Show them the Rules
* Possibility of reconnecting
* Drag and drop, no click bullshit!
* Provide constant feedback:
  * What happens if one of the players disconnects?
  * What happens if someone closes the tab and reopens it?
  * What happens after someone creates the game? Will it wait until 2nd player arrives?
  * Can someone move a disc while offline?
  * How to handle the turns? And much more...

So how I was going to do that?

First, someone would provide his information and then create a game.
The UI must show him the rules right after the creation but only once.
Then, he must grab the link and send it to a friend to connect and start playing.
In the meantime he should not be able to play, he must wait for his friend.
After the game starts they will be able to drag and drop in the correct positions and follow the rules.
Only one wins and after the game finishes they should be able to rematch any times they want.

Ok. Now we have something to start working :clap:

With that we can go to the part we like the most... the `HOW`.

### Architecture - HOW

First, let me add a disclaimer:

```
This is a hobby project. 
In this project, choosing A over B depends mostly on what I wanted to learn/try. Still, choosing poor solutions is not acceptable.
``` 

That being said, let's start talking about architecture.

I knew I was going to need both Frontend and Backend, I started to think about the conflict between Two Repos vs Mono Repo.

So, I chose Monorepo and the reasons were:
* Mono repo has trade-offs that I am willing to pay
* Mono repos usually are harder to deploy but I wanted to try [Nx](https://nx.dev/)
* A project inside a single repository is easier to show and demonstrate
* I don't have plans to go further than what was described earlier for this product
* If I use a repo for the backend and another for the frontend I would need to put E2E in a third repo. It would need more tweaks in CI.

Alright, so let's speak about Nx since it's a part of the core:
* Has a way to lint/build/deploy only affected code
* Not that hard to configure, if you start with their boilerplate you're fine
* Easy to find information on Google

Going further, I also used:
* React - This was decided 4 years ago and it's the core of the challenge
* Express - Backend framework
* Typescript/Eslint - They are part of my test stuff and IMO a no brainer choices for new projects
* Prettier/Husky/LintStaged - Readable code matters a lot
* [React Testing Library](https://testing-library.com/) - Unit/Integration tests
* [Playwright](https://playwright.dev/) - E2E tests - cypress has no support for multi tabs
* [Material UI](https://mui.com/) - A totally personal choice, could be replaced to any other component lib
* [Imagekit](https://imagekit.io/) - CDN for images in tutorial
* [React Beautiful dnd](https://github.com/atlassian/react-beautiful-dnd) - giving life to the board and discs
* [Netlify](https://www.netlify.com/)
* [Heroku](heroku.com)
* [GitHub Actions](https://github.com/features/actions)

Let's see the interaction between them to form both BE and FE.

#### Frontend

Ths project relies on Client-Side Rendering which means it is considered a SPA.

You might also remember that I was using NextJs.
This was one of the things that didn't make any sense.
I was not taking any advantage to use Server Side Rendering, so Next was a poor choice.

Since my Frontend is a SPA, it contains HTML, CSS and JS files.
They are being deployed in Netlify through a deploy command set in Nx.
Nx has a library that can trigger the deployment in Netlify out of the box.
You will see more details in the CI/CD section below.

#### Backend

Handles the Colyseus game room to provide all the logic of the communication between players.

Since I was not able to use Netlify the choice was Heroku.

Heroku is easy to configure and get things going, but then Nx had no solution for it as it does for Netlify.

I had to make a workaround in Github Actions, so let's see how the CI/CD works.

### CI

The pipeline for CI is `exclusive for PRs`. And it consists in:
1. Checkout the branch code
2. Install dependencies
3. Run lint for affected code
4. Run Build for affected code
5. Run unit/integration tests
6. Run E2E tests in dev mode

If it passes and the work is done it's free to get merged.
After merging to the main branch, we start the CD process.

### CD

Different than CI, it only happens in the`main` branch.
Since we already know everything is passing it's safe (though it's not 100%) to skip some steps like linting and testing.
In a perfect scenario, I would create artifacts for both BE and FE while in CI and use the same artifacts.
But it would need a lot of work and this for sure can be done in the future.
So the pipeline consists in:
1. Checkout the branch code
2. Deploy Client - if it has contained changes in code
3. Deploy Server - if it has contained changes in code

In an ideal world, all I need to execute is `yarn affected:deploy --base=origin/main~1`
This command would deploy both FE and BE if any of them has changed.
But Nx has no built-in way to deploy on Heroku our backend which made me use a workaround.
I am manually checking if the build-affected command generates server files (which means it has new server code).
Then, it deploys that new code.

Better than describing is showing it in action. Here are all the possible events while on CD:
* [Deployed both](https://github.com/emanuellarini/checkers/runs/6893354407?check_suite_focus=true)
* [Deployed only Frontend](https://github.com/emanuellarini/checkers/runs/6930618004?check_suite_focus=true)
* [Deployed only Backend](https://github.com/emanuellarini/checkers/runs/6930808735?check_suite_focus=true)
* [Did not deploy anything](https://github.com/emanuellarini/checkers/runs/6930618004?check_suite_focus=true)

### Work Coordination

It is really hard to manage ourselves and also do the code, but none management is far worse because it affects the delivered code.
I knew since the beginning this was not a 1-day project and there were also lots of things to remember.
So I decided to make this [Trello board](https://trello.com/b/TJqoFT2R/checkers-20).
The board centralizes all the efforts I was going to work on and still I probably have missed a few.

### Tests

UNDER DEVELOPMENT SECTION

### Future

The product won't have new features besides what was described in the product section.

So for the future, we can focus on code and architecture. Here are a few things I would like to do:
* Add a report for test coverage and also a document on what was tested (this is what I'll do now, so it might be removed from this list once I reach the goal)
* Since I am using Nx, it would be nice if I use Domain-Driven Design in the libraries folder. This way I would separate better my components and have the apps folder thin.
* Netlify has branch previews and I could use it when testing PRs but then I would need the same feature in the backend.
* Adding more tests - there are some cool ways to test Colyseus
* Check for extra re-renders, I have spread some memos but I am sure there I have missed a few places
* Add cool sound
* Ask help from a Designer to improve the UI/UX
