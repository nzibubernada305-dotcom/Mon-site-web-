
document.addEventListener('DOMContentLoaded', function() {
 boutons = document.querySelectorAll('.icon');

 
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

  
   boutonsFermer = document.querySelectorAll('.close');
  boutonsFermer.forEach(function(boutonFermeture) {
    boutonFermeture.addEventListener('click', function() {
      fenetre = boutonFermeture.closest('.win');
      if (fenetre) {
        fenetre.classList.add('hidden');
        fenetre.setAttribute('aria-hidden', 'true');
      }
    });
  });


   boutonShutdown = document.getElementById('shutdown');
  if (boutonShutdown) {
    boutonShutdown.addEventListener('click', function() {
      toutesLesFenêtres = document.querySelectorAll('.win');
      toutesLesFenêtres.forEach(function(fenetre) {
        fenetre.classList.add('hidden');
        fenetre.setAttribute('aria-hidden', 'true');
      });

      desktop = document.getElementById('desktop');
      if (desktop) {
        desktop.classList.add('hidden');
        desktop.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
