function Model() {
	this.myChangeListeners = [];
}

Model.prototype.addChangeListener = function(f) {
  this.myChangeListeners.push(f);
};

Model.prototype.notifyOfChange = function(type) {
	for(var i = 0; i < this.myChangeListeners.length; i++) {
  	this.myChangeListeners[i]({change: type});
  }
};

var m = new Model(); m.addChangeListener(function(event) {
	alert(event.change);
}); // subscriber 1
m.addChangeListener(function(event) {
	confirm(event.change);
}); // subscriber 1

m.notifyOfChange("moved");
m.notifyOfChange("new game");