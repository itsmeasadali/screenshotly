---
title: "Ruby Screenshot API: Complete Integration Guide"
description: "Learn how to capture website screenshots in Ruby applications. Covers Net::HTTP, Faraday, and Rails integration with full code examples."
excerpt: "A practical guide to adding screenshot functionality to Ruby apps. From basic HTTP to Rails service objects with background jobs."
author: "asad-ali"
publishedAt: "2025-11-28"
category: "tutorial"
tags: ["ruby", "tutorial", "api", "integration", "rails"]
keywords: ["ruby screenshot api", "rails screenshot", "ruby website screenshot", "faraday screenshot", "ruby capture url"]
featured: false
readingTime: 8
---

Ruby's elegant syntax makes API integration straightforward. Whether you're building a Rails application or a standalone Ruby script, adding screenshot capabilities requires just a few lines of code.

This guide covers multiple approaches, from basic Net::HTTP to production-ready Rails service objects.

## Quick Start: Net::HTTP

Ruby's built-in HTTP library works for simple cases:

```ruby
require 'net/http'
require 'json'
require 'uri'

def capture_screenshot(url)
  api_key = ENV['SCREENSHOTLY_API_KEY']
  uri = URI('https://api.screenshotly.app/screenshot')
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.read_timeout = 60
  
  request = Net::HTTP::Post.new(uri)
  request['Authorization'] = "Bearer #{api_key}"
  request['Content-Type'] = 'application/json'
  request.body = {
    url: url,
    device: 'desktop',
    format: 'png'
  }.to_json
  
  response = http.request(request)
  
  raise "Screenshot failed: #{response.code}" unless response.code == '200'
  
  response.body
end

# Usage
screenshot = capture_screenshot('https://example.com')
File.binwrite('screenshot.png', screenshot)
```

## Using Faraday

Faraday provides a cleaner HTTP interface:

```ruby
# Gemfile
gem 'faraday'

# screenshot_client.rb
require 'faraday'
require 'json'

class ScreenshotClient
  BASE_URL = 'https://api.screenshotly.app'
  
  def initialize(api_key = ENV['SCREENSHOTLY_API_KEY'])
    @connection = Faraday.new(url: BASE_URL) do |f|
      f.request :json
      f.response :raise_error
      f.adapter Faraday.default_adapter
      f.options.timeout = 60
    end
    @api_key = api_key
  end
  
  def capture(url, options = {})
    response = @connection.post('/screenshot') do |req|
      req.headers['Authorization'] = "Bearer #{@api_key}"
      req.body = {
        url: url,
        device: options[:device] || 'desktop',
        format: options[:format] || 'png',
        fullPage: options[:full_page] || false
      }.merge(options.except(:device, :format, :full_page))
    end
    
    response.body
  end
  
  def capture_full_page(url, options = {})
    capture(url, options.merge(full_page: true))
  end
  
  def capture_mobile(url, options = {})
    capture(url, options.merge(device: 'mobile'))
  end
end

# Usage
client = ScreenshotClient.new
screenshot = client.capture('https://example.com')
File.binwrite('screenshot.png', screenshot)
```

## Rails Integration

### Service Object

Create a reusable service for Rails:

```ruby
# app/services/screenshot_service.rb
class ScreenshotService
  include HTTParty
  base_uri 'https://api.screenshotly.app'
  
  class CaptureError < StandardError; end
  
  def initialize
    @api_key = Rails.application.credentials.screenshotly[:api_key]
  end
  
  def capture(url, options = {})
    response = self.class.post(
      '/screenshot',
      headers: {
        'Authorization' => "Bearer #{@api_key}",
        'Content-Type' => 'application/json'
      },
      body: build_payload(url, options).to_json,
      timeout: 60
    )
    
    unless response.success?
      raise CaptureError, "Screenshot failed: #{response.code} - #{response.body}"
    end
    
    response.body
  end
  
  def capture_and_store(url, options = {})
    image_data = capture(url, options)
    
    blob = ActiveStorage::Blob.create_and_upload!(
      io: StringIO.new(image_data),
      filename: "screenshot-#{SecureRandom.hex(8)}.png",
      content_type: 'image/png'
    )
    
    blob.url
  end
  
  def capture_with_cache(url, options = {}, expires_in: 1.hour)
    cache_key = "screenshot:#{Digest::MD5.hexdigest(url + options.to_s)}"
    
    Rails.cache.fetch(cache_key, expires_in: expires_in) do
      capture_and_store(url, options)
    end
  end
  
  private
  
  def build_payload(url, options)
    {
      url: url,
      device: options[:device] || 'desktop',
      format: options[:format] || 'png',
      fullPage: options[:full_page] || false,
      viewport: options[:viewport],
      aiRemoval: options[:ai_removal]
    }.compact
  end
end
```

