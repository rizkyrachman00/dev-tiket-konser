import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, use, useState, Dispatch, SetStateAction } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  const [isLoading, setIsloading] = useState(false);
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setIsloading(false);
        push("/auth/login");
        setToaster({
          variant: "success",
          message: "Register successfully, please login",
        });
      } else {
        setIsloading(false);
        setToaster({
          variant: "danger",
          message: "Register failed, please call support",
        });
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Register failed, email is already exist",
      });
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText=" Have an account ? Sign In "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Fullname" name="fullname" type="text" />
        <Input label="Phone Number" name="phone" type="number" />
        <Input label="Password" name="password" type="password" />
        <Button className={styles.register__button} type="submit">
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
