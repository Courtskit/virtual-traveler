*Software Requirements*
Software Requirements Vision: To allow users to search for restaurants and things to do in major cities. Covid has nearly eliminated the ability to travel internationally, and in some cases, even locally. We wanted to create a resource for users to search through potential travel destinations and explore food and recreational activities, to help plan a trip for when things begin to reopen.

Scope 

In: This will start users at a home page where they can search for a city. They’ll be redirected to a page with their result, containing a map, a list of food options, and a list of nearby recreational activities. The user will have the option to save a particular city to their Favorites, which can then be accessible from the Favorites page. 

Out: The site will not allow users to change the information displayed. The user also cannot export the information. 

Minimum Viable Product: Our MVP will include a home page, a favorites page, and a city overview page. The city overview page should populate with the right information from the API, and the text divs should be scrollable while the page overall remains fixed. The pages should work together seamlessly. 


Stretch Goals:
- When the user first opens the website, he/she will have the ability to enter a username.
- Another page that will contain random cities and information that a user can browse.
- On the home page, a randomly generate ‘city of the day’ will appear. The user can then click on the city of the day and explore it in detail.
- Users will have the ability to leave comments about cities they’ve been to.

Functionality: The user can add and remove from their list of favorites. The user can also search any city in the search bar. The result will show food options, 
along with things to do in each city.

Data Flow: When the user searches on the front end, the request goes to the server. The server checks the database, and if no information is available, the server checks the APIs for the requested information. This information is sent back to the server, stored in the database, and then pushed back to the front end. 

Nonfunctional Requirements
Usability - All pages working as required.
Testability - Ensuring every function works on each page.
