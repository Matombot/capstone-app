let express = require('express');
const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

let app = express();
let db;
async function app2() {

  db = await open({
    filename: 'Patient-info.db',
    driver: sqlite3.Database
  });
  await db.migrate();
}
app2();
let db1;
async function app1() {

  db1 = await open({
    filename: 'Medications-info.db',
    driver: sqlite3.Database
  });
  await db1.migrate();
}
app1();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.render("index");
});
app.post("/patient", function (req, res) {
  var login= {
    'user':req.body.username,
    'code' :req.body.passcode
  }
  console.log(login)
});

app.get("/patient", function (req, res) {
  res.render("patient");
});
app.post("/patient", function (req, res) {
  res.redirect("patient");
});
app.get("/page", async function (req, res) {
  const get_Patients = 'select * from patient_info';
  const Patients = await db.all(get_Patients);
  console.log(Patients);
  res.render('page-one')
});
app.get("/medication1", async function (req, res) {
  const get_meds = 'select * from medication_info';
  const MEDS = await db1.all(get_meds);
  console.log(MEDS);
  res.render('page-two')
});

app.get('/here', function (req, res) {
  res.render('signup')
})
app.get('/pay', function (req, res) {
  res.render('payment')
})
app.post("/medication1",async function (req, res) {
  const result = await db1.run(
    'INSERT INTO medication_info (medication_name) VALUES (?)',
   req.body.selectMedication
  )
  console.log(req.body.selectMedication)
  res.redirect("/pay");
});
// Handle the appointment form submission
app.post('/appointment', async function (req, res) {
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
  console.log(db)
  //console.log(formBody);
  const result = await db.run(
    'INSERT INTO patient_info (id_number,patient_name,patient_lastName,contact_no,reason) VALUES (?,?,?,?,?)',
    req.body.id,
    req.body.first,
    req.body.last,
    req.body.telNo,
    req.body.reason
  )

  res.render('page-one', {
    formBody,

  });
});



let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});