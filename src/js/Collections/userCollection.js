/* global define */

(function (){
	define([
		'backbone',
		'../Models/userModel',
		'localStorage'
	], function (Backbone,UserModel) {
		return Backbone.Collection.extend({
			model : UserModel,
			localStorage : new Backbone.LocalStorage('NewCollection'),
			initialize : function (){
				if (!localStorage['NewCollection']) {
					this.create({name: 'KevinMaster', age:23});
					this.create({name: 'Valentino', age:22});
				};
			}
		});
	});
})();