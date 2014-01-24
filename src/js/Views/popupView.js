/* global define */
(function(){
	'use strict';

	define([
		'marionette',
		'mustache',
		'text!../../template/popupTemplate.html',
		'app',
		'syphon',
	],function (Marionette,Mustache,popupTemplate,appUser){
		return Marionette.ItemView.extend({
			template : popupTemplate,
			events: {
				'click #submit-user' : 'submitUser'
			},
			submitUser: function (event) {
				event.preventDefault();
				if( $('input[name="name"]').val()!='' && $('input[name="age"]').val()!=''){
					/*this.model.set({
						name : $('input[name="name"]').val(),
						age : $('input[name="age"]').val()
					});*/
					//$('#popup').modal('hide');
					this.model.set(Backbone.Syphon.serialize(this));
					appUser.userCollection.add(this.model,{merge:true});
					this.model.save();
					appUser.vent.trigger('hidePopup');
				}
			}
		})
	});
})();