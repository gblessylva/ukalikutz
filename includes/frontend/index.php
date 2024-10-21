<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class to register Ukalikutz blocks and manage associated scripts and styles.
 * @package Ukalikutx
 * @author gblessylva <gblessylva@gmail.com>
 * 
 */
class UkalikutzBlocks {

    /**
     * Initialize the block registration process and include frontend assets if necessary.
     * 
     * @return void
     */
    public static function init() {
        
        add_action('init', [self::class, 'register_blocks']);
        
        // Include frontend files if UkalikutzHelpers class exists
        if (class_exists('UkalikutzHelpers')) {
            UkalikutzHelpers::includeFrontendFiles();
        }
    }

    /**
    * Register  enqueue associated scripts/styles.
    * 
    * @return void
    */
    public static function register_assets() {
        // Enqueue the block's script
        wp_register_script(
            'ukalikutz-blocks',
            plugin_dir_url(__DIR__) . '../build/index.js',
            ['wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor'],
            filemtime(UkalikutzHelpers::getPluginDir() . '../build/index.js')
        );

        // Enqueue the block's styles
        wp_register_style(
            'ukalikutz-blocks-styles',
            plugin_dir_url(__DIR__) . '../build/index.css',
            [],
            filemtime(UkalikutzHelpers::getPluginDir() . '../build/index.css')
        );
    }

    /**
     * Register appointment and stylist blocks and enqueue associated scripts/styles.
     * 
     * @return void
     */
    public static function register_blocks() {
        self::register_assets(); // Call to register scripts and styles

        // Register block type for appointment-block
        register_block_type('ukalikutz/appointment-block', [
            'editor_script' => 'ukalikutz-blocks',
            'style'         => 'ukalikutz-blocks-styles',
            'render_callback'  => [ 'AppointmentBlock', 'ukalikutz_render_appointment_block' ],
        ]);

        // Register block type for stylists-block with the render callback
        register_block_type('ukalikutz/stylists-block', [
            'editor_script'    => 'ukalikutz-blocks',
            'style'            => 'ukalikutz-blocks-styles',
            'render_callback'  => 'ukalikutz_render_stylists_block',
        ]);
    }
}

// Initialize the block registration
UkalikutzBlocks::init();
