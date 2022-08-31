import Reservation from "../Reservation";
import BulletedList from "../components/BulletedList";

export function reservationCanceled() {
  return (
    <Reservation
      headline="Your reservation has been canceled."
      bulletedList={
        <BulletedList
          items={[
            "Salazar in Silver Lake",
            "Sunday, Aug 22 at 1:30pm",
            "Party of 4, patio",
          ]}
        />
      }
      body={<>If you have any questions, please reply to this email.</>}
    />
  );
}

export function reservationConfirmed() {
  return (
    <Reservation
      headline="Your reservation is confirmed."
      bulletedList={
        <BulletedList
          items={[
            "Salazar in Silver Lake",
            "Saturday, Aug 22 at 1:30pm",
            "Party of 4, patio",
          ]}
        />
      }
      body={
        <>
          Thanks for booking your reservation at Salazar with BookBook! If you
          need to cancel or make any changes, just click the link above.
        </>
      }
      ctaText={"View Reservation"}
    />
  );
}

export function reservationChanged() {
  return (
    <Reservation
      headline="Your reservation has been changed."
      bulletedList={
        <BulletedList
          items={[
            "Salazar in Silver Lake",
            "Sunday, Aug 22 at 1:30pm",
            "Party of 4, patio",
          ]}
        />
      }
      body={
        <>
          You’re all set! Your reservation at Salazar has been successfully
          changed. If you have any questions, please reply to this email.
        </>
      }
      ctaText={"View Reservation"}
    />
  );
}