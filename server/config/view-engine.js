var path=require("path");
//import ejs package
var pug = require('pug');
//default export
module.exports=function(app){
/*//htmlengine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
//set views directory
//__direname mean current directory
//"views"==> setting name, fixed name*/
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../views'));

};