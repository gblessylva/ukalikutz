<?php 

function ukalikutz_render_appointment_block( $attributes ) {
    // For now, only render a heading for appointments
    ob_start();
    echo '<h2>Appointments</h2>';
    return ob_get_clean();
}
