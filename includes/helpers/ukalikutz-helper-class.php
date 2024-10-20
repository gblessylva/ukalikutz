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

    /**
     * Returns the directory path of the current plugin.
     *
     * @return string The plugin directory path.
     */
    public static function getPluginDir() {
        return plugin_dir_path(__DIR__);
    }

    /**
     * Returns the directory path of the current file.
     *
     * @return string The file's directory path.
     */
    public static function getFileDir() {
        return plugin_dir_path(__FILE__);
    }

    /**
     * Includes a file frondent files to the plugin's directory.
     *
     */
    public static function includeFrontendFiles() {
        include self::getPluginDir(). 'frontend/blocks/AppointmentBlock.php';
        include self::getPluginDir(). 'frontend/blocks/stylists-blocks.php';
    
    }

     /**
     * Includes all admin files to the plugin's directory.
     *
     */
    public static function includeAdminFiles() {
        // include self::getPluginDir(). 'frontend/ukalikutz-render-blocks.php';
    }

    /**
     * Helper function to get all the salon cataglogs. getSalonCatalog
     * @return array[]
     */
    public static function getSalonCatalog() {
        // Get all terms from the 'salon_catalogue' taxonomy
        $terms = get_terms([
            'taxonomy'   => 'salon_catalogue', // Replace with your taxonomy name
            'hide_empty' => false,              // Retrieve terms even if they don't have posts
        ]);
    
        // Initialize an array to store the catalog data
        $catalogs = [];
    
        // Check if any terms were found
        if (!is_wp_error($terms) && !empty($terms)) {
            foreach ($terms as $term) {
                $catalogs[] = [
                    'id'    => $term->term_id,   // The ID of the term
                    'title' => $term->name,       // The name of the term
                ];
            }
        }else if(empty($terms)){
            $catalogs[] = [
                'id'    => null,   // The ID of the term
                'title' => "No Catalog added yet",       // The name of the term
            ];
        }
        // var_dump($catalogs);
        return $catalogs; // Return the array of catalogs
    }
    
      /**
     * Check if the user is logged in.
     *
     * @return bool True if the user is logged in, false otherwise.
     */
    public static function userLoggedIn(): bool {
        return is_user_logged_in();
    }

    /**
     * Check if the user is an admin.
     *
     * @return bool True if the user has the 'administrator' role, false otherwise.
     */
    public static function isAdmin(): bool {
        if (self::userLoggedIn()) {
            return current_user_can('administrator');
        }
        return false;
    }

    /**
     * Check if the user is a customer.
     *
     * @return bool True if the user has the 'customer' role, false otherwise.
     */
    public static function isCustomer(): bool {
        if (self::userLoggedIn()) {
            return current_user_can('customer');
        }
        return false;
    }

    /**
     * Check if the user is a stylist.
     *
     * @return bool True if the user has the 'stylist' role, false otherwise.
     */
    public static function isStylist(): bool {
        if (self::userLoggedIn()) {
            return current_user_can('stylist');
        }
        return false;
    }
}

// Hook the save function into the appropriate WordPress actions.
add_action( 'created_salon_catalogue', array( 'UkalikutzHelpers', 'save_salon_catalogue_thumbnail' ), 10, 2 );
add_action( 'edited_salon_catalogue', array( 'UkalikutzHelpers', 'save_salon_catalogue_thumbnail' ), 10, 2 );
