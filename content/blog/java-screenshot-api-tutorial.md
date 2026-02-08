---
title: "Java Screenshot API: Complete Integration Guide"
description: "Learn how to capture website screenshots in Java applications. Covers HttpClient, OkHttp, Spring Boot integration with full code examples."
excerpt: "A practical guide to adding screenshot functionality to Java apps. From basic HTTP to Spring Boot microservices with async processing."
author: "asad-ali"
publishedAt: "2025-11-05"
category: "tutorial"
tags: ["java", "tutorial", "api", "integration", "spring"]
keywords: ["java screenshot api", "spring boot screenshot", "java website screenshot", "okhttp screenshot", "java capture url"]
featured: false
readingTime: 8
---

Java remains one of the most popular languages for enterprise applications. Adding screenshot capabilities to Java apps requires proper HTTP handling, error management, and often async processing for production workloads.

This guide covers multiple approaches from basic HttpClient to Spring Boot microservices.

## Quick Start: Java 11+ HttpClient

Java's built-in HttpClient handles HTTPS and async requests:

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;

public class ScreenshotClient {
    private static final String API_KEY = System.getenv("SCREENSHOTLY_API_KEY");
    private static final String API_URL = "https://api.screenshotly.app/screenshot";
    
    private final HttpClient client;
    
    public ScreenshotClient() {
        this.client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    }
    
    public byte[] capture(String url) throws Exception {
        String jsonBody = String.format("""
            {
                "url": "%s",
                "device": "desktop",
                "format": "png"
            }
            """, url);
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(API_URL))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Content-Type", "application/json")
            .timeout(Duration.ofSeconds(60))
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();
        
        HttpResponse<byte[]> response = client.send(
            request, 
            HttpResponse.BodyHandlers.ofByteArray()
        );
        
        if (response.statusCode() != 200) {
            throw new RuntimeException("Screenshot failed: " + response.statusCode());
        }
        
        return response.body();
    }
    
    public static void main(String[] args) throws Exception {
        ScreenshotClient client = new ScreenshotClient();
        byte[] screenshot = client.capture("https://example.com");
        Files.write(Path.of("screenshot.png"), screenshot);
        System.out.println("Screenshot saved!");
    }
}
```

## Using OkHttp

OkHttp provides a more convenient API:

```xml
<!-- Maven dependency -->
<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>4.12.0</version>
</dependency>
```

```java
import okhttp3.*;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class OkHttpScreenshotClient {
    private static final String API_KEY = System.getenv("SCREENSHOTLY_API_KEY");
    private static final String API_URL = "https://api.screenshotly.app/screenshot";
    private static final MediaType JSON = MediaType.get("application/json");
    
    private final OkHttpClient client;
    private final Gson gson;
    
    public OkHttpScreenshotClient() {
        this.client = new OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .writeTimeout(10, TimeUnit.SECONDS)
            .build();
        this.gson = new Gson();
    }
    
    public byte[] capture(String url, ScreenshotOptions options) throws IOException {
        ScreenshotRequest screenshotRequest = new ScreenshotRequest(url, options);
        String jsonBody = gson.toJson(screenshotRequest);
        
        Request request = new Request.Builder()
            .url(API_URL)
            .header("Authorization", "Bearer " + API_KEY)
            .post(RequestBody.create(jsonBody, JSON))
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Screenshot failed: " + response.code());
            }
            return response.body().bytes();
        }
    }
    
    // Async version
    public void captureAsync(String url, ScreenshotOptions options, Callback callback) {
        ScreenshotRequest screenshotRequest = new ScreenshotRequest(url, options);
        String jsonBody = gson.toJson(screenshotRequest);
        
        Request request = new Request.Builder()
            .url(API_URL)
            .header("Authorization", "Bearer " + API_KEY)
            .post(RequestBody.create(jsonBody, JSON))
            .build();
        
        client.newCall(request).enqueue(callback);
    }
}

// Request DTOs
class ScreenshotRequest {
    String url;
    String device;
    String format;
    boolean fullPage;
    Viewport viewport;
    
    public ScreenshotRequest(String url, ScreenshotOptions options) {
        this.url = url;
        this.device = options.device != null ? options.device : "desktop";
        this.format = options.format != null ? options.format : "png";
        this.fullPage = options.fullPage;
        this.viewport = options.viewport;
    }
}

class ScreenshotOptions {
    String device;
    String format;
    boolean fullPage;
    Viewport viewport;
}

class Viewport {
    int width;
    int height;
}
```

## Spring Boot Integration

### Service Class

```java
package com.example.screenshot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Service
public class ScreenshotService {
    
    @Value("${screenshotly.api-key}")
    private String apiKey;
    
    @Value("${screenshotly.api-url:https://api.screenshotly.app/screenshot}")
    private String apiUrl;
    
    private final WebClient webClient;
    
