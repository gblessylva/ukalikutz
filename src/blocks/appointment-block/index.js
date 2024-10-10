import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('ukalikutz/appointment-block', {
    title: __('Appointment Block', 'ukalikutz'),
    icon: 'calendar',
    category: 'common',

    edit: () => {
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <h2>{__('Appointment Page', 'ukalikutz')}</h2>
            </div>
        );
    },

    save: () => {
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <h2>{__('Appointment Page', 'ukalikutz')}</h2>
            </div>
        );
    },
});
