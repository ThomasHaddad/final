/* global define */
(function(){
	'use strict';

	define([
		'marionette',
		'mustache',
		'text!../../template/popupTemplate.html'
	],function (Marionette, Mustache,popupTemplate){
		return Marionette.ItemView.extend({
			template : popupTemplate,
			events: {
				'click #submit-user' : 'submitUser'
			},
			submitUser: function (event) {
				event.preventDefault();
				this.model.set({
					name : $('input[name="name"]').val(),
					age : $('input[name="age"]').val()
				});
				this.model.save();
			}
		})
	});
})();