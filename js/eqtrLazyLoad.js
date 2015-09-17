function eqtrLazyLoad(buffer, max_speed) {
	//Initialise images with data-src attributes
	var max_speed = max_speed || 1.5,
		buffer = buffer || 200,
		images = Array.prototype.slice.call(document.querySelectorAll('img[data-src]')), // converts NodeList to Array
		last_time_checked = new Date().getTime(),
		last_scroll_pos = window.pageYOffset,
		this_time_checked,
		this_scroll_pos,
		time_diff,
		scroll_diff,
		scroll_timeout,
		window_height,
		i,
		img,
		img_coords;

	//See how fast the page is being scrolled
	function getScrollVelocity(scroll_event) {
		this_time_checked = scroll_event.timeStamp;
		this_scroll_pos = window.pageYOffset;

		time_diff = this_time_checked - last_time_checked;
		scroll_diff = Math.abs(this_scroll_pos - last_scroll_pos);

		last_time_checked = this_time_checked;
		last_scroll_pos = this_scroll_pos;

		return scroll_diff / time_diff;
	}

	function checkStoppedScrolling() {
		clearTimeout(scroll_timeout);
		scroll_timeout = setTimeout(checkAllImages, 50);
	}

	//Check if we can see the image. Or if it's offscreen but within buffer range.
	function isInView(img) {
		window_height = window.innerHeight;
		img_coords = img.getBoundingClientRect();
		return ((img_coords.top > 0 - buffer && img_coords.top < window_height + buffer) || (img_coords.top < 0 && img_coords.bottom > 0));
	}

	function loadImage(img) {
		img.src = img.dataset.src;
	}

	function checkAllImages() {
		//loop through remaining images
		for (i = images.length - 1; i >= 0; i--) {
			img = images[i];
			if (isInView(img)) {
				loadImage(img);
				images.splice(i, 1);
			}
		}
	}

	//Do initial check
	checkAllImages();

    //Now check shizzle when the page is scrolled.
    //This takes over the onscroll event, you might want to modify this if you have scroll things already going on.
	window.onscroll = function(scroll_event) {
		//check page scroll speed. Too fast? NO IMAGES FOR YOU
		//This is to stop all images being loaded if the user is scrolling
		//quickly past them. Better waiting til they stop or slow down
		//so they can look at things.
		if (images.length === 0) window.onscroll = null;

		//Speed just right? Check for imagesS
		if (getScrollVelocity(scroll_event) < max_speed) return checkAllImages()

		//If we stop scrolling after a fast scroll, the image currently on
		//screen is not shown. Do a check if we've stopped scrolling.
		checkStoppedScrolling();
	};
}
function eqtrLazyLoad(){function o(a){return f=a.timeStamp,g=window.pageYOffset,h=f-d,i=Math.abs(g-e),d=f,e=g,i/h}function p(){clearTimeout(j),j=setTimeout(s,50)}function q(a){return k=window.innerHeight,n=a.getBoundingClientRect(),n.top>0-b&&n.top<k+b||n.top<0&&n.bottom>0}function r(a){a.src=a.dataset.src}function s(){for(l=c.length-1;l>=0;l--)m=c[l],q(m)&&(r(m),c.splice(l,1))}var f,g,h,i,j,k,l,m,n,a=1.5,b=100,c=Array.prototype.slice.call(document.querySelectorAll("img[data-src]")),d=(new Date).getTime(),e=window.pageYOffset;window.onscroll=function(b){return 0===c.length&&(window.onscroll=null),o(b)<a?s():void p()},s()}