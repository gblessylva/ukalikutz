import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { store as noticesStore } from '@wordpress/notices';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

const useSettings = () => {
	const [ message, setMessage ] = useState();
	const [ display, setDisplay ] = useState();
	const [ size, setSize ] = useState();

	const { createSuccessNotice } = useDispatch( noticesStore );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
			setMessage( settings.ukalikutz.message );
			setDisplay( settings.ukalikutz.display );
			setSize( settings.ukalikutz.size );
		} );
	}, [] );

	const saveSettings = () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: {
				ukalikutz: {
					message,
					display,
					size,
				},
			},
		} ).then( () => {
			createSuccessNotice(
				__( 'Settings saved.', 'ukalikutz' )
			);
		} );
	};

	return {
		message,
		setMessage,
		display,
		setDisplay,
		size,
		setSize,
		saveSettings,
	};
};

export default useSettings;
