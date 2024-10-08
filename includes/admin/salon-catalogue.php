<?php
/**
 * Register Custom Taxonomy for Salon Catalogue.
 *
 * This taxonomy is used to categorize different salon services or catalogues.
 * It is hierarchical like categories and includes a wide range of labels for flexibility.
 *
 * @package uKalikutz
 */
function salon_catalogue() {

    // Define labels for the taxonomy.
    $labels = array(
        'name'                       => _x( 'Salon Catalogues', 'Taxonomy General Name', 'ukalikutz' ),
        'singular_name'              => _x( 'Salon Catalogue', 'Taxonomy Singular Name', 'ukalikutz' ),
        'menu_name'                  => __( 'Salon Catalogue', 'ukalikutz' ),
        'all_items'                  => __( 'All Salon Catalogues', 'ukalikutz' ),
        'parent_item'                => __( 'Parent Salon Catalogue', 'ukalikutz' ),
        'parent_item_colon'          => __( 'Parent Salon Catalogue:', 'ukalikutz' ),
        'new_item_name'              => __( 'New Salon Catalogue Name', 'ukalikutz' ),
        'add_new_item'               => __( 'Add New Salon Catalogue', 'ukalikutz' ),
        'edit_item'                  => __( 'Edit Salon Catalogue', 'ukalikutz' ),
        'update_item'                => __( 'Update Salon Catalogue', 'ukalikutz' ),
        'view_item'                  => __( 'View Salon Catalogue', 'ukalikutz' ),
        'separate_items_with_commas' => __( 'Separate catalogues with commas', 'ukalikutz' ),
        'add_or_remove_items'        => __( 'Add or remove catalogues', 'ukalikutz' ),
        'choose_from_most_used'      => __( 'Choose from the most used catalogues', 'ukalikutz' ),
        'popular_items'              => __( 'Popular Salon Catalogues', 'ukalikutz' ),
        'search_items'               => __( 'Search Salon Catalogues', 'ukalikutz' ),
        'not_found'                  => __( 'No Salon Catalogue Found', 'ukalikutz' ),
        'no_terms'                   => __( 'No Salon Catalogues', 'ukalikutz' ),
        'items_list'                 => __( 'Salon Catalogue list', 'ukalikutz' ),
        'items_list_navigation'      => __( 'Salon Catalogue list navigation', 'ukalikutz' ),
    );

    // Define arguments for the taxonomy.
    $args = array(
        'labels'            => $labels,          // Use the labels defined above.
        'hierarchical'      => true,             // Make this taxonomy hierarchical (like categories).
        'public'            => true,             // Make it accessible publicly.
        'show_ui'           => true,             // Display in WordPress admin UI.
        'show_admin_column' => true,             // Show in admin columns.
        'show_in_nav_menus' => true,             // Show in navigation menus.
        'show_tagcloud'     => true,             // Allow it to appear in tag clouds.
        'show_in_rest'      => true,             // Enable REST API support.
    );

    // Register the taxonomy with post type 'appointment'.
    register_taxonomy( 'salon_catalogue', array( 'appointment' ), $args );
}
add_action( 'init', 'salon_catalogue', 0 );


// Add thumbnail field to Salon Catalogue taxonomy.
function add_salon_catalogue_thumbnail_field() {
    ?>
    <div class="form-field">
        <label for="salon_catalogue_thumbnail"><?php _e( 'Thumbnail', 'ukalikutz' ); ?></label>
        <input type="text" name="salon_catalogue_thumbnail" id="salon_catalogue_thumbnail" value="" />
        <button class="upload_image_button button"><?php _e( 'Upload/Select Image', 'ukalikutz' ); ?></button>
    </div>
    <?php
}
add_action( 'salon_catalogue_add_form_fields', 'add_salon_catalogue_thumbnail_field', 10, 2 );

// Edit thumbnail field in edit form.
function edit_salon_catalogue_thumbnail_field( $term, $taxonomy ) {
    $thumbnail_id = get_term_meta( $term->term_id, 'salon_catalogue_thumbnail', true );
    $thumbnail_url = $thumbnail_id ? wp_get_attachment_url( $thumbnail_id ) : '';
    ?>
    <tr class="form-field">
        <th scope="row" valign="top">
            <label for="salon_catalogue_thumbnail"><?php _e( 'Thumbnail', 'ukalikutz' ); ?></label>
        </th>
        <td>
            <input type="text" name="salon_catalogue_thumbnail" id="salon_catalogue_thumbnail" value="<?php echo esc_attr( $thumbnail_url ); ?>" />
            <button class="upload_image_button button"><?php _e( 'Upload/Select Image', 'ukalikutz' ); ?></button>
        </td>
    </tr>
    <?php
}
add_action( 'salon_catalogue_edit_form_fields', 'edit_salon_catalogue_thumbnail_field', 10, 2 );

// Save the thumbnail field.
function save_salon_catalogue_thumbnail( $term_id ) {
    if ( isset( $_POST['salon_catalogue_thumbnail'] ) ) {
        $thumbnail_id = sanitize_text_field( $_POST['salon_catalogue_thumbnail'] );
        update_term_meta( $term_id, 'salon_catalogue_thumbnail', $thumbnail_id );
    }
}
add_action( 'created_salon_catalogue', 'save_salon_catalogue_thumbnail', 10, 2 );
add_action( 'edited_salon_catalogue', 'save_salon_catalogue_thumbnail', 10, 2 );

// Enqueue media uploader scripts.
function enqueue_media_uploader() {
    wp_enqueue_media();
    ?>
    <script type="text/javascript">
    jQuery(document).ready(function($){
        $('.upload_image_button').click(function(e) {
            e.preventDefault();
            var button = $(this);
            var custom_uploader = wp.media({
                title: '<?php _e('Select Image', 'ukalikutz'); ?>',
                button: { text: '<?php _e('Use this Image', 'ukalikutz'); ?>' },
                multiple: false
            }).on('select', function() {
                var attachment = custom_uploader.state().get('selection').first().toJSON();
                button.prev().val(attachment.url);
            }).open();
        });
    });
    </script>
    <?php
}
add_action( 'admin_footer', 'enqueue_media_uploader' );
