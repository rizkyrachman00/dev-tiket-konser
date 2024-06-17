import instance from "@/lib/axios/instance";

const productServices = {
  getAllProducts: () => instance.get("/api/product"),
  addProduct: async (data: any, token: string) => {
    const response = await instance.post("/api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },
  updateProduct: async (id: string, data: any, token: string) => {
    const response = await instance.put(
      `/api/product/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },
  deleteProduct: (id: string, token: string) =>
    instance.delete(`/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default productServices;
