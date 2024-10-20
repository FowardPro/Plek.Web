import React, { useEffect, useState } from 'react';
import styles from './UsersComponent.module.css'; // Import the CSS module

const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users from API when component loads
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://localhost:7008/api/Plack/GetAllPatrons');
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Manage Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Patron ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.patronId}>
                                <td>{user.patronId}</td>
                                <td>{user.fName}</td>
                                <td>{user.lName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className={styles.emptyMessage}>No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsersComponent;
