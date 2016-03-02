
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

function double(num, callback) {
	alert("The number you entered is " + num);
	callback(2*num);
}

//double(5, alert);

function View(model, callback) {
  callback(tdElement, 3, 5);
}

Model m = new Model(5,4);
View v = new View(m, function(tdElement, row, column) {
	tdElement.addEventListener("click", function() {
  	
  });
});




function createGrid(rows,columns){

	var table = document.createElement("table");

	for(i = 0; i < rows; i++){
		var t_row = table.appendChild(document.createElement("tr"));

		for(j = 0; j < columns; j++){
			var t_cell = t_row.appendChild(document.createElement("td"));
			
			t_cell.appendChild(document.createTextNode("X"));
			t_cell.className = "game-grid-cell";
		}
	}

	table.className = "game-grid-view";

	var element = document.getElementById("ttt");

	element.appendChild(table);

}

function setCellText(row,col,str){

	var newCellValue = document.getElementsByClassName("game-grid-view")[0];

	newCellValue = newCellValue.rows[row].cells[col].innerHTML = str;
}

