

exports.payer = (req, res, next) => {

  var stripe = require('stripe')(req.body.exp);
  console.log('The body is ', req.body);
  var charge = stripe.charges.create({
    amount: Number(req.body.solde) * 100,
    currency: 'eur',
    source: req.body.token
  }, (err, charge) => {
    if (err) {
      throw err;
    }
    res.json({
      success: true,
      message: req.body
    })
  });

};