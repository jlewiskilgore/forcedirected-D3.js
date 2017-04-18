var dataUrl = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;

	var height = 600;
	var width = 600;

	var dataLinks = dataSet.links;
	var dataNodes = dataSet.nodes;

	d3.select(".forcegraph-title").text("Force-directed Graph of National Contiguity");

	var svg = d3.select(".forcegraph")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "-200 -200 550 550");

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().distance(20).strength(1).id(function(d) {
			return d.country;
		}))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter( width/2, height/2 ));

	// Append Links
	var link = svg.selectAll(".link")
		.attr("class", "link")
		.data(dataSet.links)
		.enter()
		.append("line");

	// Append Nodes
	var node = svg.selectAll(".node")
		.attr("class", "node")
		.data(dataSet.nodes)
		.enter()
		.append("circle")
			.attr("r", 5)
			.attr("fill", "#fff");

	simulation
		.nodes(dataSet.nodes);

	function ticked(e) {
		/* link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y1", function(d) { return d.target.x; })
		*/
	}

});