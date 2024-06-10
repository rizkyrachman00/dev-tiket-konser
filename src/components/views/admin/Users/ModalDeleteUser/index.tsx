import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteUser.module.scss";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>Are you sure to delete this user?</h1>
      <Button type="button" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
