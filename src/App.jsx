import React from 'react';
import { L2Dwidget } from 'live2d-widget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModel: 'shizuku',
      models: ['Epsilon2.1', 'haru01', 'haru02', 'shizuku', 'tsumiki']
    };
  }

  initL2D(model, width = 300, height = 600) {
    L2Dwidget.init({
      model: {
        jsonPath: `./models/${model}/${model}.model.json`
      },
      display: { width, height }
    });
  }

  handleChange(ev) {
    const model = ev.target.value;
    if (model === this.state.currentModel) return;
    this.setState({currentModel: model})
    window.location.search = `?model=${model}`;
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const model = params.get('model');
    if (model) this.setState({currentModel: model});
    this.initL2D(model || this.state.currentModel);
  }

  render() {
    return (<div>
      <h1>Cardinal</h1>
      <p>Named after SAO's central authority.</p>
      <h2>Configuration</h2>
      <form>
        <fieldset>
          <legend>Settings</legend>
          <p>
            <label htmlFor="select">Model:</label>
            <select value={this.state.currentModel} className="full" id="select" onChange={e => this.handleChange(e)}>
              {this.state.models.map(
                m => <option key={m}>{m}</option>
              )}
            </select>
          </p>
        </fieldset>
      </form>
    </div>);
  }
}

export default App;
