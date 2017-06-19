//json file reading

var jsonfile = require("jsonfile");
var path = require("path");

//default is development mode
process.env.NODE_ENV = process.env.NODE_ENV || "development";

var node_env = process.env.NODE_ENV;

var config_path = "./env/development.config.json";

if (node_env == "test") {
    config_path = "./env/test.config.json";
}


if (node_env == "production") {
    config_path = "./env/production.config.json";
}

var config = jsonfile.readFileSync(path.join(__dirname, 
                     config_path));

module.exports = config;

console.log("ENV ", process.env.NODE_ENV);