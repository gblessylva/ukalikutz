<?php 

// Register the settings endpoint
add_action('rest_api_init', function () {
    register_rest_route('ukalikutz/v1', '/settings', array(
        'methods' => 'GET',
        'callback' => 'ukalikutz_get_settings',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('ukalikutz/v1', '/settings', array(
        'methods' => 'POST',
        'callback' => 'ukalikutz_update_settings',
        'permission_callback' => '__return_true',
    ));
});

// Fetch settings
function ukalikutz_get_settings() {
    // Assume you're storing this in the options table
    $settings = get_option('ukalikutz_settings', array('show_upload_button' => true));
    return rest_ensure_response($settings);
}

// Update settings
function ukalikutz_update_settings(WP_REST_Request $request) {
    $show_upload_button = $request->get_param('show_upload_button');

    // Save the setting to the options table
    $current_settings = get_option('ukalikutz_settings', array());
    $current_settings['show_upload_button'] = $show_upload_button;
    update_option('ukalikutz_settings', $current_settings);

    return rest_ensure_response(array('success' => true));
}

