import React from 'react';
import { L2Dwidget } from 'live2d-widget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    L2Dwidget.init({
      model: {
        jsonPath: './models/shizuku/shizuku.model.json'
      },
      display: {
        width: 300,
        height: 600
      }
    });
  }

  render() {
    return (<div>
      <h1>Cardinal</h1>
      <p>Named after SAO's central authority.</p>
    </div>);
  }
}

export default App;
