---
title: "C# Screenshot API: Complete .NET Integration Guide"
description: "Learn how to capture website screenshots in C# and .NET applications. Covers HttpClient, async patterns, ASP.NET Core, and production-ready implementations."
excerpt: "Add screenshot capabilities to your .NET applications. From basic HttpClient to enterprise ASP.NET Core integration with dependency injection."
author: "asad-ali"
publishedAt: "2025-10-22"
category: "tutorial"
tags: ["csharp", "dotnet", "tutorial", "api", "aspnet"]
keywords: ["c# screenshot api", "dotnet screenshot", ".net screenshot api", "aspnet screenshot", "csharp capture website"]
featured: false
readingTime: 8
---

C# and .NET power many enterprise applications that need screenshot capabilities—from internal tools to SaaS platforms. This guide covers integration patterns from basic to production-grade.

## Quick Start: HttpClient

.NET's HttpClient handles HTTP requests efficiently:

```csharp
using System.Net.Http.Json;
using System.Text.Json;

public class ScreenshotClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private const string ApiUrl = "https://api.screenshotly.app/screenshot";

    public ScreenshotClient(string apiKey)
    {
        _apiKey = apiKey;
        _httpClient = new HttpClient
        {
            Timeout = TimeSpan.FromSeconds(60)
        };
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
    }

    public async Task<byte[]> CaptureAsync(string url, CancellationToken ct = default)
    {
        var request = new ScreenshotRequest
        {
            Url = url,
            Device = "desktop",
            Format = "png"
        };

        var response = await _httpClient.PostAsJsonAsync(ApiUrl, request, ct);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsByteArrayAsync(ct);
    }
}

public record ScreenshotRequest
{
    public required string Url { get; init; }
    public string Device { get; init; } = "desktop";
    public string Format { get; init; } = "png";
    public bool FullPage { get; init; } = false;
    public ViewportOptions? Viewport { get; init; }
}

public record ViewportOptions
{
    public int Width { get; init; } = 1280;
    public int Height { get; init; } = 800;
}
```

### Usage

```csharp
var apiKey = Environment.GetEnvironmentVariable("SCREENSHOTLY_API_KEY")
    ?? throw new InvalidOperationException("API key not configured");

var client = new ScreenshotClient(apiKey);

var screenshot = await client.CaptureAsync("https://example.com");
await File.WriteAllBytesAsync("screenshot.png", screenshot);
```

## ASP.NET Core Integration

### Service Registration

```csharp
// Program.cs or Startup.cs
public static class ScreenshotServiceExtensions
{
    public static IServiceCollection AddScreenshotService(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<ScreenshotOptions>(
            configuration.GetSection("Screenshot"));

        services.AddHttpClient<IScreenshotService, ScreenshotService>(client =>
        {
            client.BaseAddress = new Uri("https://api.screenshotly.app/");
            client.Timeout = TimeSpan.FromSeconds(60);
        });

        return services;
    }
}

public class ScreenshotOptions
{
    public required string ApiKey { get; set; }
    public int TimeoutSeconds { get; set; } = 60;
    public int MaxRetries { get; set; } = 3;
}
```

### Service Implementation

