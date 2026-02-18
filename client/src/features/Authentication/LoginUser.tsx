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
import {useAuth} from "../../context/authContext";

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
  const {refreshUser} = useAuth();
  const [authError, setAuthError] = useState("");
  const [emailVerificationNeeded, setEmailVerificationNeeded] = useState(false);
  const [showPasswordResetForm, setShowPasswordResetForm] =
    useState<boolean>(false);
  const [successfulPasswordReset, setSuccessfulPasswordReset] =
    useState<boolean>(false);
  const {register, handleSubmit, formState, getValues} = useForm<IFormValues>({
    mode: "onSubmit",
    criteriaMode: "all",
    resolver: yupResolver(loginSchema),
  });

  const refreshUserStatus = async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        console.log("Email is verified");
        refreshUser();
        setEmailVerificationNeeded(false);
      } else {
        setAuthError("Please verify your email address");
        setEmailVerificationNeeded(true);
      }
    }
  };
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      );
      console.log(userCredential.user.emailVerified);
      if (!userCredential.user.emailVerified) {
        setAuthError("Login failed. Email not verified.");
        setEmailVerificationNeeded(true);
      } else {
        console.log("Login successful and verified");

        setEmailVerificationNeeded(false);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
        setAuthError("Failed to log in. Please check your credentials");
      } else {
        console.error("An unexpected error occurred:", error);
        setAuthError("An unexpected error occurred. Please try again");
      }
      setEmailVerificationNeeded(false);
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
      {emailVerificationNeeded ? (
        <Button onClick={refreshUserStatus}>Check Email Verification</Button>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-auto"
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
              <small
                className="cursor-pointer"
                onClick={onShowPasswordResetForm}
              >
                Forgotten password?
              </small>
            </>
          )}
          {authError && (
            <p className="text-failure text-sm mb-4">{authError}</p>
          )}
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
      )}
    </>
  );
};

export default LoginUser;
