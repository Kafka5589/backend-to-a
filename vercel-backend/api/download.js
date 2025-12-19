import { spawn } from 'child_process';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).send('URL ausente');
    return;
  }

  res.setHeader(
    'Content-Disposition',
    'attachment; filename="video.mp4"'
  );
  res.setHeader('Content-Type', 'video/mp4');

  const ytdlp = spawn('./bin/yt-dlp', [
  '-f', 'bv*+ba/b',
  '-o', '-',
  url
]);


  ytdlp.stdout.pipe(res);

  ytdlp.stderr.on('data', data => {
    console.error(data.toString());
  });

  ytdlp.on('close', code => {
    if (code !== 0) {
      res.end();
    }
  });
}
