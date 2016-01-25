GLSL LUT Sketch
===============

Playing around with texture-based color lookup tables using [glsl-lut](https://github.com/mattdesl/glsl-lut):

[![Screenshot](https://c2.staticflickr.com/2/1707/24514312761_5824e1d1a1_o.png)](https://andyinabox.github.io/sketch-glsl-lut/)

[**Play with it here**](https://andyinabox.github.io/sketch-glsl-lut/)

Mainly I'm experimenting with running the base lookup table through various Photoshop filters and seeing what happens. So for the above image, I started with this default image:

![Default lookup](https://raw.githubusercontent.com/andyinabox/sketch-glsl-lut/master/luts/lookup.png)

And ran it through the Photoshop "pointellize" filter to get this:

![Pointellize lookup](https://raw.githubusercontent.com/andyinabox/sketch-glsl-lut/master/luts/lookup-pointellize.png)

Now when I run this through [glsl-lut](https://github.com/mattdesl/glsl-lut) I get some interesting effects.

## Running locally

```bash
git clone https://github.com/andyinabox/sketch-glsl-lut.git
cd sketch-glsl-lut
npm install
npm start
```