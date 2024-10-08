import { TabPanel, Button, PanelBody } from '@wordpress/components';
import { Dashboard } from './admin/Dashboard';
import { Appointments } from './admin/Appointments';
import { Stylists } from './admin/Stylists';
import { SalonCatalogs } from './admin/SalonCatalogs';
import { Options } from './admin/Options';

const onSelect = ( tabName ) => {
	// Update the URL param without reloading the page
	const url = new URL( window.location );
	url.searchParams.set( 'tab', tabName );
	window.history.pushState( {}, '', url );
};

const tabs = [
	{ name: 'dashboard', title: 'Dashboard', content: <Dashboard /> },
	{ name: 'appointments', title: 'Appointments', content: <Appointments /> },
	{ name: 'stylists', title: 'Stylists', content: <Stylists /> },
	{ name: 'catalogs', title: 'Salon Catalogs', content: <SalonCatalogs /> },
	{ name: 'options', title: 'Options', content: <Options /> },
];

const SettingsPage = () => (
	<TabPanel
		className=".ukalikutz-tabs"
		activeClass="active-tab"
		onSelect={ onSelect }
		tabs={ tabs }
	>
		{ ( { title, content, name } ) => (
			<div className={ name }>
				<h3>{ title }</h3>
				{ content }
			</div>
		) }
	</TabPanel>
);

export { SettingsPage };
