---
title: "PHP Screenshot API: Complete Integration Guide"
description: "Learn how to integrate screenshot API functionality into PHP applications. Covers curl, Guzzle, and Laravel examples with full code samples."
excerpt: "A practical guide to adding screenshot functionality to PHP apps. From basic curl to Laravel service classes with error handling."
author: "asad-ali"
publishedAt: "2025-12-15"
category: "tutorial"
tags: ["php", "tutorial", "api", "integration", "laravel"]
keywords: ["php screenshot api", "php screenshot tutorial", "laravel screenshot", "guzzle screenshot", "php website screenshot"]
featured: false
readingTime: 8
---

PHP powers a significant portion of the web, from WordPress to Laravel applications. Integrating screenshot capabilities into your PHP application is straightforward with the right approach.

This guide covers multiple PHP implementations, from basic curl to elegant Laravel service classes.

## Quick Start: curl

The simplest approach uses PHP's built-in curl:

```php
<?php

function captureScreenshot($url) {
    $apiKey = getenv('SCREENSHOTLY_API_KEY');
    
    $ch = curl_init('https://api.screenshotly.app/screenshot');
    
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode([
            'url' => $url,
            'device' => 'desktop',
            'format' => 'png',
        ]),
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Screenshot failed: HTTP $httpCode");
    }
    
    return $response;
}

// Usage
$screenshot = captureScreenshot('https://example.com');
file_put_contents('screenshot.png', $screenshot);
```

## Using Guzzle HTTP Client

Guzzle provides a more elegant HTTP interface:

```bash
composer require guzzlehttp/guzzle
```

```php
<?php

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class ScreenshotService
{
    private Client $client;
    private string $apiKey;
    
    public function __construct()
    {
        $this->apiKey = getenv('SCREENSHOTLY_API_KEY');
        $this->client = new Client([
            'base_uri' => 'https://api.screenshotly.app/',
            'timeout' => 60.0,
        ]);
    }
    
    public function capture(string $url, array $options = []): string
    {
        try {
            $response = $this->client->post('screenshot', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                ],
                'json' => array_merge([
                    'url' => $url,
                    'device' => 'desktop',
                    'format' => 'png',
                ], $options),
            ]);
            
            return $response->getBody()->getContents();
        } catch (RequestException $e) {
            throw new Exception(
                'Screenshot capture failed: ' . $e->getMessage()
            );
        }
    }
    
    public function captureFullPage(string $url): string
    {
        return $this->capture($url, ['fullPage' => true]);
    }
    
    public function captureMobile(string $url): string
    {
        return $this->capture($url, ['device' => 'mobile']);
    }
}

// Usage
$service = new ScreenshotService();
$screenshot = $service->capture('https://example.com');
file_put_contents('screenshot.png', $screenshot);
```

## Laravel Integration

### Service Provider Setup

Create a comprehensive Laravel service:

```php
<?php
// app/Services/ScreenshotService.php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class ScreenshotService
{
    private string $apiUrl = 'https://api.screenshotly.app/screenshot';
    private string $apiKey;
    
    public function __construct()
    {
        $this->apiKey = config('services.screenshotly.key');
    }
    
    public function capture(string $url, array $options = []): array
    {
        $response = Http::withToken($this->apiKey)
            ->timeout(60)
            ->post($this->apiUrl, array_merge([
                'url' => $url,
                'device' => $options['device'] ?? 'desktop',
                'format' => $options['format'] ?? 'png',
            ], $options));
        
        if (!$response->successful()) {
            throw new \Exception(
                'Screenshot failed: ' . $response->body()
            );
        }
        
        return [
            'content' => $response->body(),
            'contentType' => $response->header('Content-Type'),
        ];
    }
    
    public function captureAndStore(
        string $url, 
        string $path = null,
        string $disk = 'public'
    ): string {
        $result = $this->capture($url);
        
        $path = $path ?? 'screenshots/' . uniqid() . '.png';
        
        Storage::disk($disk)->put($path, $result['content']);
        
        return Storage::disk($disk)->url($path);
    }
    
    public function captureWithCache(
        string $url, 
        int $ttlMinutes = 60
    ): string {
        $cacheKey = 'screenshot:' . md5($url);
        
        return Cache::remember($cacheKey, $ttlMinutes * 60, function () use ($url) {
            return $this->captureAndStore($url);
        });
    }
}
```

