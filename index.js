var shell = require('gl-now')();
var createShader = require('gl-shader');
var createTexture = require('gl-texture2d');
var gessoCanvas = require('a-big-triangle');
var webcamGrabber = require('webcam-grabber');
var glslify = require('glslify');
var dat = require('exdat');


var vert = glslify('./shader.vert');
var frag = glslify('./shader.frag');

var video = webcamGrabber(600,400);

var texture, lookup;

var params = {
	lut: "luts/lookup.png"
	, mix: 1.0
}

var gui, guiImg

function getTex2d(gl, path) {
    var obj = {
        image: new Image(),
        texture: null
    };
    obj.image.onload = function() {
        obj.texture = createTexture(gl, obj.image)
        obj.texture.minFilter = obj.texture.magFilter = gl.LINEAR;
    };
    obj.image.src = path;
    return obj;
}

function onLutChange(path) {
	lookup = getTex2d(shell.gl, "luts/"+path);
	guiImg.src = lookup.image.src;
}



shell.on('gl-init', function() {
	var gl = shell.gl;

	shader = createShader(gl, vert, frag);

	// setup gui
	gui = new dat.GUI();
	gui.add(params, 'mix', 0.0, 1.0)
	gui.add(params, 'lut', {
		'Default': 'lookup.png'
		, 'Invert': 'lookup-invert.png'
		, '90deg Rotation': 'lookup-90deg.png'
		, '180deg Rotation': 'lookup-180deg.png'
		, 'Rectangular to Polar': 'lookup-rect-to-polar.png'
		, 'Pointellize': 'lookup-pointellize.png'
		, 'Crystallize': 'lookup-crystallize.png'
		, 'Halftone Pattern': 'lookup-halftone.png'
		, 'Find Edges': 'lookup-findedges.png'
		, 'Difference Clouds': 'lookup-diff-clouds.png'
		, 'Noise (Gaussian)': 'lookup-noise.png'
		, 'Solarize': 'lookup-solarize.png'
		, 'Wind (Stagger)': 'lookup-wind-stagger.png'
		, 'Fibers': 'lookup-fibers.png'
		, 'Mondrian': 'lookup-mondrian.png'
	}).onChange(onLutChange);

	// setup gui image to show lut
	guiImg = new Image();
	guiImg.id = 'lut-img'
	document.body.appendChild(guiImg);

	onLutChange("lookup.png");


});

shell.on('tick', function() {
	var gl = shell.gl;

	// is there video ready?
	if(video.readyState === video.HAVE_ENOUGH_DATA) {
			if(texture) {
		  	texture.setPixels(video);
			} else {
				texture = createTexture(gl, video);
			} 
	}	

});

shell.on('gl-render', function(t) {
	var gl = shell.gl;

	// bind shader
	shader.bind();

	if(texture && lookup.texture) {
	  shader.uniforms.texture = texture.bind(0)
		shader.uniforms.lookup = lookup.texture.bind(1);
	}

	shader.uniforms.uMix = params.mix;
	// draw big triangle
	gessoCanvas(gl);
});

shell.on("gl-error", function(e) {
  throw new Error("WebGL not supported :(")
});