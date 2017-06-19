
var crypto = require("crypto");


exports.genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

exports.encodePassword = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var hashedPassword = hash.digest('hex');
    return hashedPassword;
};


exports.ensureLogin = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/account/login');
    }
}

exports.ensureAdmin = function(req, res, next) {
    if (req.user && req.user.roles.indexOf("admin")>-1) {
        next();
    } else {
        res.redirect('/account/login');
    }
}