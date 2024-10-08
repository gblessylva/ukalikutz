<?php
// Add a filter to determine whether to show the manual upload button
function ukalikutz_show_manual_upload_button() {
    // Replace this condition with your own logic
    // Example: only show for admin users
    // if ( current_user_can( 'administrator' ) ) {
    //     return true; // Show the button
    // }
    
    return false; // Hide the button
}
add_filter( 'ukalikutz_show_manual_upload_button', 'ukalikutz_show_manual_upload_button' );
