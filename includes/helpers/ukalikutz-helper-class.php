<?php
/**
 * Class UkalikutzHelpers
 * Provides helper functions for uKalikutz.
 */
class UkalikutzHelpers {

    /**
     * Save the thumbnail field for the salon_catalogue taxonomy.
     *
     * @param int $term_id The ID of the term being saved.
     */
    public static function save_salon_catalogue_thumbnail( $term_id ) {
        if ( isset( $_POST['salon_catalogue_thumbnail'] ) ) {
            $thumbnail_url = sanitize_text_field( $_POST['salon_catalogue_thumbnail'] );
            update_term_meta( $term_id, 'salon_catalogue_thumbnail', $thumbnail_url );
        }
    }
}

// Hook the save function into the appropriate WordPress actions.
add_action( 'created_salon_catalogue', array( 'UkalikutzHelpers', 'save_salon_catalogue_thumbnail' ), 10, 2 );
add_action( 'edited_salon_catalogue', array( 'UkalikutzHelpers', 'save_salon_catalogue_thumbnail' ), 10, 2 );
