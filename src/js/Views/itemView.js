/* global define */
(function(){
	'use strict';

	define([
		'marionette',
		'mustache',
		'text!../../template/itemTemplate.html'
	],function (Marionette, Mustache,itemTemplate){
		return Marionette.ItemView.extend({
			tagName:'tr',
			template : itemTemplate
		})
	});
})();