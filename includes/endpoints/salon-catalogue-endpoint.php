<?php 
/**
 * REST API callback: Retrieve all salon catalogues.
 */
function ukalikutz_get_all_catalogues() {
    // Fetch all terms from the 'salon_catalogue' taxonomy
    $terms = get_terms( array(
        'taxonomy'   => 'salon_catalogue',
        'hide_empty' => false,
    ));

    // Check if there are any errors or if terms are empty
    if ( is_wp_error( $terms ) ) {
        return new WP_Error( 'no_catalogues', __( 'No catalogues found', 'ukalikutz' ), array( 'status' => 404 ) );
    }

    if (  empty( $terms ) ) {
        return new WP_Error( 'no_catalogues', __( 'No catalogues found', 'ukalikutz' ), array( 'status' => 200 ) );
    }

    $data = array();

    // Loop through each term to build the response data
    foreach ( $terms as $term ) {
        // Get term meta data
        $image_id = get_term_meta( $term->term_id, 'image_id', true );
        $stylist_id = get_term_meta( $term->term_id, 'stylist_id', true );
         // Get the thumbnail URL using the image ID
         $thumbnail = '';
         if ( ! empty( $image_id ) ) {
             $image_src = wp_get_attachment_image_src( $image_id, 'full' );
             if ( ! is_wp_error( $image_src ) && $image_src ) {
                 $thumbnail = esc_url( $image_src[0] ); // URL of the image
             }
         }
        
        // Format the data
        $data[] = array(
            'id'          => $term->term_id,
            'name'        => $term->name,
            'description' => $term->description,
            'count'       => $term->count,
            'thumbnail'    => $thumbnail,    // Include image ID from term meta
            'stylist_id'  => $stylist_id,  // Include stylist ID from term meta
            'term'        => $term,        // You can remove this if not needed
        );
    }

    // Return the data as a REST response
    return rest_ensure_response( $data );
}


/**
 * REST API callback: Add a new salon catalogue.
 */
function ukalikutz_add_catalogue( WP_REST_Request $request ) {
    // Sanitize and retrieve the name and slug
    $name = sanitize_text_field( $request['name'] );
    $slug = sanitize_title( $request['slug'] );
    $description = sanitize_text_field( $request['description'] );
    
    // Get the optional meta data from the request
    $image_id = isset( $request['image_id'] ) ? absint( $request['image_id'] ) : null;
    $stylist_id = isset( $request['stylist_id'] ) ? absint( $request['stylist_id'] ) : null;
   

    // Ensure the name is provided.
    if ( empty( $name ) ) {
        return new WP_Error( 'missing_name', __( 'Catalogue name is required', 'ukalikutz' ), array( 'status' => 400 ) );
    }

    // Insert the term into the 'salon_catalogue' taxonomy
    $term = wp_insert_term( $name, 'salon_catalogue', array(
        'slug'        => $slug,
        'description' => $description,
    ));

    // Check for errors in term creation
    if ( is_wp_error( $term ) ) {
        return $term; // Return the error if insertion fails.
    }

    // Get the term ID
    $term_id = $term['term_id'];

    // Save term meta (image ID and stylist ID) if provided
    if ( $image_id ) {
        add_term_meta( $term_id, 'image_id', $image_id, true );
    }

    if ( $stylist_id ) {
        add_term_meta( $term_id, 'stylist_id', $stylist_id, true );
    }

    // Return a successful response with the term data
    return rest_ensure_response( array(
        'id'          => $term_id,
        'name'        => $name,
        'slug'        => $slug,
        'description' => $description,
        'image_id'    => $image_id,
        'stylist_id'  => $stylist_id,
    ));
}


/**
 * REST API callback: Update an existing salon catalogue.
 */
function ukalikutz_update_catalogue( WP_REST_Request $request ) {
    $id = intval( $request['id'] );
    $name = sanitize_text_field( $request['name'] );
    $slug = sanitize_title( $request['slug'] );

    // Check if the term exists.
    $term = get_term( $id, 'salon_catalogue' );
    if ( ! $term || is_wp_error( $term ) ) {
        return new WP_Error( 'term_not_found', __( 'Catalogue not found', 'ukalikutz' ), array( 'status' => 404 ) );
    }

    // Update the term.
    $updated_term = wp_update_term( $id, 'salon_catalogue', array(
        'name' => $name,
        'slug' => $slug,
    ));

    if ( is_wp_error( $updated_term ) ) {
        return $updated_term; // Return the error if update fails.
    }

    return rest_ensure_response( array(
        'id'    => $updated_term['term_id'],
        'name'  => $name,
        'slug'  => $slug,
    ));
}

/**
 * REST API callback: Delete a salon catalogue.
 */
function ukalikutz_delete_catalogue( WP_REST_Request $request ) {
    $id = intval( $request['id'] );

    // Check if the term exists.
    $term = get_term( $id, 'salon_catalogue' );
    if ( ! $term || is_wp_error( $term ) ) {
        return new WP_Error( 'term_not_found', __( 'Catalogue not found', 'ukalikutz' ), array( 'status' => 404 ) );
    }

    // Delete the term.
    $deleted = wp_delete_term( $id, 'salon_catalogue' );

    if ( is_wp_error( $deleted ) ) {
        return $deleted; // Return the error if deletion fails.
    }

    return rest_ensure_response( array(
        'deleted' => true,
        'term_id' => $id,
    ));
}

/**
 * Register all custom REST API routes for catalogues.
 */
function ukalikutz_register_catalogue_endpoints() {
    // Get all catalogues
    register_rest_route( 'ukalikutz/v1', '/catalogues', array(
        'methods'  => 'GET',
        'callback' => 'ukalikutz_get_all_catalogues',
        'permission_callback' => '__return_true',
    ));

    // Add new catalogue
    register_rest_route( 'ukalikutz/v1', '/catalogues', array(
        'methods'  => 'POST',
        'callback' => 'ukalikutz_add_catalogue',
        'permission_callback' => '__return_true',
        'args' => array(
            'name' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ),
            'slug' => array(
                'required' => false,
            ),
        ),
    ));

    // Update existing catalogue
    register_rest_route( 'ukalikutz/v1', '/catalogues/(?P<id>\d+)', array(
        'methods'  => 'PUT',
        'callback' => 'ukalikutz_update_catalogue',
        'permission_callback' => '__return_true',
        'args' => array(
            'id' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric( $param );
                }
            ),
            'name' => array(
                'required' => false,
            ),
            'slug' => array(
                'required' => false,
            ),
        ),
    ));

    // Delete catalogue
    register_rest_route( 'ukalikutz/v1', '/catalogues/(?P<id>\d+)', array(
        'methods'  => 'DELETE',
        'callback' => 'ukalikutz_delete_catalogue',
        'permission_callback' => '__return_true',
        'args' => array(
            'id' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric( $param );
                }
            ),
        ),
    ));
}

add_action( 'rest_api_init', 'ukalikutz_register_catalogue_endpoints' );
