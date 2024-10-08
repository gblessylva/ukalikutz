import { useState, useEffect } from '@wordpress/element';

/**
 * Custom hook to fetch stylists from the custom REST API endpoint.
 * @returns {Array} - List of stylist options.
 */
function useFetchStylists() {
	const [ options, setOptions ] = useState( [] );

	useEffect( () => {
		const fetchStylists = async () => {
			try {
				const response = await fetch(
					'/wp-json/ukalikutz/v1/stylists'
				); // Custom endpoint
				if ( ! response.ok ) {
					throw new Error(
						`HTTP error! Status: ${ response.status }`
					);
				}
				const stylists = await response.json();

				const stylistOptions = stylists.map( ( stylist ) => ( {
					id: stylist.ID,
					label: `${ stylist.display_name } - Stylist`,
					value: stylist.ID,
				} ) );

				setOptions( stylistOptions );
			} catch ( error ) {
				console.error( 'Error fetching stylists:', error );
			}
		};

		fetchStylists();
	}, [] );

	return options;
}

export default useFetchStylists;
