
document.addEventListener('DOMContentLoaded', () => {
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


  const boutonShutdown = document.getElementById('shutdown');
  if (boutonShutdown) {
    boutonShutdown.addEventListener('click', function() {
      const toutesLesFenêtres = document.querySelectorAll('.win');
      toutesLesFenêtres.forEach(function(fenetre) {
        fenetre.classList.add('hidden');
        fenetre.setAttribute('aria-hidden', 'true');
      });

      const desktop = document.getElementById('desktop');
      if (desktop) {
        desktop.classList.add('hidden');
        desktop.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
