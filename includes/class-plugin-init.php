<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SpeedX_3D_Drive_Plugin_Init {
	public static function init() {
		add_action( 'plugins_loaded', array( __CLASS__, 'bootstrap' ) );
	}

	public static function bootstrap() {
		SpeedX_3D_Drive_Admin_Settings::init();
		SpeedX_3D_Drive_Shortcode::init();
	}
}
