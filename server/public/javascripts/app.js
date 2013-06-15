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
	infoWindow : null,
	didInsertElement : function(){
		var self = this;
		
		this.set('map' , new google.maps.Map(document.getElementById('content-map'), this.get('mapOptions')));
		this._clearMap();
		this.get('map').setZoom(5);
		
		
		this._renderGeolocation([{
			latitude : 48.875244,
			longitude : 2.311914,
			accuracy : 15,
			markerName : 'Atelier Xebia'
		}]);
		
		var fnOnMessage = function(evt){
			//this.get('events').set(evt.data);
//			var contentMarker = '<h5>Xebia : Atelier Android</h5>'
//				+ 'Personnes présentes <br><br>'
//				+ '<img data-src="holder.js/40x40" class="img-circle" alt="140x140" style="width: 40px; height: 40px;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFhklEQVR4Xu3XR0tsWxCG4TInxAAiDlRM4ETMqKjgXzdHFFFEwTgUA2LOHmpBi8eBWNey7+26b4/0WF371FdPr7077/z8/E14kcA3E8gDzDeToiwlABggmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJAMYUF8WAwYApAcCY4qIYMBgwJQAYU1wUAwYDpgQAY4qLYsBgwJQAYExxUQwYDJgSAIwpLooBgwFTAoAxxUUxYDBgSgAwprgoBgwGTAkAxhQXxYDBgCkBwJjiohgwGDAlABhTXBQDBgOmBABjiotiwGDAlABgTHFRDBgMmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUQM6DOTg4kKOjIxkeHpbS0tK/hj8/P5etrS0pLy+X3t5eycvLk7e3N9nc3JTT09P0e2trqzQ1NX07tGxf79v/sSwV5iyYi4sLURD7+/spqtHRUSkrK3uPTWFMTk7K8/OzFBcXy9jYmOTn58v6+rqcnJxIUVFR+pvWdXV1SX19/ZeRZ/t6Wdq/+TI5C2ZqakoeHx/fB1YQH0+Y3d1dOTw8TH/Xf1dQLy8vou9TOOPj4wmcAqqurpbOzs70c2FhofT19cn19bVsb29LSUmJ9PT0yMzMjOv1BgYGzMv6L7whZ8Ho6aC3lIWFBbm7u0snSAaM/j47O5tuNZeXl3J7e5uAPD09pcUrCv09A0h/1/evrq6KniS1tbVyf3+f3tfR0SHNzc3pNPK+nsLNtVfOgskErWD0NPgIZmVlRa6urmRiYkKWlpbk4eHh/URZW1uTmpoa6e/vTwj0xNFblp5AGVCvr6+pfVVVlQwODv61U8/rKcBce4UDoyeEgqmoqJDGxkbZ29sTBdDe3i51dXXp5NHbzMdbVOaE0U+8PtTqe/Q1NDQklZWVX4L56fUAk+UEPn/iz87ORE+Rzy/FoKdQ5pakP+vJpCeQfosaGRlJsKanp9PJoy8F1t3d/SWYn1yPEybLWPRy8/PzcnNz835L0qVnHoYVyfLycgKgp4U+48zNzaVnk4aGhnTbUjRtbW3S0tIiGxsbcnx8nE4nfQ7SXp+/QXle71+I68eXzPlbkp4Q+mD7+VvSx2ccBaO3IP1EK67FxcWEIfOcos8zikdxaY0+ECucnZ2d9wfkgoKCVO91vVx84NX5cx7MP/nIKBb9FqQvvR399ivb1/vNef6XYH4z0Oi9ARN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50Ojt/gDPQj21XIQ4jAAAAABJRU5ErkJggg==">'
//				+ '<img data-src="holder.js/40x40" class="img-circle" alt="140x140" style="width: 40px; height: 40px;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFhklEQVR4Xu3XR0tsWxCG4TInxAAiDlRM4ETMqKjgXzdHFFFEwTgUA2LOHmpBi8eBWNey7+26b4/0WF371FdPr7077/z8/E14kcA3E8gDzDeToiwlABggmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJAMYUF8WAwYApAcCY4qIYMBgwJQAYU1wUAwYDpgQAY4qLYsBgwJQAYExxUQwYDJgSAIwpLooBgwFTAoAxxUUxYDBgSgAwprgoBgwGTAkAxhQXxYDBgCkBwJjiohgwGDAlABhTXBQDBgOmBABjiotiwGDAlABgTHFRDBgMmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUQM6DOTg4kKOjIxkeHpbS0tK/hj8/P5etrS0pLy+X3t5eycvLk7e3N9nc3JTT09P0e2trqzQ1NX07tGxf79v/sSwV5iyYi4sLURD7+/spqtHRUSkrK3uPTWFMTk7K8/OzFBcXy9jYmOTn58v6+rqcnJxIUVFR+pvWdXV1SX19/ZeRZ/t6Wdq/+TI5C2ZqakoeHx/fB1YQH0+Y3d1dOTw8TH/Xf1dQLy8vou9TOOPj4wmcAqqurpbOzs70c2FhofT19cn19bVsb29LSUmJ9PT0yMzMjOv1BgYGzMv6L7whZ8Ho6aC3lIWFBbm7u0snSAaM/j47O5tuNZeXl3J7e5uAPD09pcUrCv09A0h/1/evrq6KniS1tbVyf3+f3tfR0SHNzc3pNPK+nsLNtVfOgskErWD0NPgIZmVlRa6urmRiYkKWlpbk4eHh/URZW1uTmpoa6e/vTwj0xNFblp5AGVCvr6+pfVVVlQwODv61U8/rKcBce4UDoyeEgqmoqJDGxkbZ29sTBdDe3i51dXXp5NHbzMdbVOaE0U+8PtTqe/Q1NDQklZWVX4L56fUAk+UEPn/iz87ORE+Rzy/FoKdQ5pakP+vJpCeQfosaGRlJsKanp9PJoy8F1t3d/SWYn1yPEybLWPRy8/PzcnNz835L0qVnHoYVyfLycgKgp4U+48zNzaVnk4aGhnTbUjRtbW3S0tIiGxsbcnx8nE4nfQ7SXp+/QXle71+I68eXzPlbkp4Q+mD7+VvSx2ccBaO3IP1EK67FxcWEIfOcos8zikdxaY0+ECucnZ2d9wfkgoKCVO91vVx84NX5cx7MP/nIKBb9FqQvvR399ivb1/vNef6XYH4z0Oi9ARN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50Ojt/gDPQj21XIQ4jAAAAABJRU5ErkJggg==">'
//				+ '<img data-src="holder.js/40x40" class="img-circle" alt="140x140" style="width: 40px; height: 40px;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFhklEQVR4Xu3XR0tsWxCG4TInxAAiDlRM4ETMqKjgXzdHFFFEwTgUA2LOHmpBi8eBWNey7+26b4/0WF371FdPr7077/z8/E14kcA3E8gDzDeToiwlABggmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJAMYUF8WAwYApAcCY4qIYMBgwJQAYU1wUAwYDpgQAY4qLYsBgwJQAYExxUQwYDJgSAIwpLooBgwFTAoAxxUUxYDBgSgAwprgoBgwGTAkAxhQXxYDBgCkBwJjiohgwGDAlABhTXBQDBgOmBABjiotiwGDAlABgTHFRDBgMmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUQM6DOTg4kKOjIxkeHpbS0tK/hj8/P5etrS0pLy+X3t5eycvLk7e3N9nc3JTT09P0e2trqzQ1NX07tGxf79v/sSwV5iyYi4sLURD7+/spqtHRUSkrK3uPTWFMTk7K8/OzFBcXy9jYmOTn58v6+rqcnJxIUVFR+pvWdXV1SX19/ZeRZ/t6Wdq/+TI5C2ZqakoeHx/fB1YQH0+Y3d1dOTw8TH/Xf1dQLy8vou9TOOPj4wmcAqqurpbOzs70c2FhofT19cn19bVsb29LSUmJ9PT0yMzMjOv1BgYGzMv6L7whZ8Ho6aC3lIWFBbm7u0snSAaM/j47O5tuNZeXl3J7e5uAPD09pcUrCv09A0h/1/evrq6KniS1tbVyf3+f3tfR0SHNzc3pNPK+nsLNtVfOgskErWD0NPgIZmVlRa6urmRiYkKWlpbk4eHh/URZW1uTmpoa6e/vTwj0xNFblp5AGVCvr6+pfVVVlQwODv61U8/rKcBce4UDoyeEgqmoqJDGxkbZ29sTBdDe3i51dXXp5NHbzMdbVOaE0U+8PtTqe/Q1NDQklZWVX4L56fUAk+UEPn/iz87ORE+Rzy/FoKdQ5pakP+vJpCeQfosaGRlJsKanp9PJoy8F1t3d/SWYn1yPEybLWPRy8/PzcnNz835L0qVnHoYVyfLycgKgp4U+48zNzaVnk4aGhnTbUjRtbW3S0tIiGxsbcnx8nE4nfQ7SXp+/QXle71+I68eXzPlbkp4Q+mD7+VvSx2ccBaO3IP1EK67FxcWEIfOcos8zikdxaY0+ECucnZ2d9wfkgoKCVO91vVx84NX5cx7MP/nIKBb9FqQvvR399ivb1/vNef6XYH4z0Oi9ARN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50Ojt/gDPQj21XIQ4jAAAAABJRU5ErkJggg==">'
//				+ '<img data-src="holder.js/40x40" class="img-circle" alt="140x140" style="width: 40px; height: 40px;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFhklEQVR4Xu3XR0tsWxCG4TInxAAiDlRM4ETMqKjgXzdHFFFEwTgUA2LOHmpBi8eBWNey7+26b4/0WF371FdPr7077/z8/E14kcA3E8gDzDeToiwlABggmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJAMYUF8WAwYApAcCY4qIYMBgwJQAYU1wUAwYDpgQAY4qLYsBgwJQAYExxUQwYDJgSAIwpLooBgwFTAoAxxUUxYDBgSgAwprgoBgwGTAkAxhQXxYDBgCkBwJjiohgwGDAlABhTXBQDBgOmBABjiotiwGDAlABgTHFRDBgMmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUQM6DOTg4kKOjIxkeHpbS0tK/hj8/P5etrS0pLy+X3t5eycvLk7e3N9nc3JTT09P0e2trqzQ1NX07tGxf79v/sSwV5iyYi4sLURD7+/spqtHRUSkrK3uPTWFMTk7K8/OzFBcXy9jYmOTn58v6+rqcnJxIUVFR+pvWdXV1SX19/ZeRZ/t6Wdq/+TI5C2ZqakoeHx/fB1YQH0+Y3d1dOTw8TH/Xf1dQLy8vou9TOOPj4wmcAqqurpbOzs70c2FhofT19cn19bVsb29LSUmJ9PT0yMzMjOv1BgYGzMv6L7whZ8Ho6aC3lIWFBbm7u0snSAaM/j47O5tuNZeXl3J7e5uAPD09pcUrCv09A0h/1/evrq6KniS1tbVyf3+f3tfR0SHNzc3pNPK+nsLNtVfOgskErWD0NPgIZmVlRa6urmRiYkKWlpbk4eHh/URZW1uTmpoa6e/vTwj0xNFblp5AGVCvr6+pfVVVlQwODv61U8/rKcBce4UDoyeEgqmoqJDGxkbZ29sTBdDe3i51dXXp5NHbzMdbVOaE0U+8PtTqe/Q1NDQklZWVX4L56fUAk+UEPn/iz87ORE+Rzy/FoKdQ5pakP+vJpCeQfosaGRlJsKanp9PJoy8F1t3d/SWYn1yPEybLWPRy8/PzcnNz835L0qVnHoYVyfLycgKgp4U+48zNzaVnk4aGhnTbUjRtbW3S0tIiGxsbcnx8nE4nfQ7SXp+/QXle71+I68eXzPlbkp4Q+mD7+VvSx2ccBaO3IP1EK67FxcWEIfOcos8zikdxaY0+ECucnZ2d9wfkgoKCVO91vVx84NX5cx7MP/nIKBb9FqQvvR399ivb1/vNef6XYH4z0Oi9ARN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50Ojt/gDPQj21XIQ4jAAAAABJRU5ErkJggg==">'
//				+ '<img data-src="holder.js/40x40" class="img-circle" alt="140x140" style="width: 40px; height: 40px;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFhklEQVR4Xu3XR0tsWxCG4TInxAAiDlRM4ETMqKjgXzdHFFFEwTgUA2LOHmpBi8eBWNey7+26b4/0WF371FdPr7077/z8/E14kcA3E8gDzDeToiwlABggmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJAMYUF8WAwYApAcCY4qIYMBgwJQAYU1wUAwYDpgQAY4qLYsBgwJQAYExxUQwYDJgSAIwpLooBgwFTAoAxxUUxYDBgSgAwprgoBgwGTAkAxhQXxYDBgCkBwJjiohgwGDAlABhTXBQDBgOmBABjiotiwGDAlABgTHFRDBgMmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUQM6DOTg4kKOjIxkeHpbS0tK/hj8/P5etrS0pLy+X3t5eycvLk7e3N9nc3JTT09P0e2trqzQ1NX07tGxf79v/sSwV5iyYi4sLURD7+/spqtHRUSkrK3uPTWFMTk7K8/OzFBcXy9jYmOTn58v6+rqcnJxIUVFR+pvWdXV1SX19/ZeRZ/t6Wdq/+TI5C2ZqakoeHx/fB1YQH0+Y3d1dOTw8TH/Xf1dQLy8vou9TOOPj4wmcAqqurpbOzs70c2FhofT19cn19bVsb29LSUmJ9PT0yMzMjOv1BgYGzMv6L7whZ8Ho6aC3lIWFBbm7u0snSAaM/j47O5tuNZeXl3J7e5uAPD09pcUrCv09A0h/1/evrq6KniS1tbVyf3+f3tfR0SHNzc3pNPK+nsLNtVfOgskErWD0NPgIZmVlRa6urmRiYkKWlpbk4eHh/URZW1uTmpoa6e/vTwj0xNFblp5AGVCvr6+pfVVVlQwODv61U8/rKcBce4UDoyeEgqmoqJDGxkbZ29sTBdDe3i51dXXp5NHbzMdbVOaE0U+8PtTqe/Q1NDQklZWVX4L56fUAk+UEPn/iz87ORE+Rzy/FoKdQ5pakP+vJpCeQfosaGRlJsKanp9PJoy8F1t3d/SWYn1yPEybLWPRy8/PzcnNz835L0qVnHoYVyfLycgKgp4U+48zNzaVnk4aGhnTbUjRtbW3S0tIiGxsbcnx8nE4nfQ7SXp+/QXle71+I68eXzPlbkp4Q+mD7+VvSx2ccBaO3IP1EK67FxcWEIfOcos8zikdxaY0+ECucnZ2d9wfkgoKCVO91vVx84NX5cx7MP/nIKBb9FqQvvR399ivb1/vNef6XYH4z0Oi9ARN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50Ojt/gDPQj21XIQ4jAAAAABJRU5ErkJggg==">'
//				+ '<img data-src="holder.js/40x40" class="img-circle" alt="140x140" style="width: 40px; height: 40px;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAFhklEQVR4Xu3XR0tsWxCG4TInxAAiDlRM4ETMqKjgXzdHFFFEwTgUA2LOHmpBi8eBWNey7+26b4/0WF371FdPr7077/z8/E14kcA3E8gDzDeToiwlABggmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUAGBMcVEMGAyYEgCMKS6KAYMBUwKAMcVFMWAwYEoAMKa4KAYMBkwJAMYUF8WAwYApAcCY4qIYMBgwJQAYU1wUAwYDpgQAY4qLYsBgwJQAYExxUQwYDJgSAIwpLooBgwFTAoAxxUUxYDBgSgAwprgoBgwGTAkAxhQXxYDBgCkBwJjiohgwGDAlABhTXBQDBgOmBABjiotiwGDAlABgTHFRDBgMmBIAjCkuigGDAVMCgDHFRTFgMGBKADCmuCgGDAZMCQDGFBfFgMGAKQHAmOKiGDAYMCUAGFNcFAMGA6YEAGOKi2LAYMCUQM6DOTg4kKOjIxkeHpbS0tK/hj8/P5etrS0pLy+X3t5eycvLk7e3N9nc3JTT09P0e2trqzQ1NX07tGxf79v/sSwV5iyYi4sLURD7+/spqtHRUSkrK3uPTWFMTk7K8/OzFBcXy9jYmOTn58v6+rqcnJxIUVFR+pvWdXV1SX19/ZeRZ/t6Wdq/+TI5C2ZqakoeHx/fB1YQH0+Y3d1dOTw8TH/Xf1dQLy8vou9TOOPj4wmcAqqurpbOzs70c2FhofT19cn19bVsb29LSUmJ9PT0yMzMjOv1BgYGzMv6L7whZ8Ho6aC3lIWFBbm7u0snSAaM/j47O5tuNZeXl3J7e5uAPD09pcUrCv09A0h/1/evrq6KniS1tbVyf3+f3tfR0SHNzc3pNPK+nsLNtVfOgskErWD0NPgIZmVlRa6urmRiYkKWlpbk4eHh/URZW1uTmpoa6e/vTwj0xNFblp5AGVCvr6+pfVVVlQwODv61U8/rKcBce4UDoyeEgqmoqJDGxkbZ29sTBdDe3i51dXXp5NHbzMdbVOaE0U+8PtTqe/Q1NDQklZWVX4L56fUAk+UEPn/iz87ORE+Rzy/FoKdQ5pakP+vJpCeQfosaGRlJsKanp9PJoy8F1t3d/SWYn1yPEybLWPRy8/PzcnNz835L0qVnHoYVyfLycgKgp4U+48zNzaVnk4aGhnTbUjRtbW3S0tIiGxsbcnx8nE4nfQ7SXp+/QXle71+I68eXzPlbkp4Q+mD7+VvSx2ccBaO3IP1EK67FxcWEIfOcos8zikdxaY0+ECucnZ2d9wfkgoKCVO91vVx84NX5cx7MP/nIKBb9FqQvvR399ivb1/vNef6XYH4z0Oi9ARN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50OjtABN9w87zAcY50Ojt/gDPQj21XIQ4jAAAAABJRU5ErkJggg==">'
//			self.get('infoWindow').content = contentMarker;
			return;
		};
		var ws = App.Push.connect(null, null,fnOnMessage);
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
				
				var contentMarker = '<h5>Xebia : Atelier Android</h5>'
					+ 'Personnes présentes : <br>'
					
					 
				var infoWindow = new google.maps.InfoWindow({
				    content  : contentMarker,
				    position : position
				});
				
				google.maps.event.addListener(marker, 'click', function() {
				    $.ajax({
				    	  contentType: 'application/json',
						  dataType: 'json',
						  type: 'POST',
						  url: '/user/findUsersPresentAtAnEvent',
						  data: '{"id" : 1}',
						  success: function(data){
							  console.log(data)
							  var contentMarker = '<h5>Xebia : Atelier Android</h5>'
									+ 'Personnes présentes : <br>'
							  data.forEach(function(user){
								  contentMarker += user.firstName + ' ' + user.lastName + '<br>' 
							  });
							  
							  self.get('infoWindow').content = contentMarker;
							  infoWindow.open(map,marker);
						  }
					});
				    
				});
				
				self.set('infoWindow', infoWindow);
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

App.Push = Ember.Object.extend({});
App.Push.reopenClass({
	connect : function(fnOpen, fnClose, fnMessage){
		if ('WebSocket' in window){
			var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
			var ws = new WS('ws://localhost:9000/push/connect');
			
			ws.onopen = function(evt) {
				if(fnOpen)
					fnOpen(evt);
			}; 
			
			ws.onmessage = function(evt) { 
				if(fnMessage)
					fnMessage(evt);
			}; 
			
			ws.onclose = function(evt) { 
				if(fnClose)
					fnClose(evt);
			}; 
			return ws;
		}
		return null;
	}
});


