# uKalikutz

**uKalikutz** is a salon management WordPress plugin designed to streamline booking, catalog management, and stylist coordination. It allows salon owners to create catalogues of services and manage appointments easily through a WordPress dashboard, offering a seamless experience for stylists and customers alike.

## Description

uKalikutz empowers salon owners to:
- Create and manage service catalogues (with images and stylist associations).
- Allow customers to book appointments directly from their WordPress site.
- Stylists can be assigned to specific catalogues for easy management.
- Upload and manage images for services or select existing images from the WordPress media library.
- Manage the salon booking process from the admin interface.

## License

This plugin is licensed under the same terms as WordPress — [GNU General Public License v2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html) or later.

## Installation

1. Download the plugin files and extract them to your `wp-content/plugins/` directory.
2. Alternatively, install the plugin via the WordPress plugin dashboard by uploading the plugin zip.
3. Activate the plugin through the "Plugins" menu in WordPress.
4. Navigate to the uKalikutz settings page to configure salon-specific options.

## Features

- **Custom Post Type for Salon Catalogue**: Create catalogues with descriptions, images, and assigned stylists.
- **Salon Appointment Booking**: Book appointments with specific stylists through a streamlined system.
- **Stylist Management**: Assign stylists to catalogues and manage stylist information.
- **Media Library Integration**: Upload new images or select existing ones for catalogues.
- **Multi-select Stylist Assignment**: Use a Select2-style multi-select interface to assign multiple stylists to a single catalogue.
- **Settings Management**: Adjust key settings like toggling the upload button for images, customizable through a backend options panel.
- **REST API Integration**: Includes endpoints to interact with catalogues and settings programmatically.
- **Success/Error Notifications**: Provides feedback on key actions (e.g., saving settings, creating catalogues).

## Usage

### Creating a Catalogue

1. Go to the "Catalogues" menu under uKalikutz.
2. Add a new catalogue by filling in the name, description, assigning stylists, and uploading/selecting an image.
3. Save the catalogue to make it available for appointment bookings.

### Settings Management

1. Navigate to the "uKalikutz Settings" page to configure options.
2. Enable or disable the upload button for catalogues.
3. Manage other settings relevant to your salon operations.

## Hooks & Filters

### Filters

- **`ukalikutz_show_manual_upload_button`**: Allows developers to hide or show the image upload button.
    ```php
    add_filter( 'ukalikutz_show_manual_upload_button', function( $show ) {
        return true; // Or false to hide the button.
    });
    ```

## REST API Endpoints

- `POST /ukalikutz/v1/catalogues`: Create a new catalogue with name, description, image, and stylist.
- `GET /ukalikutz/v1/catalogues`: Retrieve all existing catalogues.
- `GET /ukalikutz/v1/settings`: Retrieve current settings.
- `POST /ukalikutz/v1/settings`: Update plugin settings.

## Future Plans

- Advanced booking management (e.g., cancel/reschedule).
- Enhanced catalog features with service pricing and duration.
- Integration with payment gateways for seamless payments.
- Expanded REST API support for frontend interactions.

## Contributing

Feel free to fork this repository, open issues, or submit pull requests for new features or bug fixes. We welcome contributions from the community!

## Changelog

### 1.0.0
- Initial release with catalogue and stylist management, booking, and settings options.

## Support

If you run into any issues or have questions, please open a support ticket on the plugin repository page, or contact us directly via email.

## Credits

- Developer: [Your Name/Company]
- License: GPL v2 or later