### Credentials Setup

```yaml
# config/credentials.yml.enc
screenshotly:
  api_key: your_api_key_here
```

```bash
# Edit credentials
rails credentials:edit
```

### Controller Usage

```ruby
# app/controllers/screenshots_controller.rb
class ScreenshotsController < ApplicationController
  def create
    service = ScreenshotService.new
    
    begin
      image_url = service.capture_and_store(
        params[:url],
        device: params[:device],
        full_page: params[:full_page]
      )
      
      render json: { success: true, url: image_url }
    rescue ScreenshotService::CaptureError => e
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end
  end
  
  def preview
    service = ScreenshotService.new
    image_data = service.capture(params[:url])
    
    send_data image_data, 
      type: 'image/png', 
      disposition: 'inline',
      filename: 'preview.png'
  end
end
```

### Routes

```ruby
# config/routes.rb
Rails.application.routes.draw do
  resources :screenshots, only: [:create] do
    collection do
      get :preview
    end
  end
end
```

## Background Jobs

For non-blocking screenshot capture:

```ruby
# app/jobs/capture_screenshot_job.rb
class CaptureScreenshotJob < ApplicationJob
  queue_as :screenshots
  
  retry_on ScreenshotService::CaptureError, wait: 5.seconds, attempts: 3
  
  def perform(record, url, options = {})
    service = ScreenshotService.new
    image_url = service.capture_and_store(url, options)
    
    record.update!(
      screenshot_url: image_url,
      screenshot_captured_at: Time.current
    )
    
    # Optional: notify via webhook or ActionCable
    record.broadcast_screenshot_ready if record.respond_to?(:broadcast_screenshot_ready)
  end
end

# Usage
CaptureScreenshotJob.perform_later(@page, @page.url, device: 'desktop')
```

### With Sidekiq

```ruby
# app/workers/screenshot_worker.rb
class ScreenshotWorker
  include Sidekiq::Worker
  
  sidekiq_options queue: :screenshots, retry: 3
  
  def perform(record_id, record_type, url, options = {})
    record = record_type.constantize.find(record_id)
    service = ScreenshotService.new
    
    image_url = service.capture_and_store(url, options.symbolize_keys)
    record.update!(screenshot_url: image_url)
  rescue ScreenshotService::CaptureError => e
    Rails.logger.error "Screenshot failed for #{url}: #{e.message}"
    raise # Re-raise for Sidekiq retry
  end
end

# Usage
ScreenshotWorker.perform_async(@page.id, 'Page', @page.url, { device: 'mobile' })
```

## Error Handling

Comprehensive error handling for production:

```ruby
# app/services/screenshot_service.rb
class ScreenshotService
  class Error < StandardError; end
  class TimeoutError < Error; end
  class NetworkError < Error; end
  class RateLimitError < Error; end
  class InvalidUrlError < Error; end
  
  MAX_RETRIES = 3
  
  def capture_with_retry(url, options = {})
    retries = 0
    
    begin
      capture(url, options)
    rescue TimeoutError, NetworkError => e
      retries += 1
      if retries <= MAX_RETRIES
        sleep(2 ** retries) # Exponential backoff
        retry
      end
      raise
    rescue RateLimitError => e
      sleep(60)
      retry if retries < 1
      raise
    end
  end
  
  private
  
  def handle_response(response)
    case response.code
    when 200
      response.body
    when 400
      raise InvalidUrlError, "Invalid URL provided"
    when 429
      raise RateLimitError, "Rate limit exceeded"
    when 408, 504
      raise TimeoutError, "Request timed out"
    else
      raise Error, "Screenshot failed: #{response.code}"
    end
  end
end
```

## Batch Processing

Process multiple URLs efficiently:

