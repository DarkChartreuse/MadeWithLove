const stripe = require('stripe')('sk_test_y1L0h0zWW6KNvLpMHi5yOKoD');

module.exports = {
  stripeCharges: (req, res) => {
    var charge = stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      source: req.body.id,
      description: 'Charge for test@example.com',
    }, (err, charge) => {
      // asynchronously called
      if (err && err.type === 'StripeCardError') {
        console.log('we got an err', err);
      } else {
        res.json({ message: 'your card has been successfuly charged' });
      }
    });
  },
};
