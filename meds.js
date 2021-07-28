
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