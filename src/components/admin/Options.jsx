// components/Options.jsx
import React from 'react';
import { ToggleControl } from '@wordpress/components';
import useOptions from '../../hooks/use-options'; // Adjust the path as needed

const Options = () => {
	const { showUploadButton, handleToggleChange } = useOptions();

	return (
		<div>
			<ToggleControl
				label="Show Manual Upload Button"
				checked={showUploadButton}
				onChange={handleToggleChange}
			/>
		</div>
	);
};

export { Options};
