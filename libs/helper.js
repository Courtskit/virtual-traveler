// 500 error function
const error = (err, response) => {
    response.status(500).send('Sorry, something went wrong');
    console.log('error', err);
}






module.exports.err = error;