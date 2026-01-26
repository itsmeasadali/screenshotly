// Integration definitions for pSEO pages
export const integrations = {
    languages: [
        {
            slug: 'javascript',
            name: 'JavaScript',
            type: 'language' as const,
            icon: 'js',
            description: 'Capture website screenshots in JavaScript and Node.js applications. Works in browsers and server-side environments.',
            keywords: [
                'javascript screenshot API',
                'js screenshot',
                'frontend screenshot capture',
                'browser screenshot javascript',
            ],
            codeExample: `// JavaScript/Browser
const captureScreenshot = async (url) => {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
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
            description: 'Server-side screenshot capture with Node.js. Perfect for backend services, CLI tools, and automation scripts.',
            keywords: [
                'nodejs screenshot API',
                'node screenshot',
                'server side screenshot',
                'node puppeteer alternative',
            ],
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
            description: 'Integrate screenshot capture into Python applications. Ideal for data pipelines, automation, and web scraping projects.',
            keywords: [
                'python screenshot API',
                'python url to image',
                'selenium alternative python',
                'python webpage capture',
            ],
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
            description: 'Add screenshot capabilities to PHP applications. Perfect for WordPress plugins, Laravel apps, and web services.',
            keywords: [
                'php screenshot API',
                'php url to image',
                'php webpage screenshot',
                'wordpress screenshot plugin',
            ],
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
        },
        {
            slug: 'ruby',
            name: 'Ruby',
            type: 'language' as const,
            icon: 'ruby',
            description: 'Screenshot API integration for Ruby and Rails applications. Streamline visual testing and content generation.',
            keywords: [
                'ruby screenshot API',
                'rails screenshot',
                'ruby url to image',
                'capybara alternative',
            ],
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
        },
        {
            slug: 'go',
            name: 'Go',
            type: 'language' as const,
            icon: 'go',
            description: 'High-performance screenshot capture with Go. Build fast, concurrent screenshot services and tools.',
            keywords: [
                'go screenshot API',
                'golang screenshot',
                'go url to image',
                'golang webpage capture',
            ],
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
        },
        {
            slug: 'curl',
            name: 'cURL',
            type: 'language' as const,
            icon: 'terminal',
            description: 'Test and integrate with cURL. Quick command-line access for scripting and manual testing.',
            keywords: [
                'curl screenshot API',
                'bash screenshot',
                'command line screenshot',
                'shell script screenshot',
            ],
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
        },
    ],
    platforms: [
        {
            slug: 'zapier',
            name: 'Zapier',
            type: 'platform' as const,
            icon: 'zapier',
            description: 'Connect Screenshotly with 5000+ apps through Zapier. Automate screenshot workflows without code.',
            keywords: [
                'zapier screenshot',
                'zapier automation screenshots',
                'no-code screenshot automation',
                'zapier integration',
            ],
            steps: [
                'Create a new Zap and search for "Webhooks by Zapier"',
                'Choose "Custom Request" as the action',
                'Set the method to POST and enter the Screenshotly API URL',
                'Add your API key to the headers',
                'Configure the request body with URL and options',
                'Connect to your destination app (Google Drive, Slack, etc.)',
            ],
        },
        {
            slug: 'make',
            name: 'Make (Integromat)',
            type: 'platform' as const,
            icon: 'make',
            description: 'Build visual automation workflows with Make. Create complex screenshot pipelines with drag-and-drop.',
            keywords: [
                'make screenshot',
                'integromat screenshot',
                'make automation',
                'visual automation screenshots',
            ],
            steps: [
                'Create a new scenario in Make',
                'Add an HTTP module and select "Make a request"',
                'Configure the POST request to Screenshotly API',
                'Set up authentication with your API key',
                'Add downstream modules to process screenshots',
                'Schedule or trigger your scenario',
            ],
        },
        {
            slug: 'n8n',
            name: 'n8n',
            type: 'platform' as const,
            icon: 'n8n',
            description: 'Self-hosted workflow automation with n8n. Keep your screenshot workflows private and under your control.',
            keywords: [
                'n8n screenshot',
                'self-hosted automation',
                'n8n workflow',
                'open source automation',
            ],
            steps: [
                'Add an HTTP Request node to your workflow',
                'Configure it as a POST request to the Screenshotly API',
                'Add headers for authentication and content type',
                'Set up the JSON body with your screenshot options',
                'Connect to file storage or other processing nodes',
                'Execute or schedule your workflow',
            ],
        },
    ],
};

export type LanguageIntegration = (typeof integrations.languages)[number];
export type PlatformIntegration = (typeof integrations.platforms)[number];
