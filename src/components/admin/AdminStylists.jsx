// components/AdminStylists.jsx
import React, { useEffect, useState } from 'react';
import { SelectControl, PanelRow } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const AdminStylists = ({ selectedStylists, onChange }) => {
	const [stylists, setStylists] = useState([]);
	const [selected, setSelected] = useState(selectedStylists || []); // Track selected stylists

	// Fetch stylists on component mount
	useEffect(() => {
		const fetchStylists = async () => {
			try {
				const response = await apiFetch({
					path: '/ukalikutz/v1/stylists', // Ensure this endpoint exists to fetch stylists
					method: 'GET',
				});
				setStylists(response); // Set fetched stylists to state
                console.log(response);
			} catch (error) {
				console.error('Error fetching stylists:', error);
			}
		};

		fetchStylists();
	}, []);

    const handleSelectChange = (newSelected) => {
		setSelected(newSelected);
		onChange(newSelected); // Notify parent component of selection change
	};

	return (
        <PanelRow>
			<div>
				<h3>{__('Select Stylists', 'ukalikutz')}</h3>
				<SelectControl
					multiple
					value={selected}
					options={stylists.map((stylist) => ({
						label: stylist.display_name,
						value: stylist.ID,
					}))}
					onChange={handleSelectChange}
					__unstableFocusOnMount={false}
				/>
			</div>
		</PanelRow>
		
	);
};

export default AdminStylists;
