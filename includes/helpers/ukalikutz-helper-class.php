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
        include self::getPluginDir(). 'frontend/SaveAppointment.php';
    
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

    /**
     * Retrieve data of the current logged-in user from user meta.
     *
     * @return array An associative array containing user data (first_name, last_name, email, phone).
     */
    public static function getCurrentUserData() {
        // Get the ID of the currently logged-in user
        $user_id = get_current_user_id();

        // Check if a user is logged in
        if ($user_id === 0) {
            return []; // Return an empty array if no user is logged in
        }

        // Get user meta data
        $first_name = get_user_meta($user_id, 'first_name', true);
        $last_name = get_user_meta($user_id, 'last_name', true);
        $phone_number = get_user_meta($user_id, 'phone_number', true); // Assuming phone number is saved as user meta
        $user_info = get_userdata($user_id);
        $email = $user_info ? $user_info->user_email : '';

        // Return the data as an array
        return [
            'first_name' => $first_name ?: '',
            'last_name' => $last_name ?: '',
            'email' => $email ?: '',
            'phone_number' => $phone_number ?: '',
        ];
    }

     /**
     * Check if a user with the given email exists, and create a new user if not.
     *
     * @param string $email The email of the user to check or create.
     * @param string $first_name The first name of the new user.
     * @param string $last_name The last name of the new user.
     * @param string $phone_number Optional. The phone number of the new user.
     * @param string $role Optional. The role to assign to the new user. Default is 'customer'.
     *  @param string $password Optional. The role to assign to the new user. Default is 'customer'.
     * @return array|WP_Error Array containing user ID and message on success, or WP_Error on failure.
     */
    public static function addCustomer($email, $first_name, $last_name, $password, $phone_number = '') {
        // Check if the email already exists
        // $user_id = email_exists($email);
    
        // if ($user_id) {
        //     return ['user_exists' => true];
        // }
    
        // Create the user with the provided password, email, and user details
        $user_id = wp_create_user($email, $password, $email);
    
        // Check for any errors during user creation
        if (is_wp_error($user_id)) {
            return $user_id; // Return the error if user creation failed
        }
    
        // Update the user information with first name, last name, and phone number
        wp_update_user([
            'ID'         => $user_id,
            'first_name' => $first_name,
            'last_name'  => $last_name,
        ]);
    
        // If a phone number is provided, save it as user meta
        if (!empty($phone_number)) {
            update_user_meta($user_id, 'phone_number', $phone_number);
        }
    
        // Assign the specified role to the new user (default is 'customer')
        $user = new WP_User($user_id);
        $role = 'customer';
        $user->set_role($role);
    
        // Return the newly created user's ID and success message
        return [$user_id];
    }
    
}

// Hook the save function into the appropriate WordPress actions.
add_action( 'created_salon_catalogue', array( 'UkalikutzHelpers', 'save_salon_catalogue_thumbnail' ), 10, 2 );
add_action( 'edited_salon_catalogue', array( 'UkalikutzHelpers', 'save_salon_catalogue_thumbnail' ), 10, 2 );
