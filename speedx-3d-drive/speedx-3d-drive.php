<?php
/**
 * Plugin Name: SpeedX 3D Drive Experience
 * Description: Premium interactive 3D driving world experience for SpeedX Marketing.
 * Version: 1.0.0
 * Author: SpeedX Marketing
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Text Domain: speedx-3d-drive
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SPEEDX_3D_DRIVE_VERSION', '1.0.0' );
define( 'SPEEDX_3D_DRIVE_FILE', __FILE__ );
define( 'SPEEDX_3D_DRIVE_PATH', plugin_dir_path( __FILE__ ) );
define( 'SPEEDX_3D_DRIVE_URL', plugin_dir_url( __FILE__ ) );

require_once SPEEDX_3D_DRIVE_PATH . 'includes/class-plugin-init.php';
require_once SPEEDX_3D_DRIVE_PATH . 'includes/class-admin-settings.php';
require_once SPEEDX_3D_DRIVE_PATH . 'includes/class-shortcode.php';

SpeedX_3D_Drive_Plugin_Init::init();
