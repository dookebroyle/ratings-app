github_username: https://github.com/dookebroyle,
repo_name: ratings-app
linkedin_username: doylebrooke, 
email: brookedoyle13@gmail.com,
project_title: Ratings App,
project_description: 
This application retrieves a list of Books from a NY Times Bestsellers List and allows the user to review them.
The user can store, read, update, or delete their reviews. 


(back to top)
Built With

    Node.js
    Javascript
    Express
    Mongoose
    Handlebars

Getting Started

Installation

    Get a free API Key at 
    https://developer.nytimes.com/accounts/login
    Create Account
    Go to APIs/ Books API
    Create App and API key

    Clone the repo
    git clone https://github.com/dookebroyle/ratings-app.git
    Install NPM packages: npm install
    Enter your API key in .env
    const NYTIMES_API_KEY = 'ENTER YOUR API';

    Connect to MongoDB locally
    mongodb.exe --dbpath:/path
    Enter your unique path. May need to find executable path in Mongo files/bin directory

Usage

    Create account if first time
    Log in if you have an account
    Click Current Bestsellers to get current list
    Click Bestsellers to get a list of all bestsellers
    Once you choose a list, choose a book to review
    Create a review
    Go to My ratings to view list of your ratings
    Read, Update, or Delete your ratings


Known Issues

    -Testing needs to be implemented. Should have been done throughout the process. 
        I understand the importance of testing and would implement while employed with Coschedule
    -Styling is atrocious - I'm very sorry to whomever is reviewing my app and code. 
        I am familiar with CSS flexbox and grid and can implement styling if required for the position
    -Need to process data more finely for reader viewability (ex. The book titles are in all caps)
    -If this was a real project and alloted more time, it would be best to pass book object to rating and store
        rather than looking up book by title as can cause collisions
    -Responsiveness and accessibility need to be improved.  Need to add alt tags.
    





Contact
Brooke Doyle 
brookedoyle13@gmail.com

Project Link: https://github.com/dookebroyle/ratings-app.git


Acknowledgments 
Font Awesome Star Ratings

