<?php
/**
 * Adds a custom user role 'Stylist'
 */

function ukalikutz_add_stylist_role() {
    // Check if the role already exists before adding it
    if ( ! get_role( 'stylist' ) ) {
        // Add the new role with desired capabilities
        add_role( 'stylist', 'Stylist', array(
            'read'              => true,  // Can read content
            'edit_posts'        => false, // Cannot edit posts
            'delete_posts'      => false, // Cannot delete posts
            'publish_posts'     => false, // Cannot publish posts
            'upload_files'      => true,  // Can upload files (for media)
        ));
    }
    if ( ! get_role( 'customer' ) ) {
        // Add the new role with desired capabilities
        add_role( 'customer', 'Customer', array(
            'read'              => true,  // Can read content
            'edit_posts'        => false, // Cannot edit posts
            'delete_posts'      => false, // Cannot delete posts
            'publish_posts'     => false, // Cannot publish posts
            'upload_files'      => true,  // Can upload files (for media)
        ));
    }
}

add_action( 'init', 'ukalikutz_add_stylist_role' );
