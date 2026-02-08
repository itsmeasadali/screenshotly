/**
 * Ad/tracker blocking for screenshot captures.
 * Blocks common ad networks, tracking pixels, and analytics scripts.
 */

// Common ad network domains to block
const AD_DOMAINS = [
    'doubleclick.net',
    'googlesyndication.com',
    'googleadservices.com',
    'google-analytics.com',
    'googletagmanager.com',
    'facebook.net',
    'facebook.com/tr',
    'connect.facebook.net',
    'analytics.facebook.com',
    'ad.doubleclick.net',
    'pagead2.googlesyndication.com',
    'adservice.google.com',
    'adsense.google.com',
    'amazon-adsystem.com',
    'ads.pubmatic.com',
    'adsrvr.org',
    'bidswitch.net',
    'criteo.com',
    'criteo.net',
    'outbrain.com',
    'taboola.com',
    'moatads.com',
    'smartadserver.com',
    'rubiconproject.com',
    'openx.net',
    'admixer.net',
    'adnxs.com',
    'advertising.com',
    'mathtag.com',
    'serving-sys.com',
    'media.net',
    'scorecardresearch.com',
    'quantserve.com',
    'chartbeat.com',
    'mixpanel.com',
    'segment.com',
    'hotjar.com',
    'mouseflow.com',
    'luckyorange.com',
    'fullstory.com',
    'intercom.io',
    'drift.com',
    'hubspot.com',
    'zdassets.com', // Zendesk
    'tawk.to',
    'livechatinc.com',
    'crisp.chat',
    'onesignal.com',
    'pushwoosh.com',
    'cdn.cookielaw.org',
    'cookiebot.com',
    'trustarc.com',
    'consensu.org',
];

// Resource types to block when ad blocking is enabled
const BLOCKED_RESOURCE_TYPES = [
    'media', // video/audio that slows page
    'websocket',
];

/**
 * Check if a request URL matches a known ad/tracker domain
 */
export function isAdRequest(url: string): boolean {
    try {
        const parsed = new URL(url);
        const hostname = parsed.hostname.toLowerCase();

        return AD_DOMAINS.some(domain =>
            hostname === domain || hostname.endsWith('.' + domain)
        );
    } catch {
        return false;
    }
}

/**
 * Check if a resource type should be blocked
 */
export function isBlockedResourceType(resourceType: string): boolean {
    return BLOCKED_RESOURCE_TYPES.includes(resourceType);
}

/**
 * CSS to inject that hides common ad containers and overlays
 */
export const AD_HIDE_CSS = `
  /* Hide common ad containers */
  [class*="ad-"], [class*="ad_"], [class*="advert"],
  [id*="ad-"], [id*="ad_"], [id*="advert"],
  [class*="google-ad"], [class*="dfp-ad"],
  [data-ad], [data-ads], [data-adunit],
  .adsbygoogle, .ad-container, .ad-wrapper,
  .ad-banner, .ad-slot, .ad-unit,
  ins.adsbygoogle,
  /* Hide cookie consent banners */
  [class*="cookie-consent"], [class*="cookie-banner"],
  [class*="cookie-notice"], [class*="cookie-popup"],
  [class*="consent-banner"], [class*="consent-popup"],
  [id*="cookie-consent"], [id*="cookie-banner"],
  [id*="cookie-notice"], [id*="gdpr"],
  .cc-banner, .cc-window, .cc-revoke,
  #onetrust-banner-sdk, #onetrust-consent-sdk,
  .cky-consent-container, .cky-notice,
  /* Hide chat widgets */
  [class*="livechat"], [class*="live-chat"],
  [id*="hubspot-messages"], [id*="intercom-container"],
  [id*="drift-widget"], [id*="crisp-client"],
  .intercom-lightweight-app, .intercom-app,
  #beacon-container,
  /* Hide newsletter popups */
  [class*="newsletter-popup"], [class*="popup-overlay"],
  [class*="modal-overlay"][style*="z-index"],
  [class*="subscribe-popup"],
  /* Hide social share overlays */
  [class*="social-share-overlay"], [class*="share-buttons-overlay"]
  {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
    height: 0 !important;
    overflow: hidden !important;
  }
`;
