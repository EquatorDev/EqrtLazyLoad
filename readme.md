# Eqtr Lazy Load

This is a plugin for a site where you want to load images only if they scroll into view.

This helps keep load time quick, and avoids downloading images unnecessarily if the user doesn't view the whole page.

It was developed for a mobile-only site, so only detects vertical scrolling. None o yer fancy horizontal scrolling masterpieces here.

Dev size ~4k, minifies to < 1k.

## Usage

First, mark up the images you want to lazt load thusly:

```
<img src="//:0" data-src="images/source_image.png" height="350px">
```

Note the actual src is set to "//:o" .  This prevents the broken image icon being displayed if the image hasnt been loaded yet. You could change this to a small "loading" image/animation for all images, as it will be replaced when scrolled into view.

The height of the image is not required, but it does help to avoid resizing wonkiness when images suddenly have size after loading. Use a Grunt/Gulp task to auto-height your image HTML if you're into that kind of thing. 

Include the file in your project (or however you want to use it), and call this after the DOM has been created:

```
	// How far below the window will we look for images to show?
	// Bigger: more pre-loading of images
	// Smaller: less loading, but noticable when it happens.
var buffer = 400,
	// Dont load images that appear fleetingly as the user is 
	// frantically scrolling down a page. This is a number setting
	// a threshold. 
	max_speed = 1.5;

//This is the main bit!
eqtrLazyLoad(buffer, max_speed);
```

The required arguments are 

* **buffer**: `Integer`, In pixels. The size above and below the window will we look for images to show. 

* **max_speed**: `Double`, In... a unit.  A number representing a scroll speed. 1.5 seems good.  < 1 is very slow, > 1.5 is pretty fast.