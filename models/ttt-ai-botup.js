

function mapper(){
	return fileName.map(function(gameModel){

		var gameKey = JSON.stringify(gameModel);
			return {};
	});
}


var initialInput = [{
	key: modelString,

	value:{
		parentModels: parentModelStringList,
		isAITurn: true/false,
		points: points
	}
}];


function Model(rows,cols){
	this.newGame(rows,cols);
}

Model.prototype.newGame = function(rows,cols){
	this.rows = rows;
	this.cols = cols;
	this.maxMoves = rows*cols;
	this.board = [];
	this.currMoves = 0;

	for(var i = 0; i < rows; i++){
		this.board.push([]);
		for(var j = 0; j < cols; j++){
			this.board[i].push("");
		}
	}
}

var testGame = new Model(3,3);

