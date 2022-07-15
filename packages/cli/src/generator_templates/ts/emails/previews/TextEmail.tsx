import React from "react";
import TextEmail from "../TextEmail";
import BulletedList from "../components/BulletedList";

export function resetPassword() {
  return (
    <TextEmail
      title="Your password reset link is here"
      name="Amelita"
      body={
        <>
          We’ve received your request to change your password. Use the link
          below to set up a new password for your account. This link is only
          usable once! If you need to, you can reinitiate the password process
          again <a href="#">here</a>.
        </>
      }
      ctaText="Reset Password"
    />
  );
}

export function accountDeleted() {
  return (
    <TextEmail
      title="Your account has been deleted"
      name="Amelita"
      body={
        <>
          We’ve received your request to delete your account and your account
          has been deleted. We’re sad to see you go! If you’ve changed your mind
          or did this on accident, just reply to this email and let us know.
        </>
      }
    />
  );
}

export function newSignIn() {
  return (
    <TextEmail
      title="Security alert"
      headline="New sign-in detected"
      name="Amelita"
      body={
        <>
          We’ve received your request to delete your Mailing account. Your
          account has been deleted. If you changed your mind or did this on
          accident, reply to this email and let us know.
        </>
      }
      bulletedList={
        <BulletedList
          items={[
            "Date: July 14, 2022 4:26 PM PST",
            "Device: Mac",
            "Browser: Safari",
            "Location: Los Angeles, CA",
            "IP Address: XXX.XX.XXX.XX",
          ]}
        />
      }
    />
  );
}
