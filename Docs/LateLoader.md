LateLoader {#LateLoader}
======================================

Event and poll based DOM element visibility detection class.

### Events:

* parked(element) - element's loading has been delayed;
* unparked(element) - element starts loading;

### Options:

* delay - (*integer*, defaults to 0) Observation delay (in milliseconds) before loading.
* delta_px - (*integer*, defaults to 0) Detection range (screen border, in pixels).
* events - (*function* array) Event handlers (`parked`, `unparked`) to be registered on initialization. 
* method - (*string*, defaults to `event`)  Detection method. Values are `poll` or `event`.
* poll_interval - (*integer*, defaults to `2000`) Polling interval (in milliseconds) when doing poll based detection.
* event_source - (*element*, defaults to `window`) Source for scrolling events. Must be a scrollable element.

### Inherited methods from VisibilityWatcher:
* startWatching()
* stopWatching()
* add()
* remove()
(see [VisibilityWatcher's documentation](http://github.com/fcartegnie/VisibilityWatcher/blob/master/Docs/VisibilityWatcher.md "VisibilityWatcher doc") for details) 

LateLoader.Img Method: constructor {#LateLoader.Img:constructor}
------------------------------------------------------

### Syntax:

	LateLoader.Img(target [, options]);

### Arguments:

1. target - (array or single, *element* or *id*) element(s) to lazy load.
2. options - (*object* optional) see below.

### Options:

* LateLoader's options
* keepsize - (*boolean*, defaults to `false`) Keep the specified original size when delayed. 
* parked_class - (*string*, defaults to `parked`) Additional classname for delayed elements.
* parked_content - (*string*, defaults to `spinner.gif`)
* packed_content_sizes - (*integer*, `{width:,height:}`)

### Returns:

(object) A new LateLoader.Img instance.

### Example: 

	#JS
	new LateLoader.Img($$('img'),
		{ 'delay': 1000 } /* Load image only if it's more than 1 second on screen */
	);

	
LateLoader.Ajax Method: constructor {#LateLoader.Ajax:constructor}
------------------------------------------------------

### Syntax:

	LateLoader.Ajax(target [, options]);

### Arguments:

1. target - (array or single, *element* or *id*) element(s) to lazy load.
2. options - (*object* optional) see below.

### Tag Property (XHTML):

Add the Request.HTML href on each tag

	<tag lateloader:href="http://ajaxcontenturl"/>
	
And declare the custom namespace in your &lt;html&gt; tag

	xmlns:lateloader="http://github.com/fcartegnie/LateLoader/foo

Alternative method is to use the href option (you'll need one class per tag).

Note that the W3C validator will throw errors as it doesn't check XML compliance but only XHTML.  

### Options:

* LateLoader's options
* href - (*string*, defaults to `undefined`) if not stored as tag property, pass this href to Request.HTML

### Returns:

(object) A new LateLoader.Ajax instance.

### Example: 

	#JS
	new LateLoader.Ajax('ajaxzone',
		{ delta_px: 400 } /* Fire our Ajax request when user is within 400px */
	);


LateLoader.Object Method: constructor {#LateLoader.Object:constructor}
------------------------------------------------------

Only for gecko based browsers (Firefox)

### Syntax:

	LateLoader.Object(target [, options]);

### Arguments:

1. target - (array or single, *element* or *id*) element(s) to lazy load.
2. options - (*object* optional) see below.

### Tags Setup:

Nest your object within &lt;noscript&gt; and a custom container tag. 

	<div class="objectcontainer">
		<noscript>
			<object>...</object>
		</noscript>
	</div> 

The custom container tag is the one to be registered with the class.

### Options:

* LateLoader's options

### Returns:

(object) A new LateLoader.Object instance.

### Example: 

	#JS
	new LateLoader.Object($$('.objectcontainer'));