### Configuration

```php
<?php
// config/services.php

return [
    // ... other services
    
    'screenshotly' => [
        'key' => env('SCREENSHOTLY_API_KEY'),
    ],
];
```

```env
# .env
SCREENSHOTLY_API_KEY=your_api_key_here
```

### Service Provider Registration

```php
<?php
// app/Providers/AppServiceProvider.php

use App\Services\ScreenshotService;

public function register()
{
    $this->app->singleton(ScreenshotService::class, function ($app) {
        return new ScreenshotService();
    });
}
```

### Usage in Controllers

```php
<?php
// app/Http/Controllers/ScreenshotController.php

namespace App\Http\Controllers;

use App\Services\ScreenshotService;
use Illuminate\Http\Request;

class ScreenshotController extends Controller
{
    private ScreenshotService $screenshots;
    
    public function __construct(ScreenshotService $screenshots)
    {
        $this->screenshots = $screenshots;
    }
    
    public function capture(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
            'device' => 'in:desktop,mobile,tablet',
        ]);
        
        try {
            $imageUrl = $this->screenshots->captureAndStore(
                $request->url,
                null,
                's3'
            );
            
            return response()->json([
                'success' => true,
                'url' => $imageUrl,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function preview(Request $request)
    {
        $request->validate(['url' => 'required|url']);
        
        $result = $this->screenshots->capture($request->url);
        
        return response($result['content'])
            ->header('Content-Type', $result['contentType']);
    }
}
```

### Routes

```php
<?php
// routes/api.php

use App\Http\Controllers\ScreenshotController;

Route::post('/screenshots/capture', [ScreenshotController::class, 'capture']);
Route::get('/screenshots/preview', [ScreenshotController::class, 'preview']);
```

## WordPress Integration

### Custom Plugin

```php
<?php
/**
 * Plugin Name: Screenshotly Integration
 * Description: Screenshot capture for WordPress
 */

class ScreenshotlyPlugin {
    private $api_key;
    private $api_url = 'https://api.screenshotly.app/screenshot';
    
    public function __construct() {
        $this->api_key = get_option('screenshotly_api_key');
        add_action('admin_menu', [$this, 'add_settings_page']);
        add_action('wp_ajax_capture_screenshot', [$this, 'ajax_capture']);
    }
    
    public function capture($url, $options = []) {
        $response = wp_remote_post($this->api_url, [
            'timeout' => 60,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->api_key,
                'Content-Type' => 'application/json',
            ],
            'body' => json_encode(array_merge([
                'url' => $url,
                'device' => 'desktop',
                'format' => 'png',
            ], $options)),
        ]);
        
        if (is_wp_error($response)) {
            return $response;
        }
        
        $code = wp_remote_retrieve_response_code($response);
        if ($code !== 200) {
            return new WP_Error('screenshot_failed', 'HTTP ' . $code);
        }
        
        return wp_remote_retrieve_body($response);
    }
    
    public function ajax_capture() {
        check_ajax_referer('screenshotly_nonce');
        
        $url = sanitize_url($_POST['url']);
        
        $screenshot = $this->capture($url);
        
        if (is_wp_error($screenshot)) {
            wp_send_json_error($screenshot->get_error_message());
        }
        
        // Upload to media library
        $upload = wp_upload_bits(
            'screenshot-' . time() . '.png',
            null,
            $screenshot
        );
        
        if ($upload['error']) {
            wp_send_json_error($upload['error']);
        }
        
        wp_send_json_success(['url' => $upload['url']]);
    }
    
    public function add_settings_page() {
        add_options_page(
            'Screenshotly Settings',
            'Screenshotly',
            'manage_options',
            'screenshotly',
            [$this, 'render_settings_page']
        );
    }
    
    public function render_settings_page() {
        if ($_POST['screenshotly_api_key'] ?? false) {
            update_option('screenshotly_api_key', 
                sanitize_text_field($_POST['screenshotly_api_key'])
            );
        }
        ?>
        <div class="wrap">
            <h1>Screenshotly Settings</h1>
            <form method="post">
                <table class="form-table">
                    <tr>
                        <th>API Key</th>
                        <td>
                            <input type="text" name="screenshotly_api_key" 
                                value="<?= esc_attr(get_option('screenshotly_api_key')); ?>" 
                                class="regular-text">
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

new ScreenshotlyPlugin();
```

