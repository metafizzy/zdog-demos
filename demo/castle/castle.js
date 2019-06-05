// -------------------------- demo -------------------------- //

var illoElem = document.querySelector('.illo');
var illoSize = 24;
var minWindowSize = Math.min( window.innerWidth - 20, window.innerHeight - 40 );
var zoom = Math.floor( minWindowSize / illoSize );
illoElem.setAttribute( 'width', illoSize * zoom );
illoElem.setAttribute( 'height', illoSize * zoom );

[ Zdog.Shape, Zdog.Rect ].forEach( function( ItemClass ) {
  ItemClass.defaults.fill = true;
  ItemClass.defaults.backface = false;
  ItemClass.defaults.stroke = 1/zoom;
});

var white = 'white';
var black = '#333';
var isSpinning = true;
var TAU = Zdog.TAU;
var initRotate = { y: TAU/4 };

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  rotate: initRotate,
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

// -- illustration shapes --- //

function makeWall( options ) {
  var rotor = new Zdog.Anchor({
    addTo: illo,
    rotate: options.rotate,
  });

  // rotor
  var wall = new Zdog.Anchor({
    addTo: rotor,
    translate: { z: 4 },
  });

  var topBlock = new Zdog.Anchor({
    addTo: wall,
    translate: { x: -4, y: -4 },
  });

  // side faces
  var face = new Zdog.Rect({
    addTo: topBlock,
    width: 2,
    height: 2,
    translate: { z: 1 },
    color: options.outside,
  });
  face.copy({
    translate: { x: -1 },
    rotate: { y: TAU/4 },
    color: options.left,
  });
  face.copy({
    translate: { x: 1 },
    rotate: { y: -TAU/4 },
    color: options.right,
  });
  face.copy({
    translate: { z: -1 },
    rotate: { y: TAU/2 },
    color: options.inside,
  });
  // top
  face.copy({
    translate: { y: -1 },
    rotate: { x: TAU/4 },
    color: black,
  });

  topBlock.copyGraph({
    translate: { x:  0, y: -4 },
  });

  var topTile = new Zdog.Rect({
    addTo: wall,
    width: 2,
    height: 2,
    color: black,
    rotate: { x: TAU/4 },
    translate: { x: -2, y: -3 },
  });
  topTile.copy({
    translate: { x:  2, y: -3 }
  });

  // outside arch

  // outside arch
  var arch = new Zdog.Shape({
    addTo: wall,
    path: [
      { x: 0, y: -3 },
      { x: 3, y: -3 },
      { x: 3, y:  2 },
      { arc: [
        { x: 3, y: -1 },
        { x: 0, y: -1 }
      ]},
    ],
    translate: { z: 1 },
    color: options.outside,
  });
  arch.copy({
    scale: { x: -1 },
  });


  // inside arch
  arch.copy({
    translate: { z: -1 },
    rotate: { y: TAU/2 },
    color: options.inside,
  });
  arch.copy({
    translate: { z: -1 },
    rotate: { y: TAU/2 },
    scale: { x: -1 },
    color: options.inside,
  });

  // outside columns
  var outsideColumn = new Zdog.Rect({
    addTo: wall,
    width: 2,
    height: 8,
    translate: { x: -4, y: 1, z: 1 },
    color: options.outside,
  });
  outsideColumn.copy({
    translate: { x: 4, y: 1, z: 1 },
  });

  var insideColumn = new Zdog.Rect({
    addTo: wall,
    width: 2,
    height: 3,
    translate: { x: -3, y: 3.5 },
    rotate: { y: -TAU/4 },
    color: options.right,
  });
  insideColumn.copy({
    translate: { x:  3, y: 3.5 },
    rotate: { y: TAU/4 },
    color: options.left,
  });

  // under arch, quarter arc
  var underArch = new Zdog.Shape({
    addTo: wall,
    path: [
      { x:  3, y:  2 },
      { arc: [
        { x: 3, y: -1 },
        { x: 0, y: -1 }
      ]},
      { x: 0, y: -1, z: -2 },
      { arc: [
        { x: 3, y: -1, z: -2 },
        { x: 3, y: 2, z: -2 },
      ]},
    ],
    translate: { z: 1 },
    backface: true,
    color: options.left,
  });
  underArch.copyGraph({
    scale: { x: -1 },
    color: options.right,
  });

  // feet soles
  new Zdog.Rect({
    addTo: wall,
    width: 2,
    height: 2,
    translate: { x: -4, y: 5, z: 0 },
    rotate: { x: -TAU/4 },
    color: white,
  });

}

makeWall({
  rotate: {},
  outside: white,
  inside: black,
  left: white,
  right: black,
});

makeWall({
  rotate: { y: -TAU/4 },
  outside: black,
  inside: white,
  left: white,
  right: black,
});

makeWall({
  rotate: { y: -TAU/2 },
  outside: black,
  inside: white,
  left: black,
  right: white,
});

makeWall({
  rotate: { y: TAU * -3/4 },
  outside: white,
  inside: black,
  left: black,
  right: white,
});


// -- animate --- //

var ticker = 0;
var cycleCount = 105;

var keyframes = [
  { x: TAU * 0,       y: TAU * 1/4 },
  { x: TAU * -35/360, y: TAU * 5/8 },
  { x: TAU * -1/4,    y: TAU * 3/4 },
  { x: TAU * -35/360, y: TAU * 9/8 },
  { x: TAU * 0,       y: TAU * 5/4 },
];

function animate() {
  // update
  if ( isSpinning ) {
    var progress = ticker / cycleCount;
    var tween = Zdog.easeInOut( progress % 1, 4 );
    var turnLimit = keyframes.length - 1;
    var turn = Math.floor( progress % turnLimit );
    var keyA = keyframes[ turn ];
    var keyB = keyframes[ turn + 1 ];
    illo.rotate.x = Zdog.lerp( keyA.x, keyB.x, tween );
    illo.rotate.y = Zdog.lerp( keyA.y, keyB.y, tween );
    ticker++;
  }

  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();

