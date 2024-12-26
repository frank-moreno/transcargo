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


// include( get_template_directory() . '/templates/shortcodes/work_projects.php' );



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


function theme_register_menus() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'textdomain'),
        'footer' => __('Footer Menu', 'textdomain'),
    ));
}
add_action('after_setup_theme', 'theme_register_menus');

@ini_set( 'upload_max_size' , '256M' ); 
@ini_set( 'post_max_size', '256M'); 
@ini_set( 'max_execution_time', '300' ); 


function register_footer_cpt() {
    register_post_type('footer_content', array(
        'labels' => array(
            'name' => __('Footer Content'),
            'singular_name' => __('Footer Content')
        ),
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'supports' => array('title', 'editor'),
    ));
}
add_action('init', 'register_footer_cpt');