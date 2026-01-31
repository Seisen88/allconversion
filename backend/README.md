# YouTube Download Backend

Python Flask backend for YouTube downloads using yt-dlp.

## Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `allconversion` repository
4. Set root directory to `/backend`
5. Railway will auto-detect Python and deploy
6. Copy your backend URL (e.g., `https://your-app.railway.app`)

## Deploy to Render

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
5. Deploy and copy your URL

## Deploy to Heroku

```bash
cd backend
heroku create your-app-name
git push heroku main
```

## Environment Variables

No environment variables needed!

## API Endpoints

### GET /health

Health check

### GET /api/info?url=YOUTUBE_URL

Get video information

### POST /api/download

Download video

```json
{
  "url": "https://youtube.com/watch?v=...",
  "format": "mp3"
}
```

## Supported Formats

- **Audio**: mp3, wav, aac, flac, m4a
- **Video**: mp4, webm, avi

## Local Testing

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on http://localhost:5000
