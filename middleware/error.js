
module.exports = function  (error, req, res, next) {
    console.log(error.name + ':' + error.message );
    res.sendStatus(500);
};