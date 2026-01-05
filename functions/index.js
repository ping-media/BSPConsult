const functions = require("firebase-functions/v1");
const cors = require("cors");
const { createCheckoutSession } = require("./createCheckoutSession");
const { sendVerificationCode, verifyCode } = require("./verifyCode");

const corsHandler = cors({ origin: true });

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    createCheckoutSession(req, res);
  });
});

exports.sendVerificationCode = functions.https.onRequest((req, res) => {
  sendVerificationCode(req, res);
});

exports.verifyCode = functions.https.onRequest((req, res) => {
  verifyCode(req, res);
});


exports.closePaymentTab = functions.https.onRequest((req, res) => {
  res.set("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Closing...</title>
        <script>
          window.onload = function() {
            try { window.close(); } catch(e) {}
          }
        </script>
      </head>
      <body>
        <p>Payment complete. You can close this window.</p>
      </body>
    </html>
  `);
});
