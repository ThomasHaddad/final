$(function(){

	//Marionette - Mustache function
	Marionette.Renderer.render = function(template, date){
		return Mustache.to_html(template, date);
	}

	//instance de Marionette
	var myApp = new Marionette.Application();

	//ajout des regions du dom
	myApp.addRegions({
		mainRegion : '#wrapper',
		navigationRegion : '#head'
	});

	//Model
	var UserModel = Backbone.Model.extend({
		defaults:{
			name : 'Adriano',
			age : 21
		},
	});

	//collection
	var UserCollection = Backbone.Collection.extend({
		model : UserModel,
		localStorage: new Backbone.LocalStorage('NewCollection'),
		initialize : function (){
			if (!localStorage['NewCollection']) {
				this.create({name: 'KevinMaster', age:23});
				this.create({name: 'Valentino', age:22});
			};
		},
		//url : 'test.php'
	});
	

	//View de chaque utilisateur
	var ItemView = Marionette.ItemView.extend({
		template : 'Name : {{name}}, Age : {{age}} <button class="user-delete" value="Delete">Delete</button>',
		events : {
			'click .user-delete' : 'deleteUser',
		},
		deleteUser : function (event) {
			console.log(this)
			this.model.destroy();
		}
	});

	//Main view qui contient les items view
	var MainView = Marionette.CompositeView.extend({
		template : 'Liste des utilisateurs : <br/><form><input type="text" id="input-name" placeholder="name"><input type="text" id="input-age" placeholder="age"><input type="submit" value="submit"></form><button class="sort">Sort</button>',
		itemView : ItemView,
		events : {
			'submit form' : 'submitForm',
			'click .sort' : 'sortUsers'
		},
		submitForm : function (event){
			event.preventDefault();
			var dataUser = {
				name : this.$el.find('#input-name').val(),
				age : this.$el.find('#input-age').val()
			};
			var userModel= new UserModel(dataUser);
			this.collection.add(userModel);
			userModel.save();
		},
		sortUsers : function (){
			var sorted = this.collection.sortBy(function(model){
				return model.get('name');
			});
			this.collection.reset(sorted);
		}
	});

	var HeadView = Marionette.ItemView.extend({
		template : 'Template'
	});

	//initialisation de l'application
	myApp.addInitializer(function(){
		var userCollection = new UserCollection();
		userCollection.fetch({
			success : function () {
				//reference view - region
				myApp.mainRegion.show(new MainView({
					collection : userCollection
				}));
				myApp.navigationRegion.show( new HeadView());	
			},
			error : function () {
				alert('Error while requesting database');
			}
		});

	});

	//start de l'application
	myApp.start();
})