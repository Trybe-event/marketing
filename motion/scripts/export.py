"""Encode the email loop from lossless Remotion frames; no audio or network."""
import argparse
import os
import pathlib
import subprocess
import shutil

ROOT = pathlib.Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--ffmpeg', default=os.environ.get('FFMPEG_PATH', 'ffmpeg'))
args = parser.parse_args()
output = ROOT / 'out'
frames = sorted((output / 'email-frames').glob('element-*.png'))
if len(frames) != 360:
    raise SystemExit('Render all 360 email PNG frames first: node scripts/render.mjs --email-only --frames')
padding = len(frames[0].stem.split('-')[-1])
pattern = str(output / 'email-frames' / f'element-%0{padding}d.png')
filters = ('fps=6,scale=1200:360:flags=lanczos,split[a][b];'
           '[a]palettegen=max_colors=128:stats_mode=diff[p];'
           '[b][p]paletteuse=dither=none:diff_mode=rectangle')
for arguments in [
    ['-framerate', '30', '-i', pattern, '-filter_complex', filters,
     '-gifflags', '+transdiff', '-loop', '0', str(output/'trybe-email-loop-v3.gif')],
    ['-framerate', '30', '-i', pattern, '-an', '-c:v', 'libx264', '-crf', '17',
     '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output/'trybe-email-loop.mp4')],
]:
    result = subprocess.run([args.ffmpeg, '-y', *arguments], capture_output=True, text=True)
    if result.returncode:
        raise SystemExit(result.stderr[-2000:])
shutil.copyfile(frames[0], output/'trybe-email-poster-v1.png')
print('Lossless-source email GIF, silent MP4 and first-frame poster exported.')
