// -------------------------- demo -------------------------- //

var illoElem = document.querySelector('.illo');
var sceneSize = 88;
var zoom = 5;
var illoSize = sceneSize * zoom;
illoElem.setAttribute( 'width', illoSize );
illoElem.setAttribute( 'height', illoSize );
var TAU = Zdog.TAU;
var initRotate = { x: TAU/16, y: TAU/8 };

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  rotate: initRotate,
  dragRotate: true,
});

// colors
var light = '#FFF';
var dark = '#333';

var darkStroke = {
  addTo: illo,
  color: dark,
  stroke: 2,
  fill: false,
};

var lightFill = {
  addTo: illo,
  color: light,
  stroke: false,
  fill: true,
};

var allDark = {
  addTo: illo,
  color: dark,
  fill: true,
  stroke: 2,
};

// -- illustration shapes --- //

var bedSidePath = [
  { x: -32, y: -4 },
  { x:  -8, y: -4 },
  { x:  -8, y:  8 },
  { x: -32, y:  8 },
];

var darkStrokeSide = Zdog.extend( {translate: { z: 12 }}, darkStroke );
var lightFillSide = Zdog.extend( {translate: { z: 12 }}, lightFill );
var allDarkSide = Zdog.extend( {translate: { z: -12 }}, allDark );

// sides, outer
[ lightFillSide, darkStrokeSide, allDarkSide ].forEach( function( sideOptions ) {

  // door
  new Zdog.Shape( Zdog.extend( {
    path: [
      { x:  -8, y: -14 },
      { x:  10, y: -14 },
      { x:  20, y:  -4 },
      { x:  20, y:   8 },
      { x:  -8, y:   8 },
    ],
  }, sideOptions ) );

  // bed side
  new Zdog.Shape( Zdog.extend( {
    path: bedSidePath,
  }, sideOptions ) );

  // front side
  new Zdog.Shape( Zdog.extend( {
    path: [
      { x: 20, y: -4 },
      { x: 32, y: -4 },
      { x: 32, y:  8 },
      { x: 20, y:  8 },
    ],
  }, sideOptions ) );

});

// inside bed
// side, dark
new Zdog.Shape( Zdog.extend( { 
  path: bedSidePath,
  translate: { z: 11 }
}, allDark ));
// side light
new Zdog.Shape( Zdog.extend( { 
  path: bedSidePath,
  translate: { z: -11 }
}, lightFill ));
new Zdog.Shape( Zdog.extend( { 
  path: bedSidePath,
  translate: { z: -11 }
}, darkStroke ));

// underside

// back underside
new Zdog.Shape( Zdog.extend( {
  path: [
    { x: -32, z:  12 },
    { x:  -8, z:  12 },
    { x:  -8, z: -12 },
    { x: -32, z: -12 },
  ],
  translate: { y: 8 },
}, allDark ) );
// door underside
new Zdog.Shape( Zdog.extend( {
  path: [
    { x: -8, z: 12 },
    { x: 20, z: 12 },
    { x: 20, z: -12 },
    { x: -8, z: -12 },
  ],
  translate: { y: 8 },
}, allDark ) );
// front underside
new Zdog.Shape( Zdog.extend( {
  path: [
    { x: 20, z: 12 },
    { x: 32, z: 12 },
    { x: 32, z: -12 },
    { x: 20, z: -12 },
  ],
  translate: { y: 8 },
}, allDark ) );

// roof
var roof = new Zdog.Shape( Zdog.extend( {
  path: [
    { x:  -8, z: 12 },
    { x:  10, z: 12 },
    { x:  10, z: -12 },
    { x:  -8, z: -12 },
  ],
  translate: { y: -14 },
}, lightFill ) );
roof.copy( darkStroke );

// windshield
new Zdog.Shape( Zdog.extend( {
  path: [
    { x: 10, y: -14, z: 12 },
    { x: 10, y: -14, z: -12 },
    { x: 20, y:  -4, z: -12 },
    { x: 20, y:  -4, z: 12 },
  ],
}, allDark ) );

// hood
var hood = new Zdog.Shape( Zdog.extend( {
  path: [
    { x: 20, z: 12 },
    { x: 32, z: 12 },
    { x: 32, z: -12 },
    { x: 20, z: -12 },
  ],
  translate: { y: -4 },
}, lightFill ) );
hood.copy( darkStroke );

var frontGroup = new Zdog.Group({
  addTo: illo,
  translate: { x: 32, y: 2 },
  rotate: { y: -TAU/4 },
  // translate: { z: 1 }
});

// front
new Zdog.Rect({
  addTo: frontGroup,
  width: 24,
  height: 12,
  color: dark,
  fill: true,
  stroke: 2,
});

