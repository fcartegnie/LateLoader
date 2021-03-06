LateLoader
===========

![Screenshot](http://fcartegnie.github.com/LateLoader/lateloader.png)

LateLoader is fully extensible `lazy loading` class.

Provides Lazy Loading for:

* img tags
* ajax zones
* flash objects (Firefox/gecko only)

From tunable parameters:

* Works both in Horizontal or Vertical scrolling
* Based on Event or Poll methods (works without mouse scrolling)
* Detection range extension (pre-loading)
* 'Fast scrolling' protection (loads element only after n seconds on screen)


Requirements
----------
[VisibilityWatcher](http://mootools.net/forge/p/visibilitywatcher) class

How to Use
----------

Then just create an Instance on the target element(s)

	#JS
	new LateLoader.Img($$('img'));
	
And for the less common ones:

	#JS
	new LateLoader.Ajax('myajaxzone');

([see documentation](http://github.com/fcartegnie/LateLoader/blob/master/Docs/LateLoader.md) for full setup)


	#JS
	new LateLoader.Object('myflashcontainer');

([see documentation](http://github.com/fcartegnie/LateLoader/blob/master/Docs/LateLoader.md) for full setup)
