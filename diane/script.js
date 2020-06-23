// function generator(){
//   let x = Math.floor((Math.random()*6)+ 1);
//   console.log(x);
//   document.getElementById('#divImage').innerHTML = 
//     `<img src="images/city${x}.jpeg">`;
// }

// $(document).ready(generator());

// window.addEventListener('load', (event) => {
//   console.log('The page has fully loaded');
//   generator();
// });

// For news API based on keyword
// var url = 'http://newsapi.org/v2/everything?' +
//           'q=Apple&' +
//           'from=2020-06-23&' +
//           'sortBy=popularity&' +
//           'apiKey=55dfbfb6602448b1b3f17649cbece724';

// var req = new Request(url);

// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })