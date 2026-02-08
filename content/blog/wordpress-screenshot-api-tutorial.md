---
title: "Screenshot API for WordPress: Capture and Embed Website Images"
description: "Add screenshot functionality to WordPress. Capture external sites, generate link previews, and display website thumbnails in posts."
excerpt: "Automatically generate website screenshots and link previews in WordPress using a screenshot API."
author: "asad-ali"
publishedAt: "2025-10-12"
category: "tutorial"
tags: ["wordpress", "php", "integration", "shortcodes"]
keywords: ["wordpress screenshot", "link preview wordpress", "website thumbnail wordpress", "screenshot plugin"]
featured: false
readingTime: 6
---

WordPress powers millions of sites that need screenshot functionality—link previews, portfolio displays, documentation, and more. This guide shows how to integrate screenshot capture into WordPress.

## Basic PHP Integration

### Simple Function

```php
function screenshotly_capture($url, $options = []) {
    $api_key = get_option('screenshotly_api_key');
    
    $body = array_merge([
        'url' => $url,
        'device' => 'desktop',
        'format' => 'png',
    ], $options);
    
    $response = wp_remote_post('https://api.screenshotly.app/screenshot', [
        'headers' => [
            'Authorization' => 'Bearer ' . $api_key,
            'Content-Type' => 'application/json',
        ],
        'body' => json_encode($body),
        'timeout' => 60,
    ]);
    
    if (is_wp_error($response)) {
        return $response;
    }
    
    return wp_remote_retrieve_body($response);
}
```

## Creating a Shortcode

### Basic Screenshot Shortcode

```php
// [screenshot url="https://example.com"]
function screenshotly_shortcode($atts) {
    $atts = shortcode_atts([
        'url' => '',
        'width' => 1280,
        'height' => 800,
        'alt' => 'Website screenshot',
        'class' => 'screenshot-image',
    ], $atts);
    
    if (empty($atts['url'])) {
        return '<p>Error: URL required</p>';
    }
    
    // Check cache first
    $cache_key = 'screenshot_' . md5($atts['url'] . $atts['width']);
    $cached = get_transient($cache_key);
    
    if ($cached !== false) {
        return $cached;
    }
    
    // Capture screenshot
    $image_data = screenshotly_capture($atts['url'], [
        'viewport' => [
            'width' => (int)$atts['width'],
            'height' => (int)$atts['height'],
        ],
    ]);
    
    if (is_wp_error($image_data)) {
        return '<p>Screenshot unavailable</p>';
    }
    
    // Save to media library
    $attachment_id = screenshotly_save_image($image_data, $atts['url']);
    $image_url = wp_get_attachment_url($attachment_id);
    
    $html = sprintf(
        '<img src="%s" alt="%s" class="%s" loading="lazy" />',
        esc_url($image_url),
        esc_attr($atts['alt']),
        esc_attr($atts['class'])
    );
    
    // Cache for 24 hours
    set_transient($cache_key, $html, DAY_IN_SECONDS);
    
    return $html;
}
add_shortcode('screenshot', 'screenshotly_shortcode');

function screenshotly_save_image($image_data, $source_url) {
    $upload_dir = wp_upload_dir();
    $filename = 'screenshot-' . md5($source_url) . '.png';
    $file_path = $upload_dir['path'] . '/' . $filename;
    
    file_put_contents($file_path, $image_data);
    
    $attachment = [
        'post_mime_type' => 'image/png',
        'post_title' => 'Screenshot of ' . $source_url,
        'post_content' => '',
        'post_status' => 'inherit',
    ];
    
    $attachment_id = wp_insert_attachment($attachment, $file_path);
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    $metadata = wp_generate_attachment_metadata($attachment_id, $file_path);
    wp_update_attachment_metadata($attachment_id, $metadata);
    
    return $attachment_id;
}
```

## Link Preview Block

### Gutenberg Block

