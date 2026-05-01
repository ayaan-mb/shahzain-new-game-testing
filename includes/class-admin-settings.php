<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SpeedX_3D_Drive_Admin_Settings {
	const OPTION_KEY = 'speedx_3d_drive_options';

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'admin_menu' ) );
		add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_admin_assets' ) );
	}

	public static function defaults() {
		return array(
			'car_color' => '#ffcd0e',
			'world_bg_color' => '#07070a',
			'service_titles' => array( 'Web Design', 'SEO', 'Branding', 'Automation', 'Contact' ),
			'service_descriptions' => array(
				'We build high-converting websites optimized for growth.',
				'Rank higher with technical SEO, content strategy, and authority growth.',
				'Build a memorable identity with premium visual storytelling.',
				'Scale faster with automation systems and AI-enhanced workflows.',
				'Let\'s plan your growth roadmap and launch your next project.',
			),
			'enable_sounds' => 1,
			'enable_particles' => 1,
			'loading_text' => 'Drive Through SpeedX Marketing',
			'button_text' => 'Start Experience',
			'world_quality' => 'high',
			'enable_mobile_controls' => 1,
		);
	}

	public static function get_options() {
		return wp_parse_args( get_option( self::OPTION_KEY, array() ), self::defaults() );
	}
	public static function admin_menu() {
		add_menu_page( 'SpeedX 3D Drive', 'SpeedX 3D Drive', 'manage_options', 'speedx-3d-drive', array( __CLASS__, 'render_page' ), 'dashicons-games', 58 );
	}
	public static function register_settings() {
		register_setting( 'speedx_3d_drive_group', self::OPTION_KEY, array( __CLASS__, 'sanitize' ) );
	}
	public static function sanitize( $input ) {
		$defaults = self::defaults();
		$input = is_array( $input ) ? $input : array();
		$out = $defaults;
		$out['car_color'] = sanitize_hex_color( $input['car_color'] ?? $defaults['car_color'] );
		$out['world_bg_color'] = sanitize_hex_color( $input['world_bg_color'] ?? $defaults['world_bg_color'] );
		$out['loading_text'] = sanitize_text_field( $input['loading_text'] ?? $defaults['loading_text'] );
		$out['button_text'] = sanitize_text_field( $input['button_text'] ?? $defaults['button_text'] );
		$out['world_quality'] = in_array( $input['world_quality'] ?? '', array( 'low', 'medium', 'high' ), true ) ? $input['world_quality'] : 'high';
		$out['enable_sounds'] = ! empty( $input['enable_sounds'] ) ? 1 : 0;
		$out['enable_particles'] = ! empty( $input['enable_particles'] ) ? 1 : 0;
		$out['enable_mobile_controls'] = ! empty( $input['enable_mobile_controls'] ) ? 1 : 0;
		for ( $i = 0; $i < 5; $i++ ) {
			$out['service_titles'][ $i ] = sanitize_text_field( $input['service_titles'][ $i ] ?? $defaults['service_titles'][ $i ] );
			$out['service_descriptions'][ $i ] = sanitize_textarea_field( $input['service_descriptions'][ $i ] ?? $defaults['service_descriptions'][ $i ] );
		}
		return $out;
	}
	public static function enqueue_admin_assets( $hook ) {
		if ( 'toplevel_page_speedx-3d-drive' !== $hook ) { return; }
		wp_enqueue_style( 'speedx-admin', SPEEDX_3D_DRIVE_URL . 'assets/css/admin.css', array(), SPEEDX_3D_DRIVE_VERSION );
	}
	public static function render_page() {
		$options = self::get_options();
		?>
		<div class="wrap speedx-admin-wrap"><h1>SpeedX 3D Drive Settings</h1><form method="post" action="options.php"><?php settings_fields( 'speedx_3d_drive_group' ); ?>
		<table class="form-table"><tbody>
		<tr><th>Car color</th><td><input type="color" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[car_color]" value="<?php echo esc_attr( $options['car_color'] ); ?>"></td></tr>
		<tr><th>World background color</th><td><input type="color" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[world_bg_color]" value="<?php echo esc_attr( $options['world_bg_color'] ); ?>"></td></tr>
		<tr><th>Loading screen text</th><td><input class="regular-text" type="text" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[loading_text]" value="<?php echo esc_attr( $options['loading_text'] ); ?>"></td></tr>
		<tr><th>Button text</th><td><input class="regular-text" type="text" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[button_text]" value="<?php echo esc_attr( $options['button_text'] ); ?>"></td></tr>
		<tr><th>World quality</th><td><select name="<?php echo esc_attr( self::OPTION_KEY ); ?>[world_quality]"><option value="low" <?php selected( $options['world_quality'], 'low' ); ?>>Low</option><option value="medium" <?php selected( $options['world_quality'], 'medium' ); ?>>Medium</option><option value="high" <?php selected( $options['world_quality'], 'high' ); ?>>High</option></select></td></tr>
		<?php for ( $i = 0; $i < 5; $i++ ) : ?><tr><th>Service <?php echo esc_html( $i + 1 ); ?> title</th><td><input class="regular-text" type="text" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[service_titles][<?php echo esc_attr( $i ); ?>]" value="<?php echo esc_attr( $options['service_titles'][ $i ] ); ?>"></td></tr>
		<tr><th>Service <?php echo esc_html( $i + 1 ); ?> description</th><td><textarea class="large-text" rows="2" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[service_descriptions][<?php echo esc_attr( $i ); ?>]"><?php echo esc_textarea( $options['service_descriptions'][ $i ] ); ?></textarea></td></tr><?php endfor; ?>
		<tr><th>Enable sounds</th><td><label><input type="checkbox" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[enable_sounds]" value="1" <?php checked( $options['enable_sounds'], 1 ); ?>> Yes</label></td></tr>
		<tr><th>Enable particles</th><td><label><input type="checkbox" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[enable_particles]" value="1" <?php checked( $options['enable_particles'], 1 ); ?>> Yes</label></td></tr>
		<tr><th>Mobile controls toggle</th><td><label><input type="checkbox" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[enable_mobile_controls]" value="1" <?php checked( $options['enable_mobile_controls'], 1 ); ?>> Yes</label></td></tr>
		</tbody></table><?php submit_button(); ?></form></div><?php
	}
}
