<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function theme_assets() {
    
    // load styles, bootstrap main file
    wp_enqueue_style( 'stylesheet-bootstrap523', get_template_directory_uri() . '/assets/bootstrap-5.2.3-dist/css/bootstrap.min.css' );
    // load styles, swiper main file
    wp_enqueue_style( 'stylesheet-swiper', 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css' );
    // main theme styles
    wp_enqueue_style( 'styles', get_stylesheet_directory_uri() .'/dist/scss/theme-main.css', [], '', 'all' ); 

    // load scripts, js bootstrap main file
    wp_enqueue_script( 'script-bootstrap523', get_template_directory_uri() . '/assets/bootstrap-5.2.3-dist/js/bootstrap.min.js', '', '', true ); 
    // load scripts, js swiper main file
    wp_enqueue_script( 'script-swiper', 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js', '', '', true );
    // main theme scripts
    wp_enqueue_script( 'theme-js', get_stylesheet_directory_uri() .'/dist/js/theme-main.js', ['jquery'], '', 'all' );

    }

add_action( 'wp_enqueue_scripts', 'theme_assets' );


include( get_template_directory() . '/templates/shortcodes/work_projects.php' );

include( get_template_directory() . '/templates/shortcodes/work_projects_es.php' );

include( get_template_directory() . '/templates/shortcodes/work_projects_cards.php' );

include( get_template_directory() . '/templates/shortcodes/work_projects_cards_es.php' );

include( get_template_directory() . '/templates/shortcodes/post_projects.php' );

include( get_template_directory() . '/templates/shortcodes/post_projects_es.php' );

include( get_template_directory() . '/templates/shortcodes/post_cards.php' );

include( get_template_directory() . '/templates/shortcodes/post_cards_es.php' );


add_action('wp_head', 'coockie_policy_banner');
function coockie_policy_banner(){
?>
    <script src="https://cdn.websitepolicies.io/lib/cconsent/cconsent.min.js" defer></script><script>window.addEventListener("load",function(){window.wpcb.init({"border":"thin","corners":"small","colors":{"popup":{"background":"#ffe4e1","text":"#000000","border":"#c25e5e"},"button":{"background":"#c25e5e","text":"#ffffff"}},"position":"bottom","content":{"href":"https://frank-moreno.com/cookie-policy/"}})});</script>
<?php
};


//function to add favicon to website
function add_favicon() {
    $favicon_url = get_template_directory_uri() . '/assets/images/favicon.ico';
    echo '<link rel="shortcut icon" href="' . $favicon_url . '" />';
}
add_action( 'wp_head', 'add_favicon' );




add_action('wp_footer', 'your_function_name_2');
function your_function_name_2(){
?>
<!-- PASTE FOOTER CODE HERE -->
<?php
};


/**
 * Polylang Shortcode - https://wordpress.org/plugins/polylang/
 * Add this code in your functions.php
 * Put shortcode [polylang_langswitcher] to post/page for display flags
 *
 * @return string
 */
function custom_polylang_langswitcher() {
	$output = '';
	if ( function_exists( 'pll_the_languages' ) ) {
		$args   = [
			'show_flags' => 1,
			'show_names' => 0,
			'echo'       => 0,
		];
		$output = '<ul class="polylang_langswitcher">'.pll_the_languages( $args ). '</ul>';
	}

	return $output;
}

add_shortcode( 'polylang_langswitcher', 'custom_polylang_langswitcher' );

function theme_register_menus() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'textdomain'),
        'footer' => __('Footer Menu', 'textdomain'),
    ));
}
add_action('after_setup_theme', 'theme_register_menus');