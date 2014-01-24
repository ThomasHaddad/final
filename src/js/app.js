/* global define */
(function (){
	'use strict';

	define([
		'marionette',
		'Collections/userCollection',
		'Views/mainView',
		'Views/headerView',
		'mustache'

	],function (Marionette,UserCollection,MainView,HeaderView,Mustache){

		Marionette.Renderer.render = function(template, date){
			return Mustache.to_html(template, date);
		};
		
		var appUser = new Marionette.Application();

		appUser.addRegions({
			headRegion : '#head',
			mainRegion : '#wrapper',
			popupRegion : '#popup'
		});

		appUser.addInitializer(function (){
			appUser.userCollection = new UserCollection();
			appUser.userCollection.fetch({
				success : function () {
					appUser.headRegion.show(new HeaderView());
					appUser.mainRegion.show(new MainView({
						collection : appUser.userCollection
					}));
				},
				error : function () {
					alert('Error while requesting database');
				}
			});
		});

		appUser.vent.on('showPopup',function (popupView){
			appUser.popupRegion.show(popupView);
			appUser.popupRegion.$el.modal();
		});
		appUser.vent.on('hidePopup',function (){
			appUser.popupRegion.$el.modal('hide');
		});

		return appUser;
	});
})();