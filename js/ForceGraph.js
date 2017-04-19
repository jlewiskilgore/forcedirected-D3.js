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
		.data(dataLinks)
		.enter()
		.append("line");

	// Append Nodes
	var node = svg.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(dataNodes)
		.enter()
		.append("circle")
			.attr("r", 5)
			.attr("fill", "#fff")
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

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

	function dragstarted(d) {
		if(!d3.event.active) {
			simulation.alphaTarget(0.3).restart();
		}
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if(!d3.event.active) {
			simulation.alphaTarget(0);
		}
		d.fx = null;
		d.fy = null;
	}

});