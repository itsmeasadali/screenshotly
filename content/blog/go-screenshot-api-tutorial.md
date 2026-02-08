---
title: "Go Screenshot API: Complete Integration Guide"
description: "Learn how to capture website screenshots in Go applications. Covers net/http, concurrent processing, and production patterns with full code examples."
excerpt: "A practical guide to adding screenshot functionality to Go apps. From basic HTTP to concurrent batch processing with proper error handling."
author: "asad-ali"
publishedAt: "2025-11-25"
category: "tutorial"
tags: ["go", "golang", "tutorial", "api", "integration"]
keywords: ["go screenshot api", "golang screenshot", "go website screenshot", "golang capture url", "go http screenshot"]
featured: false
readingTime: 8
---

Go's simplicity and excellent concurrency support make it ideal for screenshot automation tasks. Whether you're building a CLI tool or a high-throughput service, Go handles screenshot API integration efficiently.

This guide covers everything from basic HTTP calls to concurrent batch processing with proper error handling.

## Quick Start: Basic HTTP

Go's standard library handles HTTP well:

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
    "time"
)

type ScreenshotRequest struct {
    URL     string `json:"url"`
    Device  string `json:"device"`
    Format  string `json:"format"`
}

func captureScreenshot(url string) ([]byte, error) {
    apiKey := os.Getenv("SCREENSHOTLY_API_KEY")
    
    reqBody := ScreenshotRequest{
        URL:    url,
        Device: "desktop",
        Format: "png",
    }
    
    jsonBody, err := json.Marshal(reqBody)
    if err != nil {
        return nil, fmt.Errorf("marshal error: %w", err)
    }
    
    req, err := http.NewRequest("POST", "https://api.screenshotly.app/screenshot", bytes.NewBuffer(jsonBody))
    if err != nil {
        return nil, fmt.Errorf("request error: %w", err)
    }
    
    req.Header.Set("Authorization", "Bearer "+apiKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{Timeout: 60 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("request failed: %w", err)
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        body, _ := io.ReadAll(resp.Body)
        return nil, fmt.Errorf("API error: %d - %s", resp.StatusCode, string(body))
    }
    
    return io.ReadAll(resp.Body)
}

func main() {
    screenshot, err := captureScreenshot("https://example.com")
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        os.Exit(1)
    }
    
    err = os.WriteFile("screenshot.png", screenshot, 0644)
    if err != nil {
        fmt.Printf("Save error: %v\n", err)
        os.Exit(1)
    }
    
    fmt.Println("Screenshot saved!")
}
```

## Screenshot Client Package

Create a reusable package:

```go
// pkg/screenshot/client.go
package screenshot

import (
    "bytes"
    "context"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

type Client struct {
    apiKey     string
    httpClient *http.Client
    baseURL    string
}

type Options struct {
    Device    string            `json:"device,omitempty"`
    Format    string            `json:"format,omitempty"`
    FullPage  bool              `json:"fullPage,omitempty"`
    Viewport  *Viewport         `json:"viewport,omitempty"`
    AIRemoval *AIRemovalOptions `json:"aiRemoval,omitempty"`
}

type Viewport struct {
    Width  int `json:"width"`
    Height int `json:"height"`
}

type AIRemovalOptions struct {
    Enabled bool     `json:"enabled"`
    Types   []string `json:"types,omitempty"`
}

type request struct {
    URL string `json:"url"`
    Options
}

func NewClient(apiKey string) *Client {
    return &Client{
        apiKey:  apiKey,
        baseURL: "https://api.screenshotly.app",
        httpClient: &http.Client{
            Timeout: 60 * time.Second,
        },
    }
}

func (c *Client) WithTimeout(timeout time.Duration) *Client {
    c.httpClient.Timeout = timeout
    return c
}

func (c *Client) Capture(ctx context.Context, url string, opts *Options) ([]byte, error) {
    if opts == nil {
        opts = &Options{}
    }
    
    if opts.Device == "" {
        opts.Device = "desktop"
    }
    if opts.Format == "" {
        opts.Format = "png"
    }
    
    reqBody := request{
        URL:     url,
        Options: *opts,
    }
    
    jsonBody, err := json.Marshal(reqBody)
    if err != nil {
        return nil, fmt.Errorf("marshal error: %w", err)
    }
    
    req, err := http.NewRequestWithContext(ctx, "POST", c.baseURL+"/screenshot", bytes.NewBuffer(jsonBody))
    if err != nil {
        return nil, fmt.Errorf("request creation error: %w", err)
    }
    
    req.Header.Set("Authorization", "Bearer "+c.apiKey)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := c.httpClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("request failed: %w", err)
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        body, _ := io.ReadAll(resp.Body)
        return nil, &APIError{
            StatusCode: resp.StatusCode,
            Message:    string(body),
        }
    }
    
    return io.ReadAll(resp.Body)
}

func (c *Client) CaptureFullPage(ctx context.Context, url string) ([]byte, error) {
    return c.Capture(ctx, url, &Options{FullPage: true})
}

