/* globals Shifter */

// ----- setup ----- //

var illoElem = document.querySelector('.illo');
var illoSize = 10;
var minWindowSize = Math.min( window.innerWidth - 20, window.innerHeight - 20 );
var zoom = Math.floor( minWindowSize / illoSize );
illoElem.setAttribute( 'width', illoSize * zoom );
illoElem.setAttribute( 'height', illoSize * zoom );

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  dragRotate: true,
});

// ----- model ----- //

var shifterA = new Shifter({
  addTo: illo,
  translate: { x: -3 },
});
var shifterB = new Shifter({
  addTo: illo,
});
var shifterC = new Shifter({
  addTo: illo,
  translate: { x: 3 },
});

// ----- animate ----- //

var ticker = 0;
var cycleCount = 80;

function animate() {
  // update
  var progress = ticker / cycleCount;
  shifterA.update( progress + 4 );
  shifterB.update( progress + 2 );
  shifterC.update( progress + 0 );
  ticker++;

  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();

