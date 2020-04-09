### Color quantization
I read a blog post about retrieving dominant colors from an image using
K-Means clustering and CIELAB colorspace. They find that CIELAB yields best
results since RGB does not have a perceptually uniform color space (1,2,3).

I also tried a simple pixel-counting and bucketing scheme, but this doesn't work
as well. Even images that are supposed to be all one color surface hundreds
of different colors in this scheme. I also found that many of the popular color
palette generation packages on Github use this method and also remove
black/white from consideration. However, in my case I do consider white/black
backgrounds as part of the palette.

[1] https://tatasz.github.io/dominant_colors/
[2] https://en.m.wikipedia.org/wiki/Color_difference
[3] https://alexwlchan.net/2019/08/finding-tint-colours-with-k-means/

### How do you compare color palettes?
Trying every combination and taking min? Too complex.

Pre-ordering and compare pair-wise? Counterexample: RGB, GBW.

Hacky heuristic: just pick the closest one each time.
