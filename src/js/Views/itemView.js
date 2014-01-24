/* global define */
(function(){
	'use strict';

	define([
		'marionette',
		'mustache',
		'text!../../template/itemTemplate.html',
	],function (Marionette, Mustache,itemTemplate){
		return Marionette.ItemView.extend({
			tagName:'tr',
			template : itemTemplate,
			events : {
				'click button.delete-user' : 'deleteUser',
				'click button.edit-user' : 'editUser'
			},
			deleteUser: function (){
				this.model.destroy();
			},
			editUser : function (event){
				event.preventDefault();
				var model= this.model;
				require([
					'app',
					'views/popupView'
				],function (appUser,PopupView){
					appUser.vent.trigger('showPopup', new PopupView({
						model : model
					}));
				});
			}
		})
	});
})();