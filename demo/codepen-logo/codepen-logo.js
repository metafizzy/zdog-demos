// ----- setup ----- //

var illoElem = document.querySelector('.illo');
var illoSize = 48;
var minWindowSize = Math.min( window.innerWidth, window.innerHeight );
var zoom = Math.floor( minWindowSize / illoSize );
illoElem.setAttribute( 'width', illoSize * zoom );
illoElem.setAttribute( 'height', illoSize * zoom );

var TAU = Zdog.TAU;
var isSpinning = true;

var illo = new Zdog.Illustration({
  element: illoElem,
  scale: 4,
  zoom: zoom,
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

var tiltAngle = Math.asin(2/3);

var prism = new Zdog.Anchor({
  addTo: illo,
});

// ----- model ----- //

var RT2 = Math.sqrt(2);
var capLength = 6/RT2;
var sideLength =  2 / Math.cos( tiltAngle );
var sideZ = sideLength/2;

var cap = new Zdog.Rect({
  width: capLength,
  height: capLength,
  addTo: prism,
  translate: { z: -sideZ },
  stroke: 2,
  color: 'white',
});

cap.copy({
  translate: { z: sideZ },
});

var side = new Zdog.Shape({
  addTo: prism,
  path: [ { z: -1 }, { z: 1 } ],
  scale: sideZ,
  translate: { x: capLength/2, y: capLength/2 },
  stroke: 2,
  color: 'white',
});
side.copy({
  translate: { x: -capLength/2, y: capLength/2 },
});
side.copy({
  translate: { x: -capLength/2, y: -capLength/2 },
});
side.copy({
  translate: { x:  capLength/2, y: -capLength/2 },
});

// -- animate --- //

var ticker = 0;
var cycleCount = 90;

function animate() {
  // update
  if ( isSpinning ) {
    var progress = ticker / cycleCount;
    var tween = Zdog.easeInOut( progress % 1, 3 );
    var turn = Math.floor( progress );
    if ( turn === 0 ) {
      illo.rotate.z = Zdog.lerp( TAU/8 * -3, TAU/8, tween );
      illo.rotate.x = Zdog.lerp( 0, tiltAngle, tween );
    } else if ( turn == 1 ) {
      prism.rotate.x = Zdog.lerp( -TAU/2, 0, tween );
    }
    ticker++;
  }

  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();


// ----- inputs ----- //

document.querySelector('.reset-button').onclick = reset;

function reset() {
  ticker = 0;
  illo.rotate.set({});
  isSpinning = true;
}
