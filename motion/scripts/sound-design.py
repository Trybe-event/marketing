"""Original 114 BPM music bed and frame-timed UI/transition effects. No samples."""
import array
import json
import math
import pathlib
import random
import wave

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "audio"
OUTPUT.mkdir(exist_ok=True)
RATE = 48000
DURATION = 40
LENGTH = RATE * DURATION
BEAT = 60 / 114
random.seed(20261116)
music = array.array("f", [0]) * LENGTH
effects = array.array("f", [0]) * LENGTH

def tone(track, start, duration, frequency, gain, decay=3.5, kind="tone"):
    beginning = int(start * RATE)
    for sample in range(min(int(duration * RATE), LENGTH - beginning)):
        time = sample / RATE
        envelope = min(1, time / .008) * math.exp(-time * decay) * min(1, (duration-time)/.03)
        if kind == "kick":
            value = math.sin(2*math.pi*(47*time + 7.4*(1-math.exp(-time*32))))
        elif kind == "noise":
            value = random.uniform(-1,1) * (.5 + .5*math.sin(time*21100))
        else:
            value = math.sin(2*math.pi*frequency*time) + .19*math.sin(2*math.pi*frequency*2*time)
        track[beginning+sample] += value * envelope * gain

# D minor / B-flat / F / C. Restrained pads, short plucks and a warm low pulse.
chords = [[146.83,174.61,220,329.63],[116.54,146.83,174.61,261.63],
          [174.61,220,261.63,392],[130.81,164.81,196,293.66]]
beat = 0
while beat*BEAT < 36:
    start = beat * BEAT
    chord = chords[(beat//8)%4]
    if beat % 2 == 0:
        tone(music,start,.35,chord[0]/2,.13,9)
    tone(music,start,.25,0,.14 if start>4 else .075,12,"kick")
    if beat%4 in [1,3] and start>4:
        tone(music,start,.13,0,.042,26,"noise")
    if start>7:
        tone(music,start+BEAT/2,.06,0,.016,50,"noise")
    if beat%2 == 0:
        tone(music,start,.8,chord[(beat//2)%4]*2,.035,4.8)
    if beat%8==0:
        for frequency in chord:
            tone(music,start,4.8,frequency,.013,.6)
    beat += 1

cues=[]
for time in [3.75,8.25,14.25,21.25,26.75,32.75,36.75]:
    tone(effects,time,.38,0,.065,8,"noise")
    tone(effects,time+.12,.33,95,.075,11,"kick")
    cues.append({"seconds":time,"kind":"matte sweep / low impact"})
for time in [12.17,18.9,24.1,27.5,28.84,30.34,33.8]:
    tone(effects,time,.13,980,.08,28)
    tone(effects,time+.04,.19,1468,.025,22)
    cues.append({"seconds":time,"kind":"interface tick / confirmation"})
for frequency in [146.83,220,293.66,440]:
    tone(effects,37.05,2.9,frequency,.055,1.6)
tone(effects,37,.65,0,.14,9,"kick")
cues.append({"seconds":37,"kind":"final lockup chord and low resolve"})

voice=json.loads((ROOT/"scripts"/"narration.json").read_text())["segments"]
for index in range(LENGTH):
    time=index/RATE
    fade=min(1,time/.8,max(0,(40-time)/2.0))
    duck=1.0
    for segment in voice:
        if segment["start"]-.12 <= time <= segment["start"]+segment["slot"]+.12:
            duck=.57
            break
    music[index]*=fade*duck
    effects[index]*=min(1,max(0,(40-time)/.5))

def write(track,name):
    samples=array.array("h")
    for value in track:
        value=max(-.95,min(.95,value))
        samples.append(int(value*32767))
        samples.append(int(value*.96*32767))
    with wave.open(str(OUTPUT/name),"wb") as file:
        file.setparams((2,2,RATE,0,"NONE","not compressed"))
        file.writeframes(samples.tobytes())
write(music,"music.wav")
write(effects,"effects.wav")
(ROOT/"scripts"/"sound-cues.json").write_text(json.dumps(cues,indent=2))
print("Original music and synchronized effects rendered",flush=True)