```php
function screenshotly_register_block() {
    register_block_type('screenshotly/link-preview', [
        'render_callback' => 'screenshotly_render_preview',
        'attributes' => [
            'url' => ['type' => 'string', 'default' => ''],
            'showTitle' => ['type' => 'boolean', 'default' => true],
            'showDescription' => ['type' => 'boolean', 'default' => true],
        ],
    ]);
}
add_action('init', 'screenshotly_register_block');

function screenshotly_render_preview($attributes) {
    $url = $attributes['url'];
    if (empty($url)) return '';
    
    // Get page metadata
    $meta = screenshotly_get_page_meta($url);
    
    // Get screenshot
    $image = screenshotly_get_cached_screenshot($url, [
        'viewport' => ['width' => 1200, 'height' => 630],
    ]);
    
    ob_start();
    ?>
    <div class="wp-block-screenshotly-preview">
        <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener">
            <div class="preview-image">
                <img src="<?php echo esc_url($image); ?>" alt="" />
            </div>
            <?php if ($attributes['showTitle'] && $meta['title']): ?>
            <h4 class="preview-title"><?php echo esc_html($meta['title']); ?></h4>
            <?php endif; ?>
            <?php if ($attributes['showDescription'] && $meta['description']): ?>
            <p class="preview-desc"><?php echo esc_html($meta['description']); ?></p>
            <?php endif; ?>
        </a>
    </div>
    <?php
    return ob_get_clean();
}
```

## Admin Settings Page

```php
function screenshotly_admin_menu() {
    add_options_page(
        'Screenshot Settings',
        'Screenshots',
        'manage_options',
        'screenshotly',
        'screenshotly_settings_page'
    );
}
add_action('admin_menu', 'screenshotly_admin_menu');

function screenshotly_settings_page() {
    if (isset($_POST['screenshotly_save'])) {
        update_option('screenshotly_api_key', sanitize_text_field($_POST['api_key']));
        echo '<div class="notice notice-success"><p>Settings saved.</p></div>';
    }
    
    $api_key = get_option('screenshotly_api_key', '');
    ?>
    <div class="wrap">
        <h1>Screenshot Settings</h1>
        <form method="post">
            <table class="form-table">
                <tr>
                    <th>API Key</th>
                    <td>
                        <input type="text" name="api_key" 
                               value="<?php echo esc_attr($api_key); ?>" 
                               class="regular-text" />
                        <p class="description">
                            Get your API key at <a href="https://screenshotly.app/sign-up" target="_blank">screenshotly.app</a>
                        </p>
                    </td>
                </tr>
            </table>
            <input type="submit" name="screenshotly_save" value="Save Settings" class="button button-primary" />
        </form>
    </div>
    <?php
}
```

## Automatic Link Previews

Replace links with rich previews:

```php
function screenshotly_auto_preview($content) {
    // Match standalone URLs
    $pattern = '/^(https?:\/\/[^\s<]+)$/m';
    
    return preg_replace_callback($pattern, function($matches) {
        $url = $matches[1];
        return do_shortcode('[screenshot url="' . $url . '"]');
    }, $content);
}
add_filter('the_content', 'screenshotly_auto_preview', 5);
```

## Caching Strategy

```php
function screenshotly_get_cached_screenshot($url, $options = []) {
    $cache_key = 'ss_' . md5($url . serialize($options));
    
    // Check transient cache
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return $cached;
    }
    
    // Capture new screenshot
    $image_data = screenshotly_capture($url, $options);
    
    // Save and get URL
    $attachment_id = screenshotly_save_image($image_data, $url);
    $image_url = wp_get_attachment_url($attachment_id);
    
    // Cache URL for 7 days
    set_transient($cache_key, $image_url, WEEK_IN_SECONDS);
    
    return $image_url;
}
```

## Best Practices for WordPress Screenshot Integration

### 1. Cache Aggressively with Transients

Screenshot API calls are the most expensive part of this integration. WordPress transients are the right caching layer because they handle expiry automatically and work with object caches (Redis, Memcached) when available.

The shortcode example above already uses transients with a 24-hour TTL. For content that changes rarely—like a portfolio page showing client websites—you can increase this to a week or even a month:

```php
// Cache for 30 days for rarely-changing content
set_transient($cache_key, $html, 30 * DAY_IN_SECONDS);
```

### 2. Background Processing for Bulk Captures

If you're capturing screenshots for dozens or hundreds of links, don't do it synchronously. Use WordPress's built-in `wp_schedule_single_event` to queue captures:

```php
function screenshotly_schedule_capture($url) {
    wp_schedule_single_event(time(), 'screenshotly_async_capture', [$url]);
}
add_action('screenshotly_async_capture', 'screenshotly_process_capture');

function screenshotly_process_capture($url) {
    $image_data = screenshotly_capture($url);
    if (!is_wp_error($image_data)) {
        screenshotly_save_image($image_data, $url);
    }
}
```

