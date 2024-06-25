import instance from "@/lib/axios/instance";

const endpoint = {
  user: "/api/user",
  profile: "/api/user/profile",
  cart: "/api/user/cart",
  transaction: "/api/transaction",
};

const userServices = {
  getAllUsers: () => instance.get(endpoint.user),
  updateUser: (id: string, data: any) =>
    instance.put(`${endpoint.user}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endpoint.user}/${id}`),
  getProfile: () => instance.get(endpoint.profile),
  updateProfile: (data: any) => instance.put(endpoint.profile, { data }),
  getCart: () => instance.get(endpoint.cart),
  addToCart: (data: any) => instance.put(endpoint.cart, { data }),
  addTransaction: async (data: any) => {
    const response = await instance.post(endpoint.transaction, data);
    return response;
  },
};

export default userServices;
