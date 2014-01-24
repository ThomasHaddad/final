/* global define */
(function (){
	'use strict';

	define([
		'marionette',
		'Views/itemView',
		'text!../../template/mainTemplate.html',
		'text!../../template/popupTemplate.html',
	],function (Marionette,ItemView,mainTemplate,popupTemplate){
		return Marionette.CompositeView.extend({
			template : mainTemplate,
			itemView : ItemView,
			itemViewContainer : 'tbody',
			events : {
				'click button.new-user' : 'addUser' 
			},
			addUser : function () {
				require([
					'app',
					'Views/popupView',
					'Models/userModel'
				],function (appUser,PopupView,UserModel){
					var popup = appUser.popupRegion;
					var userModel = new UserModel();
					appUser.userCollection.add(userModel);
					popup.show(new PopupView({
						model : userModel
					}));
					popup.$el.modal();
				})
			}
		});
	});
})();