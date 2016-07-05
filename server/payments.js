const User = require('./db/models/index').users;
const stripe = require('stripe')('sk_test_y1L0h0zWW6KNvLpMHi5yOKoD');

module.exports = {
  stripeCharges: (req, res) => {
    console.log('そのトーケン', req.body.id);
    let datdestination;
    const paymentAmount = Number(req.body.amount) * 100;
    console.log('the chef ID in payment', req.body.chefId);
    console.log('the bodyin payment', req.body);
    User.findOne({ where: { id: req.body.chefId } })
    .then(user => {
      datdestination = user.dataValues.stripe_user_id;
    });
    console.log('その場所へ', datdestination);
    const charge = stripe.charges.create({
      amount: paymentAmount,
      currency: 'usd',
      source: req.body.id,
      description: 'Charge for ' + req.body.food +'.',
      destination: datdestination,
    }, (err, charge) => {
      // asynchronously called
      if (err && err.type === 'StripeCardError') {
        console.log('we got an err', err);
      } else {
        res.send({ message: 'Your card was successfully charged' });
      }
    });
  },
};