    public ScreenshotService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
            .baseUrl("https://api.screenshotly.app")
            .build();
    }
    
    // Blocking version with RestTemplate
    public byte[] capture(String url, ScreenshotOptions options) {
        RestTemplate restTemplate = new RestTemplate();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        Map<String, Object> body = new HashMap<>();
        body.put("url", url);
        body.put("device", options.getDevice());
        body.put("format", options.getFormat());
        body.put("fullPage", options.isFullPage());
        
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        
        ResponseEntity<byte[]> response = restTemplate.exchange(
            apiUrl,
            HttpMethod.POST,
            request,
            byte[].class
        );
        
        if (response.getStatusCode() != HttpStatus.OK) {
            throw new ScreenshotException("Screenshot failed: " + response.getStatusCode());
        }
        
        return response.getBody();
    }
    
    // Reactive version with WebClient
    public Mono<byte[]> captureReactive(String url, ScreenshotOptions options) {
        Map<String, Object> body = new HashMap<>();
        body.put("url", url);
        body.put("device", options.getDevice());
        body.put("format", options.getFormat());
        body.put("fullPage", options.isFullPage());
        
        return webClient.post()
            .uri("/screenshot")
            .header("Authorization", "Bearer " + apiKey)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(body)
            .retrieve()
            .onStatus(HttpStatusCode::isError, response -> 
                response.bodyToMono(String.class)
                    .flatMap(error -> Mono.error(new ScreenshotException(error)))
            )
            .bodyToMono(byte[].class);
    }
}
```

### Configuration

```yaml
# application.yml
screenshotly:
  api-key: ${SCREENSHOTLY_API_KEY}
  api-url: https://api.screenshotly.app/screenshot
```

### Controller

```java
package com.example.screenshot.controller;

import com.example.screenshot.service.ScreenshotService;
import com.example.screenshot.service.ScreenshotOptions;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/screenshots")
public class ScreenshotController {
    
    private final ScreenshotService screenshotService;
    
    public ScreenshotController(ScreenshotService screenshotService) {
        this.screenshotService = screenshotService;
    }
    
    @PostMapping
    public ResponseEntity<byte[]> captureScreenshot(@RequestBody CaptureRequest request) {
        ScreenshotOptions options = new ScreenshotOptions();
        options.setDevice(request.getDevice());
        options.setFormat(request.getFormat());
        options.setFullPage(request.isFullPage());
        
        byte[] screenshot = screenshotService.capture(request.getUrl(), options);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentDisposition(
            ContentDisposition.inline().filename("screenshot.png").build()
        );
        
        return new ResponseEntity<>(screenshot, headers, HttpStatus.OK);
    }
    
    @PostMapping("/async")
    public Mono<ResponseEntity<byte[]>> captureScreenshotAsync(@RequestBody CaptureRequest request) {
        ScreenshotOptions options = new ScreenshotOptions();
        options.setDevice(request.getDevice());
        options.setFormat(request.getFormat());
        
        return screenshotService.captureReactive(request.getUrl(), options)
            .map(screenshot -> {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_PNG);
                return new ResponseEntity<>(screenshot, headers, HttpStatus.OK);
            });
    }
}
```

## Batch Processing

Process multiple URLs with ExecutorService:

```java
import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;

public class BatchScreenshotService {
    private final ScreenshotClient client;
    private final ExecutorService executor;
    
    public BatchScreenshotService(int threadCount) {
        this.client = new ScreenshotClient();
        this.executor = Executors.newFixedThreadPool(threadCount);
    }
    
    public List<ScreenshotResult> captureAll(List<String> urls) {
        List<Future<ScreenshotResult>> futures = new ArrayList<>();
        
        for (String url : urls) {
            Future<ScreenshotResult> future = executor.submit(() -> {
                try {
                    byte[] data = client.capture(url);
                    return new ScreenshotResult(url, data, null);
                } catch (Exception e) {
                    return new ScreenshotResult(url, null, e.getMessage());
                }
            });
            futures.add(future);
        }
        
        List<ScreenshotResult> results = new ArrayList<>();
        for (Future<ScreenshotResult> future : futures) {
            try {
                results.add(future.get(120, TimeUnit.SECONDS));
            } catch (Exception e) {
                results.add(new ScreenshotResult("unknown", null, e.getMessage()));
            }
        }
        
        return results;
    }
    
    public void shutdown() {
        executor.shutdown();
    }
}

record ScreenshotResult(String url, byte[] data, String error) {
    public boolean isSuccess() {
        return error == null && data != null;
    }
}
```

## Error Handling

Comprehensive error handling:

```java
public class RobustScreenshotClient {
    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY_MS = 2000;
    
