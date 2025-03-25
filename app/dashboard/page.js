"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { AppointmentCard } from "../components/AppointmentCard/AppointmentCard";
import Pagination from "../components/Pagination/Pagination";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/appointments/pending?page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch");
      }

      console.log("Appointments Response:", data);

      setAppointments(data.data || []);
      setTotalPages(data.pagination.pages || 1);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <div className={styles.cardContainer}>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                refreshAppointments={fetchAppointments}
              />
            ))
          ) : (
            <p>No pending appointments found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            totalItems={totalPages * itemsPerPage}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