func (c *Client) CaptureMobile(ctx context.Context, url string) ([]byte, error) {
    return c.Capture(ctx, url, &Options{Device: "mobile"})
}
```

### Error Types

```go
// pkg/screenshot/errors.go
package screenshot

import "fmt"

type APIError struct {
    StatusCode int
    Message    string
}

func (e *APIError) Error() string {
    return fmt.Sprintf("API error: %d - %s", e.StatusCode, e.Message)
}

func (e *APIError) IsRetryable() bool {
    switch e.StatusCode {
    case 429, 500, 502, 503, 504:
        return true
    default:
        return false
    }
}

func (e *APIError) IsRateLimited() bool {
    return e.StatusCode == 429
}
```

## Concurrent Batch Processing

Go's goroutines excel at concurrent processing:

```go
// pkg/screenshot/batch.go
package screenshot

import (
    "context"
    "sync"
)

type BatchResult struct {
    URL   string
    Data  []byte
    Error error
}

func (c *Client) CaptureBatch(ctx context.Context, urls []string, opts *Options, concurrency int) []BatchResult {
    results := make([]BatchResult, len(urls))
    sem := make(chan struct{}, concurrency)
    var wg sync.WaitGroup
    
    for i, url := range urls {
        wg.Add(1)
        go func(idx int, targetURL string) {
            defer wg.Done()
            
            sem <- struct{}{}        // Acquire
            defer func() { <-sem }() // Release
            
            data, err := c.Capture(ctx, targetURL, opts)
            results[idx] = BatchResult{
                URL:   targetURL,
                Data:  data,
                Error: err,
            }
        }(i, url)
    }
    
    wg.Wait()
    return results
}

// Usage
func main() {
    client := screenshot.NewClient(os.Getenv("SCREENSHOTLY_API_KEY"))
    
    urls := []string{
        "https://example1.com",
        "https://example2.com",
        "https://example3.com",
    }
    
    ctx := context.Background()
    results := client.CaptureBatch(ctx, urls, nil, 5)
    
    for _, r := range results {
        if r.Error != nil {
            log.Printf("Failed: %s - %v", r.URL, r.Error)
        } else {
            log.Printf("Success: %s (%d bytes)", r.URL, len(r.Data))
        }
    }
}
```

## Retry with Backoff

Implement robust retry logic:

```go
// pkg/screenshot/retry.go
package screenshot

import (
    "context"
    "math"
    "math/rand"
    "time"
)

type RetryConfig struct {
    MaxRetries int
    BaseDelay  time.Duration
    MaxDelay   time.Duration
}

func DefaultRetryConfig() RetryConfig {
    return RetryConfig{
        MaxRetries: 3,
        BaseDelay:  1 * time.Second,
        MaxDelay:   30 * time.Second,
    }
}

func (c *Client) CaptureWithRetry(ctx context.Context, url string, opts *Options, cfg RetryConfig) ([]byte, error) {
    var lastErr error
    
    for attempt := 0; attempt <= cfg.MaxRetries; attempt++ {
        data, err := c.Capture(ctx, url, opts)
        if err == nil {
            return data, nil
        }
        
        lastErr = err
        
        // Check if retryable
        if apiErr, ok := err.(*APIError); ok {
            if !apiErr.IsRetryable() {
                return nil, err
            }
        }
        
        if attempt < cfg.MaxRetries {
            delay := calculateBackoff(attempt, cfg.BaseDelay, cfg.MaxDelay)
            
            select {
            case <-ctx.Done():
                return nil, ctx.Err()
            case <-time.After(delay):
                // Continue to retry
            }
        }
    }
    
    return nil, lastErr
}

func calculateBackoff(attempt int, base, max time.Duration) time.Duration {
    backoff := float64(base) * math.Pow(2, float64(attempt))
    jitter := rand.Float64() * float64(base)
    delay := time.Duration(backoff + jitter)
    
    if delay > max {
        return max
    }
    return delay
}
```

## HTTP Server Integration

Build a screenshot API service:

```go
// cmd/server/main.go
package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"
    
    "yourapp/pkg/screenshot"
)

type ScreenshotHandler struct {
    client *screenshot.Client
}

type CaptureRequest struct {
    URL      string `json:"url"`
    Device   string `json:"device"`
    FullPage bool   `json:"fullPage"`
}

func (h *ScreenshotHandler) HandleCapture(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    
    var req CaptureRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }
    
    opts := &screenshot.Options{
        Device:   req.Device,
        FullPage: req.FullPage,
    }
    
    data, err := h.client.CaptureWithRetry(
        r.Context(),
        req.URL,
        opts,
        screenshot.DefaultRetryConfig(),
    )
    if err != nil {
        log.Printf("Capture error: %v", err)
        http.Error(w, "Screenshot failed", http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "image/png")
    w.Write(data)
}

