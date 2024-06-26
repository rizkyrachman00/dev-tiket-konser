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
    const { customerName, email, phone, gross_amount, itemDetails } = req.body;

    if (
      !customerName ||
      !email ||
      !phone ||
      !gross_amount ||
      !Array.isArray(itemDetails)
    ) {
      return responseApi(
        res,
        false,
        400,
        "Missing required fields or itemDetails is not an array"
      );
    }

    const mappedItemDetails = itemDetails.map((item: any) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name,
      category: item.category,
    }));

    const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
    const params = {
      transaction_details: {
        order_id: generateOrderId,
        gross_amount: parseInt(gross_amount, 10),
      },
      customer_details: {
        first_name: customerName,
        email: email,
        phone: phone,
      },
      item_details: mappedItemDetails,
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
