import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { useState, FormEvent } from "react";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const session: any = useSession();
  const [isLoading, setIsloading] = useState(false);
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };
    const result = await userServices.updateUser(
      updatedUser.id,
      data,
      session.data?.accessToken
    );
    try {
      if (result.status === 200) {
        setIsloading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
      }
    } catch (error) {
      setIsloading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          label="Phone Number"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
