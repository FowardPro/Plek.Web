import React, { useState, useEffect } from 'react';
import styles from './FacilitiesComponent.module.css'; // Import CSS module
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel } from '@mui/material'; // For dialog

const FacilitiesComponent = () => {
    const [facilities, setFacilities] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
    const [newFacility, setNewFacility] = useState({
        name: '',
        description: '',
        availability: false,
        price: '',
        image: null
    });
    const [message, setMessage] = useState('');

    // Fetch all facilities
    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await fetch('https://localhost:7008/api/Plack/GetAllFacilities');
                const data = await response.json();
                setFacilities(data);
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };
        fetchFacilities();
    }, []);

    // Handle opening and closing the dialog
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => {
        setOpenDialog(false);
        setNewFacility({
            name: '',
            description: '',
            availability: false,
            price: '',
            image: null
        });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFacility((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setNewFacility((prev) => ({ ...prev, availability: e.target.checked }));
    };

    const handleImageChange = (e) => {
        setNewFacility((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // Handle form submission to add facility
    const handleAddFacility = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Name', newFacility.name);
        formData.append('Description', newFacility.description);
        formData.append('Availability', newFacility.availability);
        formData.append('Price', newFacility.price);
        formData.append('ImageData', newFacility.image); // Appending the image file

        try {
            const response = await fetch('https://localhost:7008/api/Plack/AddFacility', {
                method: 'POST',
                body: formData,  // FormData automatically sets the correct Content-Type
            });

            if (response.ok) {
                setMessage('Facility added successfully!');
                setFacilities((prev) => [...prev, newFacility]);
                handleDialogClose();
            } else {
                setMessage('Failed to add facility.');
            }
        } catch (error) {
            console.error('Error adding facility:', error);
            setMessage('Error while adding facility.');
        }
    };



    return (
        <div className={styles.container}>
            <h1>Facilities</h1>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Add Facility
            </Button>

            {/* Display facilities in cards */}
            <div className={styles.cardGrid}>
                {facilities.map((facility, index) => (
                    <div key={index} className={styles.card}>
                        <img
                            src={`data:image/jpeg;base64,${facility.imageData}`}
                            alt={facility.name}
                            className={styles.cardImage}
                        />

                        <h3>{facility.name}</h3>
                        <p>{facility.description}</p>
                        <p>Price: R{facility.price}</p>
                        <p>{facility.availability ? 'Available' : 'Unavailable'}</p>
                    </div>
                ))}
            </div>

            {/* Add Facility Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Add New Facility</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Facility Name"
                        fullWidth
                        value={newFacility.name}
                        onChange={handleInputChange}
                        margin="dense"
                    />
                    <TextField
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        value={newFacility.description}
                        onChange={handleInputChange}
                        margin="dense"
                    />
                    <TextField
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={newFacility.price}
                        onChange={handleInputChange}
                        margin="dense"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={newFacility.availability}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Availability"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleAddFacility} color="primary" variant="contained">Add</Button>
                </DialogActions>
            </Dialog>

            {/* Message */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default FacilitiesComponent;
