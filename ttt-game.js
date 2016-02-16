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

