// hooks/useOptions.js
import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const useOptions = () => {
	const [showUploadButton, setShowUploadButton] = useState(true);
	const [notice, setNotice] = useState({ message: '', type: '' }); // State to manage notices

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
			// Set a success notice
			setNotice({
				message: __('Manual upload button is now ' + (newValue ? 'enabled' : 'disabled') + '.', 'ukalikutz'),
				type: 'success',
			});
		} catch (error) {
			console.error('Error updating setting:', error);
			// Set an error notice if the update fails
			setNotice({
				message: __('Failed to update setting. Please try again.', 'ukalikutz'),
				type: 'error',
			});
		}
	};

	return { showUploadButton, handleToggleChange, notice };
};

export { useOptions};
