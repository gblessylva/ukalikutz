// components/CatalogModal.jsx
import React, { useState } from 'react';
import { Modal, TextControl, Button, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { StylistsComboBox } from './StylistsComboBox';

const CatalogModal = ({ isOpen, onRequestClose, onSubmit }) => {
	const [catalogName, setCatalogName] = useState('');
	const [catalogDescription, setCatalogDescription] = useState('');
	const [catalogImage, setCatalogImage] = useState(null); // Store the uploaded image file
	const [isUploading, setIsUploading] = useState(false); // Track upload state
	const [imageId, setImageId] = useState(null); // Store the image ID
	const [selectedStylist, setSelectedStylist] = useState(null); // Store the stylist ID

	// Handle the form submission
	const handleSubmit = async () => {
		// Validate required fields (you can uncomment this section if needed)
		// if (!catalogName || !selectedStylist) {
		// 	alert('Please fill in all required fields.');
		// 	return;
		// }

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

			// Log catalog ID, stylist ID, and image ID for debugging purposes
			console.log(catalogId, 'is catalog id', selectedStylist, 'is stylist', imageId);

			// Call the onSubmit callback with the new catalog data
			onSubmit({
				id: catalogId,
				name: catalogName,
				description: catalogDescription,
				image_id: imageId,
				stylist_id: selectedStylist,
			});

			// Reset form fields after successful submission
			setCatalogName('');
			setCatalogDescription('');
			setImageId(null);
			setSelectedStylist(null);
			onRequestClose();

		} catch (error) {
			console.error('Error creating catalog:', error);
			alert('Failed to create the catalog.');
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

	// Call uploadImage whenever a new file is selected
	const handleImageUpload = () => {
		if (catalogImage) {
			uploadImage();
		}
	};

	return (
		<>
			{isOpen && (
				<Modal
					title="Add New Catalog"
					onRequestClose={onRequestClose}
				>
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
						
						<StylistsComboBox
							onSelect={(value) => setSelectedStylist(value)}
						/>
						{/* Image upload input */}
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

						{/* Check if image is uploaded */}
						{imageId && <p>Image uploaded successfully! Image ID: {imageId}</p>}

						<div style={{ marginTop: '20px' }}>
							<Button isPrimary onClick={handleSubmit}>
								Add Catalog
							</Button>
							<Button
								variant="secondary"
								onClick={onRequestClose}
								style={{ marginLeft: '10px' }}
							>
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
