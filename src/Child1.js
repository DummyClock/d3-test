import React, { Component } from "react";
import * as d3 from 'd3'

class Child1 extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 700;    // of svg
    const height = 400;   // svg
    const innerWidth = width - margin.left - margin.right;  // for scatterplot
    const innerHeight = height - margin.top - margin.bottom;// for scatterplot

    var data = this.props.data1;

    // select svg (this is just one way to set up a chart)
    const svg = d3.select(".container").attr("width", width).attr("height", height);
    const innerChart = svg.select(".inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.total)]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.tip)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);  // Can swap axis labels orientation using d3.axisRight(yScale);

    innerChart.selectAll(".x-axis").data([null]) 
      .join("g").attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)  //must transform so it doesn't appear at the bottom
      .call(xAxis);

    innerChart.selectAll(".y-axis").data([null]) 
      .join("g").attr('class','y-axis') 
      .call(yAxis);

    innerChart.selectAll("circle").data(data).join("circle").attr("r", 5).attr("fill", "brown")
      .attr("cx", d => xScale(d.total)).attr("cy", d => yScale(d.tip))

    // Draw Gridlines
    d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "blue");
    d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "blue");

    // Labels
    svg.append("text")
        .attr("x", width/2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Total Bill vs Tipped Amount")

    svg.append("text")
        .attr("x", width/2)
        .attr("y", height - 2)
        .attr("text-anchor", "middle")
        .text("Total Bill")
    
    svg.append("text")
        .attr("x", -height / 2)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("text-anchor", "middle")
        .text("Tip ($)")
  }

  render() {
    return (
      <svg className="container">
        <g className="inner_chart"></g>
      </svg>
    );
  }
}

export default Child1;