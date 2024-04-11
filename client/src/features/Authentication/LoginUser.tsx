// src/features/Authentication/LoginUser.tsx
import {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FirebaseError} from "firebase/app";

import Input from "../../components/Input";
import Button from "../../components/Button";

interface IFormValues {
  email: string;
  password: string;
}

const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

const LoginUser = () => {
  const [authError, setAuthError] = useState("");
  const [showPasswordResetForm, setShowPasswordResetForm] =
    useState<boolean>(false);
  const [successfulPasswordReset, setSuccessfulPasswordReset] =
    useState<boolean>(false);
  const {register, handleSubmit, formState, getValues} = useForm<IFormValues>({
    mode: "onSubmit",
    criteriaMode: "all",
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
        setAuthError("Failed to log in. Please check your credentials");
      } else {
        console.error("An unexpected error occurred:", error);
        setAuthError("An unexpected error occurred. Please try again");
      }
    }
  };

  const onShowPasswordResetForm = () => {
    setShowPasswordResetForm(true);
  };

  const handleForgottenPassword = async () => {
    const email = getValues("email");
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("password reset email sent");
      setShowPasswordResetForm(false);
      setSuccessfulPasswordReset(true);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
        setAuthError("error...");
      } else {
        console.error("An unexpected error occurred:", error);
        setAuthError("An unexpected error occurred. Please try again");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-auto min-w-72"
      >
        {successfulPasswordReset && (
          <small className="text-success">
            A password reset link has been emailed to you.
          </small>
        )}
        <Input
          name="email"
          placeholder="Enter email"
          register={register}
          formState={formState}
          icon="mail"
          label="Email"
        />
        {!showPasswordResetForm && (
          <>
            <Input
              name="password"
              placeholder="Enter password"
              register={register}
              formState={formState}
              icon="lock"
              inputType="password"
              label="Password"
            />
            <small className="cursor-pointer" onClick={onShowPasswordResetForm}>
              Forgotten password?
            </small>
          </>
        )}
        {authError && <p className="text-failure text-sm mb-4">{authError}</p>}
        {!showPasswordResetForm ? (
          <Button buttonType="submit" extraClasses="">
            Login
          </Button>
        ) : (
          <Button extraClasses="" onClick={handleForgottenPassword}>
            Reset
          </Button>
        )}
      </form>
    </>
  );
};

export default LoginUser;
