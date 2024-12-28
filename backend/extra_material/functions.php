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


function custom_breadcrumb_and_title_endpoint($data) {
    $slug = $data['slug'];
    $parts = explode('/', $slug);
    $last_part = end($parts); // Obtener el último segmento del slug

    // Buscar la publicación o página
    $query = new WP_Query([
        'name' => $last_part,
        'post_type' => ['post', 'page'], // Agrega más tipos si es necesario
        'posts_per_page' => 1,
    ]);

    if (!$query->have_posts()) {
        return new WP_Error('no_post', 'Página no encontrada', ['status' => 404]);
    }

    $post = $query->posts[0];

    // Breadcrumbs
    $breadcrumbs = [];

    // Nivel raíz (Home)
    $breadcrumbs[] = [
        'title' => 'Home',
        'url' => wp_make_link_relative(home_url()),
    ];

    // Para páginas (jerarquía de padres)
    if ($post->post_type === 'page') {
        $current_post = $post;
        while ($current_post->post_parent) {
            $parent = get_post($current_post->post_parent);
            $breadcrumbs[] = [
                'title' => $parent->post_title,
                'url' => wp_make_link_relative(get_permalink($parent)),
            ];
            $current_post = $parent;
        }
    }

    // Para publicaciones (categorías jerárquicas)
    if ($post->post_type === 'post') {
        $categories = get_the_category($post->ID);
        if (!empty($categories)) {
            // Obtener la categoría principal y sus padres
            $primary_category = $categories[0];
            $category_ancestors = get_ancestors($primary_category->term_id, 'category');
            $category_ancestors = array_reverse($category_ancestors);

            foreach ($category_ancestors as $ancestor_id) {
                $ancestor = get_category($ancestor_id);
                $breadcrumbs[] = [
                    'title' => $ancestor->name,
                    'url' => wp_make_link_relative(get_category_link($ancestor)),
                ];
            }

            // Añadir la categoría principal al breadcrumb
            $breadcrumbs[] = [
                'title' => $primary_category->name,
                'url' => wp_make_link_relative(get_category_link($primary_category)),
            ];
        }
    }

    // Agregar la página o publicación actual
    $breadcrumbs[] = [
        'title' => $post->post_title,
        'url' => wp_make_link_relative(get_permalink($post)),
    ];

    return [
        'title' => $post->post_title,
        'breadcrumbs' => $breadcrumbs,
    ];
}

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/page-data/(?P<slug>[a-zA-Z0-9-/]+)', array(
        'methods' => 'GET',
        'callback' => 'custom_breadcrumb_and_title_endpoint',
    ));
});