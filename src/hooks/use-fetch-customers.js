import { useState, useEffect } from '@wordpress/element';

/**
 * Custom hook to fetch customers from the custom REST API endpoint.
 * @returns {Array} - List of customer options.
 */
function useFetchCustomers() {
	const [ options, setOptions ] = useState( [] );

	useEffect( () => {
		const fetchcustomers = async () => {
			try {
				const response = await fetch(
					'/wp-json/ukalikutz/v1/customers'
				); // Custom endpoint
				if ( ! response.ok ) {
					throw new Error(
						`HTTP error! Status: ${ response.status }`
					);
				}
				const customers = await response.json();

				const customerOptions = customers.map( ( customer ) => ( {
					id: customer.ID,
					label: `${ customer.display_name }`,
					value: customer.ID,
				} ) );

				setOptions( customerOptions );
			} catch ( error ) {
				console.error( 'Error fetching customers:', error );
			}
		};

		fetchcustomers();
	}, [] );

	return options;
}

export default useFetchCustomers;
