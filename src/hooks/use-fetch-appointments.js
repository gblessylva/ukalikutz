import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const useFetchAppointments = () => {
	const [ appointments, setAppointments ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		const fetchAppointments = async () => {
			try {
				const response = await apiFetch( {
					path: '/ukalikutz/v1/appointments',
				} );
				console.log( response );
				setAppointments( response );
			} catch ( err ) {
				setError( err );
			} finally {
				setLoading( false );
			}
		};

		fetchAppointments();
	}, [] );

	return { appointments, loading, error };
};

export { useFetchAppointments };