```csharp
public interface IScreenshotService
{
    Task<byte[]> CaptureAsync(string url, CaptureOptions? options = null, CancellationToken ct = default);
    Task<Stream> CaptureStreamAsync(string url, CaptureOptions? options = null, CancellationToken ct = default);
}

public class ScreenshotService : IScreenshotService
{
    private readonly HttpClient _httpClient;
    private readonly ScreenshotOptions _options;
    private readonly ILogger<ScreenshotService> _logger;

    public ScreenshotService(
        HttpClient httpClient,
        IOptions<ScreenshotOptions> options,
        ILogger<ScreenshotService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;

        _httpClient.DefaultRequestHeaders.Add(
            "Authorization",
            $"Bearer {_options.ApiKey}");
    }

    public async Task<byte[]> CaptureAsync(
        string url,
        CaptureOptions? options = null,
        CancellationToken ct = default)
    {
        var request = BuildRequest(url, options);

        _logger.LogInformation("Capturing screenshot for {Url}", url);
        var stopwatch = Stopwatch.StartNew();

        try
        {
            var response = await _httpClient.PostAsJsonAsync("screenshot", request, ct);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsByteArrayAsync(ct);

            _logger.LogInformation(
                "Screenshot captured in {ElapsedMs}ms, size: {Size} bytes",
                stopwatch.ElapsedMilliseconds,
                result.Length);

            return result;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to capture screenshot for {Url}", url);
            throw new ScreenshotException($"Failed to capture: {url}", ex);
        }
    }

    public async Task<Stream> CaptureStreamAsync(
        string url,
        CaptureOptions? options = null,
        CancellationToken ct = default)
    {
        var request = BuildRequest(url, options);
        var response = await _httpClient.PostAsJsonAsync("screenshot", request, ct);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStreamAsync(ct);
    }

    private static ScreenshotRequest BuildRequest(string url, CaptureOptions? options)
    {
        return new ScreenshotRequest
        {
            Url = url,
            Device = options?.Device ?? "desktop",
            Format = options?.Format ?? "png",
            FullPage = options?.FullPage ?? false,
            Viewport = options?.Viewport
        };
    }
}

public class CaptureOptions
{
    public string? Device { get; set; }
    public string? Format { get; set; }
    public bool FullPage { get; set; }
    public ViewportOptions? Viewport { get; set; }
}

public class ScreenshotException : Exception
{
    public ScreenshotException(string message, Exception? inner = null)
        : base(message, inner) { }
}
```

### Configuration

```json
// appsettings.json
{
  "Screenshot": {
    "ApiKey": "${SCREENSHOTLY_API_KEY}",
    "TimeoutSeconds": 60,
    "MaxRetries": 3
  }
}
```

### Controller Example

```csharp
[ApiController]
[Route("api/[controller]")]
public class ScreenshotsController : ControllerBase
{
    private readonly IScreenshotService _screenshotService;

    public ScreenshotsController(IScreenshotService screenshotService)
    {
        _screenshotService = screenshotService;
    }

    [HttpPost]
    public async Task<IActionResult> Capture(
        [FromBody] CaptureRequest request,
        CancellationToken ct)
    {
        if (!Uri.TryCreate(request.Url, UriKind.Absolute, out _))
        {
            return BadRequest("Invalid URL");
        }

        var screenshot = await _screenshotService.CaptureAsync(
            request.Url,
            new CaptureOptions
            {
                Device = request.Device,
                FullPage = request.FullPage
            },
            ct);

        return File(screenshot, "image/png", "screenshot.png");
    }

    [HttpPost("stream")]
    public async Task<IActionResult> CaptureStream(
        [FromBody] CaptureRequest request,
        CancellationToken ct)
    {
        var stream = await _screenshotService.CaptureStreamAsync(
            request.Url,
            ct: ct);

        return File(stream, "image/png", "screenshot.png");
    }
}

public record CaptureRequest
{
    public required string Url { get; init; }
    public string? Device { get; init; }
    public bool FullPage { get; init; }
}
```

## Retry with Polly

Add resilience with Polly:

```csharp
using Polly;
using Polly.Extensions.Http;

public static class ScreenshotServiceExtensions
{
    public static IServiceCollection AddScreenshotService(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var options = configuration.GetSection("Screenshot").Get<ScreenshotOptions>()!;

        services.AddHttpClient<IScreenshotService, ScreenshotService>(client =>
        {
            client.BaseAddress = new Uri("https://api.screenshotly.app/");
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {options.ApiKey}");
            client.Timeout = TimeSpan.FromSeconds(options.TimeoutSeconds);
        })
        .AddPolicyHandler(GetRetryPolicy(options.MaxRetries))
        .AddPolicyHandler(GetCircuitBreakerPolicy());

        return services;
    }

    private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy(int maxRetries)
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
            .WaitAndRetryAsync(
                maxRetries,
                retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                onRetry: (outcome, timespan, retryAttempt, context) =>
                {
                    Console.WriteLine($"Retry {retryAttempt} after {timespan.TotalSeconds}s");
                });
    }

    private static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy()
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(
                handledEventsAllowedBeforeBreaking: 5,
                durationOfBreak: TimeSpan.FromMinutes(1));
    }
}
```

