<?php
/**
 * REST API Endpoint for Managing Appointments
 *
 * @package ukalikutz
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Register the REST API routes for appointments.
 */
function ukalikutz_register_appointment_endpoint() {
    register_rest_route(
        'ukalikutz/v1',
        '/appointments',
        array(
            array(
                'methods'  => 'GET',
                'callback' => 'ukalikutz_get_appointments',
                // 'permission_callback' => 'ukalikutz_appointment_permissions',
            ),
            array(
                'methods'  => 'POST',
                'callback' => 'ukalikutz_save_appointment',
                'permission_callback' => 'ukalikutz_appointment_permissions',
            ),
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
    // Fetch user data using the client_id
    $client = get_userdata( intval( $params['client_id'] ) );

    if ( ! $client ) {
        return new WP_REST_Response( array(
            'message' => 'Invalid client ID.',
        ), 400 );
    }
    // Get the client's full name
    $client_full_name = $client->first_name . ' ' . $client->last_name;

    // Prepare the data
    $post_data = array(
        'post_type'     => 'appointment',
        'post_title'    => sanitize_text_field( $client_full_name . ' - ' . $params['appointment_date'] ),
        'post_status'   => 'publish', // Set to publish or draft based on requirements
        'meta_input'    => array(
            'appointment_date' => sanitize_text_field( $params['appointment_date'] ),
            'appointment_time' => sanitize_text_field( $params['appointment_time'] ),
            'stylist_id'       => sanitize_text_field( $params['stylist_id'] ),
            'client_id'        => sanitize_text_field( $params['client_id'] ),
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

/**
 * Callback function to retrieve all appointments.
 *
 * @return WP_REST_Response
 */
function ukalikutz_get_appointments() {
    $query_args = array(
        'post_type'   => 'appointment',
        'post_status' => 'publish', // or 'any' to get all statuses
        'numberposts' => -1, // Get all appointments
    );

    $appointments = get_posts( $query_args );

    $formatted_appointments = array();

    foreach ( $appointments as $appointment ) {
        $appointment_id = $appointment->ID;
        $appointment_date = get_post_meta( $appointment_id, 'appointment_date', true );
        $appointment_time = get_post_meta( $appointment_id, 'appointment_time', true );
        $stylist_id = get_post_meta( $appointment_id, 'stylist_id', true );
        $client_id = get_post_meta( $appointment->ID, 'client_id', true );
        $appointment_full_date = $appointment_date ;

         // Get stylist name
         $stylist_user = get_userdata( $stylist_id );
         $stylist_name = $stylist_user ? $stylist_user->first_name . ' ' . $stylist_user->last_name : 'Unknown Stylist';

         // Get client name
         $client_user = get_userdata( $client_id );
         $client_name = $client_user ? $client_user->first_name . ' ' . $client_user->last_name : 'Unknown Client';


         // Format the date
        $formatted_date = date( 'jS F, Y', strtotime( $appointment_date ) );
        $formatted_time = date( 'h:i A', strtotime( $appointment_time ) );
        $formatted_appointments[] = array(
            'id' => $appointment->ID,
            'title' => $appointment->post_title,
            'date' => $formatted_date,
            'time' => $formatted_time ,
            'stylist' =>  $stylist_name,
            'client' => $client_name,
            'cal_date'=>'2024-08-29 10:05',
            'cal_end'=>'2024-08-29 10:35'
        );
    }

    return new WP_REST_Response( $formatted_appointments, 200 );
}
