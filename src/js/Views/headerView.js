/* global define */
(function (){
	'use strict';

	define([
		'marionette',
		'mustache',
		'text!../../template/headerTemplate.html'
	],function (Marionette,Mustache,headerTemplate){

		return Marionette.ItemView.extend({
			template : headerTemplate,
		});
	});
})();