# API Integration Setup Guide

This project integrates multiple APIs to enhance the study notes generation experience. Below are the APIs used and setup instructions.

## APIs Integrated

### 1. ✅ Gemini AI (Lovable AI) - **Already Configured**
- **Purpose**: Generate enhanced study notes with structured content
- **Status**: Pre-configured via Lovable AI Gateway
- **No setup required**

### 2. 📺 YouTube Data API v3
- **Purpose**: Fetch educational video resources for topics
- **Setup Required**: Yes
- **Steps**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing
  3. Enable "YouTube Data API v3"
  4. Create credentials (API Key)
  5. Add the API key as a secret: `YOUTUBE_API_KEY`

### 3. 🖼️ Unsplash API
- **Purpose**: Fetch high-quality educational images
- **Setup Required**: Yes
- **Steps**:
  1. Go to [Unsplash Developers](https://unsplash.com/developers)
  2. Create a new application
  3. Copy your Access Key
  4. Add the API key as a secret: `UNSPLASH_ACCESS_KEY`

### 4. 🔍 OCR.space API
- **Purpose**: Extract text from uploaded syllabus images
- **Setup Required**: Yes
- **Steps**:
  1. Go to [OCR.space](https://ocr.space/ocrapi)
  2. Sign up for a free API key
  3. Copy your API key
  4. Add the API key as a secret: `OCR_SPACE_API_KEY`

### 5. 📚 Wikipedia API
- **Purpose**: Fetch quick definitions and information
- **Setup Required**: No
- **Status**: Free public API, no authentication needed

### 6. 🌐 IP Geolocation (Optional)
- **Purpose**: Track user location for analytics
- **Setup Required**: Optional
- **Note**: Can use free services like ipapi.co or ip-api.com

### 7. 💰 Google AdSense (Optional)
- **Purpose**: Monetize the website
- **Setup Required**: Yes
- **Steps**:
  1. Apply for [Google AdSense](https://www.google.com/adsense/)
  2. Once approved, get your publisher ID
  3. Replace `ca-pub-XXXXXXXXXX` in `index.html` with your actual publisher ID

## Features by API

| Feature | API Used | Location |
|---------|----------|----------|
| Generate AI Notes | Gemini (Lovable AI) | Home page - Generate button |
| Video Resources | YouTube Data API | Enhanced Notes page |
| Topic Images | Unsplash API | Enhanced Notes page (optional) |
| Quick Info | Wikipedia API | Enhanced Notes page |
| Image Text Extraction | OCR.space API | Home page - Image upload |
| PDF Generation | jsPDF (built-in) | Preview & Download |

## Adding Secrets

To add API keys to your Lovable Cloud project:

1. The AI will prompt you to add secrets when needed
2. Enter your API keys securely when prompted
3. Keys are encrypted and stored safely
4. They're automatically available in edge functions

## Optional APIs

Some APIs are optional and the app will work without them:

- **Unsplash**: App will work without images
- **YouTube**: App will work without video recommendations
- **OCR.space**: Can use the existing Gemini-based image analysis as fallback
- **Google AdSense**: App will work without ads

## Testing

After adding API keys:

1. Upload a syllabus file
2. Generate notes
3. Click "View with Resources" to see:
   - Wikipedia definitions
   - YouTube video tutorials
   - (Optional) Related images

## Cost Considerations

- **Lovable AI**: Included with your workspace credits
- **YouTube API**: Free tier: 10,000 units/day
- **Unsplash API**: Free tier: 50 requests/hour
- **OCR.space API**: Free tier: 25,000 requests/month
- **Wikipedia API**: Free, no limits
- **Google AdSense**: Free to use, you earn money

## Support

If you encounter issues with any API integration, check:
1. API key is correctly entered
2. API quotas/limits not exceeded
3. Edge function logs for specific errors
