import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';


export const registerStylistsBlock = () => {
registerBlockType('ukalikutz/stylists-block', {
    title: 'Stylists Block',
    icon: 'admin-users',
    category: 'widgets',
    edit() {
        const blockProps = useBlockProps();
        return (
            <div {...blockProps}>
                <h3>Stylists Block</h3>
                <p>This block will display a list of available stylists on the front end.</p>
            </div>
        );
    },
    save() {
        return null; // Content will be rendered dynamically on the front end.
    },
});
}