jQuery(document).ready(function($) {
    /**
     * Sumbit method
     */


    $('.ukalikutz-appointment-form').on('submit', function(event) {
        event.preventDefault();

        var formData = {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            service: $('#catalog').val(),
            date: $('#appointment_date').val(),
            time: $('#appointment_time').val(),
            sign_up: $('#sign-up').val(),
            password: $('#password').val(),
        }; 
        
       
        
        $.ajax({
            url: ukalikutz_ajax.ajax_url, // The AJAX URL passed by wp_localize_script
            method: 'POST',
            data: {
                action: 'ukalikutz_add_new_appointment',
                nonce: ukalikutz_ajax.nonce,
                formData: formData
            },
            success: function(response) {
                console.log(response);
               
                // $('#appointment-response').html('<p>' + response.message + '</p>');
            },
            error: function(xhr, status, error) {
                // $('#appointment-response').html('<p>' + error + '</p>');
                console.log(error);
            }
        });
    });

     /**
     * Check email exists
     */
     $('#sign-up-checkbox').hide();
     $('#password-group').hide();

    $('#email').on('change', function() {
        var email = $(this).val();
        if (email) {
            $.ajax({
                url: ukalikutz_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'check_user_email', // The action hook for your AJAX call
                    email: email,
                    nonce: ukalikutz_ajax.nonce // Include nonce for security
                },
                success: function(response) {
                    console.log(response);
                    if (response.data.exists==true) {
                        $('#sign-up-checkbox').hide();
                        $('#password-group').hide();
                    } else {
                        $('#sign-up-checkbox').show();
                    }
                }
            });
        }
    });


     /**
     * Toggle signup checkbox to show password 
     */

     $('#sign-up').change(function() {
        if ($(this).is(':checked')) {
            $('#password-group').show();
        } else {
            $('#password-group').hide();
        }
    });

    // Confirm Password

    $('#password').on('input', function() {
        var password = $(this).val();
        var strengthMessage = $('#password-strength');

        if (password.length < 6) {
            strengthMessage.text('Password must be at least 8 characters long.').show();
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            strengthMessage.text('Password must contain uppercase letters, lowercase letters, numbers, and special characters.').show();
        } else {
            strengthMessage.hide();
        }
    });

    $('#confirm-password').on('input', function() {
        var confirmPassword = $(this).val();
        var password = $('#password').val();
        var matchMessage = $('#password-match');

        if (confirmPassword !== password) {
            matchMessage.text('Passwords do not match.', 'ukalikutz').show();
        } else {
            matchMessage.hide();
        }
    });
});