```ruby
# app/services/batch_screenshot_service.rb
class BatchScreenshotService
  CONCURRENCY = 5
  
  def initialize
    @service = ScreenshotService.new
  end
  
  def capture_all(urls, options = {})
    results = Concurrent::Hash.new
    errors = Concurrent::Hash.new
    
    pool = Concurrent::FixedThreadPool.new(CONCURRENCY)
    latch = Concurrent::CountDownLatch.new(urls.size)
    
    urls.each do |url|
      pool.post do
        begin
          results[url] = @service.capture(url, options)
        rescue => e
          errors[url] = e.message
        ensure
          latch.count_down
        end
      end
    end
    
    latch.wait
    pool.shutdown
    
    { results: results.to_h, errors: errors.to_h }
  end
end

# Usage
service = BatchScreenshotService.new
result = service.capture_all([
  'https://example1.com',
  'https://example2.com',
  'https://example3.com'
])

puts "Captured: #{result[:results].keys.size}"
puts "Failed: #{result[:errors].keys.size}"
```

## Testing

### RSpec Examples

```ruby
# spec/services/screenshot_service_spec.rb
require 'rails_helper'

RSpec.describe ScreenshotService do
  let(:service) { described_class.new }
  let(:url) { 'https://example.com' }
  
  describe '#capture' do
    context 'with valid URL' do
      before do
        stub_request(:post, 'https://api.screenshotly.app/screenshot')
          .to_return(
            status: 200,
            body: File.read('spec/fixtures/screenshot.png'),
            headers: { 'Content-Type' => 'image/png' }
          )
      end
      
      it 'returns image data' do
        result = service.capture(url)
        expect(result).to be_present
      end
    end
    
    context 'with timeout' do
      before do
        stub_request(:post, 'https://api.screenshotly.app/screenshot')
          .to_timeout
      end
      
      it 'raises TimeoutError' do
        expect { service.capture(url) }
          .to raise_error(ScreenshotService::TimeoutError)
      end
    end
  end
end
```

### VCR for Integration Tests

```ruby
# spec/support/vcr.rb
VCR.configure do |config|
  config.cassette_library_dir = 'spec/cassettes'
  config.hook_into :webmock
  config.filter_sensitive_data('<API_KEY>') { ENV['SCREENSHOTLY_API_KEY'] }
end

# spec/services/screenshot_service_spec.rb
RSpec.describe ScreenshotService do
  it 'captures real screenshot', :vcr do
    VCR.use_cassette('screenshot_capture') do
      result = service.capture('https://example.com')
      expect(result.size).to be > 0
    end
  end
end
```

## Best Practices

### 1. Environment Configuration

```ruby
# config/initializers/screenshotly.rb
Rails.application.config.screenshotly = {
  api_key: ENV['SCREENSHOTLY_API_KEY'] || Rails.application.credentials.dig(:screenshotly, :api_key),
  timeout: ENV.fetch('SCREENSHOT_TIMEOUT', 60).to_i,
  default_device: ENV.fetch('SCREENSHOT_DEVICE', 'desktop')
}
```

### 2. Logging

```ruby
def capture(url, options = {})
  Rails.logger.info "[Screenshot] Capturing: #{url}"
  start = Time.current
  
  result = perform_capture(url, options)
  
  Rails.logger.info "[Screenshot] Completed in #{(Time.current - start).round(2)}s"
  result
rescue => e
  Rails.logger.error "[Screenshot] Failed: #{url} - #{e.message}"
  raise
end
```

### 3. Caching Strategy

```ruby
def cache_key(url, options)
  components = [url, options.sort.to_h]
  "screenshot:v1:#{Digest::SHA256.hexdigest(components.to_json)}"
end

def capture_cached(url, options = {}, ttl: 1.hour)
  Rails.cache.fetch(cache_key(url, options), expires_in: ttl) do
    capture_and_store(url, options)
  end
end
```

## Conclusion

Ruby makes screenshot API integration elegant and maintainable:

1. **Net::HTTP** for simple scripts
2. **Faraday/HTTParty** for cleaner code
3. **Rails services** for application integration
4. **Background jobs** for non-blocking operations
5. **Proper error handling** for production reliability

With these patterns, adding screenshot capabilities to any Ruby application is straightforward.

---

**Ready to add screenshots to your Ruby app?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also:
- [Python Integration Guide →](/blog/python-screenshot-api-tutorial)
- [Node.js Integration Guide →](/blog/nodejs-screenshot-api-tutorial)
- [PHP Integration Guide →](/blog/php-screenshot-api-tutorial)
