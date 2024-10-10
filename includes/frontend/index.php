<?php 
if (!defined('ABSPATH')) {
    exit;
}
function ukalikutz_register_appointment_block() {
    // Enqueue the block's script
    wp_register_script(
        'ukalikutz-blocks',
         plugin_dir_url(__DIR__) . '../build/index.js',
        ['wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor'],
        filemtime(UkalikutzHelpers::getPluginDir() . '../build/index.js')
    );

    // Register block type
    register_block_type('ukalikutz/appointment-block', [
        'editor_script' => 'ukalikutz-blocks',
    ]);
}

add_action('init', 'ukalikutz_register_appointment_block');



if(class_exists('UkalikutzHelpers')){
    UkalikutzHelpers::includeFrontendFiles();
}