## Batch Processing

Process multiple URLs concurrently:

```csharp
public class BatchScreenshotService
{
    private readonly IScreenshotService _screenshotService;
    private readonly SemaphoreSlim _semaphore;

    public BatchScreenshotService(
        IScreenshotService screenshotService,
        int maxConcurrency = 5)
    {
        _screenshotService = screenshotService;
        _semaphore = new SemaphoreSlim(maxConcurrency);
    }

    public async Task<IReadOnlyList<ScreenshotResult>> CaptureAllAsync(
        IEnumerable<string> urls,
        CancellationToken ct = default)
    {
        var tasks = urls.Select(url => CaptureWithSemaphoreAsync(url, ct));
        var results = await Task.WhenAll(tasks);
        return results;
    }

    private async Task<ScreenshotResult> CaptureWithSemaphoreAsync(
        string url,
        CancellationToken ct)
    {
        await _semaphore.WaitAsync(ct);
        try
        {
            var data = await _screenshotService.CaptureAsync(url, ct: ct);
            return new ScreenshotResult(url, data, null);
        }
        catch (Exception ex)
        {
            return new ScreenshotResult(url, null, ex.Message);
        }
        finally
        {
            _semaphore.Release();
        }
    }
}

public record ScreenshotResult(string Url, byte[]? Data, string? Error)
{
    public bool IsSuccess => Data is not null && Error is null;
}
```

### Usage

```csharp
var batchService = new BatchScreenshotService(screenshotService, maxConcurrency: 5);

var urls = new[]
{
    "https://example.com",
    "https://example.com/about",
    "https://example.com/pricing",
};

var results = await batchService.CaptureAllAsync(urls);

foreach (var result in results)
{
    if (result.IsSuccess)
    {
        var filename = $"{Uri.EscapeDataString(result.Url)}.png";
        await File.WriteAllBytesAsync(filename, result.Data!);
    }
    else
    {
        Console.WriteLine($"Failed: {result.Url} - {result.Error}");
    }
}
```

## Caching with IMemoryCache

```csharp
public class CachedScreenshotService : IScreenshotService
{
    private readonly IScreenshotService _inner;
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _cacheDuration;

    public CachedScreenshotService(
        IScreenshotService inner,
        IMemoryCache cache,
        TimeSpan? cacheDuration = null)
    {
        _inner = inner;
        _cache = cache;
        _cacheDuration = cacheDuration ?? TimeSpan.FromHours(1);
    }

    public async Task<byte[]> CaptureAsync(
        string url,
        CaptureOptions? options = null,
        CancellationToken ct = default)
    {
        var cacheKey = GenerateCacheKey(url, options);

        if (_cache.TryGetValue(cacheKey, out byte[]? cached))
        {
            return cached!;
        }

        var result = await _inner.CaptureAsync(url, options, ct);

        _cache.Set(cacheKey, result, new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = _cacheDuration,
            Size = result.Length
        });

        return result;
    }

    public Task<Stream> CaptureStreamAsync(
        string url,
        CaptureOptions? options = null,
        CancellationToken ct = default)
    {
        // Streams can't be cached, delegate directly
        return _inner.CaptureStreamAsync(url, options, ct);
    }

    private static string GenerateCacheKey(string url, CaptureOptions? options)
    {
        var normalized = $"{url}:{options?.Device}:{options?.Format}:{options?.FullPage}";
        using var sha = System.Security.Cryptography.SHA256.Create();
        var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(normalized));
        return $"screenshot:{Convert.ToHexString(hash)[..16]}";
    }
}
```

## Background Processing with Channels

For high-throughput scenarios:

