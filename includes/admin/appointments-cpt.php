<?php
/**
 * Register a Custom Post Type: Appointments
 *
 * @package ukalikutz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function ukalikutz_register_appointments_cpt() {
    $labels = array(
        'name'                  => _x( 'Appointments', 'Post type general name', 'ukalikutz' ),
        'singular_name'         => _x( 'Appointment', 'Post type singular name', 'ukalikutz' ),
        'menu_name'             => _x( 'Appointments', 'Admin Menu text', 'ukalikutz' ),
        'name_admin_bar'        => _x( 'Appointment', 'Add New on Toolbar', 'ukalikutz' ),
        'add_new'               => __( 'Add New', 'ukalikutz' ),
        'add_new_item'          => __( 'Add New Appointment', 'ukalikutz' ),
        'new_item'              => __( 'New Appointment', 'ukalikutz' ),
        'edit_item'             => __( 'Edit Appointment', 'ukalikutz' ),
        'view_item'             => __( 'View Appointment', 'ukalikutz' ),
        'all_items'             => __( 'All Appointments', 'ukalikutz' ),
        'search_items'          => __( 'Search Appointments', 'ukalikutz' ),
        'not_found'             => __( 'No appointments found.', 'ukalikutz' ),
        'not_found_in_trash'    => __( 'No appointments found in Trash.', 'ukalikutz' ),
        'featured_image'        => _x( 'Appointment Image', 'Overrides the "Featured Image" phrase', 'ukalikutz' ),
        'set_featured_image'    => _x( 'Set appointment image', 'Overrides the "Set featured image" phrase', 'ukalikutz' ),
        'remove_featured_image' => _x( 'Remove appointment image', 'Overrides the "Remove featured image" phrase', 'ukalikutz' ),
        'use_featured_image'    => _x( 'Use as appointment image', 'Overrides the "Use as featured image" phrase', 'ukalikutz' ),
        'archives'              => _x( 'Appointment Archives', 'Post type archive label', 'ukalikutz' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'appointments' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-calendar-alt', // WordPress Dashicon for calendar
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'custom-fields' ),
        'show_in_rest'       => true, // Enables Gutenberg editor
    );

    register_post_type( 'appointment', $args );
}

add_action( 'init', 'ukalikutz_register_appointments_cpt' );
