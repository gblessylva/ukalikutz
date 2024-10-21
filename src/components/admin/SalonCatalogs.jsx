// components/SalonCatalog.jsx
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Icon } from '@wordpress/components'; // Assuming you're using WordPress components
import useCatalogs from '../../hooks/use-catalogs';
import CatalogModal from '../general/CatalogModal';  // Import the CatalogModal component
import '../admin/styles/SalonCatalogsStyles.css';


const SalonCatalogs = () => {
	const { catalogs, loading, error } = useCatalogs();
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to open the modal
	const addNewCatalog = () => {
		setIsModalOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// Function to handle the form submission
	const handleAddCatalog = (newCatalog) => {
		// Here, you can handle the API call to add the new catalog
		// console.log('New Catalog:', newCatalog);
		// After successfully adding, you can refetch the catalogs or update the state
	};

	if (loading) {
		return <div>Loading catalogs...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<div className="catalog-header">
				<h2>Manage your salon catalogs here</h2>
				<Button
					variant="secondary"
					icon={<Icon icon="plus" />}
					style={{ marginLeft: 'auto' }}
					onClick={addNewCatalog}
				>
					Add Catalog
				</Button>
			</div>

			{catalogs.length > 0 ? (
				<div className="catalog-cards">
					{catalogs.map((catalog) => (
						<Card key={catalog.id} className="catalog-card" style={{ width: '300px', marginBottom: '20px' }}>
							<CardHeader>{catalog.name}</CardHeader>
							<CardBody>
								{catalog.thumbnail && (
									<img
										src={catalog.thumbnail}
										alt={`${catalog.name} Thumbnail`}
										style={{ maxWidth: '100%', marginBottom: '10px' }}
									/>
								)}
								<p>{catalog.description || 'No description available.'}</p>
							</CardBody>
						</Card>
					))}
				</div>
			) : (
				<p>No salon catalogs added yet.</p>
			)}

			{/* Render the modal */}
			<CatalogModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				onSubmit={handleAddCatalog}
			/>
		</div>
	);
};

export { SalonCatalogs };
