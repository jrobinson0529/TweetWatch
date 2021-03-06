
# TweetWatch
### [Main site](https://tweetwatch.netlify.app)  [![Netlify Status](https://api.netlify.com/api/v1/badges/d458224e-0949-41e2-9d48-203e22df6a1b/deploy-status)](https://app.netlify.com/sites/tweetwatch/deploys)
### [Dev site](https://tweetwatch-development.netlify.app) [![Netlify Status](https://api.netlify.com/api/v1/badges/fe069e59-f188-482b-bb5a-2db7146addb3/deploy-status)](https://app.netlify.com/sites/tweetwatch-development/deploys)



  TweetWatch is a simple and efficient app for skimming tweets to get the latest news on specific topics from reputable sources of information using the power of Twitter.
  <br>
  ![191024121759-twitter-phone-stock](https://user-images.githubusercontent.com/45837967/119564586-8fb52e00-bd6e-11eb-9c67-516f3d71e04e.jpg)
  <br>
  With the ever growing presence of news channels, restaurants, and businesses on social media. Twitter has become the first place many of these sources post updates or news on new products. If you want to get news on things important to you without all the manual searching and skimming on the clutter of social media this app is for you! :point_right: :brain:

### Postman Responses
- Get User(s) by Username

```{
    "data": [
        {
            "id": "110365072",
            "name": "Gordon Ramsay",
            "profile_image_url": "https://pbs.twimg.com/profile_images/1349755150316040194/VpUCtbH8_normal.jpg",
            "protected": false,
            "username": "GordonRamsay",
            "verified": true
        },
        {
            "name": "Joseph Marquez",
            "verified": true,
            "username": "C9Mang0",
            "protected": false,
            "profile_image_url": "https://pbs.twimg.com/profile_images/1360714045599358978/oh2wRcYm_normal.jpg",
            "id": "621577260"
        }
    ]
}
```
- Get User Tweets by ID from last 7 days.(This is the furthest back this app will track)

``` {
    "data": [
        {
            "id": "1398550212768112640",
            "text": "Weekends done right at Heddon Street Kitchen !! @GordonRamsayGRR https://t.co/Aglb0DZEuN"
        },
        {
            "id": "1398350822518501379",
            "text": "RT @HellsKitchenFOX: Guess what? \n\nOnly 3?????? more days until @GordonRamsay has his hands full with his new generation. ???? #HellsKitchen https???"
        },
        {
            "id": "1397978552465825797",
            "text": "America???I???m looking for a #NextLevelChef???is it you ? Apply now: https://t.co/2vV74SYEZr https://t.co/68tPzFzu2f"
        }
}
```
- Get Tweet(s) by tweetId

```{
    "data": [
        {
            "author_id": "110365072",
            "id": "1398550212768112640",
            "text": "Weekends done right at Heddon Street Kitchen !! @GordonRamsayGRR https://t.co/Aglb0DZEuN"
        },
        {
            "author_id": "621577260",
            "id": "1398435937529438209",
            "text": "https://t.co/iT6ZHW0Wci \n\n40 Friday \n\nWatching videos and probably doing un ban request \n\n:)"
        }
    ]
}
```
### ERD
![image](https://user-images.githubusercontent.com/45837967/119585208-d5362300-bd8f-11eb-861a-61eea4d9c15b.png)
### Data Flow
[Link](https://lucid.app/lucidchart/invitations/accept/inv_1bac38d2-9933-4064-b279-30a972258288)
![image](https://user-images.githubusercontent.com/45837967/120404917-09b85a80-c30d-11eb-9927-f18f4192170f.png)
### Wireframe (ROUGH)
____
[Link](https://www.figma.com/file/G3wnLzt2Xl6thcIaN8j2T7/TweetWatch?node-id=135%3A768)
![image](https://user-images.githubusercontent.com/45837967/120404807-c827af80-c30c-11eb-8ebc-90f4b7dc8c6e.png)

### Features
- #### Users
  - User must authenticate through google to use the site. Prompted by a log in page.
  - Users will be able to log in and change their username and/or add a bio in a profile page.
- #### General
  - Once logged in the user will see a homepage where all currently tracked topics are compiled into one feed.
  - On the left hand side there will be a navbar that displays the user's profile image, bio and dropdown to access the log out or user profile page.
  - The navbar will display all the Categories the user has currently set up.
  - The navbar will feature an About link to an about page that explains the motivation for the site.
  - The navbar will feature a Contact link to give the user access to contacting me via email.
  - On the navbar there will be the option to add/delete/edit Categories that store Topics which will ulitmately track the tweets.
  - Next to each Category and Topic on the navbar it will display the amount of tweets being tracked. The Category number is the amount of tweets combined between all topics that belong to that category.
  
- #### Categories
  - The Add/Edit buttons will open up a form that allows the user to either create or edit a Category.
  - If the user clicks a 'Category' the Category's topics will appear on the navbar below all the categories. The page will switch to the Category's main page which will display all the handles being tracked for that category. (Twitter handles are being tracked on the category as a whole, not on individual topics.)
  - The user can add and delete twitter handles to track for each Category.
  - The Category main page will display a title for that category, a description, and a compilation feed of the twitter posts being tracked for each topic in that Category.
- #### Topics
  - The user will be able to create, edit, delete Topics in a similar way to categories.
  - The topic page will display a feed of twitter posts that are aquired by search paramaters which are set up by the user.
  - When the User updates search paramaters the DOM should update the tweets to reflect that.
  - The user can favorite certain topics that will display on a Favorited Topics page where they can see cards for each favorited topic.
- #### Navigation
  - Dynamically updating categories and topics
  - Number to track how many tweets are in each
- #### Saved Tweets
    - User can save tweets by clicking a button on any tweet in the site
    - User can view their saved tweets in the Saved Tweets page
    - User can delete tweets from this page
### Stretch Features
- #### User interactivity
    - Users can follow other users by searching their account name and see a random Topic that their followed user is tracking.
    - User will be able to view a friends list to see all their followed users.
    - User can click on the randomly shown Topic from their followed users and see that Topics page/feed.
- #### Navigation
    - User can see how many tweets are currently showing for every category and topic (Category is sum of all topics tweets)
### Personal Portfolio Site
https://jesserobinson.me/
### Link to your project board
https://github.com/jrobinson0529/TweetWatch/projects
### Contributors
[Jesse Robinson](https://github.com/jrobinson0529)
### Loom video walkthrough
