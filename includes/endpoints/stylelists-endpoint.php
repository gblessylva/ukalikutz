<?php
function ukalikutz_register_stylist_endpoint() {
    register_rest_route( 'ukalikutz/v1', '/stylists', array(
        'methods' => 'GET',
        'callback' => 'ukalikutz_get_stylists',
        // 'permission_callback' => function() {
        //     return current_user_can( 'manage_options' );
        // }
    ));
}

function ukalikutz_get_stylists() {
    // Query for all users with the role of 'stylist'
    $args = array(
        'role'    => 'stylist',
        'orderby' => 'user_nicename',
        'order'   => 'ASC',
    );
    $users = get_users( $args );

    // Prepare user data for output
    $data = array();
    foreach ( $users as $user ) {
        $data[] = array(
            'ID'         => $user->ID,
            'user_login' => $user->user_login,
            'display_name' => $user->display_name,
            'user_email' => $user->user_email,
        );
    }

    return rest_ensure_response( $data );
}

add_action( 'rest_api_init', 'ukalikutz_register_stylist_endpoint' );