## Async Processing with Queues

For high-volume applications, use Laravel queues:

```php
<?php
// app/Jobs/CaptureScreenshot.php

namespace App\Jobs;

use App\Services\ScreenshotService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class CaptureScreenshot implements ShouldQueue
{
    use Queueable;
    
    public function __construct(
        public string $url,
        public string $storagePath,
        public ?string $callbackUrl = null
    ) {}
    
    public function handle(ScreenshotService $service): void
    {
        $imageUrl = $service->captureAndStore(
            $this->url, 
            $this->storagePath
        );
        
        if ($this->callbackUrl) {
            Http::post($this->callbackUrl, [
                'url' => $this->url,
                'imageUrl' => $imageUrl,
                'status' => 'completed',
            ]);
        }
    }
    
    public function failed(\Throwable $e): void
    {
        if ($this->callbackUrl) {
            Http::post($this->callbackUrl, [
                'url' => $this->url,
                'status' => 'failed',
                'error' => $e->getMessage(),
            ]);
        }
    }
}

// Usage
CaptureScreenshot::dispatch(
    'https://example.com',
    'screenshots/example.png',
    'https://myapp.com/webhook/screenshot-complete'
)->onQueue('screenshots');
```

## Error Handling

Comprehensive error handling for production:

```php
<?php

class ScreenshotException extends Exception
{
    public const NETWORK_ERROR = 1;
    public const INVALID_URL = 2;
    public const RATE_LIMITED = 3;
    public const API_ERROR = 4;
}

class ScreenshotService
{
    public function capture(string $url, array $options = []): string
    {
        // Validate URL
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            throw new ScreenshotException(
                'Invalid URL provided',
                ScreenshotException::INVALID_URL
            );
        }
        
        try {
            $response = Http::withToken($this->apiKey)
                ->timeout(60)
                ->retry(3, 1000)  // Retry 3 times with 1s delay
                ->post($this->apiUrl, $this->buildPayload($url, $options));
            
            if ($response->status() === 429) {
                throw new ScreenshotException(
                    'Rate limit exceeded',
                    ScreenshotException::RATE_LIMITED
                );
            }
            
            if (!$response->successful()) {
                throw new ScreenshotException(
                    'API error: ' . $response->body(),
                    ScreenshotException::API_ERROR
                );
            }
            
            return $response->body();
            
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            throw new ScreenshotException(
                'Network error: ' . $e->getMessage(),
                ScreenshotException::NETWORK_ERROR
            );
        }
    }
}
```

## Best Practices

### 1. Environment Configuration

Never hardcode API keys:

```php
// Good
$apiKey = getenv('SCREENSHOTLY_API_KEY');
$apiKey = config('services.screenshotly.key');

// Bad
$apiKey = 'sk_live_abc123';
```

### 2. Timeout Configuration

Set appropriate timeouts:

```php
// For simple pages
'timeout' => 30,

// For complex pages with animations
'timeout' => 60,

// For full-page captures
'timeout' => 90,
```

### 3. Caching Strategy

Cache screenshots when content doesn't change frequently:

```php
$cacheKey = 'screenshot:' . md5($url . serialize($options));
$ttl = 3600; // 1 hour

$screenshot = Cache::remember($cacheKey, $ttl, function () use ($url, $options) {
    return $this->capture($url, $options);
});
```

### 4. Async for User-Facing Requests

Don't block user requests:

```php
// Dispatch job and return immediately
CaptureScreenshot::dispatch($url, $path);

return response()->json([
    'status' => 'processing',
    'message' => 'Screenshot will be available shortly',
]);
```

## Conclusion

PHP integration with screenshot APIs is straightforward with the right patterns:

1. **Basic curl** for simple scripts
2. **Guzzle** for cleaner HTTP handling
3. **Laravel services** for framework integration
4. **Queues** for high-volume processing
5. **Proper error handling** for production reliability

With these patterns, you can add professional screenshot capabilities to any PHP application.

---

**Ready to add screenshots to your PHP app?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also:
- [Python Integration Guide →](/blog/python-screenshot-api-tutorial)
- [Node.js Integration Guide →](/blog/nodejs-screenshot-api-tutorial)
