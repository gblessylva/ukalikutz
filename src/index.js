import './index.scss';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { SettingsPage } from './components';

import { registerUkalictzBlocks } from './blocks';

// registerUkalictzBlocks(); 
domReady( () => {
	const root = createRoot( document.getElementById( 'ukalikutz-settings' ) );
	console.log(root);
	root.render( <SettingsPage /> );
} );
