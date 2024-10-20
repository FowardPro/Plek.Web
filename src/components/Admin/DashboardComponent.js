import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer
} from 'recharts';
import styles from './DashboardComponent.module.css'; // Add your custom styles here

const DashboardComponent = () => {
    // Mock data for the dashboard statistics
    const [totalUsers, setTotalUsers] = useState(500);
    const [bookingStats, setBookingStats] = useState([]);
    const [facilityStats, setFacilityStats] = useState([]);

    // Fetch booking and facility stats (you would replace this with real API calls)
    useEffect(() => {
        // Example data for bookings over months
        setBookingStats([
            { month: 'Jan', bookings: 400 },
            { month: 'Feb', bookings: 300 },
            { month: 'Mar', bookings: 200 },
            { month: 'Apr', bookings: 278 },
            { month: 'May', bookings: 189 },
            { month: 'Jun', bookings: 239 },
        ]);

        // Example data for facilities utilization
        setFacilityStats([
            { facility: 'Gym', usage: 2400 },
            { facility: 'Pool', usage: 2210 },
            { facility: 'Tennis Court', usage: 2290 },
            { facility: 'Basketball Court', usage: 2000 },
            { facility: 'Sauna', usage: 2181 },
        ]);
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            <h1>Admin Dashboard</h1>

            {/* Total Users Section */}
            <div className={styles.statsContainer}>
                <div className={styles.statBox}>
                    <h2>Total Users</h2>
                    <p>{totalUsers}</p>
                </div>

                {/* Booking Stats Section */}
                <div className={styles.chartContainer}>
                    <h2>Monthly Booking Stats</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={bookingStats}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="bookings" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Facility Stats Section */}
                <div className={styles.chartContainer}>
                    <h2>Facility Usage Stats</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={facilityStats}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="facility" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
