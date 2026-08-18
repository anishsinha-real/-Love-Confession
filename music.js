/* Made With Feelings — simple background music system.
   Mirrors the Happy-Birthday_hehe behavior without taking over navigation. */
(() => {
  const init = () => {
    const existingButton = document.querySelector('#sound, #soundToggle, .sound-toggle');
    const button = existingButton || document.createElement('button');

    if (!existingButton) {
      button.id = 'soundToggle';
      button.className = 'sound-toggle';
      button.type = 'button';
      button.setAttribute('aria-label', 'Toggle music');
      button.textContent = '♪';
      const top = document.querySelector('.top, header');
      (top || document.body).appendChild(button);
    } else {
      button.classList.add('sound-toggle');
      button.type = 'button';
      button.setAttribute('aria-label', 'Toggle music');
    }

    let music = document.querySelector('#bgMusic');
    if (!music) {
      music = document.createElement('audio');
      music.id = 'bgMusic';
      music.preload = 'auto';
      music.loop = true;
      music.playsInline = true;
      music.src = 'music2.mp3';
      document.body.appendChild(music);
    }

    music.loop = true;
    music.preload = 'auto';
    music.volume = 0.42;
    music.setAttribute('playsinline', '');

    let pausedByUser = false;

    const sync = () => {
      const playing = !music.paused && !music.ended;
      button.classList.toggle('active', playing);
      button.textContent = playing ? '♫' : '♪';
      button.setAttribute('aria-pressed', String(playing));
    };

    const play = async () => {
      try {
        await music.play();
        pausedByUser = false;
      } catch (_) {
        // Autoplay policy may require another gesture; the music button retries.
      }
      sync();
    };

    const unlock = () => {
      if (!pausedByUser && music.paused) play();
    };

    button.addEventListener('pointerdown', event => event.stopPropagation());
    button.addEventListener('touchstart', event => event.stopPropagation(), { passive: true });
    button.addEventListener('click', async event => {
      event.preventDefault();
      event.stopPropagation();

      if (music.paused) {
        await play();
      } else {
        pausedByUser = true;
        music.pause();
        sync();
      }
    });

    document.addEventListener('pointerdown', unlock, { once: true, passive: true });
    document.addEventListener('keydown', unlock, { once: true });
    music.addEventListener('play', sync);
    music.addEventListener('pause', sync);
    music.addEventListener('ended', sync);
    music.addEventListener('error', sync);

    sync();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