```csharp
public class ScreenshotBackgroundService : BackgroundService
{
    private readonly Channel<ScreenshotJob> _channel;
    private readonly IScreenshotService _screenshotService;
    private readonly ILogger<ScreenshotBackgroundService> _logger;

    public ScreenshotBackgroundService(
        IScreenshotService screenshotService,
        ILogger<ScreenshotBackgroundService> logger)
    {
        _screenshotService = screenshotService;
        _logger = logger;
        _channel = Channel.CreateBounded<ScreenshotJob>(new BoundedChannelOptions(100)
        {
            FullMode = BoundedChannelFullMode.Wait
        });
    }

    public ChannelWriter<ScreenshotJob> Writer => _channel.Writer;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var job in _channel.Reader.ReadAllAsync(stoppingToken))
        {
            try
            {
                _logger.LogInformation("Processing job {JobId}", job.Id);
                var screenshot = await _screenshotService.CaptureAsync(job.Url, ct: stoppingToken);
                await job.CompletionSource.Task.ContinueWith(_ => screenshot);
                job.CompletionSource.SetResult(screenshot);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Job {JobId} failed", job.Id);
                job.CompletionSource.SetException(ex);
            }
        }
    }
}

public record ScreenshotJob(
    string Id,
    string Url,
    TaskCompletionSource<byte[]> CompletionSource);
```

## Testing

```csharp
using Moq;
using Xunit;

public class ScreenshotServiceTests
{
    [Fact]
    public async Task CaptureAsync_ReturnsImageBytes()
    {
        // Arrange
        var expectedBytes = new byte[] { 0x89, 0x50, 0x4E, 0x47 }; // PNG header
        var mockHandler = new Mock<HttpMessageHandler>();

        mockHandler
            .Setup(handler => handler.SendAsync(
                It.IsAny<HttpRequestMessage>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new ByteArrayContent(expectedBytes)
            });

        var httpClient = new HttpClient(mockHandler.Object)
        {
            BaseAddress = new Uri("https://api.screenshotly.app/")
        };

        var options = Options.Create(new ScreenshotOptions { ApiKey = "test-key" });
        var logger = new NullLogger<ScreenshotService>();
        var service = new ScreenshotService(httpClient, options, logger);

        // Act
        var result = await service.CaptureAsync("https://example.com");

        // Assert
        Assert.Equal(expectedBytes, result);
    }

    [Fact]
    public async Task CaptureAsync_ThrowsOnHttpError()
    {
        // Arrange
        var mockHandler = new Mock<HttpMessageHandler>();

        mockHandler
            .Setup(handler => handler.SendAsync(
                It.IsAny<HttpRequestMessage>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.InternalServerError
            });

        var httpClient = new HttpClient(mockHandler.Object)
        {
            BaseAddress = new Uri("https://api.screenshotly.app/")
        };

        var options = Options.Create(new ScreenshotOptions { ApiKey = "test-key" });
        var logger = new NullLogger<ScreenshotService>();
        var service = new ScreenshotService(httpClient, options, logger);

        // Act & Assert
        await Assert.ThrowsAsync<ScreenshotException>(
            () => service.CaptureAsync("https://example.com"));
    }
}
```

## Best Practices

### 1. Use IHttpClientFactory

Avoid socket exhaustion:

```csharp
// ✅ Good - uses factory
services.AddHttpClient<IScreenshotService, ScreenshotService>();

// ❌ Bad - creates sockets
var client = new HttpClient();
```

### 2. Handle Cancellation

```csharp
public async Task<byte[]> CaptureAsync(string url, CancellationToken ct = default)
{
    ct.ThrowIfCancellationRequested();
    var response = await _httpClient.PostAsync(url, content, ct);
    // ...
}
```

### 3. Dispose Resources

```csharp
await using var stream = await service.CaptureStreamAsync(url);
await stream.CopyToAsync(fileStream);
```

### 4. Use Structured Logging

```csharp
_logger.LogInformation(
    "Captured {Url} in {ElapsedMs}ms",
    url,
    stopwatch.ElapsedMilliseconds);
```

## Conclusion

.NET screenshot integration supports various patterns:

1. **Basic HttpClient** for simple applications
2. **ASP.NET Core DI** for web applications
3. **Polly** for resilience
4. **IMemoryCache** for caching
5. **Channels** for background processing

Choose patterns based on your application's scale and requirements.

---

**Ready to add screenshots to your .NET app?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also:
- [Java Integration Guide →](/blog/java-screenshot-api-tutorial)
- [Node.js Integration Guide →](/blog/nodejs-screenshot-api-tutorial)
