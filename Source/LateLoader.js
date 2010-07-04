/*
---
description: LateLoader class.

license: MIT-style

authors:
- Francois Cartegnie

requires:
- core/1.2.3: '*'
- VisibilityWatcher/1.3.1: VisibilityWatcher

provides: [LateLoader.Img, LateLoader.Ajax, LateLoader.Object]

...
*/

var LateLoader = new Class({
	Extends: VisibilityWatcher,

	options: {
		parked_class: 'parked',
		delay: 0,
		delta_px: 0
	},

	initialize: function(el, options){
		this.setOptions(options);
		this.parent(el, options.events, options);
	},

	add: function(targetElement){
		$splat( targetElement ).each( function(el, index){
			el = document.id( el );
			this.park(el);
			this.targetElements.push( {'element': el, 'last_state': new Array()} );
			this.fireEvent('parked', el);
		}.bind(this) );
		return this;
	},

	prepareAndFireEvent: function(eventName, el)
	{
		if (eventName == 'enteredscreen')
		{
			this.remove(el);
			this.unpark(el);
			this.fireEvent('unparked', el);
		}
	},

	park: function(el){
		el.addClass(this.options.parked_class);
	},

	unpark: function(el){
		el.removeClass(this.options.parked_class);
	}
});//!Class

LateLoader.Img = new Class({
	Extends: LateLoader,

	options: {
		parked_content: 'spinner.gif',		
		packed_content_sizes: { 'width': 24, 'height': 24 },
		keepsize: false
	},

	park: function(el){
		if (el.hasClass(this.options.parked_class)) return;
		if (!this.options.keepsize)
		{
			el.store('lateloader:styles', el.getStyles('width', 'height'));
			el.setStyles(this.options.packed_content_sizes);
		}
		el.store('lateloader:src', el.get('src'));
		el.set('src', this.options.parked_content);
		el.addClass(this.options.parked_class); 
	},

	unpark: function(el){
		if (!this.options.keepsize)
		{
			el.setStyles(el.retrieve('lateloader:styles'));
			el.eliminate('lateloader:styles');
		}
		el.set('src', el.retrieve('lateloader:src'));
		el.removeClass(this.options.parked_class);
	}

});//!Class

LateLoader.Ajax = new Class({
	Extends: LateLoader,

	options: {
		href: undefined
	},

	park: function(el){
		var url = [ el.get('lateloader:href'), this.options.href ].clean()[0];
		el.store('lateloader:href', url);
		el.addClass(this.options.parked_class);
	},

	unpark: function(el){
		el.load(el.retrieve('lateloader:href'), this.options.ajax_options);
		this.fireEvent('unparked', this);
		el.removeClass(this.options.parked_class);
	}

});//!Class

LateLoader.Object = new Class({
	Extends: LateLoader,

	unpark: function(el){
		var replacement = new Element('div');
		replacement.set('html', el.getChildren('noscript').get('text'));
		replacement.replaces(el);
		el.removeClass(this.options.parked_class);
	}

});//!Class
