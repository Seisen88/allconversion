from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yt_dlp
import os
import tempfile
import uuid
from pathlib import Path

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Temporary directory for downloads
TEMP_DIR = tempfile.gettempdir()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'YouTube Download API is running'})

@app.route('/api/info', methods=['GET'])
def get_video_info():
    try:
        url = request.args.get('url')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            return jsonify({
                'title': info.get('title', 'Unknown'),
                'duration': info.get('duration', 0),
                'thumbnail': info.get('thumbnail', ''),
                'author': info.get('uploader', 'Unknown'),
                'view_count': info.get('view_count', 0),
            })
            
    except Exception as e:
        print(f"Error getting video info: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/download', methods=['POST'])
def download_video():
    temp_file = None
    
    try:
        data = request.get_json()
        url = data.get('url')
        format_type = data.get('format', 'mp4').lower()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        
        # Configure download options based on format
        if format_type in ['mp3', 'wav', 'aac', 'flac', 'm4a']:
            # Audio only
            temp_file = os.path.join(TEMP_DIR, f'{file_id}.%(ext)s')
            
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': temp_file,
                'quiet': True,
                'no_warnings': True,
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': format_type if format_type != 'm4a' else 'aac',
                    'preferredquality': '192',
                }],
            }
        else:
            # Video
            temp_file = os.path.join(TEMP_DIR, f'{file_id}.%(ext)s')
            
            ydl_opts = {
                'format': 'best',
                'outtmpl': temp_file,
                'quiet': True,
                'no_warnings': True,
            }
            
            if format_type == 'mp4':
                ydl_opts['merge_output_format'] = 'mp4'
        
        # Download the video
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get('title', 'video')
            
            # Find the actual downloaded file
            actual_file = None
            for ext in [format_type, 'mp4', 'webm', 'mkv', 'm4a', 'opus']:
                potential_file = temp_file.replace('.%(ext)s', f'.{ext}')
                if os.path.exists(potential_file):
                    actual_file = potential_file
                    break
            
            if not actual_file or not os.path.exists(actual_file):
                return jsonify({'error': 'Download failed - file not found'}), 500
            
            # Send file and clean up
            response = send_file(
                actual_file,
                as_attachment=True,
                download_name=f'{title}.{format_type}',
                mimetype=get_mime_type(format_type)
            )
            
            # Schedule file deletion after sending
            @response.call_on_close
            def cleanup():
                try:
                    if actual_file and os.path.exists(actual_file):
                        os.remove(actual_file)
                except:
                    pass
            
            return response
            
    except Exception as e:
        print(f"Download error: {str(e)}")
        
        # Clean up on error
        if temp_file:
            try:
                for ext in ['mp3', 'mp4', 'webm', 'mkv', 'm4a', 'wav', 'aac', 'flac']:
                    potential_file = temp_file.replace('.%(ext)s', f'.{ext}')
                    if os.path.exists(potential_file):
                        os.remove(potential_file)
            except:
                pass
        
        return jsonify({'error': str(e)}), 500

def get_mime_type(format_type):
    mime_types = {
        'mp3': 'audio/mpeg',
        'mp4': 'video/mp4',
        'wav': 'audio/wav',
        'webm': 'video/webm',
        'aac': 'audio/aac',
        'flac': 'audio/flac',
        'm4a': 'audio/mp4',
        'avi': 'video/x-msvideo',
    }
    return mime_types.get(format_type, 'application/octet-stream')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
