
function calculateBtnClicked(){
    selectMedication
    var MEDS = billStringElement.value;
    //split the string
    var billItems = billString.split(",");
    // a variable for the total phone bill.
    var billTotal = 0;
    //loop over all the bill items
    for (var i=0;i<billItems.length;i++){
        var billItem = billItems[i].trim();
        if (billItem === "call"){
            billTotal += 2.75;
        }
        else if (billItem === "sms"){
            billTotal += 0.75;
        }
    }
    //{{#each inforPatients }}
//	<div>
 //   {{patient_info_id}}
//</div>
//{{/each}}
<div>
<% if(locals.message){ %>
    <div class="alert alert-success" role="alert">
        <strong>Well done!</strong> <%=message.success%>
    </div>
<% } %>
    
</div>
 
   
  var PRESCRIPTION1 = req.body.PRESCRIPTION;
  if (PRESCRIPTION1 === 0 || PRESCRIPTION1 === undefined) {
    req.flash('messages', { "error": "invalid" });
    res.redirect("/medication1");
  }
  else {
    req.flash('messages', { "success": "prescription is loaded" });
    res.locals.messages = req.flash();
    res.render('page-two')
  }