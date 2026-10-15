
document.addEventListener('DOMContentLoaded', function() {
 boutons = document.querySelectorAll('.icon');

   computer = document.getElementById('computer');
   bootScreen = document.getElementById('bootScreen');
   screen = document.getElementById('screen');
   bootInstruction = document.getElementById('bootInstruction');
  desktop = document.getElementById('desktop');
   boutonShutdown = document.getElementById('shutdown');

  // --- fonctions pour les "pixels" ---
  function makePixels(cols = 40, rows = 12) {
    if (!screen) return;
    screen.style.display = 'grid';
    screen.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    screen.innerHTML = '';
    for (let i = 0; i < cols * rows; i++) {
         p = document.createElement('div');
      p.className = 'pixel';
      screen.appendChild(p);
    }
  }

  function bootSequence(onFinished) {
    if (!screen) {
      if (typeof onFinished === 'function') onFinished();
      return;
    }
    const pixels = Array.from(screen.querySelectorAll('.pixel'));
    // allumage séquentiel (ou shuffle si tu préfères)
    pixels.forEach((p, i) => {
      setTimeout(() => p.classList.add('on'), i * 10);
    });
    const total = pixels.length * 10 + 200;
    setTimeout(() => {
      // petit clignotement final
      pixels.forEach((p, i) => setTimeout(() => p.classList.toggle('on'), i * 2));
      setTimeout(() => {
        // éteindre tous les pixels
        pixels.forEach(p => p.classList.remove('on'));
        if (typeof onFinished === 'function') onFinished();
      }, 500);
    }, total);
  }

  // --- démarrage depuis le boot ---
  function startFromBoot() {
    if (!bootInstruction || !bootScreen || !desktop) return;
    bootInstruction.textContent = 'Démarrage...';
    // empêcher double clic
    if (computer) {
      computer.removeEventListener('click', startFromBoot);
      computer.removeEventListener('keydown', onKeyDown);
    }
    bootSequence(() => {
      bootScreen.classList.add('hidden');
      desktop.classList.remove('hidden');
      desktop.setAttribute('aria-hidden', 'false');
    });
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') startFromBoot();
  }

  // init pixels et listeners du computer
  makePixels();
  if (computer) {
    computer.addEventListener('click', startFromBoot);
    computer.addEventListener('keydown', onKeyDown);
  }

  // --- ouvrir les fenêtres (icônes) ---
  const boutons = document.querySelectorAll('.icon');
  boutons.forEach(function(bouton) {
    bouton.addEventListener('click', function() {
      const targetId = bouton.getAttribute('data-target');
      const element = document.getElementById(targetId);
      if (element) {
        element.classList.remove('hidden');
        element.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // --- fermer les fenêtres ---
  const boutonsFermer = document.querySelectorAll('.close');
  boutonsFermer.forEach(function(boutonFermeture) {
    boutonFermeture.addEventListener('click', function() {
      const fenetre = boutonFermeture.closest('.win');
      if (fenetre) {
        fenetre.classList.add('hidden');
        fenetre.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // --- shutdown : revenir à l'écran de boot et réinitialiser ---
  if (boutonShutdown) {
    boutonShutdown.addEventListener('click', function() {
      // cacher toutes les fenêtres
      const toutesLesFenêtres = document.querySelectorAll('.win');
      toutesLesFenêtres.forEach(function(fenetre) {
        fenetre.classList.add('hidden');
        fenetre.setAttribute('aria-hidden', 'true');
      });

      // cacher le desktop
      if (desktop) {
        desktop.classList.add('hidden');
        desktop.setAttribute('aria-hidden', 'true');
      }

      // ré-afficher le boot
      if (bootScreen) {
        bootScreen.classList.remove('hidden');
      }
      if (bootInstruction) {
        bootInstruction.textContent = "Clique sur l'ordinateur pour démarrer";
      }

      // recréer les pixels et réactiver le clic sur l'ordi
      makePixels();
      if (computer) {
        computer.addEventListener('click', startFromBoot);
        computer.addEventListener('keydown', onKeyDown);
      }
    });
  }
});
