<<<<<<< HEAD
# All Converter - Universal File Conversion Platform

A modern, minimalist web application for converting images, audio, video files, and downloading YouTube content. Built with Next.js, React, and Tailwind CSS.

![All Converter](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🖼️ **Image Converter**: Convert between PNG, JPG, WEBP, SVG, and GIF
- 🎵 **Audio/Video Converter**: Transform MP3, MP4, MOV, and WAV files
- 📺 **YouTube Downloader**: Download videos as MP3 or MP4
- 🌓 **Dark/Light Mode**: Persistent theme preference
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- ⚡ **Fast & Modern**: Built with Next.js App Router for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
All Converter/
├── app/
│   ├── layout.js          # Root layout with theme provider
│   ├── page.js            # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── Header.js          # Top navigation bar
│   ├── Sidebar.js         # Responsive sidebar
│   ├── Hero.js            # Hero section
│   ├── Converter.js       # Main converter with tabs
│   ├── ImageConverter.js  # Image conversion mode
│   ├── MediaConverter.js  # Audio/Video conversion mode
│   ├── YouTubeDownloader.js # YouTube download mode
│   ├── ThemeToggle.js     # Theme switcher
│   └── FileDropzone.js    # Drag & drop component
├── hooks/
│   └── useTheme.js        # Theme management hook
└── lib/
    └── converters.js      # Conversion logic (placeholder)
```

## 🔧 Backend Integration Required

This is a **frontend-only** implementation. To enable actual file conversion, you need to integrate with backend services:

### Image Conversion

**Option 1: Backend API**

- Use ImageMagick, Sharp, or similar libraries
- See comments in `lib/converters.js` for implementation details

**Option 2: Client-side Canvas API**

- Limited to basic raster format conversions
- No external dependencies needed

### Audio/Video Conversion

**Option 1: Backend with FFmpeg (Recommended)**

```javascript
// Node.js example with fluent-ffmpeg
const ffmpeg = require("fluent-ffmpeg");

app.post("/api/convert/media", upload.single("file"), (req, res) => {
  const { format } = req.body;
  ffmpeg(req.file.path)
    .output(`output.${format}`)
    .on("end", () => res.download(`output.${format}`))
    .run();
});
```

**Option 2: Client-side with ffmpeg.wasm**

```bash
npm install @ffmpeg/ffmpeg @ffmpeg/core
```

### YouTube Downloading

**Requires Backend** - Use ytdl-core, youtube-dl, or yt-dlp:

```javascript
// Node.js example with ytdl-core
const ytdl = require("ytdl-core");

app.post("/api/youtube/download", async (req, res) => {
  const { url, format } = req.body;

  if (format === "mp3") {
    ytdl(url, { filter: "audioonly" }).pipe(res);
  } else {
    ytdl(url, { quality: "highest" }).pipe(res);
  }
});
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Supported Formats

Add or remove formats in the respective converter components:

- `components/ImageConverter.js` - IMAGE_FORMATS array
- `components/MediaConverter.js` - MEDIA_FORMATS array

## 📝 License

This project is open source and available under the MIT License.

## ⚠️ Important Notes

- **YouTube Downloads**: Always respect copyright laws and YouTube's Terms of Service
- **File Size Limits**: Adjust `maxSize` props in FileDropzone components based on your server capabilities
- **Browser Compatibility**: Tested on modern browsers (Chrome, Firefox, Safari, Edge)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
=======
# allconversion
>>>>>>> 5c743f76e26c40a4379ecad173eb946594471650
