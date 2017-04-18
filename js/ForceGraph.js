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
		.attr("viewBox", "-300 -300 600 600");

	var simulation = d3.forceSimulation(dataNodes)
		.force("link", d3.forceLink(dataLinks).distance(200))
		.force("charge", d3.forceManyBody())
		.force("x", d3.forceX())
		.force("y", d3.forceY())
		.alphaTarget(1)
		.on("tick", ticked);

	// Append Links
	var link = svg.append("g")
		.attr("class", "links")
		.selectAll("link")
		.data(dataSet.links)
		.enter()
		.append("line");

	// Append Nodes
	var node = svg.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(dataSet.nodes)
		.enter()
		.append("circle")
			.attr("r", 5)
			.attr("fill", "#fff");

	function ticked(e) {
		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })

		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; })
	}

});