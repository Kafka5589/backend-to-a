import { spawn } from 'child_process';

export default function handler(req, res) {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    res.status(400).send('URL não fornecida');
    return;
  }

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="video.mp4"'
  );

  const ytdlp = spawn('./bin/yt-dlp', [
    videoUrl,
    '-f',
    'mp4',
    '-o',
    '-'
  ]);

  ytdlp.stdout.pipe(res);

  ytdlp.stderr.on('data', data => {
    console.error(data.toString());
  });

  ytdlp.on('close', () => {
    res.end();
  });
}

