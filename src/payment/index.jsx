
import express from "express";
import { Snap } from "midtrans-client";
import { json } from "body-parser";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

let snap = new Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-2YVc_9A-OL0s8SLGOEM3KegW",
  clientKey: "SB-Mid-client-rfdFbACFqxEVTOV7",
});

app.post("/create-transaction", async (req, res) => {
  const { transaction_details, item_details, customer_details } = req.body;

  let parameter = {
    transaction_details: transaction_details,
    item_details: item_details,
    customer_details: customer_details,
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({ token: transaction.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// eslint-disable-next-line no-undef, react-refresh/only-export-components
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
