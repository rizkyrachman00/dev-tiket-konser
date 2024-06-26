import instance from "@/lib/axios/instance";

const endpoint = {
  transaction: "/api/transaction",
};

const transactionServices = {
  createTransaction: async (data: any) => {
    const response = await instance.post(endpoint.transaction, data);
    return response;
  },
};

export default transactionServices;
