<?php 
if (!defined('ABSPATH')) {
    exit;
}

class SaveAppointment {
    // Define private static variables to store appointment data
    private static string $first_name;
    private static string $last_name;
    private static string $email;
    private static string $phone_number;
    private static string $service;
    private static string $date;
    private static string $time;
    private static string $signup;
    private static string $password;
    private static string $user_id;

    /**
     * Initialize the class by registering AJAX hooks.
     * 
     * @return void
     */
    public static function init() {
        // Register AJAX actions for logged-in and guest users
        add_action('wp_ajax_ukalikutz_add_new_appointment', ['SaveAppointment', 'ukalikutz_add_new_appointment']);
        add_action('wp_ajax_nopriv_ukalikutz_add_new_appointment', ['SaveAppointment', 'ukalikutz_add_new_appointment']);
        add_action('wp_ajax_check_user_email', ['SaveAppointment', 'check_user_email_callback']);
        add_action('wp_ajax_nopriv_check_user_email', ['SaveAppointment', 'check_user_email_callback']);
    }

    

/**
     * Handle adding a new appointment via AJAX.
     * 
     * @return void
     */
public static function check_user_email_callback() {
    // Check nonce
    check_ajax_referer('ukalikutz_nonce', 'nonce');

    // Get the email from the request
    $email = sanitize_email($_POST['email']);

    // Check if the email exists
    $user_id = email_exists($email);
    if ($user_id) {
        wp_send_json_success(['exists' => true]);
    } else {
        wp_send_json_success(['exists' => false]);
    }

    wp_die(); // Required to terminate immediately and return a proper response
}



    /**
     * Handle adding a new appointment via AJAX.
     * 
     * @return void
     */
    public static function ukalikutz_add_new_appointment() {
        
        // Validate nonce
        if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'ukalikutz_nonce')) {
            wp_send_json_error(__('Invalid nonce verification.', 'ukalikutz'));
        }

        // Sanitize and collect data from formData
        $formData = $_POST['formData'];

        // Check current user data
        $current_user_data = UkalikutzHelpers::getCurrentUserData();

        if (!empty($current_user_data)) {
            self::$first_name = $current_user_data['first_name'];
            self::$last_name  = $current_user_data['last_name'];
            self::$email      = $current_user_data['email'];
            self::$phone_number = $current_user_data['phone_number'];
        } else {
            self::$first_name = sanitize_text_field($formData['first_name']);
            self::$last_name  = sanitize_text_field($formData['last_name']);
            self::$email      = sanitize_email($formData['email']);
            self::$phone_number = sanitize_text_field($formData['phone']);
        }

        self::$service    = sanitize_text_field($formData['service']);
        self::$date       = sanitize_text_field($formData['date']);
        self::$time       = sanitize_text_field($formData['time']);
        self::$signup     = sanitize_text_field($formData['sign_up']);
        self::$password   = isset($formData['password']) ? sanitize_text_field($formData['password']) : '';
        self::$user_id = email_exists(self::$email);

        // Check if email exists
        if (self::$user_id) {
            // Save Appointment
            self::ukalikutz_save_appointment(self::$user_id);
            wp_send_json_success(__('Email Exists', 'ukalikutz'));
        } else {

            // wp_send_json_success(__('User does not exist', 'ukalikutz'));

           
            // If signup is checked, create a new user
            if (self::$signup === 'on') {

                // wp_send_json_success(__(self::$signup, 'ukalikutz'));
                $user_id = UkalikutzHelpers::addCustomer(
                    self::$email, 
                    self::$first_name, 
                    self::$last_name, 
                    self::$password,
                    self::$phone_number, 
                );
                    // wp_send_json_success(__($user_id, 'ukalikutz'));
                // Check if user creation was successful
                if (is_wp_error($user_id)) {
                    wp_send_json_error(__('Failed to create user.', 'ukalikutz'));
                }
            }

            // Save Appointment after user creation
            self::ukalikutz_save_appointment($user_id);
        }
    }

     /**
     * Save Appointment email to customer to confirm appointment.
     *
     * @param string $email Customer email
     * @param int $appointment_id Appointment post ID
     * @return void
     */
    public static function ukalikutz_save_appointment($user_id) {
        // Create new appointment post
        $appointment_id = wp_insert_post([
            'post_type'   => 'appointment',
            'post_title'  => self::$first_name . ' ' . self::$last_name . ' Appointment',
            'post_status' => 'publish',
        ]);

        // Handle error if appointment creation fails
        if (is_wp_error($appointment_id)) {
            wp_send_json_error(__('Failed to create appointment.', 'ukalikutz'));
        }

        // Add meta fields for appointment
        update_post_meta($appointment_id, 'first_name', self::$first_name);
        update_post_meta($appointment_id, 'last_name', self::$last_name);
        update_post_meta($appointment_id, 'email', self::$email);
        update_post_meta($appointment_id, 'phone', self::$phone_number);
        update_post_meta($appointment_id, 'service', self::$service);
        update_post_meta($appointment_id, 'date', self::$date);
        update_post_meta($appointment_id, 'time', self::$time);
        update_post_meta( $appointment_id, 'client_id', $user_id );

        // Send email notifications
        self::ukalikutz_email_customer_user(self::$email, $appointment_id);
        self::ukalikutz_email_admin_user($appointment_id);
        self::ukalikutz_email_stylist_user($appointment_id);

        wp_send_json_success(__('Appointment created successfully.', 'ukalikutz'));
    }

    /**
     * Send email to customer to confirm appointment.
     *
     * @param string $email Customer email
     * @param int $appointment_id Appointment post ID
     * @return void
     */
    public static function ukalikutz_email_customer_user($email, $appointment_id) {
        $subject = __('Appointment Confirmation', 'ukalikutz');
        $message = __('Thank you for booking an appointment!', 'ukalikutz');
        wp_mail($email, $subject, $message);
    }

    /**
     * Send email notification to admin about the new appointment.
     *
     * @param int $appointment_id Appointment post ID
     * @return void
     */
    public static function ukalikutz_email_admin_user($appointment_id) {
        $admin_email = get_option('admin_email');
        $subject = __('New Appointment Booking', 'ukalikutz');
        $message = __('A new appointment has been booked.', 'ukalikutz');
        wp_mail($admin_email, $subject, $message);
    }

    /**
     * Send email notification to the assigned stylist.
     *
     * @param int $appointment_id Appointment post ID
     * @return void
     */
    public static function ukalikutz_email_stylist_user($appointment_id) {
        // Assuming stylist email is stored as post meta
        $stylist_email = get_post_meta($appointment_id, 'stylist_email', true);
        $subject = __('New Appointment Assigned', 'ukalikutz');
        $message = __('A new appointment has been assigned to you.', 'ukalikutz');
        wp_mail($stylist_email, $subject, $message);
    }
}

// Initialize the AJAX hooks
SaveAppointment::init();
