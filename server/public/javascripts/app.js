App = Ember.Application.create();

App.Router.map(function(match) {
	this.route('index',  {path : '/'}), 
	this.route('home', {path : '/home'})
	this.route('workshopApp', {path : '/application'})
	this.route('tutorial', {path : '/tutorial'})
});

App.IndexRoute = Ember.Route.extend({
	redirect : function() {
		this.transitionTo('home');
	}
});
	
App.HomeController = Ember.Controller.extend({});

App.HomeView = Ember.View.extend({
	templateName : 'home'
});

App.WorkshopAppController = Ember.Controller.extend({});

App.WorkshopAppView = Ember.View.extend({
	templateName : 'workshop-app'
});

App.MenuBarView = Ember.View.extend({
	templateName : 'menu-bar',
	didInsertElement : function(){
		this._clearItem();
		if(document.URL.match('home')){
			$('#homeItem').addClass('active');
		}else if(document.URL.match('application')){
			$('#workshopAppItem').addClass('active');
		}else if(document.URL.match('tutorial')){
			$('#tutorialItem').addClass('active');
		}
	},
	gotoHome : function(){
		this._clearItem();
		$('#homeItem').addClass('active');
		this.get('controller.target').transitionTo('home');
	},
	gotoWorkshopApp : function(){
		this._clearItem();
		$('#workshopAppItem').addClass('active');
		this.get('controller.target').transitionTo('workshopApp');
	},
	gotoTutorial : function(){
		this._clearItem();
		$('#tutorialItem').addClass('active');
		this.get('controller.target').transitionTo('tutorial');
	},
	_clearItem : function(){
		$('#homeItem').removeClass('active');
		$('#workshopAppItem').removeClass('active')
		$('#tutorialItem').removeClass('active')
	}
});

App.MapView = Ember.View.extend({
	templateName : 'map',
	latlng : new google.maps.LatLng(48.875244,2.311914),
	markers : new Object(),
	mapOptions : function() {
		return {
			zoom: 6,
			center: this.get('latlng'),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	}.property('latlng'),
	map : null,
	didInsertElement : function(){
		this.set('map' , new google.maps.Map(document.getElementById('content-map'), this.get('mapOptions')));
		this._clearMap();
		this.get('map').setZoom(5);
		
		
		this._renderGeolocation([{
			latitude : 48.875244,
			longitude : 2.311914,
			accuracy : 15,
			markerName : 'Atelier Xebia'
		}]);
	},
	_renderGeolocation : function(locationData){
		var self = this;
		var accuracy;
		var position;
		var marker;
		var accuracyCircle
		var markers = this.get('markers');
		var map = self.get('map');
		
		//clear map
		this._clearMap();
		
		$(locationData).each(function (index, location) {
			if( accuracy == undefined || position === undefined 
					|| accuracy < location.accuracy){
				accuracy = location.accuracy;
				position = new google.maps.LatLng(location.latitude, location.longitude);
				marker = new google.maps.Marker({
					position: position,
					title:location.markerName
				});
				
				google.maps.event.addListener(marker, 'dblclick', function(event) {
					map.setCenter(event.latLng);
					map.setZoom(15);
				});
				
				accuracyCircle = new google.maps.Circle({
					strokeColor: '#000000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.35,
					map: map,
					center: position,
					radius: location.accuracy
				});
				
				marker.setMap(map);
				markers[location.id+'-m'] = marker;
				markers[location.id+'-c'] = accuracyCircle;
				map.setCenter(marker.getPosition());
				map.setZoom(14);
			}
		});
	},
	_clearMap : function(){
		//clear map
		var markers = this.get('markers');
		for (var markerKey in markers) {
		    if (markers.hasOwnProperty(markerKey)) {
		        markers[markerKey].setMap(null);
		    }
		}
	}
});