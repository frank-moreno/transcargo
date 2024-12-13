<?php
/*
Plugin Name: Custom REST API
Description: Adds a custom REST API endpoint to fetch posts with filtering and pagination.
Version: 1.0
Author: Francisco Carracedo
*/

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'get_custom_posts',
        'permission_callback' => '__return_true', // Allow public access
    ));
});

function get_custom_posts($data) {
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => isset($data['per_page']) ? (int) $data['per_page'] : 10,
        'paged' => isset($data['page']) ? (int) $data['page'] : 1,
        'category_name' => isset($data['category']) ? sanitize_text_field($data['category']) : '',
        'author_name' => isset($data['author']) ? sanitize_text_field($data['author']) : '',
        'date_query' => array(
            array(
                'after' => isset($data['start_date']) ? sanitize_text_field($data['start_date']) : '',
                'before' => isset($data['end_date']) ? sanitize_text_field($data['end_date']) : '',
                'inclusive' => true,
            ),
        ),
    );

    $query = new WP_Query($args);

    if (!$query->have_posts()) {
        return new WP_REST_Response(array('posts' => [], 'current_page' => 1, 'total_pages' => 1), 200);
    }

    $posts = array();

    while ($query->have_posts()) {
        $query->the_post();
        $posts[] = array(
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'excerpt' => get_the_excerpt(),
            'link' => get_permalink(),
            'featured_image' => get_the_post_thumbnail_url(get_the_ID(), 'full'),
        );
    }

    wp_reset_postdata();

    return new WP_REST_Response(array(
        'posts' => $posts,
        'current_page' => $query->query_vars['paged'],
        'total_pages' => $query->max_num_pages,
    ), 200);
}