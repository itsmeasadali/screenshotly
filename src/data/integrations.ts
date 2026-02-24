// Integration definitions for pSEO pages
export const integrations = {
    languages: [
        {
            slug: 'javascript',
            name: 'JavaScript',
            type: 'language' as const,
            icon: 'js',
            description: 'Capture website screenshots from the browser using client-side JavaScript. Call the Screenshotly API with the Fetch API from React, Vue, Angular, or vanilla JS — no server required for basic workflows. This guide covers browser JavaScript screenshot API usage, async/await patterns, error handling, blob URLs for display, and best practices for CORS and API key security when calling from the client.',
            metaDescription: 'Browser JavaScript screenshot API with Screenshotly. Client-side capture from React, Vue, vanilla JS using the Fetch API. No server required.',
            keywords: [
                'browser JavaScript screenshot API',
                'client-side screenshot',
                'fetch API screenshot',
                'browser screenshot javascript',
            ],
            installStep: 'Install via npm or use the native Fetch API — no extra packages needed for modern browsers.',
            codeExample: `// JavaScript/Browser — proxy through your backend in production
const captureScreenshot = async (url) => {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY', // ⚠️ Use a backend proxy in production
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
    }),
  });
  
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};`,
            tips: [
                "Proxy API requests through your own backend in production to avoid exposing your API key in client-side browser code.",
                "Use AbortController to cancel in-flight requests when a user navigates away or starts a new capture.",
                "Convert the response blob to a data URL with FileReader.readAsDataURL() when you need to embed the screenshot inline.",
                "For React/Next.js client components, wrap the API call in a custom hook with loading, error, and data states for cleaner component code.",
            ],
            whenToUse: "Use the JavaScript integration for browser-side, client-side screenshot capture. Call the API from React, Vue, Angular, or vanilla JS running in the user's browser. Ideal for interactive screenshot tools in SPAs, link preview generators embedded in web apps, and real-time visual monitoring dashboards that run entirely in the browser.",
            faqs: [
                {
                    question: "How do I handle CORS when calling the screenshot API from the browser?",
                    answer: "The Screenshotly API supports CORS for browser requests. Make sure to include your API key in the Authorization header and use HTTPS. For production apps, consider proxying requests through your backend for better security."
                },
                {
                    question: "Can I capture screenshots in React applications?",
                    answer: "Yes! Use the fetch API or libraries like axios to call our screenshot API from React components. You can display captured screenshots using blob URLs or save them to your backend storage."
                },
                {
                    question: "What's the best way to handle errors in JavaScript?",
                    answer: "Always wrap API calls in try-catch blocks and check response.ok before processing. Common errors include 401 (invalid API key), 429 (rate limit exceeded), and 400 (invalid parameters)."
                },
                {
                    question: "How do I convert the response to different formats?",
                    answer: "The API returns binary image data. Use response.blob() for browser display, response.arrayBuffer() for processing, or response.buffer() in Node.js for file operations."
                }
            ],
        },
        {
            slug: 'nodejs',
            name: 'Node.js',
            type: 'language' as const,
            icon: 'nodejs',
            description: 'Server-side screenshot capture with Node.js — for backend services, Express/Fastify APIs, CLI tools, and automation scripts. This guide covers the Node.js screenshot API for server-side use only: streaming responses to disk or S3, Express screenshot middleware, cron jobs, and integrating with Bull/BullMQ for batch processing. Keep API keys on the server where they belong.',
            metaDescription: 'Node.js screenshot API for server-side capture. Express middleware, backend services, S3 upload, and batch processing with Screenshotly.',
            keywords: [
                'Node.js screenshot API',
                'server-side screenshot capture',
                'Express screenshot middleware',
                'Node.js backend screenshot',
            ],
            installStep: 'Run npm install node-fetch (for Node.js < 18) or use the built-in fetch API in Node.js 18+.',
            codeExample: `// Node.js
const https = require('https');
const fs = require('fs');

const captureScreenshot = async (url, outputPath) => {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.SCREENSHOTLY_API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
    }),
  });
  
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
};`,
            tips: [
                "Use a worker queue (Bull, BullMQ, or Bee-Queue) for server-side batch processing instead of Promise.all() to control concurrency and handle retries.",
                "Stream the API response directly to disk or S3 with pipeline() from 'stream/promises' to avoid buffering large images in memory.",
                "Set an AbortSignal timeout on every fetch call to prevent hung requests from blocking your Node.js event loop.",
                "Store API keys in environment variables and load them with dotenv in development. In production, use AWS Secrets Manager or Vault — never expose keys to the browser.",
            ],
            whenToUse: "Use the Node.js integration for server-side screenshot capture only. Ideal for Express/Fastify backend APIs that generate screenshots on demand, CLI tools, cron jobs, CI/CD pipelines, and batch processing. Choose Node.js when you need to process screenshots in bulk, stream to cloud storage, or run captures as background jobs — all without exposing your API key to the client.",
            faqs: [
                {
                    question: "How do I handle large volumes of screenshots in Node.js?",
                    answer: "Use async/await with Promise.all() for parallel processing, but limit concurrency to avoid rate limits. Consider using a queue system like Bull or Agenda for high-volume processing with proper retry logic."
                },
                {
                    question: "What's the best way to store API keys in Node.js?",
                    answer: "Use environment variables with the dotenv package. Never hardcode API keys in your source code. For production, use secure secret management services like AWS Secrets Manager or Azure Key Vault."
                },
                {
                    question: "Can I use Screenshotly with Express.js APIs?",
                    answer: "Absolutely! Create API endpoints that accept URLs and return screenshots. You can stream the response directly to clients or save to cloud storage like AWS S3 for later retrieval."
                },
                {
                    question: "How do I handle timeouts and retries in Node.js?",
                    answer: "Set appropriate timeout values using AbortController or request timeout options. Implement exponential backoff for retries on temporary failures (429, 500, 502, 503 status codes)."
                }
            ],
        },
        {
            slug: 'python',
            name: 'Python',
            type: 'language' as const,
            icon: 'python',
            description: 'Integrate screenshot capture into Python applications using the requests library or httpx. Ideal for data pipelines, Django/Flask web apps, automation scripts, and web scraping projects. Includes examples for synchronous and async requests, saving images to files, and handling rate limits with exponential backoff.',
            metaDescription: 'Python screenshot API integration with Screenshotly. Code examples using requests and httpx, Django/Flask patterns, and batch processing tips.',
            keywords: [
                'python screenshot API',
                'python url to image',
                'selenium alternative python',
                'python webpage capture',
            ],
            installStep: 'Run pip install requests (or pip install httpx for async support). Works with Python 3.7+.',
            codeExample: `# Python with requests
import requests

def capture_screenshot(url: str, output_path: str) -> None:
    response = requests.post(
        'https://api.screenshotly.app/screenshot',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'url': url,
            'device': 'desktop',
            'format': 'png',
        }
    )
    
    with open(output_path, 'wb') as f:
        f.write(response.content)`,
            tips: [
                "Use httpx instead of requests for async support — critical for Django Channels, FastAPI, and high-concurrency data pipelines.",
                "Implement exponential backoff with the tenacity library: @retry(stop=stop_after_attempt(3), wait=wait_exponential()).",
                "Save screenshots to BytesIO for in-memory processing with Pillow before writing to disk or uploading to S3.",
                "For Pandas batch workflows, use concurrent.futures.ThreadPoolExecutor to parallelize captures across a DataFrame of URLs.",
            ],
            whenToUse: "Use the Python integration for data pipelines, Django/Flask web applications, automation scripts, and machine learning preprocessing. Python is ideal when you need to combine screenshots with data analysis (Pandas), image processing (Pillow/OpenCV), or feed visual data into ML models.",
            faqs: [
                {
                    question: "How do I handle authentication in Python requests?",
                    answer: "Include your API key in the Authorization header as 'Bearer YOUR_API_KEY'. Use environment variables to store your key securely: os.getenv('SCREENSHOTLY_API_KEY')."
                },
                {
                    question: "Can I use Screenshotly with Django or Flask?",
                    answer: "Yes! Create views that accept URLs and return screenshots. You can serve images directly using HttpResponse with image content-type or save to media storage for later access."
                },
                {
                    question: "What's the best way to handle errors in Python?",
                    answer: "Use response.raise_for_status() to raise exceptions for HTTP errors. Wrap API calls in try-except blocks to handle RequestException, Timeout, and ConnectionError appropriately."
                },
                {
                    question: "How do I process screenshots in Python data pipelines?",
                    answer: "Use libraries like Pandas for batch processing URLs, concurrent.futures for parallel requests, and PIL/Pillow for image processing. Consider using asyncio with aiohttp for high-performance async processing."
                }
            ],
        },
        {
            slug: 'php',
            name: 'PHP',
            type: 'language' as const,
            icon: 'php',
            description: 'Add screenshot capabilities to PHP applications using cURL or Guzzle HTTP. Perfect for WordPress plugins, Laravel apps, and REST-based web services. Covers authentication, error handling, saving to local storage or S3, and integrating with Laravel queues for background processing.',
            metaDescription: 'PHP screenshot API integration with Screenshotly. cURL and Guzzle examples, Laravel service patterns, and WordPress plugin recipes.',
            keywords: [
                'php screenshot API',
                'php url to image',
                'php webpage screenshot',
                'wordpress screenshot plugin',
            ],
            installStep: 'Ensure cURL extension is enabled in php.ini (enabled by default in most installations).',
            codeExample: `<?php
// PHP with cURL
function captureScreenshot($url, $outputPath) {
    $ch = curl_init('https://api.screenshotly.app/screenshot');
    
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $_ENV['SCREENSHOTLY_API_KEY'],
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode([
            'url' => $url,
            'device' => 'desktop',
            'format' => 'png',
        ]),
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    file_put_contents($outputPath, $response);
}`,
            tips: [
                "In Laravel, use Http::withToken()->post() for cleaner code than raw cURL. Pair with Laravel Queues (database or Redis) for background processing.",
                "Cache screenshots with WordPress transients or Laravel Cache to avoid redundant API calls for the same URL.",
                "Use curl_setopt($ch, CURLOPT_TIMEOUT, 30) to set a hard timeout — prevents your web server from hanging on slow captures.",
                "For Guzzle users, enable the retry middleware with HandlerStack::create() and new RetryMiddleware() for automatic retry on 429/5xx.",
            ],
            whenToUse: "Use the PHP integration for WordPress plugins, Laravel or Symfony applications, and traditional server-rendered web apps. PHP is the right choice when you need to generate screenshots from a CMS, embed capture functionality in a WordPress admin panel, or build a screenshot feature into an existing LAMP/LEMP stack.",
            faqs: [
                {
                    question: "How do I use Screenshotly with Laravel?",
                    answer: "Create a service class that wraps the API call using Laravel's HTTP client: Http::withToken(config('services.screenshotly.key'))->post('https://api.screenshotly.app/screenshot', [...]). Store screenshots in Laravel's filesystem using Storage::put()."
                },
                {
                    question: "How do I handle errors with the PHP cURL integration?",
                    answer: "Check the HTTP status code with curl_getinfo($ch, CURLINFO_HTTP_CODE). Handle 401 (invalid key), 429 (rate limited), and 500 (server error) cases. Implement retry logic with exponential backoff for temporary failures."
                },
                {
                    question: "Can I use Screenshotly in WordPress plugins?",
                    answer: "Yes. Use WordPress's wp_remote_post() function instead of cURL for better compatibility. Store API keys in wp_options or constants. Cache screenshots using WordPress transients to avoid redundant API calls."
                },
                {
                    question: "What's the recommended PHP version for the API integration?",
                    answer: "PHP 7.4+ is recommended. The cURL extension is required. For modern projects, consider using Guzzle HTTP client for cleaner code and built-in retry/timeout handling."
                }
            ],
        },
        {
            slug: 'ruby',
            name: 'Ruby',
            type: 'language' as const,
            icon: 'ruby',
            description: 'Screenshot API integration for Ruby and Rails applications using Net::HTTP or the Faraday gem. Streamline visual testing, content generation, and background job processing with Sidekiq. Includes production patterns for retry logic, file uploads to Active Storage, and integration with Rails controller actions.',
            metaDescription: 'Ruby screenshot API integration with Screenshotly. Net::HTTP and Faraday examples, Rails service objects, and Sidekiq background job patterns.',
            keywords: [
                'ruby screenshot API',
                'rails screenshot',
                'ruby url to image',
                'capybara alternative',
            ],
            installStep: 'No extra gems needed — Net::HTTP is part of Ruby stdlib. Optionally run gem install faraday for a friendlier HTTP client.',
            codeExample: `# Ruby with Net::HTTP
require 'net/http'
require 'json'

def capture_screenshot(url, output_path)
  uri = URI('https://api.screenshotly.app/screenshot')
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Post.new(uri)
  request['Authorization'] = "Bearer #{ENV['SCREENSHOTLY_API_KEY']}"
  request['Content-Type'] = 'application/json'
  request.body = {
    url: url,
    device: 'desktop',
    format: 'png'
  }.to_json
  
  response = http.request(request)
  File.write(output_path, response.body)
end`,
            tips: [
                "Use the Faraday gem with faraday-retry middleware for automatic retry with exponential backoff on transient failures.",
                "In Rails, create a ScreenshotService PORO (Plain Old Ruby Object) and register it in an initializer for clean dependency injection.",
                "Attach screenshots directly to Active Storage: record.screenshot.attach(io: StringIO.new(response.body), filename: 'capture.png').",
                "Process large batches with Sidekiq workers — set concurrency limits to match your API plan's rate limit.",
            ],
            whenToUse: "Use the Ruby integration for Rails applications, Sidekiq background jobs, and Rake automation tasks. Ruby is the natural fit when you need to generate screenshots from a Rails admin panel, process captures in Sidekiq workers, or store results in Active Storage.",
            faqs: [
                {
                    question: "How do I use Screenshotly with Ruby on Rails?",
                    answer: "Create a service object that wraps the API call. Use Rails credentials (Rails.application.credentials.screenshotly_api_key) to store your key securely. Save screenshots to Active Storage or upload directly to S3."
                },
                {
                    question: "What's the best HTTP client for Ruby integrations?",
                    answer: "The Faraday gem is recommended for production use — it supports retries, timeouts, and middleware out of the box. For simpler scripts, Net::HTTP (shown above) works fine without additional dependencies."
                },
                {
                    question: "How do I handle rate limiting in Ruby?",
                    answer: "Check the response status code for 429 (Too Many Requests). Implement exponential backoff with the retryable gem or a custom retry loop. The API returns Retry-After headers to indicate when you can make the next request."
                },
                {
                    question: "Can I capture screenshots asynchronously in Rails?",
                    answer: "Yes. Use Active Job with Sidekiq or Delayed Job to process screenshot captures in the background. This prevents HTTP timeouts and allows you to queue large batches of captures."
                }
            ],
        },
        {
            slug: 'go',
            name: 'Go',
            type: 'language' as const,
            icon: 'go',
            description: 'High-performance screenshot capture with Go using the standard net/http package. Build fast, concurrent screenshot services with goroutines and channels. Includes examples for parallel batch capture, context-based timeouts, streaming responses to disk, and deploying as a microservice.',
            metaDescription: 'Go screenshot API integration with Screenshotly. Standard library examples, concurrent capture with goroutines, and microservice patterns.',
            keywords: [
                'go screenshot API',
                'golang screenshot',
                'go url to image',
                'golang webpage capture',
            ],
            installStep: "No external dependencies needed — Go's standard library net/http handles all HTTP requests.",
            codeExample: `// Go
package main

import (
    "bytes"
    "encoding/json"
    "io"
    "net/http"
    "os"
)

func captureScreenshot(url, outputPath string) error {
    payload, _ := json.Marshal(map[string]interface{}{
        "url":    url,
        "device": "desktop",
        "format": "png",
    })

    req, _ := http.NewRequest("POST", 
        "https://api.screenshotly.app/screenshot", 
        bytes.NewBuffer(payload))
    
    req.Header.Set("Authorization", "Bearer "+os.Getenv("SCREENSHOTLY_API_KEY"))
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    data, _ := io.ReadAll(resp.Body)
    return os.WriteFile(outputPath, data, 0644)
}`,
            tips: [
                "Use a semaphore pattern (buffered channel of size N) to limit concurrent goroutines to your plan's rate limit.",
                "Always pass context.WithTimeout to http.NewRequestWithContext — this prevents goroutine leaks on slow or hung API responses.",
                "Use io.Copy(file, resp.Body) to stream directly to disk instead of io.ReadAll, especially for full-page screenshots.",
                "Build a reusable http.Client with custom Transport settings: MaxIdleConnsPerHost=10, IdleConnTimeout=90s for connection pooling.",
            ],
            whenToUse: "Use the Go integration for high-throughput microservices, CLI tools, and concurrent screenshot pipelines. Go excels at processing thousands of captures per minute with minimal memory overhead thanks to goroutines and efficient streaming I/O.",
            faqs: [
                {
                    question: "How do I capture screenshots concurrently in Go?",
                    answer: "Use goroutines with a semaphore pattern (buffered channel) to limit concurrent requests. This prevents hitting rate limits while maximizing throughput. A worker pool of 5-10 concurrent captures is a good starting point."
                },
                {
                    question: "What's the best way to handle errors in Go?",
                    answer: "Check resp.StatusCode after each request. Implement retry logic with exponential backoff for 429 and 5xx errors. Use context.WithTimeout to prevent hung requests. Return errors up the call chain rather than logging and continuing."
                },
                {
                    question: "Can I use Screenshotly in a Go microservice?",
                    answer: "Yes. Create a screenshot service with an HTTP handler that accepts URL parameters and returns captured images. Use Go's standard http package or frameworks like Gin/Echo. Store API keys in environment variables."
                },
                {
                    question: "How do I stream screenshot responses in Go?",
                    answer: "Use io.Copy to stream the API response body directly to your HTTP response writer or file, avoiding loading the entire image into memory. This is especially important for full-page screenshots that can be several megabytes."
                }
            ],
        },
        {
            slug: 'curl',
            name: 'cURL',
            type: 'language' as const,
            icon: 'terminal',
            description: 'Test and integrate the Screenshotly API from the command line with cURL. Quick access for scripting, CI/CD pipelines, shell automation, and manual testing. Includes one-liner examples for PNG capture, full-page PDF output, device mockups, and piping results to other tools.',
            metaDescription: 'Test the Screenshotly screenshot API from the command line with cURL. One-liner examples for PNG capture, PDF output, and CI/CD pipelines.',
            keywords: [
                'curl screenshot API',
                'bash screenshot',
                'command line screenshot',
                'shell script screenshot',
            ],
            installStep: 'cURL comes pre-installed on macOS and most Linux distributions. On Windows, install via winget or chocolatey.',
            codeExample: `# cURL
curl -X POST "https://api.screenshotly.app/screenshot" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "device": "desktop",
    "format": "png"
  }' \\
  --output screenshot.png`,
            tips: [
                "Store your API key in an environment variable and reference it as $SCREENSHOTLY_API_KEY in all scripts to avoid accidental key leakage.",
                "Use -w '\\n%{http_code}' to append the HTTP status code to output — essential for scripting conditional logic.",
                "For complex JSON payloads, store them in a file and use -d @payload.json instead of inline escaping.",
                "Pipe output directly to other tools: curl ... | convert - -resize 50% thumbnail.png (ImageMagick) or curl ... | jq (JSON processing).",
            ],
            whenToUse: "Use the cURL integration for quick manual testing, shell scripts, CI/CD pipeline steps, and system administration tasks. cURL is the fastest way to test API parameters before writing code in another language, and it works in every Linux, macOS, and Windows (WSL) environment.",
            faqs: [
                {
                    question: "How do I capture screenshots in batch using cURL?",
                    answer: "Create a shell script that loops through a list of URLs. Use xargs for parallel processing: cat urls.txt | xargs -P 5 -I {} curl -X POST ... -d '{\"url\":\"{}\"}' --output {}.png. The -P flag controls concurrency."
                },
                {
                    question: "How do I pass dynamic options with cURL?",
                    answer: "Use shell variables: URL='https://example.com' && curl -X POST ... -d \"{\\\"url\\\":\\\"$URL\\\",\\\"format\\\":\\\"png\\\"}\" --output screenshot.png. For complex payloads, store JSON in a file and use -d @payload.json."
                },
                {
                    question: "How do I check if a screenshot request succeeded?",
                    answer: "Add -w '%{http_code}' to output the status code, or use -f to make cURL fail on HTTP errors. Check for 200 status on success. 401 means invalid API key, 429 means rate limited, 400 means invalid parameters."
                },
                {
                    question: "Can I use cURL in CI/CD pipelines?",
                    answer: "Yes. cURL is available in all major CI environments (GitHub Actions, GitLab CI, Jenkins). Store your API key as a CI secret and reference it as an environment variable in your pipeline script."
                }
            ],
        },
    ],
    platforms: [
        {
            slug: 'zapier',
            name: 'Zapier',
            type: 'platform' as const,
            icon: 'zapier',
            description: 'Connect Screenshotly with 5,000+ apps through Zapier using the Webhooks action. Automate screenshot workflows without writing code — capture pages when Google Sheets rows are added, save screenshots to Drive on form submissions, or post visual updates to Slack on a schedule.',
            metaDescription: 'Connect Screenshotly to 5,000+ apps with Zapier. Automate screenshot workflows using Webhooks — no code required. Step-by-step setup guide.',
            keywords: [
                'zapier screenshot',
                'zapier automation screenshots',
                'no-code screenshot automation',
                'zapier integration',
            ],
            installStep: 'Create a free Zapier account at zapier.com, then search for "Webhooks by Zapier" in your Zap editor.',
            steps: [
                'Create a new Zap and search for "Webhooks by Zapier"',
                'Choose "Custom Request" as the action',
                'Set the method to POST and enter the Screenshotly API URL',
                'Add your API key to the headers',
                'Configure the request body with URL and options',
                'Connect to your destination app (Google Drive, Slack, etc.)',
            ],
            tips: [
                "Use a Formatter by Zapier step to clean and validate URLs before sending them to the Webhooks action.",
                "Store screenshots in Google Drive or Dropbox and pass the file link to downstream steps instead of raw binary.",
                "Add a Filter step after the API call to only continue the Zap when the HTTP status is 200.",
                "Use Zapier Paths to branch logic — e.g., save PNGs to one folder and PDFs to another based on format.",
            ],
            whenToUse: "Use the Zapier integration when you want to capture screenshots as part of a no-code automation — triggered by Google Sheets rows, form submissions, Slack commands, or scheduled intervals. Zapier is ideal for non-developers who need visual monitoring, content archiving, or automated reporting without writing code.",
            faqs: [
                {
                    question: "Does Screenshotly have a native Zapier integration?",
                    answer: "Screenshotly works with Zapier via the Webhooks by Zapier action. Set up a Custom Request action with a POST to our API endpoint. This gives you full control over parameters like device, format, and AI element removal."
                },
                {
                    question: "What can I automate with Screenshotly and Zapier?",
                    answer: "Common automations include capturing screenshots when a new row is added to Google Sheets, saving website previews to Google Drive when a form is submitted, posting screenshot updates to Slack channels, and archiving web pages to Dropbox on a schedule."
                },
                {
                    question: "How do I store my API key securely in Zapier?",
                    answer: "Enter your API key directly in the Webhooks action headers. Zapier encrypts stored credentials and does not expose them in logs. Avoid putting the key in URL parameters — always use the Authorization header."
                },
                {
                    question: "Can I capture multiple screenshots in a single Zap?",
                    answer: "Yes. Use Zapier's Looping by Zapier action to iterate over a list of URLs and capture a screenshot for each one. Combine with a delay step if needed to stay within rate limits."
                }
            ],
        },
        {
            slug: 'make',
            name: 'Make (Integromat)',
            type: 'platform' as const,
            icon: 'make',
            description: 'Build visual automation workflows with Make (formerly Integromat) using the HTTP module. Create complex screenshot pipelines with drag-and-drop — schedule captures, route results to multiple destinations, and chain screenshot operations with data transformation steps.',
            metaDescription: 'Build visual screenshot automation workflows with Make (Integromat). HTTP module setup, scheduling, and multi-destination routing guide.',
            keywords: [
                'make screenshot',
                'integromat screenshot',
                'make automation',
                'visual automation screenshots',
            ],
            installStep: 'Sign up for Make (formerly Integromat) at make.com and create a new scenario with an HTTP module.',
            steps: [
                'Create a new scenario in Make',
                'Add an HTTP module and select "Make a request"',
                'Configure the POST request to Screenshotly API',
                'Set up authentication with your API key',
                'Add downstream modules to process screenshots',
                'Schedule or trigger your scenario',
            ],
            tips: [
                "Use Make's built-in 'Parse JSON' module after the HTTP response to extract status codes and error messages before routing.",
                "Set the HTTP module's 'Parse response' toggle to 'No' when receiving binary image data — raw mode avoids encoding issues.",
                "Use Make's Router module to send screenshots to multiple destinations in parallel (e.g., Google Drive AND Slack).",
                "Set up error handlers on the HTTP module to automatically retry on 429 (rate limit) responses with a configurable delay.",
            ],
            whenToUse: "Use the Make integration for complex, multi-step visual automation workflows with branching logic. Make is ideal when you need to route screenshots to multiple destinations, apply conditional processing, or chain screenshot captures with data transformation steps.",
            faqs: [
                {
                    question: "How do I set up Screenshotly in Make (Integromat)?",
                    answer: "Add an HTTP module to your scenario, select 'Make a request', set the method to POST, enter https://api.screenshotly.app/screenshot as the URL, add your API key in the Authorization header as 'Bearer YOUR_KEY', and configure the JSON body with your screenshot options."
                },
                {
                    question: "Can I process screenshots with other Make modules?",
                    answer: "Yes. After the HTTP module captures the screenshot, you can pipe the output to Google Drive, Dropbox, AWS S3, Airtable, or any of Make's 1,500+ integrations. Use the binary data from the response to upload or attach files."
                },
                {
                    question: "How do I schedule recurring screenshot captures in Make?",
                    answer: "Set your scenario's trigger to 'Scheduled' and choose a frequency (every 15 minutes, hourly, daily, etc.). Make will run the scenario automatically and capture fresh screenshots at each interval."
                },
                {
                    question: "What's the difference between using Make vs Zapier for screenshots?",
                    answer: "Make offers more complex branching logic, better error handling, and visual flow design. It's better for multi-step scenarios where you need to process, resize, or route screenshots conditionally. Zapier is simpler for straightforward A-to-B workflows."
                }
            ],
        },
        {
            slug: 'n8n',
            name: 'n8n',
            type: 'platform' as const,
            icon: 'n8n',
            description: 'Self-hosted workflow automation with n8n for teams that need full control over their data. Use the HTTP Request node to call the Screenshotly API, schedule recurring captures, and store results in your own infrastructure. Ideal for privacy-sensitive environments and air-gapped networks.',
            metaDescription: 'Self-hosted screenshot automation with n8n and Screenshotly. HTTP Request node setup, scheduling, and privacy-first workflow guide.',
            keywords: [
                'n8n screenshot',
                'self-hosted automation',
                'n8n workflow',
                'open source automation',
            ],
            installStep: 'Install n8n locally with npm install -g n8n or use n8n Cloud at n8n.io.',
            steps: [
                'Add an HTTP Request node to your workflow',
                'Configure it as a POST request to the Screenshotly API',
                'Add headers for authentication and content type',
                'Set up the JSON body with your screenshot options',
                'Connect to file storage or other processing nodes',
                'Execute or schedule your workflow',
            ],
            tips: [
                "Use n8n's Credentials feature to store your API key once and reference it across multiple workflows.",
                "Set the HTTP Request node's 'Response Format' to 'File' to properly handle binary screenshot data.",
                "Use the IF node to check HTTP status codes and route failures to a Slack/email notification node for alerting.",
                "For high-volume captures, use the SplitInBatches node with a batch size that matches your API rate limit.",
            ],
            whenToUse: "Use the n8n integration when you need full control over your automation infrastructure — self-hosted, open source, and air-gapped compatible. n8n is the right choice for teams with strict data residency requirements, organizations that cannot send data through third-party SaaS platforms, or developers who prefer visual workflow editors with code-level flexibility.",
            faqs: [
                {
                    question: "Why use n8n with Screenshotly instead of Zapier or Make?",
                    answer: "n8n is self-hosted and open source, so your screenshot data and API keys never leave your infrastructure. It's ideal for teams with compliance requirements, air-gapped environments, or those who want to avoid per-task SaaS pricing."
                },
                {
                    question: "How do I handle errors in n8n screenshot workflows?",
                    answer: "Use n8n's Error Trigger node to catch failed HTTP requests. Set up retry logic with the Wait node and an IF condition that checks the response status code. Route failures to a notification channel (Slack, email) for manual review."
                },
                {
                    question: "Can I run n8n screenshot workflows on a schedule?",
                    answer: "Yes. Use the Cron or Schedule Trigger node to run your workflow at fixed intervals. For example, capture competitor website screenshots every morning at 8 AM or archive a list of URLs every Sunday night."
                },
                {
                    question: "How do I process multiple URLs in a single n8n workflow?",
                    answer: "Use the Spreadsheet File node or Set node to define a list of URLs, then connect to the HTTP Request node. n8n automatically iterates over the list, capturing a screenshot for each URL. Add a Wait node between requests to respect rate limits."
                }
            ],
        },
    ],
};

export type LanguageIntegration = (typeof integrations.languages)[number];
export type PlatformIntegration = (typeof integrations.platforms)[number];
