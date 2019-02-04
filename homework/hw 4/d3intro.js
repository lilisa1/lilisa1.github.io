var myData = ['A', 'B', 'C', 'D', 'E'];

function doEnter() {
	d3.select('#squares')
	  .selectAll('svg')
	  .data(myData)
	  .enter()
	  .append('svg');
}

function doExit() {
    var myData = ['A'];
	d3.select('#squares')
	  .selectAll('svg')
	  .data(myData)
	  .exit()
	  .remove();
}

