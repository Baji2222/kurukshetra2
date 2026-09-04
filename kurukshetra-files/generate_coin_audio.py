import math
import os
import random
import wave

OUT_DIR = os.path.join(os.getcwd(), 'public')
os.makedirs(OUT_DIR, exist_ok=True)
SAMPLE_RATE = 44100


def write_wav(path, frames):
    with wave.open(path, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(b''.join(frames))


def synth_track(name, duration=2.7, mode='dramatic'):
    frames = []
    total = int(SAMPLE_RATE * duration)

    for i in range(total):
        t = i / SAMPLE_RATE
        amp = 0.0

        if mode == 'dramatic':
            f1 = 120 * (1 + 0.45 * math.sin(2 * math.pi * 2.5 * t))
            amp += 0.22 * math.sin(2 * math.pi * f1 * t)
            sweep = 180 + 700 * min(t / duration, 1)
            amp += 0.16 * math.sin(2 * math.pi * sweep * t)
            if t > 0.7:
                amp += 0.12 * math.sin(2 * math.pi * (130 + 200 * (t - 0.7)) * t)
            if 0.92 < t < 1.15:
                amp += 0.35 * random.uniform(-1, 1) * (1 - abs((t - 1.03) / 0.15))
        elif mode == 'arcade':
            f1 = 220 + 180 * math.sin(2 * math.pi * 5.5 * t)
            amp += 0.22 * math.sin(2 * math.pi * f1 * t)
            bandwidth = 260 + 1300 * (t / duration)
            amp += 0.18 * math.sin(2 * math.pi * bandwidth * t)
            if 0.8 < t < 1.0:
                amp += 0.28 * random.uniform(-1, 1) * (1 - abs((t - 0.9) / 0.1))
        else:  # cinematic
            f1 = 85 + 140 * math.sin(2 * math.pi * 2.2 * t)
            amp += 0.28 * math.sin(2 * math.pi * f1 * t)
            sweep = 160 + 1100 * min(t / duration, 1)
            amp += 0.2 * math.sin(2 * math.pi * sweep * t)
            if 0.95 < t < 1.35:
                amp += 0.42 * random.uniform(-1, 1) * (1 - abs((t - 1.15) / 0.2))

        env = min(1.0, max(0.0, 1.0 - abs((t - duration * 0.6) / (duration * 0.7))))
        amp *= env * 0.7
        sample = max(-1.0, min(1.0, amp))
        value = int(max(-32768, min(32767, sample * 32767)))
        frames.append(value.to_bytes(2, byteorder='little', signed=True))

    write_wav(os.path.join(OUT_DIR, name), frames)


for mode, name in [
    ('dramatic', 'coin-dramatic.wav'),
    ('arcade', 'coin-arcade.wav'),
    ('cinematic', 'coin-cinematic.wav'),
]:
    synth_track(name, mode=mode)

print('Generated files:')
for file in ['coin-dramatic.wav', 'coin-arcade.wav', 'coin-cinematic.wav']:
    print(os.path.join(OUT_DIR, file))
