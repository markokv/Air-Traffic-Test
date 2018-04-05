class alertWindow {
	constructor(id){
		this.element = document.createElement('div');
		this.element.className= "flex-crossbrowser alert alert_hidden";
		this.element.id=id;

		this.header = document.createElement('header');
		this.element.appendChild(this.header);

		this.center = document.createElement('div');
		this.center.className= "center flex-crossbrowser";
		this.element.appendChild(this.center);

		this.center = document.querySelector(".center");
		this.center.appendChild(this.element);
		this._id = id;
	}
}

class location_request extends alertWindow {
	constructor(id){
		super(id);
		var this_alert = this;

		this.alert = document.querySelector("#"+id);
		this.alert.className = "flex-crossbrowser alert alert_hidden";

		this.alert_header = document.querySelector("#"+id+">header");
		this.alert_header.innerHTML = "YOUR GEO LOCATION IS REQUIRED!";

		this.alert_content = document.querySelector("#"+id+">div");
		this.alert_content.innerHTML = "In order to get a list of flights location near you, you must allow this website to access yours GPS location.</br> Please GRANT ACCESS to continue ";

		this.button = document.createElement('button');
		this.button.id="geogrant";
		this.button.setAttribute('type', 'button');
		this.button.innerHTML = "GRANT ACCESS";
		this.alert_content.appendChild(this.button);

		this.button.addEventListener("click", function () {
			this_alert.showOut();
			setTimeout(function() { requestLocationAccess(); }, 1000);
		}, false);
	}
	showIn() {
		this.alert.className = "flex-crossbrowser alert alert_visible";
	}
	showOut() {
		this.alert.className = "flex-crossbrowser alert alert_hidden";
	}
}
class location_unavible extends alertWindow {
	constructor(id){
		super(id);
		var this_alert = this;

		this.alert = document.querySelector("#"+id);
		this.alert.className = "flex-crossbrowser alert alert_hidden";

		this.alert_header = document.querySelector("#"+id+">header");
		this.alert_header.innerHTML = "YOUR GEO LOCATION IS UNAVIUBLE!";

		this.alert_content = document.querySelector("#"+id+">div");
		this.alert_content.innerHTML = "REASON: "+location_message+"</br></br>We can't access your geolocation data, therefore we are unable to provide you nearby flights information</br>Please check if your GPS location is turned ON or your browser location access settings and than try again";

		this.button = document.createElement('button');
		this.button.id="geogrant";
		this.button.setAttribute('type', 'button');
		this.button.innerHTML = "TRY AGAIN";
		this.alert_content.appendChild(this.button);

		this.button.addEventListener("click", function () {
			this_alert.showOut();
			setTimeout(function() { requestLocationAccess(); }, 1000);
		}, false);
	}
	showIn() {
		this.alert.className = "flex-crossbrowser alert alert_visible";
	}
	showOut() {
		this.alert.className = "flex-crossbrowser alert alert_hidden";
	}
}
class loader{
	constructor(id){
		var element =  document.getElementById(id);
		if (typeof(element) != 'undefined' && element != null){
			this.loader = element;
		}
		else{
			this.center = document.querySelector(".center");

			this.loader = document.createElement('div');
			this.loader.id=id;
			this.loader.className = "loader_hidden";
			this.center.appendChild(this.loader);
		}
	}
	showIn() {
		this.loader.className = "loader_visible";
	}
	showOut() {
		this.loader.className = "loader_hidden";
	}
}
class flight_items{
	constructor(){
		var this_item = this;


		var element =  document.getElementById("item_container");

		if (typeof(element) != 'undefined' && element != null){
			this.item_container = element;
			this.item_container.innerHTML = "";
			this.item_container.className="item_container_visible";
		}
		else{
			this.center = document.querySelector(".center");
			this.item_container = document.createElement('div');
			this.item_container.id="item_container";
			this.item_container.className="item_container_visible";
			this.center.appendChild(this.item_container);
		}
	}
	printItem(id,trak,alt,call,man,mdl,from,to){//, from, man, mdl, to
		var this_item = this;
		this.item = document.createElement('div');
		this.item.id = "item"+id;
		this.item.className = "flex-crossbrowser item item_hidden";
		this.item_container.appendChild(this.item);
		this.header = document.createElement('header');
		this.item.appendChild(this.header);
		this.img = document.createElement('img');
		this.img.src="imgs/plane.png";
		this.img.style.transform = "rotate("+trak+"deg)";
		this.header.appendChild(this.img);
		this.content = document.createElement('div');
		this.content.innerHTML = "<p class='alt'>Altitude:</br><span>"+alt+"</span></p><p class='code'>Flight code number:</br><span>"+call+"</span></p>"
		this.item.appendChild(this.content);
		this.item.addEventListener("click", function () {
			this_item.hideData();
			setTimeout(function() {
				 let details = new flight_details(man,mdl,from,to);
				 setTimeout( function timer(){
		 			details.show();
				},100 );

			 }, 1000);
		}, false);
	}
	hideData(){
		this.item_container.className="item_container_hidden";
		setTimeout( function timer(){
			this.item_container.style.display="none";
		},400 );
	}
	showData(){
		this.item_container.className="item_container_hidden";
		setTimeout( function timer(){
			this.item_container.style.display="flex";
			this.item_container.className="item_container_visible";
		},400 );

	}
}
class flight_details{
	constructor(man,mdl,from,to){
		var details = this;
		var element =  document.getElementById("details");

		if (typeof(element) != 'undefined' && element != null){
			this.details = element;
			this.details.innerHTML = "";
			this.details.className = "flex-crossbrowser details details_hidden";
		}
		else{
			this.details = document.createElement('div');
			this.details.id = "details";
			this.details.className = "flex-crossbrowser details details_hidden";
			this.center = document.querySelector(".center");
			this.center.appendChild(this.details);

		}

		this.imghead = document.createElement('header');
		this.imghead.innerHTML="<img src='//logo.clearbit.com/"+man.toLowerCase().replace(/\s/g, '')+".com?size=100'>"
		this.details.appendChild(this.imghead);
		this.detcontent = document.createElement('div');
		this.detcontent.innerHTML = "<div class='left'>Manufacturer:</br><span class='L'>"+man+"</span></br></br><span class='b'>Departure from:</br><span class='L'>"+from+"</span></span></div><button id='backtolist' type='button'>←</button><div class='right'>Model:</br><span class='L'>"+mdl+"</span></br></br><span class='b'>Destination:</br><span class='L'>"+to+"</span></span></div>";
		this.details.appendChild(this.detcontent);
		this.center = document.querySelector(".center");
		this.button = document.querySelector("#backtolist");
		this.button.addEventListener("click", function () {
			details.hide();
			setTimeout(function() {
				document.querySelector(".center").removeChild(document.querySelector("#details"));
				flightitems.showData();
			 }, 1000);
		}, false);

	}
	show(){
		this.details.className = "flex-crossbrowser details details_visible";
	}
	hide(){
		this.details.className = "flex-crossbrowser details details_hidden";
	}
}
