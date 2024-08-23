<?php
/**
 * Plugin Name: uKaliKutz
 * Plugin URI: https://github.com/wptrainingteam/ukalikutz
 * Description: A companion plugin for a WordPress Developer Blog article.
 * Version: 1.0.1
 * Requires at least: 6.1
 * Requires PHP: 7.4
 * Author: Róbert Mészáros
 * Author URI: https://www.meszarosrob.com/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: ukalikutz
 *
 * @package ukalikutz
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the options page for uKaliKutz salon management.
 */
function ukalikutz_register_admin_menu() {
	add_menu_page(
		__( 'uKaliKutz', 'ukalikutz' ),
		__( 'uKaliKutz', 'ukalikutz' ),
		'manage_options',
		'ukalikutz',
		'ukalikutz_admin_pages',
		'dashicons-scissors',
		20
	);
	
}

add_action( 'admin_menu', 'ukalikutz_register_admin_menu' );

/**
 * Outputs the root element for the main React component.
 */
function ukalikutz_admin_pages() {
	printf(
		'<div class="wrap" id="ukalikutz-settings">%s</div>',
		esc_html__( 'Loading…', 'ukalikutz' )
	);
}

/**
 * Enqueues the necessary styles and scripts only on the admin page.
 *
 * @param string $admin_page The current admin page.
 */
function ukalikutz_enqueue_style_script( $admin_page ) {
	if ( 'toplevel_page_ukalikutz' !== $admin_page ) {
		return;
	}

	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		'ukalikutz-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		array(
			'in_footer' => true,
		)
	);

	wp_enqueue_style(
		'ukalikutz-style',
		plugins_url( 'build/index.css', __FILE__ ),
		array_filter(
			$asset['dependencies'],
			function ( $style ) {
				return wp_style_is( $style, 'registered' );
			}
		),
		$asset['version']
	);
}

add_action( 'admin_enqueue_scripts', 'ukalikutz_enqueue_style_script' );

/**
 * Registers the salon booking settings.
 */
function ukalikutz_register_settings() {
	$default = array(
		'message' => __( 'Welcome to uKaliKutz!', 'ukalikutz' ),
		'display' => true,
		'size'    => 'medium',
	);
	$schema  = array(
		'type'       => 'object',
		'properties' => array(
			'message' => array(
				'type' => 'string',
			),
			'display' => array(
				'type' => 'boolean',
			),
			'size'    => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large',
					'x-large',
				),
			),
		),
	);

	register_setting(
		'options',
		'ukalikutz_salon_settings',
		array(
			'type'         => 'object',
			'default'      => $default,
			'show_in_rest' => array(
				'schema' => $schema,
			),
		)
	);
}

add_action( 'init', 'ukalikutz_register_settings' );

/**
 * Displays the salon announcement bar on the front-end.
 */
function ukalikutz_front_page_bar() {
	$options = get_option( 'ukalikutz_salon_settings' );

	if ( ! $options['display'] ) {
		return;
	}

	$css = WP_Style_Engine::compile_css(
		array(
			'background' => 'var(--wp--preset--color--vivid-purple, #9b51e0)',
			'color'      => 'var(--wp--preset--color--white, #ffffff)',
			'padding'    => 'var(--wp--preset--spacing--20, 1.5rem)',
			'font-size'  => $options['size'],
		),
		''
	);

	printf(
		'<div style="%s">%s</div>',
		esc_attr( $css ),
		esc_html( $options['message'] )
	);
}

add_action( 'wp_body_open', 'ukalikutz_front_page_bar' );

require_once plugin_dir_path( __FILE__ ) . 'includes/user-roles.php';

// Custom Endpoints
require_once plugin_dir_path( __FILE__ ) . 'includes/endpoints/stylelists-endpoint.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/endpoints/appointments-endpoint.php';


// CPTS
require_once plugin_dir_path(__FILE__) . 'includes/admin/appointments-cpt.php';