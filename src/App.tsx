import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // added the `showGraph` property
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      /** 
       * We define the initial state of the graph as hidden. This is because we want the graph to show
       * when the user clicks ‘Start Streaming Data’.
       */ 
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    /** 
    * To ensure that the graph doesn’t render until a user clicks the ‘Start
    * Streaming’ button we added a condition to render the graph 
    * when the application state’s`showGraph` property is `true`.
    */     
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }


/**
 * Get new data from server and update the state with the new data
 */
getDataFromServer() {
    let iterations = 0;
    const interval = setInterval(() => {
    // Update the state by creating a new array of data that consists of
    // Previous data in the state and the new data from server
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
            this.setState({
                data: serverResponds,
                showGraph: true,
            });
        });
        iterations++;
        if (iterations > 1000) {
            clearInterval(interval);
        }
    }, 100);
}

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
