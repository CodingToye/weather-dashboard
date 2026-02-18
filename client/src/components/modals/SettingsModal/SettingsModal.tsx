// ./components/modal/SettingsModal/SettingsModal.tsx
import {useState, useCallback} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {doc, updateDoc} from "firebase/firestore";
import {
  getAuth,
  verifyBeforeUpdateEmail,
  sendEmailVerification,
} from "firebase/auth";
import {type User} from "firebase/auth";
import {FirebaseError} from "firebase/app";

import {BaseModal} from "../BaseModal";
import Input from "../../Input";
import Button from "../../Button";
import {useAuth} from "../../../context/authContext";
import {db} from "../../../firebase";

export interface ISettingsModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface IFormValues {
  firstName: string;
  email: string;
  location: string;
}

export default function SettingsModal(props: ISettingsModalProps) {
  const [closeClicked, setCloseClicked] = useState(false);

  const handleClose = useCallback(() => {
    setCloseClicked((prevCloseClicked) => !prevCloseClicked);
    setTimeout(() => {
      setCloseClicked(true);
      if (props.onClose) props.onClose();
    }, 500);
  }, [props.onClose]);

  const {register, handleSubmit, formState} = useForm<IFormValues>({
    mode: "onSubmit",
  });

  const {userDetails, setUserDetails} = useAuth();

  const attemptUpdateEmail = async (user: User, newEmail: string) => {
    try {
      await verifyBeforeUpdateEmail(user, newEmail);
      console.log("Email address updated to " + newEmail);
      // Sending a verification email
      const actionCodeSettings = {
        url: `${
          window.location.origin
        }/email-verified?email=${encodeURIComponent(newEmail)}`,
        handleCodeInApp: false,
      };

      console.log("After actionCodeSettings...");

      await sendEmailVerification(user, actionCodeSettings);
      console.log("Verification email sent to " + newEmail);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/required-recent-login"
      ) {
        console.error("Please sign in again to update your email");
      } else if (
        error instanceof FirebaseError &&
        error.code === "auth/operation-not-allowed"
      ) {
        console.error(
          "Email update not allowed. Check your Firebase settings."
        );
      } else {
        console.error("Failed to send verification email", error);
      }
    }
  };

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    if (userDetails && userDetails.uid) {
      const userDocRef = doc(db, "users", userDetails.uid);
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const controller = new AbortController();
        try {
          if (data.email !== userDetails.email) {
            await attemptUpdateEmail(user, data.email)
              .then(async () => {
                console.log("Check your email to verify the new address.");
                await auth.signOut();
                if (props.onClose) {
                  props.onClose();
                }
              })
              .catch((error) => {
                console.error("Error updating email: ", error);
              });
          }

          await updateDoc(userDocRef, {
            firstName: data.firstName,
            email: data.email,
            location: data.location,
          });
          setUserDetails({
            ...userDetails,
            firstName: data.firstName,
            email: data.email,
            location: data.location,
          });
          if (props.onClose) {
            props.onClose(); // Optionally close the modal on success
          }
        } catch (error) {
          console.error("Error updating document: ", error);
        }

        return () => controller.abort();
      }
    } else {
      console.log("User not logged in or user ID not found");
    }
  };

  return (
    <BaseModal
      title="Settings"
      subtitle="Update your name, email address and preferred location here."
      show={props.isOpen}
      onClose={handleClose}
      closeOnTap={false}
      closeClicked={closeClicked}
    >
      <div className="settings-modal-content flex flex-col h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 stretch w-full h-full min-w-72"
        >
          <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-4">
              <Input
                name="firstName"
                placeholder="Enter first name"
                register={register}
                formState={formState}
                defaultValue={userDetails?.firstName}
                icon="person"
                label="Firstname"
              />
              <Input
                name="email"
                placeholder="Enter email"
                register={register}
                formState={formState}
                defaultValue={userDetails?.email}
                icon="mail"
                label="Email"
              />
            </div>
            <div className="flex gap-4 mb-2">
              <Input
                name="location"
                placeholder="Enter preferred location"
                register={register}
                formState={formState}
                defaultValue={userDetails?.location}
                icon="location_on"
                label="Preferred Location"
              />
            </div>
          </div>
          <Button buttonType="submit">Save Settings</Button>
        </form>
      </div>
    </BaseModal>
  );
}