func main() {
    client := screenshot.NewClient(os.Getenv("SCREENSHOTLY_API_KEY"))
    handler := &ScreenshotHandler{client: client}
    
    http.HandleFunc("/capture", handler.HandleCapture)
    
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

## CLI Tool

Build a command-line screenshot tool:

```go
// cmd/screenshot/main.go
package main

import (
    "context"
    "flag"
    "fmt"
    "os"
    "path/filepath"
    
    "yourapp/pkg/screenshot"
)

func main() {
    url := flag.String("url", "", "URL to capture")
    output := flag.String("output", "screenshot.png", "Output file path")
    device := flag.String("device", "desktop", "Device type")
    fullPage := flag.Bool("full-page", false, "Capture full page")
    
    flag.Parse()
    
    if *url == "" {
        fmt.Println("Usage: screenshot -url <URL> [-output <file>] [-device desktop|mobile] [-full-page]")
        os.Exit(1)
    }
    
    apiKey := os.Getenv("SCREENSHOTLY_API_KEY")
    if apiKey == "" {
        fmt.Println("SCREENSHOTLY_API_KEY environment variable required")
        os.Exit(1)
    }
    
    client := screenshot.NewClient(apiKey)
    
    opts := &screenshot.Options{
        Device:   *device,
        FullPage: *fullPage,
    }
    
    fmt.Printf("Capturing: %s\n", *url)
    
    data, err := client.CaptureWithRetry(
        context.Background(),
        *url,
        opts,
        screenshot.DefaultRetryConfig(),
    )
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        os.Exit(1)
    }
    
    // Ensure output directory exists
    dir := filepath.Dir(*output)
    if err := os.MkdirAll(dir, 0755); err != nil {
        fmt.Printf("Directory error: %v\n", err)
        os.Exit(1)
    }
    
    if err := os.WriteFile(*output, data, 0644); err != nil {
        fmt.Printf("Save error: %v\n", err)
        os.Exit(1)
    }
    
    fmt.Printf("Saved: %s (%d bytes)\n", *output, len(data))
}
```

Build and use:

```bash
go build -o screenshot cmd/screenshot/main.go

./screenshot -url "https://example.com" -output "captures/example.png" -full-page
```

## Testing

### Unit Tests

```go
// pkg/screenshot/client_test.go
package screenshot

import (
    "context"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestCapture(t *testing.T) {
    // Mock server
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("Authorization") == "" {
            w.WriteHeader(http.StatusUnauthorized)
            return
        }
        
        w.Header().Set("Content-Type", "image/png")
        w.Write([]byte("fake-image-data"))
    }))
    defer server.Close()
    
    client := NewClient("test-api-key")
    client.baseURL = server.URL
    
    data, err := client.Capture(context.Background(), "https://example.com", nil)
    if err != nil {
        t.Fatalf("Expected no error, got: %v", err)
    }
    
    if string(data) != "fake-image-data" {
        t.Errorf("Unexpected response: %s", string(data))
    }
}

func TestCaptureAPIError(t *testing.T) {
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusBadRequest)
        w.Write([]byte("Invalid URL"))
    }))
    defer server.Close()
    
    client := NewClient("test-api-key")
    client.baseURL = server.URL
    
    _, err := client.Capture(context.Background(), "invalid", nil)
    if err == nil {
        t.Fatal("Expected error")
    }
    
    apiErr, ok := err.(*APIError)
    if !ok {
        t.Fatalf("Expected APIError, got: %T", err)
    }
    
    if apiErr.StatusCode != 400 {
        t.Errorf("Expected status 400, got: %d", apiErr.StatusCode)
    }
}
```

## Best Practices

### 1. Use Context for Cancellation

```go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
defer cancel()

data, err := client.Capture(ctx, url, opts)
```

### 2. Configure HTTP Client Properly

```go
client := &http.Client{
    Timeout: 60 * time.Second,
    Transport: &http.Transport{
        MaxIdleConns:        100,
        MaxIdleConnsPerHost: 10,
        IdleConnTimeout:     90 * time.Second,
    },
}
```

### 3. Log Appropriately

```go
import "log/slog"

func (c *Client) Capture(ctx context.Context, url string, opts *Options) ([]byte, error) {
    slog.Info("capturing screenshot", "url", url, "device", opts.Device)
    
    start := time.Now()
    data, err := c.doCapture(ctx, url, opts)
    
    if err != nil {
        slog.Error("capture failed", "url", url, "error", err, "duration", time.Since(start))
        return nil, err
    }
    
    slog.Info("capture complete", "url", url, "size", len(data), "duration", time.Since(start))
    return data, nil
}
```

## Conclusion

Go's simplicity makes screenshot API integration clean and efficient:

1. **Standard library** handles most HTTP needs
2. **Goroutines** enable easy concurrent processing
3. **Contexts** provide timeout and cancellation
4. **Error types** enable robust error handling
5. **Testing** is straightforward with httptest

These patterns create reliable, high-performance screenshot automation in Go.

---

**Ready to add screenshots to your Go app?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also:
- [Python Integration Guide →](/blog/python-screenshot-api-tutorial)
- [Node.js Integration Guide →](/blog/nodejs-screenshot-api-tutorial)
- [Ruby Integration Guide →](/blog/ruby-screenshot-api-tutorial)
