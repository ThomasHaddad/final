/* global define */
(function () {
	'use strict';

	var vendorDir = '../../vendors/';

	requirejs.config({
		urlArgs:'p=' + Date.now(),
		paths: {
			jquery: vendorDir + 'jquery-1.10.2.min',
			backbone: vendorDir + 'backbone',
			underscore: vendorDir + 'underscore',
			marionette: vendorDir + 'backbone.marionette',
			mustache: vendorDir + 'mustache',
			localStorage: vendorDir + 'backbone.localStorage',
			bootstrap: vendorDir + 'bootstrap',
			text: vendorDir + 'text',
			syphon: vendorDir + 'backbone.syphon.min'
		},
	    shim: {
	        backbone: {
	            deps: ['underscore','jquery','bootstrap'],
	            exports: 'Backbone'
	        },
	    	bootstrap:{
	    		deps:['jquery']
	    	},
	    	syphon:{
	    		deps:['backbone']
	    	},
	        underscore: {
	            exports: '_'
	        },
	        marionette: {
	        	deps: ['backbone'],
	        	exports: 'Marionette'
	        },
	        mustache: {
	        	exports: 'Mustache'
	        },
	        localStorage: ['backbone']
	    }
	});

	define(['app'],function (app){
		app.start();
	});

})();