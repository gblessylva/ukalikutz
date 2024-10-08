import { media } from '@wordpress/media-utils'; // Ensure this import is correct

export const openMediaLibrary = (onSelect) => {
    const frame = wp.media({
        title: 'Select Image',
        button: {
            text: 'Use this image'
        },
        multiple: false // Allow only one selection
    });

    // Handle media selection
    frame.on('select', () => {
        const selectedMedia = frame.state().get('selection').toJSON();
        onSelect(selectedMedia);
    });

    // Open the media library
    frame.open();
};