This prevents page loads from stalling while screenshots are being captured.

### 3. Security Hardening

When building a settings page that stores an API key, always use WordPress nonces and proper sanitization:

```php
// In your settings form
wp_nonce_field('screenshotly_save_settings', 'screenshotly_nonce');

// When processing
if (!wp_verify_nonce($_POST['screenshotly_nonce'], 'screenshotly_save_settings')) {
    wp_die('Security check failed');
}
```

Also consider storing the API key as an option that's excluded from exports, or using a constant defined in `wp-config.php` for added security:

```php
// In wp-config.php
define('SCREENSHOTLY_API_KEY', 'your-api-key-here');

// In your plugin
$api_key = defined('SCREENSHOTLY_API_KEY') 
    ? SCREENSHOTLY_API_KEY 
    : get_option('screenshotly_api_key');
```

### 4. Responsive Images

Generate multiple sizes of each screenshot so WordPress can serve the appropriate one via `srcset`:

```php
function screenshotly_responsive_screenshot($url) {
    $sizes = [
        ['width' => 400, 'suffix' => 'small'],
        ['width' => 800, 'suffix' => 'medium'],
        ['width' => 1200, 'suffix' => 'large'],
    ];
    
    $srcset_parts = [];
    foreach ($sizes as $size) {
        $image_url = screenshotly_get_cached_screenshot($url, [
            'viewport' => ['width' => $size['width'], 'height' => 600],
        ]);
        $srcset_parts[] = $image_url . ' ' . $size['width'] . 'w';
    }
    
    return sprintf(
        '<img srcset="%s" sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px" alt="Screenshot" loading="lazy" />',
        implode(', ', $srcset_parts)
    );
}
```

### 5. Lazy Loading and Performance

Always add `loading="lazy"` to screenshot images so they don't block page rendering. For above-the-fold screenshots, omit the lazy attribute and consider using `fetchpriority="high"` instead.

For sites with many screenshots per page, consider loading them only when visible using Intersection Observer via a small JavaScript snippet.

## WP-CLI Support

Add a WP-CLI command to bulk-refresh screenshots from the command line:

```php
if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('screenshot refresh', function($args) {
        global $wpdb;
        $transients = $wpdb->get_col(
            "SELECT option_name FROM {$wpdb->options} 
             WHERE option_name LIKE '_transient_ss_%'"
        );
        
        WP_CLI::log("Found " . count($transients) . " cached screenshots.");
        
        foreach ($transients as $transient) {
            $key = str_replace('_transient_', '', $transient);
            delete_transient($key);
        }
        
        WP_CLI::success("Cleared all screenshot caches.");
    });
}
```

Usage: `wp screenshot refresh` clears all cached screenshots so they'll be re-captured on next view.

## FAQ

**Will this slow down my WordPress site?** Not if you cache properly. The first page load captures the screenshot, but subsequent loads serve the cached version instantly. With transient caching, the API is only called when the cache expires.

**Does this work with WordPress multisite?** Yes. Each site in a multisite network maintains its own transient cache. You can use `get_site_option` for the API key to share it across sites.

**Can I use this with WooCommerce product pages?** Absolutely. Use the shortcode in product descriptions to show screenshots of external resources, documentation, or competitor products. You can also hook into `woocommerce_after_single_product_summary` to add automatic screenshots.

**What about sites behind authentication?** Use the `cookies` parameter in your API call to pass session cookies for authenticated captures. This is useful for capturing screenshots of staging sites or admin panels.

**How do I handle API errors in production?** Always provide a fallback. Use a placeholder image when the API is unreachable, and log errors for monitoring:

```php
if (is_wp_error($response)) {
    error_log('Screenshot API error: ' . $response->get_error_message());
    return '<img src="' . plugins_url('fallback.png', __FILE__) . '" alt="Preview unavailable" />';
}
```

---

**Ready to add automated screenshots to your WordPress site?**

[Get your free API key →](/sign-up) — 100 free screenshots to get started.

See also:
- [PHP Screenshot API Tutorial →](/blog/php-screenshot-api-tutorial)
- [Link Preview Generation Guide →](/blog/link-preview-generation-guide)
- [Screenshot Caching Strategies →](/blog/screenshot-caching-strategies-guide)

