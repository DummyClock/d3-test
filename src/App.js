import React, { Component } from "react"
import * as d3 from 'd3'
import tips from './tips.csv'
import Child1 from './Child1'
import Child2 from './Child2'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {data:[]};
  }

  componentDidMount(){
    // Extract csv data
    var self = this;
    d3.csv(tips, function(d){
      return {
        tip: parseFloat(d.tip), 
        total: parseFloat(d.total_bill),
        day: d.day,
      };
    }).then(function(csv_data){
      self.setState({data: csv_data}, function() {
        console.log(self.state.data);
      });
    }).catch(function(e){
      console.log(e);
    });
  }

  render() {
    return <div className="parent">
      <Child1 className="scatter_plot" data1={this.state.data}></Child1>
      <Child2 className="bar_chart" data2={this.state.data}></Child2>
    </div>;
  }
}

export default App;
