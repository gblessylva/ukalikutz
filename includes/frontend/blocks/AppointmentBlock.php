<?php 
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class to register Ukalikutz Appointment blocks and manage associated scripts and styles.
 * @package Ukalikutx
 * @author gblessylva <gblessylva@gmail.com>
 * 
 */



 class AppointmentBlock {
    /**
     * Render the appointment form block.
     * 
     * @return bool|string Rendered form content.
     */
    public static function ukalikutz_render_appointment_block(): bool | string {
        ob_start(); ?>
        <h3><?php _e('Book an Appointment', 'ukalikutz'); ?></h3>
        <form action="" method="post" class="ukalikutz-appointment-form">
            <?php 
                $isLoggedIn = UkalikutzHelpers::userLoggedIn(); 
                if(!$isLoggedIn){
                   ?>
                     <div class="form-group">
                        <label for="first_name"><?php _e('First Name', 'ukalikutz'); ?></label>
                        <input type="text" id="first_name" name="first_name" required />
                    </div>

                    <div class="form-group">
                        <label for="last_name"><?php _e('Last Name', 'ukalikutz'); ?></label>
                        <input type="text" id="last_name" name="last_name" required />
                    </div>

                    <div class="form-group">
                        <label for="email"><?php _e('Email', 'ukalikutz'); ?></label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div class="form-group" id="sign-up-checkbox">
                        <p><?php _e('We noticed you dont have an account with us, would you like to sign up?', 'ukalikutz'); ?></>
                        <div class="form-group sign-up-checkbox-wrapper">
                            <label for="sign-up"><?php _e('Yes', 'ukalikutz'); ?> 
                            <input type="checkbox" id="sign-up" name="sign-up" required /></label>
                        </div>
                        
                    </div>
                    <div class="form-group" id="password-group">
                        <label for="password"><?php _e('Choose Password', 'ukalikutz'); ?></label>
                        <input type="password" id="password" name="password" required />
                        <span id="password-strength" style="color: red; display: none;"></span>

                        <label for="confirm-password"><?php _e('Confirm Password', 'ukalikutz'); ?></label>
                        <input type="password" id="confirm-password" name="confirm-password" required />
                        <span id="password-match" style="color: red; display: none;"></span>
                    </div>
                
                <?php }
            ?>

            <div class="form-group">
                <label for="phone"><?php _e('Phone Number', 'ukalikutz'); ?></label>
                <input type="tel" id="phone" name="phone" required />
            </div>

            <div class="form-group">
                <?php  $catalogs = UkalikutzHelpers::getSalonCatalog(); ?>
                <label for="catalog"><?php _e('Select Catalog', 'ukalikutz'); ?></label>
                <select id="catalog" name="catalog">
                    <?php
                    foreach ($catalogs as $catalog) {
                        echo "<option value='$catalog[id]'>" . esc_html($catalog["title"]) . "</option>";
                    }
                    ?>
                </select>
            </div>

            <div class="form-group">
                <label for="appointment_date"><?php _e('Select Date', 'ukalikutz'); ?></label>
                <input type="date" id="appointment_date" name="appointment_date" required />
            </div>

            <div class="form-group">
                <label for="appointment_time"><?php _e('Select Time', 'ukalikutz'); ?></label>
                <input type="time" id="appointment_time" name="appointment_time" required />
            </div>

            <button type="submit" class="btn-submit"><?php _e('Book Appointment', 'ukalikutz'); ?></button>
        </form>
        <?php
        return ob_get_clean();
    }
}
