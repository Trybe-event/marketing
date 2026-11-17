import pathlib,sys,subprocess,json,math,wave,array,random,argparse
root=pathlib.Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--ffmpeg',default='ffmpeg')
parser.add_argument('--music',required=True,type=pathlib.Path)
parser.add_argument('--out',type=pathlib.Path,default=root/'out')
args=parser.parse_args()
if not args.music.is_file(): sys.exit('Supply the licensed music file with --music.')
output=root/'out';rate=48000;random.seed(84)
samples=array.array('f',[0])*(40*rate)
for start in [1.8,2.55,4.0,6.5,8.2,9.2,14.5,16.2,21.0,22.4,27.5,29.0,32.7,33.8,36.8]:
 for index in range(int(.6*rate)):
  t=index/rate;at=int(start*rate)+index;envelope=math.sin(math.pi*t/.6)**2
  samples[at]+=.1*math.sin(2*math.pi*(60*t+7*(1-math.exp(-t*22))))*math.exp(-t*9)+random.uniform(-1,1)*envelope*.035
for start in [4.1,4.34,4.57,4.8,5.03,5.27,6.56,11.8,13.7,18.6,22.84,24.5,26.34,37.1]:
 for index in range(int(.2*rate)):
  t=index/rate;at=int(start*rate)+index
  samples[at]+=.075*math.sin(2*math.pi*1046.5*t)*math.exp(-t*30)*min(1,t/.003)
pcm=array.array('h')
for sample in samples:
 value=round(max(-1,min(1,sample))*32767);pcm.extend([value,value])
with wave.open(str(output/'continuous-effects.wav'),'wb') as file:
 file.setnchannels(2);file.setsampwidth(2);file.setframerate(rate);file.writeframes(pcm.tobytes())
print('Frame-timed effects generated.',flush=True)
frames=sorted((output/'continuous-frames').glob('*.jpeg'))
if len(frames)!=1200:sys.exit(f'Waiting for complete frames: {len(frames)}/1200')
width=len(frames[0].stem.split('-')[-1]);ffmpeg=args.ffmpeg
config=json.loads((root/'scripts/narration-v2.json').read_text())
inputs=['-framerate','30','-i',str(output/'continuous-frames'/f'element-%0{width}d.jpeg'),'-i',str(args.music),'-i',str(output/'continuous-effects.wav')]
filters=[];labels=[]
for index,segment in enumerate(config['segments']):
 inputs+=['-i',str(root/'public/audio-v2'/f"voice-{segment['id']}.wav")]
 delay=round(segment['start']*1000);filters.append(f'[{index+3}:a]adelay={delay}|{delay}[voice{index}]');labels.append(f'[voice{index}]')
filters.append(''.join(labels)+f'amix=inputs={len(labels)}:normalize=0:duration=longest,apad,atrim=0:40,asplit=2[narration][trigger]')
filters.append("[1:a]atrim=0:40,asetpts=PTS-STARTPTS,volume='0.20+0.40*t/40':eval=frame,afade=t=in:st=0:d=1.2,afade=t=out:st=38.2:d=1.8[bed]")
filters.append('[bed][trigger]sidechaincompress=threshold=0.025:ratio=4:attack=15:release=300[ducked]')
filters.append('[2:a]volume=0.65[effects]')
filters.append('[narration][ducked][effects]amix=inputs=3:normalize=0:duration=longest,alimiter=limit=0.94,loudnorm=I=-16:TP=-1.5:LRA=8[mix]')
delivery=args.out
delivery.mkdir(parents=True,exist_ok=True)
target=delivery/'trybe-advert-continuous-v2-40s.mp4'
result=subprocess.run([ffmpeg,'-y',*inputs,'-filter_complex',';'.join(filters),'-map','0:v','-map','[mix]','-t','40','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart',str(target)],capture_output=True,text=True)
if result.returncode:sys.exit(result.stderr[-2000:])
print('Continuous advert encoded with actual LoVibe recording, new narration and timed effects.',flush=True)
