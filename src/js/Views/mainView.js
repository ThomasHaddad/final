/* global define */
(function (){
	'use strict';

	define([
		'marionette',
		'Views/itemView',
		'text!../../template/mainTemplate.html',
		'text!../../template/popupTemplate.html',
		'app',
		'syphon'
	],function (Marionette,ItemView,mainTemplate,popupTemplate,appUser){
		return Marionette.CompositeView.extend({
			template : mainTemplate,
			itemView : ItemView,
			itemViewContainer : 'tbody',
			events : {
				'click button.new-user' : 'addUser' ,
				'submit form' : 'searchUser'
			},
			addUser : function () {
				require([
					'app',
					'Views/popupView',
					'Models/userModel'
				],function (appUser,PopupView,UserModel){
					var popup = appUser.popupRegion;
					var userModel = new UserModel();


					/*popup.show(new PopupView({
						model : userModel
					}));*/
					//popup.$el.modal();
					appUser.vent.trigger('showPopup', new PopupView({
						model : userModel
					}));
				});
			},
			searchUser: function (event){
				event.preventDefault();
				var test = Backbone.Syphon.serialize(this).search;
				var filteredCollection = this.collection.filter(function(model){
					return model.get('name').indexOf(test)!=-1;
				});
				this.collection.reset(filteredCollection);
			}
		});
	});
})();