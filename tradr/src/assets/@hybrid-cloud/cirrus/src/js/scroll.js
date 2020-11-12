
// Scroll functions
(() => {

  window.cassie = window.cassie || {};

  let scroller = false;

  // A global function to scroll an element to a new position, which is
  // applied as the element's scrollTop so it can be a body scroll or an
  // internal element scroll depending on the element supplied. An
  // adaptive timing function based on viewport size is used. The scroll
  // start can optionally be supplied, otherwise the current scroll is
  // used as the start.

  window.cassie.scroll = (element, top, from) => {
    const t0 = Date.now(),
      isbody = (element === document.body),
      starttop = (from === undefined) ? (element.scrollTop || (isbody ? document.documentElement.scrollTop : 0)) : from,
      ambit = isbody ? window.innerHeight : element.clientHeight,
      endtop = Math.min(Math.max(0, top), element.scrollHeight - ambit),

      // maxspeed determines how fast the scroll will go (px/ms), and which way
      maxspeed = window.innerHeight / 40 * Math.sign(endtop - starttop),

      // acceltime is the duration in ms of the ease in/out
      acceltime = 1000,

      distance = endtop - starttop,
      cruisingdistance = distance - (maxspeed * acceltime),
      duration = (Math.sign(cruisingdistance) === Math.sign(maxspeed)) ?
        // if we'll reach maxspeed, two acceltimes plus linear travel between
        (2 * acceltime) + (cruisingdistance / maxspeed) :
        // otherwise we skip from quadratic accel to decel seamlessly
        2 * Math.sqrt(distance * acceltime / maxspeed),

      track = dt => (dt < acceltime) ?
        // up to acceltime we accelerate quadratically
        maxspeed * dt * dt / (2 * acceltime) :
        // after acceltime we scroll linearly at maxspeed
        (maxspeed * acceltime / 2) + (maxspeed * (dt - acceltime)),

      scrollto = newtop => {
        element.scrollTop = newtop;
        if (isbody) {
          document.documentElement.scrollTop = newtop;  // for FF
        }
      },

      animate = () => {
        let dt = Date.now() - t0;
        if (dt >= duration) {
          scrollto(endtop);
          clearInterval(scroller);
          scroller = false;
        } else {
          let newtop = (dt < duration / 2) ?
            starttop + track(dt) :
            endtop - track(duration - dt);
          scrollto(newtop);
          if (!scroller) {
            scroller = setInterval(animate, 10);
          }
        }
      };

      if (scroller) {
        clearInterval(scroller);
        scroller = false;
      }

      animate();
  };

  // An internal link (of the form href="#xxx") with class 'js-scroll-to' will
  // trigger a smooth scroll to bring the target to the top of the viewport
  // (or as near as possible) when the link is triggered.

  const scelement = '.js-scroll-to';

  let pending = false,
    runpending = () => {
      if (pending) {
        pending.apply();
        pending = false;
      }
    };

  const init = () => {
    Array.prototype.forEach.call(document.querySelectorAll(scelement), element =>
      element.addEventListener('click', e => {
        let fragment = element.getAttribute('href').match(/\#.*/);
        if (fragment) {
          let destination = document.querySelector(fragment[0]);
          if (destination) {
            // the link click will probably trigger a scroll which will interfere
            // with our smooth-scroll animation, so we store the animation as a
            // pending task and trigger it when the link scroll comes in or after
            // a short time (just in case).
            pending = cassie.scroll.bind(window,
                                         document.body,
                                         window.scrollY + destination.getBoundingClientRect().top,
                                         document.body.scrollTop || document.documentElement.scrollTop);
            setTimeout(runpending, 20);
          }
        }
      })
    );
  };

  window.onscroll = runpending;

  util.initOnReady(init);

})();
