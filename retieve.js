var Attraction = require('./models/attraction.js');
app.get('/api/attractions', function(req, res){
Attraction.find({ approved: true }, function(err, attractions){
if(err) return res.send(500, 'Error occurred: database error.');
res.json(attractions.map(function(a){
return {
name: a.name,
id: a._id,
description: a.description,
location: a.location,
}
}));
});
});
app.post('/api/attraction', function(req, res){
var a = new Attraction({
name: req.body.name,
description: req.body.description,
location: { lat: req.body.lat, lng: req.body.lng },
history: {
event: 'created',
email: req.body.email,
date: new Date(),
},
approved: false,
});
a.save(function(err, a){
if(err) return res.send(500, 'Error occurred: database error.');
res.json({ id: a._id });
});
});
app.get('/api/attraction/:id', function(req,res){
Attraction.findById(req.params.id, function(err, a){
if(err) return res.send(500, 'Error occurred: database error.');
res.json({
name: a.name,
id: a._id,
description: a.description,
location: a.location,
});
});
});
var staff = {
    mitch: { bio: 'Mitch is the man to have at your back in a bar fight.' },
    madeline: { bio: 'Madeline is our Oregon expert.' },
    walt: { bio: 'Walt is our Oregon Coast expert.' },
    };
    //162 | Chapter 14: Routing
    app.get('/staff/:name', function(req, res){
    var info = staff[req.params.name];
    if(!info) return next(); // will eventually fall through to 404
    res.render('staffer', info);
    })
    filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}