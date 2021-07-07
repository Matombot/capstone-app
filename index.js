let express = require('express');
let app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", function(req, res){
  res.render("index");
});
app.get("/patient", function(req, res){
    res.render("patient");
  });
  app.post("/patient", function(req, res){
    res.redirect("patient");
  });
  app.get("/page", function(req, res){
    res.render("page-one");
  });
  app.get("/page2", function(req, res){
    ///res.redirect('/payment')
  });
  app.get('/here', function (req, res) {
  res.render('signup')
})
app.get('/pay', function (req, res) {
  res.render('payment')
})
  // Handle the appointment form submission
app.post('/medication1', function (req, res) {
  var formBody = {
    'name': req.body.first,
    'surname': req.body.last,
    'ID': req.body.id,
    'email': req.body.email,
    'contact': req.body.telNo,
    'Reason': req.body.reason,
    'time': req.body.time,
    'date': req.body.date

  };

  console.log(formBody);

  res.render('page-one', {
    formBody,
   
  });
});
  


let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});