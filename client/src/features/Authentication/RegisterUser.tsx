// src/features/Authentiation/RegisterUser.tsx

import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {FirebaseError} from "firebase/app";
import {doc, setDoc} from "firebase/firestore";
import {useForm, SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {db} from "../../firebase";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface RegisterUserProps {
  onRegistered: () => void;
}

interface IFormValues {
  email: string;
  password: string;
  confirm_password: string;
  firstName: string;
  location: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  location: yup.string().required("Location is required"),
});

const RegisterUser: React.FC<RegisterUserProps> = ({onRegistered}) => {
  const {register, handleSubmit, formState} = useForm<IFormValues>({
    mode: "onSubmit",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName,
        email: data.email,
        location: data.location,
      });
      onRegistered();
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error(firebaseError.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-auto min-w-72"
      >
        <div className="flex gap-4">
          <Input
            name="firstName"
            placeholder="Enter first name"
            register={register}
            formState={formState}
            icon="person"
            label="Firstname"
          />
          <Input
            name="email"
            placeholder="Enter email"
            register={register}
            formState={formState}
            icon="mail"
            label="Email"
          />
        </div>
        <div className="flex gap-4">
          <Input
            name="password"
            placeholder="Enter password"
            register={register}
            formState={formState}
            icon="lock"
            label="Password"
          />
          <Input
            name="confirm_password"
            placeholder="Confirm password"
            register={register}
            formState={formState}
            icon="lock"
            label="Confirm Password"
          />
        </div>
        <Input
          name="location"
          placeholder="Enter preferred location"
          register={register}
          formState={formState}
          icon="location_on"
          label="Preferred Location"
        />
        <Button buttonType="submit">Register</Button>
      </form>
    </>
  );
};

export default RegisterUser;
