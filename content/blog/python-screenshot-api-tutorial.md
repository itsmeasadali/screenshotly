---
title: "Python Screenshot API: Complete Tutorial with Examples"
description: "Learn how to capture website screenshots in Python using Screenshotly's API. Includes code examples for basic captures, full-page screenshots, and AI element removal."
excerpt: "A hands-on Python tutorial for capturing website screenshots programmatically. From basic captures to advanced AI-powered cleanup."
author: "asad-ali"
publishedAt: "2026-02-03"
category: "tutorial"
tags: ["python", "tutorial", "api", "code examples", "automation"]
keywords: ["python screenshot api", "python capture website", "python screenshot", "website screenshot python", "selenium alternative"]
featured: false
readingTime: 10
---

Python developers often need to capture website screenshots for documentation, testing, monitoring, or content generation. While libraries like Selenium and Playwright can do this, they require browser management and infrastructure setup. A screenshot API simplifies this to a single HTTP request.

In this tutorial, you'll learn how to capture screenshots in Python using Screenshotly's REST API. We'll cover everything from basic captures to advanced features like AI element removal and batch processing.

## Prerequisites

Before we start, make sure you have:

- Python 3.8 or higher
- An API key from [Screenshotly](https://screenshotly.app/sign-up) (free tier: 500/day)
- The `requests` library installed: `pip install requests`

## Basic Screenshot Capture

Let's start with the simplest possible screenshot capture:

```python
import requests
import os

API_KEY = os.environ.get('SCREENSHOTLY_API_KEY')

def capture_screenshot(url: str, filename: str = 'screenshot.png') -> bool:
    """Capture a screenshot of the given URL."""
    
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
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f'Screenshot saved to {filename}')
        return True
    else:
        print(f'Error: {response.status_code} - {response.text}')
        return False

# Usage
capture_screenshot('https://example.com')
```

This captures a desktop-sized screenshot and saves it as a PNG file. The API handles browser rendering, waiting for content, and image encoding automatically.

## Device Presets

Capture screenshots for different devices using the `device` parameter:

```python
def capture_for_devices(url: str, base_filename: str):
    """Capture screenshots for desktop, tablet, and mobile."""
    
    devices = ['desktop', 'tablet', 'mobile']
    
    for device in devices:
        response = requests.post(
            'https://api.screenshotly.app/screenshot',
            headers={
                'Authorization': f'Bearer {API_KEY}',
                'Content-Type': 'application/json',
            },
            json={
                'url': url,
                'device': device,
                'format': 'png',
            }
        )
        
        if response.status_code == 200:
            filename = f'{base_filename}_{device}.png'
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f'Saved {filename}')

# Usage
capture_for_devices('https://example.com', 'example')
# Creates: example_desktop.png, example_tablet.png, example_mobile.png
```

## Custom Viewport Sizes

For precise control, specify exact viewport dimensions:

```python
def capture_custom_viewport(url: str, width: int, height: int, filename: str):
    """Capture with custom viewport dimensions."""
    
    response = requests.post(
        'https://api.screenshotly.app/screenshot',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'url': url,
            'format': 'png',
            'viewport': {
                'width': width,
                'height': height,
            },
        }
    )
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return True
    return False

# Capture at common resolutions
capture_custom_viewport('https://example.com', 1920, 1080, 'fullhd.png')
capture_custom_viewport('https://example.com', 2560, 1440, '2k.png')
capture_custom_viewport('https://example.com', 375, 812, 'iphone.png')
```

## Full-Page Screenshots

Capture the entire page, including content below the fold:

```python
def capture_full_page(url: str, filename: str = 'fullpage.png') -> bool:
    """Capture the entire scrollable page."""
    
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
            'fullPage': True,
        }
    )
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return True
    return False

# Capture entire landing page
capture_full_page('https://example.com/landing', 'landing_full.png')
```

## AI Element Removal

One of Screenshotly's unique features is automatic removal of distracting elements like cookie banners and chat widgets:

```python
def capture_clean(url: str, filename: str) -> bool:
    """Capture a clean screenshot with AI element removal."""
    
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
            'aiRemoval': {
                'enabled': True,
                'types': ['cookie-banner', 'chat-widget', 'popup', 'notification'],
            },
        }
    )
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return True
    return False

# Perfect for documentation
capture_clean('https://app.example.com/dashboard', 'dashboard_clean.png')
```

## Device Mockups

Wrap screenshots in professional device frames:

```python
def capture_with_mockup(url: str, mockup_type: str, filename: str) -> bool:
    """Capture screenshot with device mockup frame."""
    
    # Available mockup types:
    # 'browser-light', 'browser-dark', 'iphone', 'macbook', 'android'
    
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
            'mockup': {
                'type': mockup_type,
                'shadow': True,
            },
        }
    )
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return True
    return False

# Marketing-ready screenshots
capture_with_mockup('https://example.com', 'macbook', 'marketing_macbook.png')
capture_with_mockup('https://example.com', 'browser-dark', 'marketing_browser.png')
```

## Batch Processing

For capturing multiple pages efficiently:

```python
import asyncio
import aiohttp
from typing import List, Tuple

async def capture_batch(urls: List[str]) -> List[Tuple[str, bytes]]:
    """Capture multiple screenshots concurrently."""
    
    async def capture_one(session: aiohttp.ClientSession, url: str):
        async with session.post(
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
        ) as response:
            if response.status == 200:
                return (url, await response.read())
            return (url, None)
    
    async with aiohttp.ClientSession() as session:
        tasks = [capture_one(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Usage
async def main():
    urls = [
        'https://example.com/page1',
        'https://example.com/page2',
        'https://example.com/page3',
    ]
    
    results = await capture_batch(urls)
    
    for url, image_data in results:
        if image_data:
            filename = url.split('/')[-1] + '.png'
            with open(filename, 'wb') as f:
                f.write(image_data)
            print(f'Saved {filename}')

asyncio.run(main())
```

## PDF Generation

Convert web pages to PDF:

```python
def capture_as_pdf(url: str, filename: str = 'document.pdf') -> bool:
    """Capture webpage as PDF."""
    
    response = requests.post(
        'https://api.screenshotly.app/screenshot',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'url': url,
            'format': 'pdf',
            'pdfOptions': {
                'pageSize': 'A4',
                'printBackground': True,
                'margin': {
                    'top': '20mm',
                    'bottom': '20mm',
                    'left': '15mm',
                    'right': '15mm',
                },
            },
        }
    )
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return True
    return False

# Generate PDF report
capture_as_pdf('https://example.com/report', 'report.pdf')
```

## Authenticated Pages

Capture screenshots of logged-in pages:

```python
def capture_authenticated(url: str, session_cookie: str, filename: str) -> bool:
    """Capture screenshot with authentication cookie."""
    
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
            'cookies': [
                {
                    'name': 'session',
                    'value': session_cookie,
                    'domain': 'example.com',
                }
            ],
        }
    )
    
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        return True
    return False

# Capture admin dashboard
capture_authenticated(
    'https://example.com/admin',
    'your-session-token',
    'admin_dashboard.png'
)
```

## Error Handling

Production-ready error handling:

```python
import time
from typing import Optional

class ScreenshotError(Exception):
    pass

def capture_with_retry(
    url: str, 
    filename: str, 
    max_retries: int = 3,
    backoff_factor: float = 2.0
) -> bool:
    """Capture with exponential backoff retry."""
    
    for attempt in range(max_retries):
        try:
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
                },
                timeout=30
            )
            
            if response.status_code == 200:
                with open(filename, 'wb') as f:
                    f.write(response.content)
                return True
            
            elif response.status_code == 429:
                # Rate limited - wait and retry
                wait_time = backoff_factor ** attempt
                print(f'Rate limited. Waiting {wait_time}s...')
                time.sleep(wait_time)
                
            elif response.status_code >= 500:
                # Server error - retry
                wait_time = backoff_factor ** attempt
                print(f'Server error. Retrying in {wait_time}s...')
                time.sleep(wait_time)
                
            else:
                # Client error - don't retry
                raise ScreenshotError(f'{response.status_code}: {response.text}')
                
        except requests.exceptions.Timeout:
            if attempt == max_retries - 1:
                raise ScreenshotError('Request timed out after all retries')
            time.sleep(backoff_factor ** attempt)
    
    return False
```

## Complete Python Class

Here's a reusable class wrapping all functionality:

```python
import requests
from typing import Optional, List, Dict, Any
from dataclasses import dataclass
import os

@dataclass
class ScreenshotOptions:
    device: str = 'desktop'
    format: str = 'png'
    full_page: bool = False
    ai_removal: bool = False
    ai_removal_types: Optional[List[str]] = None
    mockup: Optional[str] = None
    viewport: Optional[Dict[str, int]] = None
    delay: int = 0
    cookies: Optional[List[Dict[str, str]]] = None

class ScreenshotlyClient:
    """Python client for Screenshotly API."""
    
    BASE_URL = 'https://api.screenshotly.app'
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get('SCREENSHOTLY_API_KEY')
        if not self.api_key:
            raise ValueError('API key required')
    
    def capture(
        self, 
        url: str, 
        options: Optional[ScreenshotOptions] = None
    ) -> bytes:
        """Capture a screenshot and return image bytes."""
        
        opts = options or ScreenshotOptions()
        
        payload: Dict[str, Any] = {
            'url': url,
            'device': opts.device,
            'format': opts.format,
        }
        
        if opts.full_page:
            payload['fullPage'] = True
            
        if opts.ai_removal:
            payload['aiRemoval'] = {
                'enabled': True,
                'types': opts.ai_removal_types or ['cookie-banner', 'chat-widget'],
            }
            
        if opts.mockup:
            payload['mockup'] = {'type': opts.mockup, 'shadow': True}
            
        if opts.viewport:
            payload['viewport'] = opts.viewport
            
        if opts.delay:
            payload['delay'] = opts.delay
            
        if opts.cookies:
            payload['cookies'] = opts.cookies
        
        response = requests.post(
            f'{self.BASE_URL}/screenshot',
            headers={
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json',
            },
            json=payload,
            timeout=60
        )
        
        response.raise_for_status()
        return response.content
    
    def capture_to_file(
        self, 
        url: str, 
        filename: str,
        options: Optional[ScreenshotOptions] = None
    ) -> bool:
        """Capture and save to file."""
        
        image_data = self.capture(url, options)
        with open(filename, 'wb') as f:
            f.write(image_data)
        return True

# Usage
client = ScreenshotlyClient()

# Basic capture
client.capture_to_file('https://example.com', 'example.png')

# With options
opts = ScreenshotOptions(
    device='desktop',
    ai_removal=True,
    mockup='browser-dark'
)
client.capture_to_file('https://example.com', 'marketing.png', opts)
```

## Conclusion

Capturing screenshots in Python doesn't have to involve managing browsers. With a simple API call, you can capture any website with professional quality, AI cleanup, and device mockups.

Key takeaways:

- **Simple integration**: Just HTTP requests, no browser dependencies
- **Flexible options**: Device presets, custom viewports, full-page captures
- **AI cleanup**: Automatic removal of cookie banners and popups
- **Production-ready**: Built-in retry logic and error handling

---

**Ready to start capturing screenshots in Python?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See more [Python examples →](/integrations/python) and [API documentation →](/help)
