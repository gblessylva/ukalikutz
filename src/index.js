import './index.scss';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { SettingsPage } from './components';
import './blocks/appointment-block';


domReady( () => {
	const root = createRoot( document.getElementById( 'ukalikutz-settings' ) );

	root.render( <SettingsPage /> );
} );