var frontDetails = new Zdog.Anchor({
  addTo: frontGroup,
  translate: { z: 0.5 },
});

// front details
var headlight = new Zdog.Rect({
  width: 2,
  height: 2,
  addTo: frontDetails,
  translate: { x: -9, y: -3 },
  color: light,
  stroke: 2,
});
headlight.copy({
  translate: { x: 9, y: -3 },
});

// top line
var grillLine = new Zdog.Shape({
  path: [
    { x: -4 },
    { x: 4 },
  ],
  addTo: frontDetails,
  translate: { y: -4 },
  color: light,
  closed: false,
  stroke: 2,
});
grillLine.copy({
  translate: { y: 0 },
});
grillLine.copy({
  path: [
    { x: -10 },
    { x: 10 },
  ],
  translate: { y: 4 },
});

// tail
var tail = new Zdog.Rect( Zdog.extend({
  width: 24,
  height: 12,
  addTo: illo,
  translate: { x: -32, y: 2 },
  rotate: { y: TAU/4 },
}, lightFill ));
tail.copy( darkStroke );
// tail inside
tail.copy({
  color: dark,
  translate: { x: -31, y: 2 },
});

var tailGroup = new Zdog.Group({
  addTo: tail,
  translate: { z: -0 },
});

// back details
var backlight = new Zdog.Rect({
  width: 4,
  height: 4,
  addTo: tailGroup,
  translate: { x: -10, y: -4 },
  color: dark,
  stroke: 2, 
  fill: true,
});
backlight.copy({
  translate: { x: 10, y: -4 },
});
// back bumper
new Zdog.Shape({
  path: [
    { x: -11 },
    { x: 11 },
    { move: { z: 64 } }, // 'nother hack
  ],
  addTo: tailGroup,
  translate: { y: 5, z: 1 },
  color: dark,
  stroke: 4,
  closed: false,
});

// cab back
var cabBackTop = new Zdog.Shape({
  path: [
    { y: -14, z: 12 },
    { y:  -4, z: 12 },
    { y:  -4, z: -12 },
    { y: -14, z: -12 },
  ],
  addTo: illo,
  translate: { x: -8 },
  color: light,
  stroke: false,
  fill: true,
});
cabBackTop.copy({
  color: dark,
  fill: false,
  stroke: 2,
});

var cabBackBottom = new Zdog.Shape({
  path: [
    { y: -4, z: 12 },
    { y:  8, z: 12 },
    { y:  8, z: -12 },
    { y: -4, z: -12 },
  ],
  addTo: illo,
  translate: { x: -8 },
  color: light,
  stroke: false,
  fill: true,
});
cabBackBottom.copy({
  color: dark,
  fill: false,
  stroke: 2,
});

// WHEELS

// front light
var lightFillWheel = new Zdog.Shape( Zdog.extend({
  path: [
    { x: 0, y: -6 },
    { arc: [ // top right
      { x: 6, y: -6 },
      { x: 6, y: 0 },
    ]},
    { arc: [ // bottom right
      { x: 6, y: 6 },
      { x: 0, y: 6 },
    ]},
    { arc: [ // bottom left
      { x: -6, y: 6 },
      { x: -6, y: 0 },
    ]},
    { arc: [ // bottom left
      { x: -6, y: -6 },
      { x: 0, y: -6 },
    ]},
    // hack, add a big move up to fix z-sort bug
    { move: { x: 0, y: -64, z: 64 } },
  ],
  closed: false,
  translate: { x: 18, y: 8, z: 14 },
}, lightFill ));
var darkStrokeWheel = lightFillWheel.copy({
  fill: false,
  stroke: 4,
  color: dark,
});
var darkWheel = new Zdog.Ellipse({
  diameter: 12,
  addTo: illo,
  translate: { x: 18, y: 8, z: 10 },
  color: dark,
  stroke: 4,
  fill: true,
});


// back light
lightFillWheel.copy({
  translate: { x: -18, y: 8, z: 14 }
});
darkStrokeWheel.copy({
  translate: { x: -18, y: 8, z: 14 }
});
darkWheel.copy({
  translate: { x: -18, y: 8, z: 10 },
});

// front dark
darkWheel.copy({
  translate: { x: 18, y: 8, z: -14 }
});
darkWheel.copy({
  translate: { x: 18, y: 8, z: -10 }
});

// back dark
darkWheel.copy({
  translate: { x: -18, y: 8, z: -14 }
});
darkWheel.copy({
  translate: { x: -18, y: 8, z: -10 }
});

// -- animate --- //

function animate() {
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();

// ----- inputs ----- //

document.querySelector('.quarter-twist-button').onclick = function() {
  illo.rotate.set( initRotate );
};
