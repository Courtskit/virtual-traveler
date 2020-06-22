*Software Requirements*
*Vision:* To allow users to virtually experience cities they’ve never been to before. Covid has nearly eliminated the ability to travel internationally (and in some cases, even locally), so we wanted to create a virtual tour of the world that everyone can explore from the safety of their own home.
*Scope*
**In:** This will start users at a home page where they can search for a city. They’ll be redirected to a page with their results, and can click on their choice. They will then be taken to an overview page of their chosen location. This page will list historical information, landmarks, things to do, and will show a world map and a street view map. The user will have the option to save a particular city to their Favorites, which can then be accessible from the Favorites page. 
**Out:** The website will also not support video content. The site will not allow users to change the information displayed. The user also cannot export the information.
*Minimum Viable Product:* Our MVP will include a home page, a favorites page, a search results page, and a city overview page. The city overview page should populate with the right information from the API, and the text divs should be scrollable while the page overall remains fixed. The pages should work together seamlessly to deliver the travel experience.
*Stretch Goals*
- When the user first opens the website, he/she will have the ability to enter a username.
- Another page that will contain random cities and information that a user can browse.
- On the home page, a randomly generate ‘city of the day’ will appear. The user can then click on the city of the day and explore it in detail.
*Functionality:* The user can add and remove from their list of favorites. The user can also search any city in the search bar. The links provided in the results will display historical and landmark information about each place, along with things to do in each city.
*Data Flow:* When the user searches on the front end, the request goes to the server. The server checks the database, and if no information is available, the server checks the APIs for the requested information. This information is sent back to the server, stored in the database, and then pushed back to the front end.
*Nonfunctional Requirements*
- Usability - All pages working as required.
- Testability - Ensuring every function works on each page.