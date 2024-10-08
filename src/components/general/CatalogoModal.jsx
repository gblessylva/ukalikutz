import React, { useState, useEffect } from 'react';
import { Modal, TextControl, Button, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { StylistsComboBox } from './StylistsComboBox';
import { openMediaLibrary } from '../../utilitities/mediaLibraryUtils'; // Utility function to open the media library


const CatalogModal = ({ isOpen, onRequestClose, onSubmit }) => {
	const [catalogName, setCatalogName] = useState('');
	const [catalogDescription, setCatalogDescription] = useState('');
	const [catalogImage, setCatalogImage] = useState(null); // Store the uploaded image file
	const [isUploading, setIsUploading] = useState(false); // Track upload state
	const [imageId, setImageId] = useState(null); // Store the image ID
	const [selectedStylist, setSelectedStylist] = useState(null); // Store the stylist ID
	const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
	const [successMessage, setSuccessMessage] = useState(''); // Store success message
	const [showUploadButton, setShowUploadButton] = useState(false); //Show upload buttons from the "ukalikutz_show_manual_upload_button" hook

	// Fetch the visibility of the manual upload button
    useEffect(() => {
        const fetchShowUploadButton = async () => {
            try {
                const response = await apiFetch({ path: '/ukalikutz/v1/settings' });
                setShowUploadButton(response.show_upload_button);
				console.log(response);
            } catch (error) {
                console.error('Error fetching upload button visibility:', error);
            }
        };

        fetchShowUploadButton();
    }, []);

	// Handle the form submission
	const handleSubmit = async () => {
		setIsSubmitting(true); // Start the spinner on form submission

		try {
			// Make a request to the custom uKalikutz API endpoint to create a new catalog
			const catalogResponse = await apiFetch({
				path: '/ukalikutz/v1/catalogues',
				method: 'POST',
				data: {
					name: catalogName,
					slug: catalogName.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
					description: catalogDescription,
					image_id: imageId, // Include the image ID
					stylist_id: selectedStylist, // Include the stylist ID
				},
			});

			// Get the new catalog ID from the response
			const catalogId = catalogResponse.id;

			// Call the onSubmit callback with the new catalog data
			onSubmit({
				id: catalogId,
				name: catalogName,
				description: catalogDescription,
				image_id: imageId,
				stylist_id: selectedStylist,
			});

			// Display success message
			setSuccessMessage('Catalog added successfully!');

			// Reset form fields after successful submission
			setCatalogName('');
			setCatalogDescription('');
			setImageId(null);
			setSelectedStylist(null);

			// Hide success message after 3 seconds
			setTimeout(() => {
				setSuccessMessage('');
				onRequestClose(); // Optionally close the modal after success
			}, 3000);

		} catch (error) {
			console.error('Error creating catalog:', error);
			alert('Failed to create the catalog.');
		} finally {
			setIsSubmitting(false); // Stop the spinner
		}
	};

	// Handle file selection for image upload
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setCatalogImage(file);
	};

	// Handle image upload to WordPress media library
	const uploadImage = async () => {
		if (!catalogImage) return;

		setIsUploading(true);

		const formData = new FormData();
		formData.append('file', catalogImage);

		try {
			const response = await apiFetch({
				path: '/wp/v2/media',
				method: 'POST',
				body: formData,
				headers: {
					'Content-Disposition': `attachment; filename="${catalogImage.name}"`,
				},
			});
			setImageId(response.id); // Store the image ID after successful upload
		} catch (error) {
			console.error('Image upload failed:', error);
		} finally {
			setIsUploading(false);
		}
	};

	// Handle selecting an image from the media library
	const handleMediaSelect = (media) => {
		if (media && media.length > 0) {
			setImageId(media[0].id); // Set the selected image ID
		}
	};

	// Call uploadImage whenever a new file is selected
	const handleImageUpload = () => {
		if (catalogImage) {
			uploadImage();
		}
	};

	return (
		<>
			{isOpen && (
				<Modal title="Add New Catalog" onRequestClose={onRequestClose}>
					{successMessage && <div className="success-message">{successMessage}</div>}
					<form onSubmit={handleSubmit}>
						<TextControl
							label="Catalog Name"
							value={catalogName}
							onChange={(value) => setCatalogName(value)}
							required
						/>
						<TextControl
							label="Description"
							value={catalogDescription}
							onChange={(value) => setCatalogDescription(value)}
							required
						/>

						{/* Stylist combobox */}
						<StylistsComboBox onSelect={(value) => setSelectedStylist(value)} />
						{showUploadButton && (
							<>
								<label htmlFor="catalogImage">Upload Catalog Image</label>
								<input
									type="file"
									id="catalogImage"
									onChange={handleFileChange}
									accept="image/*"
								/>
								{/* Upload button */}
								<Button
									isSecondary
									onClick={handleImageUpload}
									disabled={isUploading || !catalogImage}
									style={{ margin: '10px 0' }}
								>
									{isUploading ? <Spinner /> : 'Upload Image'}
								</Button>
							</>

						)}

						{/* Upload new image input */}
						{/* <label htmlFor="catalogImage">Upload Catalog Image</label>
						<input type="file" id="catalogImage" onChange={handleFileChange} accept="image/*" /> */}



						{/* Button to select existing image from media library */}
						<Button
							isSecondary
							onClick={() => openMediaLibrary(handleMediaSelect)}
							style={{ margin: '10px 0' }}
						>
							Select Existing Image
						</Button>

						{/* Check if image is uploaded or selected */}
						{imageId && <p>Image selected/uploaded successfully! Image ID: {imageId}</p>}

						<div style={{ marginTop: '20px' }}>
							<Button isPrimary onClick={handleSubmit} disabled={isSubmitting}>
								{isSubmitting ? <Spinner /> : 'Add Catalog'}
							</Button>
							<Button variant="secondary" onClick={onRequestClose} style={{ marginLeft: '10px' }}>
								Cancel
							</Button>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
};

export default CatalogModal;
