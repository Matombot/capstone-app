
let express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//const flash = require('express-flash')
const session = require('express-session');
let app = express();
let db;
async function app2() {

  db = await open({
    filename: 'Patient-info.db',
    driver: sqlite3.Database
  });
  await db.exec('PRAGMA foreign_keys = ON;');
  await db.migrate();
}
app2();
const appointmentList = [];
app.engine('handlebars', exphbs({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts"
}));
app.set('view engine', 'handlebars');
//session middleware
app.use(session({
  secret: 'welcome back!!!',
  cookie: { maxAge: 3000 },
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.render('home')

});
app.get('/login', (req, res) => {
  res.render('index');
})

app.get("/options", function (req, res) {

  res.render("options");
});

app.post("/options", function (req, res) {
  const user = { 'user': req.body.username }
  console.log(user)

  res.redirect("/options");
});

app.get("/appointment/:id_number", async function (req, res) {
  const idNum = req.params.id_number

  const get_idNum = 'select * from patients where id_number=?';
  const patient = await db.get(get_idNum, idNum);
  const get_appointment1 = `select * from appointment
   inner join doctors on doctors.id=appointment.id
   where patient_id=?`;

  const get_appointments = await db.all(get_appointment1,patient.id);
  console.log(get_appointments);
   //console.log(idNum);
  res.render('patient_appointments', {patient,get_appointments})
});

app.get("/doctor/:id", async function (req, res) {
  const idNumbs = req.params.id;
const doc = 'select * from doctors where id=?';
const doctor = await db.get (doc,idNumbs);

  const get_doctor = `select * from appointment
   inner join patients on patients.id=appointment.id
   where doctor_id=?`;

  const all_appointments = await db.all(get_doctor, idNumbs);
  console.log(all_appointments);

  res.render('doctor_appointments', { all_appointments,doctor })
});
app.get("/medication1", async function (req, res) {
  const get_meds = 'select * from medication_info';
  const MEDS = await db.all(get_meds);
  console.log(MEDS);
  res.render('page-two')
});
app.get("/doctors", async function (req, res) {
  const get_doctors = 'select * from doctors';
  const doctors = await db.all(get_doctors);
  //console.log(MEDS);
  res.render('doctors', { doctors })
});
app.get("/patients", async function (req, res) {
  const get_patients = 'select * from patients';
  const patients = await db.all(get_patients);
  //console.log(MEDS);
  res.render('patients', { patients })
});

app.get('/signup', function (req, res) {
  res.render('signup')
})


app.get('/pay', function (req, res) {
  res.render('payment')
})

app.post("/medication1", async function (req, res) {
  const result = await db.run(
    'INSERT INTO medication_info (medication_name) VALUES (?)',
    req.body.selectMedication
  )
  console.log(req.body.selectMedication)
  res.redirect("/pay");
});

// app.get("/doctor", async function (req, res) {


//   const appointments = await db.all('select * from patients')
//   console.log(appointments);

//   // const get_info = 'select * from doctors_info1';
//   // const inforPatients = await db.all(get_info);

//   res.render("doctor", { appointments });
// });

// app.post('/doctor', async function(req, res){

//   res.redirect('doctor');
// });

// Handle the appointment form submission
app.post('/appointment', async function (req, res) {
  console.log(req.body)
  // res.redirect('/appointment/' + req.body.id_number)

  const doctor = await db.get('select * from doctors where slot_type=?', req.body.slot_type)
  console.log(doctor)
  const booking = await db.run('insert into appointment (reason,status,slot_type,patient_id,doctor_id) values(?,"Booked",?,?,?)', req.body.reason,
    req.body.slot_type, req.body.patient_id, doctor.id)

  res.render('appointment_made', { booking,doctor });

});

app.get('/logout', (req, res) => {


  res.redirect('/')
})


let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});