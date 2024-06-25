import {
  responseApi,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";
import createTransaction from "@/lib/midtrans/transaction";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { first_name, email, phone, gross_amount } = req.body;

    if (!first_name || !email || !phone || !gross_amount) {
      return responseApi(res, false, 400, "Missing required fields");
    }

    const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
    const params = {
      transaction_details: {
        order_id: generateOrderId,
        gross_amount: parseInt(gross_amount, 10),
      },
      customer_details: {
        first_name,
        email,
        phone,
      },
    };

    createTransaction(
      params,
      (transaction: { token: string; redirect_url: string }) => {
        responseApiSuccess(res, transaction);
      }
    );
  } else {
    responseApiMethodNotAllowed(res);
  }
}
