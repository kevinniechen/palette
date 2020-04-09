# Palette
Input a color palette and see brands that have similar palettes.  

Run `yarn start` in `palette/`.  

![ezgif-5-2874163cf874](https://user-images.githubusercontent.com/13123651/78906490-68f24600-7a4d-11ea-9449-33b8a4515962.gif)

### Color quantization
There is a blog post about retrieving dominant colors from an image using
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

### Color palette comparison
Pre-ordering and compare pair-wise? Counterexample: RGB, GBW.

Right now I'm just using a hacky heuristic. I compute the distances between all
colors of both palettes pairwise using a CIE color differencing algorithm (on
CIELAB space). Then I choose one palette (the user specified one), and for each
color in that palette, I choose its minimum pairwise distance. Then I sum up the
minumum pairwise distances of all colors in that palette and treat that as the
distance between the two palettes.

### Source of Brands
I'm currently using a Forbes 2000 list for companies. I then use the super
useful Clearbit API to fetch the corresponding logos, in order to build a
database of companies and their brand colors. Since (1) logos don't contain all
of the brand's colors, and (2) the color quantization algorithm is imperfect,
these estimated brand colors do not map 1:1 to actual brand colors.

There are human-sourced lists of brand-colors (such as brandcolors.net) that
have more precise brand colors, but for a smaller subset. It could be useful to
import these brand colors and replace the approximate ones.

There are also far greater sources of brands than the Forbes 2000 list. Could
also take a look at other corporate company lists and angel list, etc. Computing
over ~1000 company palettes is pretty fast (~ms). Could be even faster with
pre segmentation of the search/comparison space (if we put ~1million companies
in). The only problem there would be that the static assests would take up
considerable size. Right now, about 6.6MB for 1000 images. Could be ~6GB for 1m.
Would likely have to serve them on a different provider. Also, the JSON for
comparison would likely have to be chunkified (into different quad segments) and
loaded by request.

### Todo
[x] Logo fetching (~30min)  
[x] Nearest logo demo (~3hrs)  
[ ] Multiple logos  
[ ] Create UI  