    public byte[] captureWithRetry(String url) throws ScreenshotException {
        Exception lastException = null;
        
        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                return capture(url);
            } catch (RateLimitException e) {
                // Wait for rate limit reset
                try {
                    Thread.sleep(60000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new ScreenshotException("Interrupted during rate limit wait", ie);
                }
                lastException = e;
            } catch (TimeoutException e) {
                // Retry with exponential backoff
                if (attempt < MAX_RETRIES) {
                    try {
                        Thread.sleep(RETRY_DELAY_MS * (long) Math.pow(2, attempt - 1));
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new ScreenshotException("Interrupted during retry wait", ie);
                    }
                }
                lastException = e;
            } catch (InvalidUrlException e) {
                // Don't retry for invalid URLs
                throw new ScreenshotException("Invalid URL: " + url, e);
            }
        }
        
        throw new ScreenshotException("Failed after " + MAX_RETRIES + " attempts", lastException);
    }
    
    private byte[] capture(String url) throws Exception {
        // Implementation
        return null;
    }
}

// Custom exceptions
class ScreenshotException extends RuntimeException {
    public ScreenshotException(String message) { super(message); }
    public ScreenshotException(String message, Throwable cause) { super(message, cause); }
}

class RateLimitException extends ScreenshotException {
    public RateLimitException(String message) { super(message); }
}

class TimeoutException extends ScreenshotException {
    public TimeoutException(String message) { super(message); }
}

class InvalidUrlException extends ScreenshotException {
    public InvalidUrlException(String message) { super(message); }
}
```

## Caching with Caffeine

```java
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import java.util.concurrent.TimeUnit;

public class CachedScreenshotService {
    private final ScreenshotClient client;
    private final Cache<String, byte[]> cache;
    
    public CachedScreenshotService() {
        this.client = new ScreenshotClient();
        this.cache = Caffeine.newBuilder()
            .maximumSize(1000)
            .expireAfterWrite(1, TimeUnit.HOURS)
            .build();
    }
    
    public byte[] capture(String url, ScreenshotOptions options) throws Exception {
        String cacheKey = generateCacheKey(url, options);
        
        byte[] cached = cache.getIfPresent(cacheKey);
        if (cached != null) {
            return cached;
        }
        
        byte[] screenshot = client.capture(url, options);
        cache.put(cacheKey, screenshot);
        
        return screenshot;
    }
    
    private String generateCacheKey(String url, ScreenshotOptions options) {
        return String.format("%s-%s-%s-%s",
            url,
            options.getDevice(),
            options.getFormat(),
            options.isFullPage()
        );
    }
}
```

## Testing

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

class ScreenshotServiceTest {
    
    @Mock
    private RestTemplate restTemplate;
    
    private ScreenshotService service;
    
    @BeforeEach
    void setUp() {
        service = new ScreenshotService(restTemplate);
    }
    
    @Test
    void captureReturnsImageData() {
        // Arrange
        byte[] expectedData = "fake-image".getBytes();
        when(restTemplate.exchange(any(), eq(HttpMethod.POST), any(), eq(byte[].class)))
            .thenReturn(ResponseEntity.ok(expectedData));
        
        // Act
        byte[] result = service.capture("https://example.com", new ScreenshotOptions());
        
        // Assert
        assertThat(result).isEqualTo(expectedData);
    }
    
    @Test
    void captureThrowsOnError() {
        // Arrange
        when(restTemplate.exchange(any(), eq(HttpMethod.POST), any(), eq(byte[].class)))
            .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        
        // Act & Assert
        assertThatThrownBy(() -> service.capture("invalid", new ScreenshotOptions()))
            .isInstanceOf(ScreenshotException.class);
    }
}
```

## Best Practices

### 1. Use Environment Variables

```java
String apiKey = System.getenv("SCREENSHOTLY_API_KEY");
if (apiKey == null || apiKey.isBlank()) {
    throw new IllegalStateException("API key not configured");
}
```

### 2. Set Reasonable Timeouts

```java
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .timeout(Duration.ofSeconds(60))
    .build();
```

### 3. Close Resources Properly

```java
try (Response response = client.newCall(request).execute()) {
    // Process response
}
```

### 4. Log Appropriately

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger log = LoggerFactory.getLogger(ScreenshotService.class);

public byte[] capture(String url) {
    log.info("Capturing screenshot for: {}", url);
    long start = System.currentTimeMillis();
    
    try {
        byte[] result = doCapture(url);
        log.info("Capture completed in {}ms", System.currentTimeMillis() - start);
        return result;
    } catch (Exception e) {
        log.error("Capture failed for {}: {}", url, e.getMessage());
        throw e;
    }
}
```

## Conclusion

Java screenshot API integration supports multiple approaches:

1. **Java 11+ HttpClient** for modern, built-in HTTP
2. **OkHttp** for cleaner, feature-rich HTTP
3. **Spring Boot** for enterprise integration
4. **Reactive WebClient** for non-blocking operations
5. **ExecutorService** for batch processing

Choose based on your application's architecture and requirements.

---

**Ready to add screenshots to your Java app?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also:
- [Python Integration Guide →](/blog/python-screenshot-api-tutorial)
- [Node.js Integration Guide →](/blog/nodejs-screenshot-api-tutorial)
- [Go Integration Guide →](/blog/go-screenshot-api-tutorial)
