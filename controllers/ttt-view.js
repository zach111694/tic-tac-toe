

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
  callback(tdElement, 3, 3);
}

Model m = new Model(5,4);
View v = new View(m, function(tdElement, row, column) {
	tdElement.addEventListener("click", function() {

  });
});

function createTable(board,cb){

	var t_board = document.createElement("table");
	t_board.setAttribute("id","tttBoard");
	t_board.setAttribute("class","game-grid-view"); 

	for(var i = 0; i < board.rows; i++){
		var t_row = document.createElement("tr");
		board.table.appendChild(t_row);

		for(j = 0; j < board.cols; j++){
			var t_cell = t_row.appendChild(document.createElement("td"));
			t_cell.appendChild(document.createTextNode(""));
			t_cell.className = "game-grid-cell";

			cb(t_cell,i,j);
		}
	}

	board.table.className = "game-grid-view";
}


function updateView(board){

	var table = document.getElementById("ttt_table");

	for(var row = 0; row < board.rows; i++){
		for(var col = 0; col < board.cols; j++){
			table.rows[row].cells[col].textContent = board.getPlayer(row,col);
		}
	}
}

