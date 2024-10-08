// hooks/useOptions.js
import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n'; // Import for translation
import { useDispatch } from '@wordpress/data'; // Import useDispatch for data store
import { store as noticesStore } from '@wordpress/notices'; // Import notices store

const useOptions = () => {
	const [showUploadButton, setShowUploadButton] = useState(true);
	const { createErrorNotice, createNotice } = useDispatch(noticesStore); // Get the dispatch methods

	// Fetch current settings on component mount
	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const response = await apiFetch({
					path: '/ukalikutz/v1/settings', // Ensure this endpoint exists
					method: 'GET',
				});
				setShowUploadButton(response.show_upload_button);
			} catch (error) {
				console.error('Error fetching settings:', error);
			}
		};

		fetchSettings();
	}, []);

	// Handle toggle change
	const handleToggleChange = async (newValue) => {
		setShowUploadButton(newValue);

		// Update the setting in the backend
		try {
			await apiFetch({
				path: '/ukalikutz/v1/settings', // Ensure this endpoint exists
				method: 'POST',
				data: {
					show_upload_button: newValue,
				},
			});

			// Create a success notice
			createNotice(
				__('Manual upload button is now ' + (newValue ? 'enabled' : 'disabled') + '.', 'ukalikutz'), // Localize the notice message
				{ type: 'snackbar', explicitDismiss: true } // Options for the notice
			);
		} catch (error) {
			console.error('Error updating setting:', error);
			// Create an error notice if the update fails
			createErrorNotice(__('Failed to update setting. Please try again.', 'ukalikutz'), {
				type: 'snackbar',
				explicitDismiss: true,
			});
		}
	};

	return { showUploadButton, handleToggleChange };
};

export default useOptions;
