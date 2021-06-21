

  function addRowHandlers() {
    var rows = document.getElementById("tableId").rows;
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function(){ return function(){
               var id = this.cells[0].innerHTML;
               alert("id:" + id + data[id]);
        };}(rows[i]);
    }
}
window.onload = addRowHandlers();