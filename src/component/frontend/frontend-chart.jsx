import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import AngularChar from '../../assets/angular.png'
import VueChar from '../../assets/vue.png'
import ReactChar from '../../assets/react.png'
import FrontendAvavatar from '../../assets/frontend_char_1.png'



const frontendChart = () => {
  const ref = useRef();

  useEffect(() => {
    // Function to render the chart
    const renderChart = () => {
      // Remove any existing SVG to avoid duplicates
      d3.select(ref.current).select("svg").remove();

      // Dynamically calculate dimensions based on screen size
      const width = Math.min(window.innerWidth - 30, 800); // Max width of 800px
      const height = Math.max(window.innerHeight - 150, 400); // Minimum height of 400px

           // Add padding for labels
           const paddingTop = 50; // Space for labels above nodes
           const paddingBottom = 50; // Space for labels below leaf nodes

      const data = {
        name: "Frontend Developer",
        children: [
          {
            name: "Angular",
            children: [
              { name: "" },
              { name: "" },
            ],
          },
          {
            name: "Vue",
            children: [
              { name: "" },
              { name: "" },
            ],
          },
          {
            name: "React", 
            children: [
              { name: "" },
              { name: "" },
            ],
          },
        ],
      };

      // Create a hierarchical layout (top-to-bottom)
      const root = d3.hierarchy(data);
      const treeLayout = d3.tree()
      .size([width, height - paddingTop - paddingBottom]) // Subtract padding from height
      .separation((a, b) => (a.parent === b.parent ? 1 : 2)); // Adjust spacing

      // Compute the tree layout
      treeLayout(root);

      // Create an SVG container
      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(20, ${paddingTop})`);  // Add padding

      // Add links between nodes
      const links = svg
        .selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)
        .attr("d", d3.linkVertical().x((d) => d.x).y((d) => d.y));

      // Add nodes
      const node = svg
        .selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.x},${d.y})`)
        .call(
          d3
            .drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
        );

      // Add circles for nodes
      node
        .append("circle")
        .attr("r", Math.min(width / 100, 10)) // Adjust circle size based on screen width
        .attr("fill", "steelblue");

      // Add text labels for nodes
      node
        .append("text")
        .attr("dy", "-1rem")
        .attr("x", 0) // Move text further to the left for parent nodes
        .style("text-anchor", "middle")
        .style("fill", "white") // White text color
        .style("font-size", `${Math.min(width / 20, 20)}px`) // Adjust font size based on screen width
        .text((d) => d.data.name);

      // Optional: Add images to nodes
      node
        .append("image")
        .attr("xlink:href", (d) =>
          d.data.name === "Frontend Developer"
            ? FrontendAvavatar
            : d.data.name === "Angular"
            ? AngularChar
            : d.data.name === "Vue" 
            ? VueChar
            : d.data.name === "React"
            ? ReactChar
            : null
        )
        .attr("width", Math.min(width / 5, 60)) 
        .attr("height", Math.min(width /5, 60))
        .attr("x", -30)
        .attr("y", 1);
    };

    // Initial render
    renderChart();

    // Re-render on window resize
    window.addEventListener("resize", renderChart);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", renderChart);
    };
  }, []);

  // Drag behavior functions
  function dragStarted(event, d) {
    d3.select(this).raise().classed("active", true);
  }

  function dragged(event, d) {
    d.x = event.x;
    d.y = event.y;
    d3.select(this).attr("transform", `translate(${d.x},${d.y})`);
    d3.selectAll(".link").attr("d", d3.linkVertical().x((d) => d.x).y((d) => d.y));
  }

  function dragEnded(event, d) {
    d3.select(this).classed("active", false);
  }

  return <div ref={ref}></div>;
};

export default frontendChart;