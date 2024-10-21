import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, RangeControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data'; // Import useSelect
import FormInputs from './FormInputs';
import colors from './colors';
import AppointmentDetails from './AppointmentDetailsComponent';




export const registerAppointmentBlock = () => {

    registerBlockType('ukalikutz/appointment-block', {
        title: __('Appointment Block', 'ukalikutz'),
        icon: 'calendar',
        category: 'common',
        attributes: {
            backgroundColor: {
                type: 'string',
                default: '#ffffff', // Default background color
            },
            fontColor: {
                type: 'string',
                default: '#000000', // Default font color
            },
            fontSize: {
                type: 'number',
                default: 16, // Default font size
            },
        },

        edit: ({ attributes, setAttributes }) => {
            const { backgroundColor, fontColor, fontSize } = attributes;
            const blockProps = useBlockProps();

            // Use useSelect to check if the user is logged in
            const isLoggedIn = useSelect((select) => select('core').getCurrentUser() !== null);

            return (
                <>
                    <InspectorControls>
                        <PanelBody title={__('Block Settings', 'ukalikutz')}>
                            <TextControl
                                label={__('Background Color', 'ukalikutz')}
                                value={backgroundColor}
                                onChange={(value) => setAttributes({ backgroundColor: value })}
                            />
                            <ColorPalette
                                label={__('Font Color', 'ukalikutz')}
                                colors={colors}
                                value={fontColor}
                                onChange={(color) => setAttributes({ fontColor: color })}
                            />
                            <RangeControl
                                label={__('Font Size', 'ukalikutz')}
                                value={fontSize}
                                onChange={(value) => setAttributes({ fontSize: value })}
                                min={10}
                                max={50}
                            />
                        </PanelBody>
                    </InspectorControls>
                    <div {...blockProps} style={{ backgroundColor, color: fontColor, fontSize: `${fontSize}px` }}>
                        <h2>{__('Appointment Page', 'ukalikutz')}</h2>
                        {isLoggedIn ? (
                            <p>{__('Welcome back!', 'ukalikutz')}</p>
                        ) : (
                            <FormInputs />
                        )}
                       <AppointmentDetails />
                    </div>
                </>
            );
        },

        save() {
            return null; // Content will be rendered dynamically on the front end.
        },
    });
};
