const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

if (!admin.apps.length) {
  admin.initializeApp();
}

const sendVerificationCode = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let transporter
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "management@bspconsult.net",
        pass: "Upwork123!",
      },
      pool: false
    });

    await transporter.sendMail({
      from: "\"management@bspconsult.net",
      to: email,
      subject: "Verify Your BSP Consult Registration",
      text: `Hi there,

Use the 6-digit verification code below to complete your sign-in to your BSP Consult account:

${code}

This code will expire in 10 minutes.

If you did not request this verification, please contact our support team for assistance.

Best regards,
Mike`,
    });

    transporter.close();

    await admin.firestore().collection("email_verifications").doc(email).set({
      code,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      success: true,
      message: "Verification code sent.",
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    
    if (transporter) {
      transporter.close();
    }
    
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const verifyCode = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const doc = await admin.firestore().collection("email_verifications").doc(email).get();
    if (!doc.exists) {
      return res.status(400).json({ success: false, message: "No code found for this email" });
    }

    const data = doc.data();
    
    if (data.verified) {
      return res.status(400).json({ success: false, message: "Code already used" });
    }

    const createdAt = data.createdAt.toDate();
    const now = new Date();
    const timeDiff = now - createdAt;
    const tenMinutes = 10 * 60 * 1000;

    if (timeDiff > tenMinutes) {
      return res.status(400).json({ success: false, message: "Code expired. Please request a new one." });
    }

    if (data.code === code) {
      await admin.firestore().collection("email_verifications").doc(email).update({
        verified: true,
        verifiedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return res.status(200).json({ success: true, message: "Code verified!" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  sendVerificationCode,
  verifyCode,
};
