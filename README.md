# About the Application
The application is an advanced blog application which allow users to view a list of blog
posts, read individual blog posts and comments on the post by other users.

A user can also add blogs, comment on any post and also can edit or delete their previous posts anytime after logging into the account.

The admin of the application can add the post and also can edit or delete any post of the application.

A user can search for any string in the search bar and the app will filter out the posts that includes searched string in its title or content.

Pagination is there for Blog Post List and each page containe atmost 5 posts and a user can go to previous or next page.

A user who has not logged into the system cannot add the post or comment on any post and only the admin can delete or edit all the post.

When signing-up into the account, The user has to provide firstName, email and password(last name is not required) and email id should be unique for every user trying to sign-up.

In this application, MongoDb Database is used for storing all the users and blog posts.

User Authentication is done with cookies-next and jsonwebtoken.

For styling ,Next.js built-in CSS modules are used.

Redux is used for State management in application and it will store the blog posts list and user info and we can retrieve the required info from it.

# To access the application as an admin one has to use the following login details:
email: admin@gmail.com
password: admin1234

# How to run the application locally
To run the application locally, one has to connect to the MongoDb Database and store the connection string in .env.local file also a secret key for jsonwebtoken is required and have to be stored in the same .env.local file. and run the npm install and then npm run dev.

