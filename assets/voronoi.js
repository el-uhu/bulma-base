var w             = 0.992 * window.innerWidth,
  h             =  document.getElementById('hero').clientHeight,
  radius        = 5.25,
  links         = [],
  cellsize      = 10,
  cellpadding   = 40,
  bleed         = 0,
  fillopacity   = 0.750,
  strokeopacity = 0.750,
  cellsX        = 1,
  cellsY        = 2,
  x_gradient    = ["#fff", "#aaa"],
  y_gradient    = ["#fff", "#aaa"];
  colors = ["#baf58e", "#74cb91",  "#459e8a", "#347175"]
  fill_color = "#fbfbfb"
  simulate      = true,
  zoomToAdd     = true;

var vertices = d3.range(cellsX*cellsY).map(function(d) {
             var col = d % cellsX;
             var row = Math.floor(d / cellsX);
             var x   = Math.round(-bleed + col*cellsize + Math.random() * (cellsize - cellpadding*2) + cellpadding);
             var y   = Math.round(-bleed + row*cellsize + Math.random() * (cellsize - cellpadding*2) + cellpadding);
             return [x, y];
           });

var d3_geom_voronoi = d3.geom.voronoi().x(function(d) { return d.x; }).y(function(d) { return d.y; });

var voronoi = d3.geom.voronoi()
              .clipExtent([[cellpadding, cellpadding], [w - cellpadding, h - cellpadding]])
             .x(function(d) { return d.x; })
             .y(function(d) { return d.y; })
              .triangles(vertices);

var prevEventScale = 1;

function grow(d){
  angle = radius * vertices.length;
  vertices.push({x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)});
  force.nodes(vertices).start();
}

function shrink(){
  vertices.pop();
  force.nodes(vertices).start();
}

// define zoom
var zoom = d3.behavior.zoom().on("zoom", function(d,i) {
           if (zoomToAdd){
             if (d3.event.scale > prevEventScale) {
               grow();
             } else if (vertices.length > 2 && d3.event.scale != prevEventScale) {
               shrink();
             }
             force.nodes(vertices).start();
           } else {
             if (d3.event.scale > prevEventScale) {
               radius += .01;
             } else {
               radius -= .01;
             }
             vertices.forEach(function(d, i) {
               angle = radius * (i+10);
               vertices[i] = {x: angle*Math.cos(angle)+(w/2), y: angle*Math.sin(angle)+(h/2)};
             });
             force.nodes(vertices).start();
           }
           prevEventScale = d3.event.scale;
         });

// define hotkeys
d3.select(window)
.on("keydown", function() {
  // shift
  if(d3.event.keyCode == 16) {
    zoomToAdd = false;
  }
  // s
  if(d3.event.keyCode == 83) {
    simulate = !simulate;
    if(simulate) {
      force.start();
    } else {
      force.stop();
    }
  }
  // // key up -> add nodes
  // if(d3.event.keyCode == 38) {
  //   grow();
  // }
  // // key down -> remove nodes
  // if(d3.event.keyCode == 40) {
  //   shrink();
  // }
})
.on("keyup", function() {
  zoomToAdd = true;
});

// prepare svg element
var svg = d3.select(".hero")
          .append("g")
          .style("position", "absolute")
          .style("left", "0")
          .style("top", "0")
          .style("z-index", "1")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .call(zoom);

// define force parameters
var force = d3.layout.force()
            .charge(-800)
            .size([w, h])
            .on("tick", update);

// use the force
force.nodes(vertices).start();

for(i=-5; i<80; i++){
  zoom.scale(i);
  svg.transition()
  .duration(6000)
  .ease("exp")
  .call(zoom.event)
}




// define paths
var path = svg.append("g").attr("class", "bubbles").selectAll("path");

// update function
function update(e) {
  path = path.data(d3_geom_voronoi(vertices));
  //path = path.data(voronoi);
  path.enter().append("path")
      // drag node by dragging cell
      .call(d3.behavior.drag()
        .on("drag", function(d, i) {
          vertices[i] = {x: vertices[i].x + d3.event.dx, y: vertices[i].y + d3.event.dy};
        })
      )
      .style("fill", function(d, i) {
          return colors[Math.floor((Math.random() *colors.length))];
      })
      .style("stroke", "#aaa")
      .style("fill-opacity", 1)

  path.attr("d", function(d) { return "M" + d.join("L") + "Z"; })
      .transition().duration(1000)
      .ease("linear")
      .style("fill-opacity", 0)
      .style("stroke",  "#aaa");

  path.exit().remove();

  if(!simulate) force.stop()
}
