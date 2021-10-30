
//import 'lazysizes'
//const anime = require('anime.min.js');
//const Alpine = require('alpinejs');
//const barba = require('barba.min.js');

function init() { 

    function menuAnim() {
        
        anime.set('#ListMenuMobile', { display: 'block', opacity: 0, visibility: 'visible', 'z-index': 50})
        anime({
            targets: '#ListMenuMobile',
            duration: 500,
         
            delay: 0,
            
            opacity:1,
           
            easing: 'easeInOutSine',
        });
        
    }
    document.getElementById('BtnMenuMobile').onclick = function() { menuAnim() };


    

    function animeOut() {
        anime.set('.loader', { opacity: 1, visibility: 'visible', display: 'flex' })
        anime({
            targets: ['.loader-row-1', '.loader-row-3'],
            duration: 500,
            easing: 'easeInQuad',
            width: ['100%', 0],    
        });
        anime({
            targets: ['.loader-row-2'],
            duration: 500,
            easing: 'easeInQuad',
            width: [0, '100%'],
        });
    }

    function animeIn() {
        anime({
            targets: ['.loader'],
            duration: 600,
            easing: 'easeInQuad',
            opacity: 0,
            complete: function(anim) {
                anim.set('.loader', {  visibility: 'hidden', display: 'none' })
            }
        });
    }

    barba.init({
        transitions: [{
            name: 'f',
            enter() {
                return animeIn();
            },
            leave() {
                return animeOut();
            },
        }]
    });
}

window.addEventListener('load', function() {
    init();
});


/*
  // do something before the transition starts
  barba.hooks.before(() => {

      document.querySelector('html').classList.add('is-transitioning');
      barba.wrapper.classList.add('is-animating');

  });

  // do something after the transition finishes
  barba.hooks.after(() => {

      document.querySelector('html').classList.remove('is-transitioning');
      barba.wrapper.classList.remove('is-animating');

  });

  // scroll to the top of the page
  barba.hooks.enter(() => {

      window.scrollTo(0, 0);

  });
*/
