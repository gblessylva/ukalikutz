<?php
/**
 * REST API Endpoint for Saving Appointments
 *
 * @package ukalikutz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register the REST API route for saving appointments.
 */
function ukalikutz_register_appointment_endpoint() {
    register_rest_route(
        'ukalikutz/v1',
        '/appointments',
        array(
            'methods'  => 'POST',
            'callback' => 'ukalikutz_save_appointment',
            'permission_callback' => 'ukalikutz_appointment_permissions',
        )
    );
}

add_action( 'rest_api_init', 'ukalikutz_register_appointment_endpoint' );

/**
 * Permission callback to ensure the user has the necessary permissions.
 */
function ukalikutz_appointment_permissions() {
    return current_user_can( 'edit_posts' ); // Adjust based on your requirement
}

/**
 * Callback function to save the appointment.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response
 */
function ukalikutz_save_appointment( WP_REST_Request $request ) {
    $params = $request->get_params();

    // Validate required fields
    if ( empty( $params['client_id'] ) || empty( $params['appointment_date'] ) || empty( $params['stylist_id'] ) ) {
        return new WP_REST_Response( array(
            'message' => 'Required fields are missing.',
        ), 400 );
    }

    // Prepare the data
    $post_data = array(
        'post_type'     => 'appointment',
        'post_title'    => sanitize_text_field( $params['client_id'] . ' - ' . $params['appointment_date'] ),
        'post_status'   => 'publish', // Set to publish or draft based on requirements
        'meta_input'    => array(
            'appointment_date' => sanitize_text_field( $params['appointment_date'] ),
            'appointment_time' => sanitize_text_field( $params['appointment_time'] ),
            'stylist_id'          => sanitize_text_field( $params['stylist_id'] ),
            'client_id'          => sanitize_text_field( $params['client_id'] ),
        ),
    );

    // Insert the appointment post
    $appointment_id = wp_insert_post( $post_data );

    if ( is_wp_error( $appointment_id ) ) {
        return new WP_REST_Response( array(
            'message' => 'Error saving appointment.',
        ), 500 );
    }

    return new WP_REST_Response( array(
        'message' => 'Appointment saved successfully!',
        'appointment_id' => $appointment_id,
    ), 200 );
}
