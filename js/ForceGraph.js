var dataUrl = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;

	var height = 650;
	var width = 1000;

	var dataLinks = dataSet.links;
	var dataNodes = dataSet.nodes;

	d3.select(".forcegraph-title").text("Force-directed Graph of National Contiguity");

	var svg = d3.select("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "-700 -825 1200 1800");

	var simulation = d3.forceSimulation(dataNodes)
		.force("link", d3.forceLink(dataLinks).distance(200))
		.force("charge", d3.forceManyBody().strength(-30))
		.on("tick", ticked);

	// Append Links
	var link = svg.append("g")
		.attr("class", "links")
		.selectAll("link")
		.data(dataLinks)
		.enter()
		.append("line");

	// Append Nodes
	var node = d3.select(".forcegraph")
		.data(dataNodes)
		.enter()
		.append("img")
		.attr("class", function(d) {
			return "flag flag-" + d.code;
		})
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	function ticked(e) {
		node
			.style("left", function(d) { return d.x + "px"; })
			.style("top", function(d) { return d.y + "px"; });

		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
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