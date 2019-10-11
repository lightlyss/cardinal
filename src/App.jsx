import React from 'react';
import { L2Dwidget } from 'live2d-widget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFamily: 'default',
      currentModel: {"id": "000", "label": "Shizuku", "prefix": "shizuku"},
      index: null
    };
  }

  initL2D(family, model, width = 300, height = 600) {
    const jsonPath = `./models/${family}/${model.id}/`
      + `${model.prefix ? model.prefix + '.' : ''}model.json`;
    L2Dwidget.init({
      model: {jsonPath},
      display: {width, height}
    });
  }

  handleFamilyChange(ev) {
    const family = ev.target.value;
    if (family === this.state.currentFamily) return;
    this.setState({currentFamily: family});
  }

  handleModelChange(ev) {
    const model = this.state.index[this.state.currentFamily]
      .find(m => m.label === ev.target.value);
    if (model.id === this.state.currentModel.id) return;
    this.setState({currentModel: model});
    window.location.search = `?model=${this.state.currentFamily}-${model.id}`;
  }

  async componentWillMount() {
    const res = await fetch('./json/index.json');
    const index = res.ok ? await res.json() : null;
    this.setState({index: index});

    const params = new URLSearchParams(window.location.search);
    const modelTag = params.get('model');
    if (modelTag) {
      const args = modelTag.split('-');
      if (args[0] && args[1]) {
        const family = args[0], id = args[1];
        const model = index[family].find(m => m.id === id);
        this.setState({currentFamily: family, currentModel: model});
        return this.initL2D(family, model);
      }
    }
    return this.initL2D(this.state.currentFamily, this.state.currentModel);
  }

  render() {
    if (!this.state.index || !this.state.index[this.state.currentFamily]) {
      return <div><h1>Loading...</h1></div>;
    }
    return (<div>
      <h1>Cardinal</h1>
      <p>Live2D x ReactJS!</p>
      <h2>Configuration</h2>
      <form>
        <fieldset>
          <legend>Settings</legend>
          <p>
            <label htmlFor="select">Family:</label>
            <select
              value={this.state.currentFamily}
              className="full"
              id="selectf"
              onChange={e => this.handleFamilyChange(e)}>
              {
                Object.keys(this.state.index)
                  .map(f => <option key={f}>{f}</option>)
              }
            </select>
          </p>
          <p>
            <label htmlFor="select">Model:</label>
            <select
              value={this.state.currentModel.label}
              className="full"
              id="selectm"
              onChange={e => this.handleModelChange(e)}>
              {
                this.state.index[this.state.currentFamily]
                  .map(m => <option key={m.id}>{m.label}</option>)
              }
            </select>
          </p>
        </fieldset>
      </form>
    </div>);
  }
}

export default App;
