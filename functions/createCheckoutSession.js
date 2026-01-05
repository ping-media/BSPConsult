const admin = require("firebase-admin");
const Stripe = require("stripe");

const stripe = Stripe("sk_live_51NAUESCf4YXq1rsyJE7KoKl6XA8YzbGT3vSkP0lo1pc7p" +
  "fTI2Bqqi4AK5v0Y4v7C85Nlei8J3R5U9K2LIIFv1hif00WXCepGk6");

if (!admin.apps.length) {
  admin.initializeApp();
}

const createCheckoutSession = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    return res.status(204).send("");
  }

  try {
    const { priceId, customerEmail, platform } = req.body;

    if (!priceId || !customerEmail) {
      return res.status(400).json({
        error: "priceId and customerEmail are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    console.log("Creating checkout session for:", {
      priceId, customerEmail,
      platform,
    });

    let mod = "subscription";
    if (priceId === "price_1NqWtkCf4YXq1rsyDvmsIWtF" ||
      priceId === "price_1OgVtOCf4YXq1rsy99bw9IHr") {
      mod = "payment";
    }

    let successUrl;
    if (platform === "mobile") {
      successUrl = `https://firebasestorage.googleapis.com/v0/b/bspconsult-bcd6e.appspot.com/o/success.html?alt=media&token=b99f76db-8f68-4bf2-b094-99ea5dcc00e8`;
    } else {
      successUrl = `https://app.bspconsult.com/success?session_id={CHECKOUT_SESSION_ID}`;
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: customerEmail,
      expand: ["line_items"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mod,
      allow_promotion_codes: true,
      payment_method_types: ["card", "bancontact", "ideal"],
      success_url: successUrl,
      cancel_url: `https://app.bspconsult.com/cancel`,
      metadata: {
        platform: platform || "web",
        customerEmail,
      },
    });

    // try {
    //   await admin.firestore().collection("checkout_sessions")
    //       .doc(session.id).set({
    //         priceId,
    //         customerEmail,
    //         platform: platform || "web",
    //         sessionId: session.id,
    //         createdAt: admin.firestore.FieldValue.serverTimestamp(),
    //         status: "pending",
    //         stripeUrl: session.url,
    //       });
    //   console.log("Session saved to Firestore:", session.id);
    // } catch (firestoreError) {
    //   console.error("Error saving to Firestore:", firestoreError);
    // }

    return res.status(200).json({
      success: true,
      id: session.id,
      url: session.url,
      redirectUrl: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);

    let errorMessage = "An error occurred while creating checkout session";

    if (error.type === "StripeInvalidRequestError") {
      errorMessage = "Invalid price ID or Stripe configuration";
    } else if (error.code === "resource_missing") {
      errorMessage = "Price ID not found in Stripe";
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
      details: error.message,
    });
  }
};

module.exports = {
  createCheckoutSession,
};
