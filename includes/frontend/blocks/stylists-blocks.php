<?php

function ukalikutz_render_stylists_block($attributes) {
    $stylists = get_users(['role' => 'stylist']); // Fetch stylists from the database
    ob_start();
    ?>
    <div class="stylists-list">
        <h3><?php _e('Available Stylists', 'ukalikutz'); ?></h3>
        <ul>
            <?php foreach ($stylists as $stylist) : ?>
                <li><?php echo esc_html($stylist->display_name); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php
    return ob_get_clean();
}
