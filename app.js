var model = {
	currentCat: null,
	adminMode: false,
	cats: [{
		clickCount: 0,
		name: "Kris",
		imageSrc: "images/cat1.jpg"
	},
	{
		clickCount: 0,
		name: "Kristy",
		imageSrc: "images/cat2.jpg"
	},
	{
		clickCount: 0,
		name: "Snowy",
		imageSrc: "images/cat3.jpg"
	},
	{
		clickCount: 0,
		name: "Shadow",
		imageSrc: "images/cat4.jpg"
	},
	{
		clickCount: 0,
		name: "Mater",
		imageSrc: "images/cat5.jpg"
	}
	]
};

var octopus = {
	init : function(){
		model.currentCat = model.cats[0];
		catListView.init();
		catView.init();
		adminView.init();
	},

	getCurrentCat : function(){
		return model.currentCat;
	},

	setCurrentCat: function(cat){
		model.currentCat = cat;
	},

	incrementCounter: function(){
		model.currentCat.clickCount++;
		catView.render();
	},

	getAllCats: function(){
		return model.cats;
	},

	setAdminMode: function(mode){
		model.adminMode = mode;
	},

	getAdminMode: function(){
		return model.adminMode;
	},

	openAdminView: function(){
		document.getElementById("form").style.display = "block";
	},

	closeAdminView: function(){
		document.getElementById("form").style.display = "none";
	},

	saveAdminValues: function(name, url, clicks){
		if(name != "")
			model.currentCat.name = name;
		if(clicks != "")
			model.currentCat.clickCount = clicks;
		if(url != "")
			model.currentCat.imageSrc = url;
		octopus.closeAdminView();
		catListView.render();
		catView.render();
	}

};

// View
var catView = {
	init: function(){
		this.catElem = document.getElementById("catview");
		this.catNameElem = document.getElementById("catname");
		this.catCountElem = document.getElementById("catcount");
		this.catImageElem = document.getElementById("catimage");
		this.catImageElem.addEventListener('click', function(){
			octopus.incrementCounter();
		});
		this.render();
	},

	render: function(){
		var cat = octopus.getCurrentCat();
		this.catNameElem.textContent = cat.name;
		this.catCountElem.textContent = cat.clickCount;
		this.catImageElem.src = cat.imageSrc;
	}
};

var catListView = {
	init: function(){
		this.catSelectorElem = document.getElementById("catselector");
		var selectElem = document.createElement("select");
		selectElem.id = "selectElem";
		this.catSelectorElem.appendChild(selectElem);

		selectElem.onchange = function (e) {
			var index = this.value;
			if(index>=0){
				var catList = octopus.getAllCats();
				console.log("Selected cat " + index + " "+ catList[index].name);	
				octopus.setCurrentCat(catList[index]);
			}
			catView.render();
		}	
		this.render();
	},

	render: function(){
		var catList = octopus.getAllCats();
		var selectElem = document.getElementById("selectElem");
		while (selectElem.hasChildNodes()) {
		    selectElem.removeChild(selectElem.lastChild);
		}
		var defaultoption = document.createElement('option');
		defaultoption.text = "- Please select a name -";
		defaultoption.value = "-1";
		selectElem.appendChild(defaultoption);
		for(var i=0;i<catList.length;i++){
			var option = document.createElement('option');
			option.text = catList[i].name;
			option.value = i;
			console.log("Cat = " + catList[i].name)
			selectElem.appendChild(option);
		}		
	}
};

var adminView = {
	init: function(){
		octopus.closeAdminView();
		document.getElementById("adminbutton").addEventListener("click", function(){
			octopus.openAdminView();	
			console.log("Admin button clicked");
		});
		document.getElementById("cancelbtn").addEventListener("click", function(){
			octopus.closeAdminView();
			console.log("Cancel button clicked");
		});
		document.getElementById("submitbtn").addEventListener("click", function(){
			var name = document.getElementById("name").value;
			var url = document.getElementById("url").value;
			var clicks = document.getElementById("clicks").value;
			octopus.saveAdminValues(name, url, clicks);
			console.log("Submit button clicked");
		});
	},

	render: function(){
		
	}

};

octopus.init();