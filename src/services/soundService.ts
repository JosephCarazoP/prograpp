// Generador de sonidos táctiles y armónicos usando Web Audio API puro (100% offline y sin dependencias)

class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    this.isMuted = localStorage.getItem('prograpp_sound_muted') === 'true';
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('prograpp_sound_muted', String(this.isMuted));
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Sonido de clic táctil suave al tocar tokens
  public playToken() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Sonido de acierto (Acorde mayor ascendente brillante)
  public playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  // Sonido de error (Tono doble amortiguado no agresivo)
  public playError() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [220, 185]; // A3, F#3
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.09;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  // Fanfarria de lección completada
  public playWin() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.1 },
      { f: 659.25, d: 0.1 },
      { f: 783.99, d: 0.1 },
      { f: 1046.50, d: 0.3 }
    ];

    let t = this.ctx.currentTime;
    melody.forEach(note => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.9;
    });
  }

  // Toque 1 del cofre: Impacto sordo de madera maciza (golpe inicial)
  public playChestTap1() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Golpe grave de madera
    const oscThump = this.ctx.createOscillator();
    const gainThump = this.ctx.createGain();
    oscThump.type = 'triangle';
    oscThump.frequency.setValueAtTime(160, now);
    oscThump.frequency.exponentialRampToValueAtTime(70, now + 0.14);
    gainThump.gain.setValueAtTime(0.35, now);
    gainThump.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    oscThump.connect(gainThump);
    gainThump.connect(this.ctx.destination);
    oscThump.start(now);
    oscThump.stop(now + 0.14);

    // Resonancia de cerradura metálica pesada
    const oscLatch = this.ctx.createOscillator();
    const gainLatch = this.ctx.createGain();
    oscLatch.type = 'sine';
    oscLatch.frequency.setValueAtTime(320, now);
    oscLatch.frequency.exponentialRampToValueAtTime(180, now + 0.08);
    gainLatch.gain.setValueAtTime(0.18, now);
    gainLatch.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    oscLatch.connect(gainLatch);
    gainLatch.connect(this.ctx.destination);
    oscLatch.start(now);
    oscLatch.stop(now + 0.08);
  }

  // Toque 2 del cofre: Crujido de tensión creciente y pestillo forzado (doble chasquido vibrante)
  public playChestTap2() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Doble chasquido de crujido
    [0, 0.055].forEach((offset, idx) => {
      if (!this.ctx) return;
      const t = now + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const baseFreq = idx === 0 ? 280 : 440;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, t + 0.1);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    });
  }

  // Toque 3 del cofre: Gran estallido festivo y cascada de gemas mágicas
  public playChest() {
    this.playChestBurst();
  }

  public playChestBurst() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Boom de apertura
    const oscBoom = this.ctx.createOscillator();
    const gainBoom = this.ctx.createGain();
    oscBoom.type = 'triangle';
    oscBoom.frequency.setValueAtTime(220, now);
    oscBoom.frequency.exponentialRampToValueAtTime(45, now + 0.35);
    gainBoom.gain.setValueAtTime(0.4, now);
    gainBoom.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    oscBoom.connect(gainBoom);
    gainBoom.connect(this.ctx.destination);
    oscBoom.start(now);
    oscBoom.stop(now + 0.35);

    // Cascada de campanillas doradas (acorde triunfal expandido)
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + 0.05 + idx * 0.045;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.22);
    });
  }

  // Efecto de racha encendida (Sonido cálido y triunfal de fuego encendiéndose)
  public playStreak() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const chord = [392.00, 493.88, 587.33, 783.99, 987.77]; // G4, B4, D5, G5, B5
    let t = this.ctx.currentTime;
    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, noteTime + 0.3);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
  }

  // Grito / júbilo de salto triunfal ("¡Yujuuu!")
  public playYujuu() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Glissando musical alegre ascendente que imita el tono "Yu-juuu!"
    osc.frequency.setValueAtTime(460, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(1180, now + 0.32);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.22);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Efecto suave y soñoliento para Racha 0
  public playDormant() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.00]; // C4, E4, G4 suaves
    let t = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.08, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
  }

  // Alerta retro-arcade de aparición de jefe
  public playBossAlert() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(640, now + 0.14);
    osc.frequency.linearRampToValueAtTime(320, now + 0.28);
    osc.frequency.linearRampToValueAtTime(720, now + 0.44);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }
}

export const soundService = new SoundService();
