// Attendre que toute la page soit chargée avant de lancer le code
document.addEventListener('DOMContentLoaded', function() {

  // clic sur #computer
  var computer = document.getElementById('computer');
  var bootScreen = document.getElementById('bootScreen');//écran de démarrage
  var desktop = document.getElementById('desktop');

  if (computer) {
    computer.addEventListener('click', function() {

      if (bootScreen) {
        bootScreen.classList.add('hidden');
      }
      // Affiche le bureau
      if (desktop) {
        desktop.classList.remove('hidden');
        desktop.setAttribute('aria-hidden', 'false');
      }
      // Lance la création de la grille de pixels
      makePixels(10, 10);
    });
  }

  // 2. Ouvrir les fenêtres en cliquant sur les icônes (.icon)
  var boutons = document.querySelectorAll('.icon');
  boutons.forEach(function(bouton) {
    bouton.addEventListener('click', function() {
      var targetId = bouton.getAttribute('data-target');
      var element = document.getElementById(targetId);
      if (element) {
        element.classList.remove('hidden');
        element.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // 3. Fermer les fenêtres en cliquant sur la croix (.close)
  var boutonsFermer = document.querySelectorAll('.close');
  boutonsFermer.forEach(function(boutonFermeture) {
    boutonFermeture.addEventListener('click', function() {
      var fenetre = boutonFermeture.closest('.win');
      if (fenetre) {
        fenetre.classList.add('hidden');
        fenetre.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // 4. Éteindre le système avec le bouton #shutdown
  var boutonShutdown = document.getElementById('shutdown');
  if (boutonShutdown) {
    boutonShutdown.addEventListener('click', function() {
      // Ferme toutes les fenêtres ouvertes
      var toutesLesFenêtres = document.querySelectorAll('.win');
      toutesLesFenêtres.forEach(function(fenetre) {
        fenetre.classList.add('hidden');
        fenetre.setAttribute('aria-hidden', 'true');
      });

      // Cache le bureau
      if (desktop) {
        desktop.classList.add('hidden');
        desktop.setAttribute('aria-hidden', 'true');
      }

      // Remet l'écran de démarrage d'origine
      if (bootScreen) {
        bootScreen.classList.remove('hidden');
      }
    });
  }

});

// 5. Fonction pour générer la grille de pixels dans #screen
function makePixels(nombreColonnes, nombreLignes) {
  var ecran = document.getElementById('screen');
  if (!ecran) {
    return;
  }
  
  // Vider d'abord le contenu de l'écran
  ecran.innerHTML = '';
  
  // Appliquer le nombre de colonnes en CSS
  ecran.style.gridTemplateColumns = 'repeat(' + nombreColonnes + ', 1fr)';
  
  // Boucler pour créer les pixels un par un
  var totalPixels = nombreColonnes * nombreLignes;
  var i = 0;
  
  while (i < totalPixels) {
    var unPixel = document.createElement('div');
    unPixel.classList.add('pixel');
    ecran.appendChild(unPixel);
    i = i + 1;
  }
}
