import { useState } from "react";
import styles from "./AppointmentCard.module.css";

export const AppointmentCard = ({ appointment, refreshAppointments }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleStatusChange = async (newStatus) => {
    try {
      setErrorMessage("");
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/admin/appointments/${appointment.id}/request-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      console.log(`Appointment ${appointment.id} ${newStatus} successfully`);
      refreshAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error.message);
      setErrorMessage(error.message);
    }
  };

  const formatDateTime = (dateString, timeString) => {
    const dateObj = new Date(dateString);
    const timeParts = timeString.split(":");

    let hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${dateObj.getDate()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}, ${hours}:${minutes} ${amPm}`;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>ID: {appointment.id}</h2>
      <h2 className={styles.title}>Doctor: {appointment.doctor_name}</h2>
      <h2 className={styles.title}>Patient: {appointment.patient_name}</h2>
      <h3 className={styles.para}>
        Date of Appointment:{" "}
        {formatDateTime(appointment.appointment_date, appointment.start_time)}
      </h3>

      <hr className={styles.line} />

      <div className={styles.buttons}>
        <button
          className={styles.approve}
          onClick={() => handleStatusChange("approved")}
        >
          Approve
        </button>
        <button
          className={styles.reject}
          onClick={() => handleStatusChange("rejected")}
        >
          Reject
        </button>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
