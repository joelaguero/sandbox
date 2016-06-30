Here's a simple blog-like app.

Setup should be `git clone`, `bundle install`, and `rails s`, assuming you have rails set up.

The main page you want to go to is /posts, which is just a list of posts with comments for each.  You can create a new user from /users/new.

If you're building JS on top of this, here's the "api":

To get a list of comments:

    GET localhost:3000/comments.json

To create a comment:

    POST localhost:3000/comments.json comment[user_id]=1 comment[post_id]=5 comment[body]="some great comment here"

For JS, just shove it in app/assets/javascripts/application.js.
