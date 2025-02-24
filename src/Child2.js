import React, { Component } from "react";
import * as d3 from 'd3'

class Child2 extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        const margin = { top: 40, right: 50, bottom: 50, left: 50 };
        const width = 700;    // of svg
        const height = 400;   // svg
        const innerWidth = width - margin.left - margin.right;  // for scatterplot
        const innerHeight = height - margin.top - margin.bottom;// for scatterplot

        var data = this.props.data2;
        const svg = d3.select(".container2").attr("width", width).attr("height", height);
        const innerChart = svg.select(".inner_chart2").attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        const bandScale = d3.scaleBand()
        .domain(["Sun", "Sat", "Thur", 'Fri'])
        .range([0, innerHeight])  
        .padding(0.1); 

        const xScale = d3.scaleBand().domain(["Sun", "Sat", "Thur", "Fri"]).range([0, innerWidth]).padding(0.1)
        const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.tip)]).range([innerHeight, 0])
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);  // Can swap axis labels orientation using d3.axisRight(yScale);
    
        innerChart.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => xScale(d.day)) 
        .attr('y', d => yScale(d.tip))  
        .attr('width', xScale.bandwidth())  
        .attr('height', d => innerHeight - yScale(d.tip))  
        .attr('fill', 'green');

        // Append Y-axis
        innerChart.append("g")
        .attr('class', 'y-axis')
        .call(yAxis);

        // Append X-axis
        innerChart.append("g")
        .attr('class', 'x-axis')
        .attr("transform", `translate(0, ${innerHeight})`)  // Position the x-axis at the bottom
        .call(xAxis);

        // Labels
        svg.append("text")
            .attr("x", width/2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .text("Avergae Tip per Day")
    
        svg.append("text")
            .attr("x", width/2)
            .attr("y", height - 2)
            .attr("text-anchor", "middle")
            .text("Day")
        
        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .attr("text-anchor", "middle")
            .text("Tip Average ($)")
    }

    render(){
        return (
            <svg className="container2">
              <g className="inner_chart2"></g>
            </svg>
          );
    }
}

export default Child2;
