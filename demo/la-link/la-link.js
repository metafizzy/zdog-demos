// ------------------------- demo ------------------------- //

var illoElem = document.querySelector('.zdog-canvas');
var sceneSize = 128;
var minWindowSize = Math.min( window.innerWidth, window.innerHeight );
var zoom = Math.floor( minWindowSize / sceneSize );
var illoSize = sceneSize * zoom;
illoElem.setAttribute( 'width', illoSize );
illoElem.setAttribute( 'height', illoSize );
var isSpinning = false;
var TAU = Zdog.TAU;

// colors
var skinTone = '#FEA';
var amber = '#FB2';
var green = '#462';
var blue = '#59F';
// var brown = '#743';
var brown = '#832';
var black = '#222';
var yellow = '#FF4';
var silver = '#ABB';
var lightGreen = '#3A4';
var white = '#DDD';

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  dragRotate: true,
  resize: 'fullscreen',
  onDragStart: function() {
    isSpinning = false;
  },
  onResize: function( width, height ) {
    this.zoom = Math.floor( Math.min( width, height ) / sceneSize );
  },
});

// ----- head ----- //

var headAnchor = new Zdog.Anchor({
  addTo: illo,
});

// face
var face = new Zdog.Hemisphere({
  addTo: headAnchor,
  diameter: 38,
  rotate: { x: -TAU/8 },
  color: skinTone,
  backface: amber,
  stroke: false,
});

// used for copying one side the other
var headSide = new Zdog.Anchor({
  addTo: headAnchor,
});

var eye = new Zdog.Ellipse({
  addTo: headSide,
  width: 3,
  height: 8,
  translate: { x: -6, y: 2, z: 18 },
  color: black,
  fill: true,
  backface: false,
});

var brow = new Zdog.Shape({
  addTo: eye,
  path: [
    { x: -3, y: -1, z: -1 },
    { arc: [
      { x: -2, y: -3 },
      { x: 3, y:  0.5 },
    ]},
  ],
  color: brown,
  translate: { x: -1, y: -6 },
  fill: true,
});

// mouth
new Zdog.Shape({
  addTo: headAnchor,
  path: [
    { x: -3 },
    { arc: [
      { y: -2, z: 1 },
      { x:  3 },
    ]},
  ],
  closed: false,
  translate: { y: 11, z: 15 },
  color: brown,
});

// big bang lock
new Zdog.Shape({
  addTo: headAnchor,
  path: [
    { x: 0 },
    { arc: [
      { x: -12, y: -4, z: 4 },
      { x: -24, y: 6, z: -4 },
    ]},
    { arc: [
      { x: -12, y: -8, z: -2 },
      { x: 0, y: -4, z: -4 }
    ]},
  ],
  translate: { x: 4, y: -16, z: 19 },
  fill: true,
  color: amber,
  stroke: 12,
});

// front part lock
new Zdog.Shape({
  addTo: headAnchor,
  path: [
    { y: 0 },
    { arc: [
      { x: 4, y: 0, z: 2 },
      { x: 10, y: 14, z: -6 },
    ]},
    { arc: [
      { x: 4, y: 0, z: -4 },
      { y: -2, z: -4 },
    ]}
  ],
  translate: { x: 12, y: -15, z: 15 },
  fill: true,
  color: amber,
  stroke: 10,
});

// hair crown
// new Zdog.Ellipse({
//   addTo: face,
//   width: 24,
//   height: 12,
//   translate: { y: -12, z: -9 },
//   color: amber,
//   stroke: 18,
//   fill: true,
// });

// ear
new Zdog.Shape({
  addTo: headSide,
  path: [
    { x: 0 },
    { arc: [
      { x: -2, y: -2 },
      { x: -4, y: -1 },
    ]},
    { arc: [
      { x: -2, y:  4 },
      { x:  0, y:  4, z: -4 },
    ]},
  ],
  scale: { x: 3 },
  translate: { x: -18, y: 2, z: 2 },
  rotate: { y: TAU/8 },
  color: skinTone,
  stroke: 4,
  fill: true,
});

// side down lock
new Zdog.Shape({
  addTo: headSide,
  path: [
    { y: 0 },
    { arc: [
      { y: 6 },
      { x: -1, y: 16, z: -2 },
    ]},
  ],
  closed: false,
  translate: { x: -19, z: 5 },
  stroke: 6,
  color: amber,
});

// crown hair gap
new Zdog.Shape({
  addTo: headSide,
  path: [
    { x: -1 },
    { arc: [
      { x: -1, y: -1 },
      { x:  0, y: -1 },
    ]},
  ],
  closed: false,
  scale: { x: 14, y: 12 },
  translate: { y: -8 },
  rotate: { x: -TAU/32 },
  color: amber,
  stroke: 20,
})

headSide.copyGraph({
  scale: { x: -1 },
});

// ----- animate ----- //

function animate() {
  illo.rotate.y += isSpinning ? +TAU/150 : 0;
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();

