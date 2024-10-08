// components/Options.jsx
import {React, useState }from 'react';
import { ToggleControl, Notice } from '@wordpress/components'; // Import ToggleControl and Notice
import {useOptions} from '../../hooks/use-options'; // Import the custom hook
import { __ } from '@wordpress/i18n';
import AdminStylists from './AdminStylists';

const Options = () => {
	const { showUploadButton, handleToggleChange, notice } = useOptions();
    const [selectedStylists, setSelectedStylists] = useState([]);

	return (
		<div>
			{/* Conditionally render the notice if there is a message */}
			{notice.message && (
				<Notice  isDismissible={true} status={notice.type === 'error' ? 'error' : 'success'}>
					{notice.message}
				</Notice>
			)}
            <div style={{marginBottom:'10px'}}>

            </div>
			<ToggleControl
                style={{marginTop:'10px'}}
				label={__('Show Manual Upload Button', 'ukalikutz')}
				checked={showUploadButton}
				onChange={handleToggleChange}
			/>


		</div>
	);
};

export  {Options};
