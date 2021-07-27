
let express = require('express');
const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
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
//function totalMeds(){
 // let price =0;
 // let totalPrice =0;
 // function buy(medication1){
   // totalPrice += (price *medication1)

//  }
//}
app.engine('handlebars', exphbs({
   partialsDir:"./views/partials",
viewPath:"./views",
layoutsDir:"./views/layouts" }));
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

  // if(req.headers['x-forwarded-proto']==='https') {
  //   res.send('line is secure');
  //   } else {
  //   res.send('you are insecure!');
  //   }
  // res.render("index");
  
});
app.get('/login', (req,res)=>{
  res.render('index');
})

app.get("/patient", function (req, res) {
  const currentUsername = req.query.username;
    // req.session will be defined now
    if (currentUsername && !req.session.username){
        //set a session value from a form variable
        req.session.username = currentUsername;
    }
    
  res.render("patient");
});

app.post("/patient", function (req, res) {
  

          const user={'user':req.body.username}
    
    console.log(user)
  
  res.redirect("/patient");
});
app.get("/appointment", async function (req, res) {
  const get_Patients = 'select * from patient_info';
  const Patients = await db.all(get_Patients);
  console.log(Patients);
  res.render('page-one')
});
app.get("/medication1", async function (req, res) {
  const get_meds = 'select * from medication_info';
  const MEDS = await db.all(get_meds);
  console.log(MEDS);
  res.render('page-two')
});

app.get('/signup', function (req, res) {
  res.render('signup')
})
app.get('/pay', function (req, res) {
  res.render('payment')
})
app.post("/medication1",async function (req, res) {
  const result = await db.run(
    'INSERT INTO medication_info (medication_name) VALUES (?)',
   req.body.selectMedication
  )
  console.log(req.body.selectMedication)
  res.redirect("/pay");
});
app.get("/doctor",async function (req, res) {
  const get_info = 'select * from doctors_info1';
  const inforPatients = await db.all(get_info);
  console.log(inforPatients);
  res.render("doctor");
});
app.post('/doctor', async function(req, res){
  const dBase=[];
  var search=req.body.search
  console.log(search)
  // const result = await db.run(
  //   'INSERT INTO doctors_info1(patient_info_id,Medication_info_id,medical_history_id) VALUES (?,?,?)',
  //   req.body.patient_info_id,
  //   req.body.Medication_info_id,
  //   req.body.medical_history_id
  // )
  res.redirect('doctor');
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
    'date': req.body.date,
    'allergy':req.body.appointment,
    'visit': req.body.yes
    
  };
  console.log(db)
  console.log(formBody);
  const result = await db.run(
    'INSERT INTO patient_info (id_number,patient_name,patient_lastName,contact_no,reason,allergy,first_time_visit) VALUES (?,?,?,?,?,?,?)',
    req.body.id,
    req.body.first,
    req.body.last,
    req.body.telNo,
    req.body.reason,
    req.body.appointment,
    req.body.yes
    


  )

  
  res.redirect('/pay')
});

app.get('/logout', (req, res)=>{


res.redirect('/')
})
  

let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});