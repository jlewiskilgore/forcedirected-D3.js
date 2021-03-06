var dataUrl = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json;

	var height = 700;
	var width = 1600;

	var dataLinks = dataSet.links;
	var dataNodes = dataSet.nodes;

	d3.select(".forcegraph-title").text("Force-directed Graph of National Contiguity");

	var svg = d3.select(".forcegraph")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "-300 -825 1200 1600");

	var simulation = d3.forceSimulation(dataNodes)
		.force("link", d3.forceLink(dataLinks).distance(100))
		.force("charge", d3.forceManyBody().strength(-15))
		.on("tick", ticked);

	// Append Links
	var link = svg.append("g")
		.attr("class", "links")
		.selectAll("line")
		.data(dataLinks)
		.enter()
		.append("line");

	// Append Nodes
	var node = svg.append("g")
		.attr("class", "nodes")
		.selectAll(".node")
		.data(dataNodes)
		.enter()
		.append("g")
		.attr("class", "node")
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	node.append("image")
		.attr("xlink:href", function(d) {
			console.log(d.code);
			return "https://rawgit.com/hjnilsson/country-flags/master/svg/" + d.code + ".svg";
		})
		.attr("x", "-10")
		.attr("y", "-10")
		.attr("width", 70)
		.attr("height", 50);


	function ticked(e) {
		node
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});

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