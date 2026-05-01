<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class SpeedX_3D_Drive_Shortcode {
	public static function init() {
		add_shortcode( 'speedx_3d_drive', array( __CLASS__, 'render_shortcode' ) );
	}
	public static function render_shortcode() {
		$options = SpeedX_3D_Drive_Admin_Settings::get_options();
		self::enqueue_assets( $options );
		ob_start();
		?>
		<div id="speedx-3d-drive" class="speedx-drive-root">
			<div class="speedx-loading">
				<div class="speedx-logo">SPEEDX</div><h2><?php echo esc_html( $options['loading_text'] ); ?></h2><p>Explore our services in an interactive 3D world.</p>
				<div class="speedx-progress"><span id="speedx-progress-bar"></span></div><div id="speedx-progress-text">0%</div>
				<button id="speedx-start-btn"><?php echo esc_html( $options['button_text'] ); ?></button>
			</div>
			<canvas id="speedx-canvas"></canvas>
			<div class="speedx-hud"><button id="speedx-mute" aria-label="Toggle audio">🔊</button><div id="speedx-popup" class="speedx-popup" hidden><h3></h3><p></p><a href="#" class="speedx-cta">Explore Service</a></div></div>
			<div id="speedx-mobile-controls" class="speedx-mobile-controls"></div>
			<div id="speedx-fallback" class="speedx-fallback" hidden>Your browser does not support the 3D experience.</div>
		</div>
		<?php
		return ob_get_clean();
	}
	private static function enqueue_assets( $options ) {
		wp_enqueue_style( 'speedx-frontend', SPEEDX_3D_DRIVE_URL . 'assets/css/frontend.css', array(), SPEEDX_3D_DRIVE_VERSION );
		wp_enqueue_script( 'threejs', 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.min.js', array(), '0.164.1', true );
		wp_enqueue_script( 'gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), '3.12.5', true );
		wp_enqueue_script( 'rapier', 'https://cdn.jsdelivr.net/npm/@dimforge/rapier3d-compat@0.12.0/rapier.min.js', array(), '0.12.0', true );
		foreach ( array( 'physics', 'controls', 'ui', 'world', 'frontend' ) as $script ) {
			wp_enqueue_script( 'speedx-' . $script, SPEEDX_3D_DRIVE_URL . 'assets/js/' . $script . '.js', array( 'threejs', 'gsap', 'rapier' ), SPEEDX_3D_DRIVE_VERSION, true );
		}
		wp_localize_script(
			'speedx-frontend',
			'SpeedX3DData',
			array(
				'options' => $options,
			)
		);
	}
}
