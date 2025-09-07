# Google Tag Manager Setup

## Overview
Google Tag Manager (GTM) has been successfully integrated into your Next.js application for NetworkAK.

## Configuration

### Environment Variables
The Google Analytics ID and site URL are stored in `.env.local`:
```
NEXT_PUBLIC_GTM_ID=G-WBCSXY8M1R
NEXT_PUBLIC_SITE_URL=https://networkak.com
```

### Files Modified/Created

1. **`.env.local`** - Contains the GTM container ID
2. **`src/components/GoogleTagManager.tsx`** - Reusable GTM component
3. **`src/app/layout.tsx`** - Updated to include GTM integration

## How It Works

1. The GTM script loads asynchronously after the page becomes interactive
2. The noscript fallback ensures tracking works even with JavaScript disabled
3. The GTM ID is read from environment variables with a fallback to the provided ID

## Verification

To verify GTM is working:
1. Open your browser's developer tools
2. Go to the Network tab
3. Reload the page
4. Look for requests to `googletagmanager.com`
5. Check the Console for any GTM-related messages

## Google Tag Manager Dashboard

You can manage your analytics through the [Google Analytics dashboard](https://analytics.google.com/) using measurement ID: `G-WBCSXY8M1R`

## Website Information
- **Domain**: networkak.com
- **Google Analytics ID**: G-WBCSXY8M1R
- **Environment**: Production ready

## Next Steps

1. Install Node.js and npm if not already installed
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Verify GTM is working in your browser's developer tools
