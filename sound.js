"use strict";

/* Tiny chiptune sound effects synthesized with the Web Audio API —
   no audio files to host, fits the 8-bit theme, and stays silent
   gracefully if audio isn't available. */
const SFX = (() => {
  const STORAGE_KEY = "pctg-sfx-enabled";
  let ctx = null;
  let enabled = true;

  try {
    enabled = localStorage.getItem(STORAGE_KEY) !== "off";
  } catch (e) {
    /* localStorage unavailable — default to enabled */
  }

  function getCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(c, freq, startTime, duration, type, gainPeak) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainPeak, startTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.03);
  }

  function play(notes) {
    if (!enabled) return;
    try {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime;
      notes.forEach((n) => {
        tone(c, n.freq, now + (n.delay || 0), n.duration || 0.12, n.type || "square", n.gain || 0.14);
      });
    } catch (e) {
      /* audio failed — fail silently, the game still works */
    }
  }

  return {
    pop: () => play([{ freq: 740, duration: 0.055, type: "square", gain: 0.1 }]),

    correct: () =>
      play([
        { freq: 523.25, delay: 0, duration: 0.09, type: "square", gain: 0.13 },
        { freq: 659.25, delay: 0.07, duration: 0.09, type: "square", gain: 0.13 },
        { freq: 783.99, delay: 0.14, duration: 0.18, type: "square", gain: 0.15 },
      ]),

    wrong: () =>
      play([
        { freq: 220, delay: 0, duration: 0.13, type: "sawtooth", gain: 0.12 },
        { freq: 174.61, delay: 0.09, duration: 0.2, type: "sawtooth", gain: 0.12 },
      ]),

    win: () =>
      play([
        { freq: 523.25, delay: 0, duration: 0.1, type: "square", gain: 0.14 },
        { freq: 659.25, delay: 0.1, duration: 0.1, type: "square", gain: 0.14 },
        { freq: 783.99, delay: 0.2, duration: 0.1, type: "square", gain: 0.14 },
        { freq: 1046.5, delay: 0.32, duration: 0.32, type: "square", gain: 0.17 },
      ]),

    lose: () =>
      play([
        { freq: 392, delay: 0, duration: 0.16, type: "triangle", gain: 0.13 },
        { freq: 329.63, delay: 0.15, duration: 0.16, type: "triangle", gain: 0.13 },
        { freq: 261.63, delay: 0.3, duration: 0.32, type: "triangle", gain: 0.13 },
      ]),

    isEnabled: () => enabled,

    toggle: () => {
      enabled = !enabled;
      try {
        localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
      } catch (e) {
        /* ignore */
      }
      if (enabled) getCtx();
      return enabled;
    },
  };
})();
