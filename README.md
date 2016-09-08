# pinterest-d15-dudepinterest
# Using your mad Angular skillz

You will be broken into teams and your goals is to reverse engineer the basic functionality of Pinterest and build your own version of it.

## Priorities

1. Firebase structure. Flat, flat, flat.
2. Authentication.
3. Create board.
4. Create pin to go on a board.

## Firebase structure

<pre>
 App
  |
  + users
  |---+ -K84hddnjx9v
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- name: "Abraham Ybrimovitz"
  |
  + pins
  |---+ -K84hfurycvb
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- boardid: "-K66hzzzyyyy"
  |   |--- url: "http://www.imgur.com/9rufrniuvnfu2vnefui"
  |   |--- title: "Ha ha, stupid gator"
  |
  + boards
  |---+ -K66hzzzyyyy
  |   |--- uid: "github:jruhfiurnvuienciuwdn"
  |   |--- title: "Stupid animals"
</pre>

## Authentication

### Relevent Firebase docs

+ Determine if the user is logged in with [onAuthStateChanged or currentUser](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
+ Perform an action as soon as user logs in or out with the [onAuthStateChanged event listener](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
