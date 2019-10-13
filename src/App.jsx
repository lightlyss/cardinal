import React from 'react';
import { L2Dwidget } from 'live2d-widget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFamily: null,
      currentModel: null,
      index: null
    };
  }

  // Globally loads Live2D
  static initL2D(basePath, prefix, width, height, hOffset, vOffset, scale, cid) {
    if (prefix) prefix += '.';
    else prefix = '';
    const jsonPath = `${basePath}/${prefix}model.json`;
    L2Dwidget.init({
      model: {jsonPath, scale},
      display: {width, height, hOffset, vOffset},
      name: {canvas: cid}
    });
  }

  // Returns string
  getFamilyByLabel(label) {
    for (const f in this.state.index) {
      if (this.state.index[f].label === label) return f;
    }
    return null;
  }

  // Returns object
  getModelByLabel(label) {
    return this.state.index[this.state.currentFamily].models
      .find(m => m.label === label);
  }

  // On select family
  handleFamilyChange(ev) {
    const family = this.getFamilyByLabel(ev.target.value);
    if (family === this.state.currentFamily) return;
    this.setState({currentFamily: family});
  }

  // On select model
  handleModelChange(ev) {
    const model = this.getModelByLabel(ev.target.value);
    if (model.id === this.state.currentModel.id) return;
    this.setState({currentModel: model});
    window.location.search = `?model=${this.state.currentFamily}-${model.id}`;
  }

  async componentWillMount() {
    const res = await fetch('./json/index.json');
    const index = res.ok ? await res.json() : null;
    return this.setState({index}, () => this.configL2D());
  }

  configL2D() {
    const params = new URLSearchParams(window.location.search);
    const modelTag = params.get('model');
    let family = Object.keys(this.state.index)[0];
    let model = this.state.index[family].models[0];

    if (modelTag) {
      const args = modelTag.split('-');
      if (args[0] && args[1]) {
        family = args[0];
        model = this.state.index[family].models.find(m => m.id === args[1]);
      }
    }

    this.setState({currentFamily: family, currentModel: model});
    return App.initL2D(
      `./models/${family}/${model.id}`,
      model.prefix,
      this.state.index[family].width,
      this.state.index[family].height,
      this.state.index[family].hOffset,
      this.state.index[family].vOffset,
      this.state.index[family].scale,
      `l2d-${family}-${model.id}`
    );
  }

  renderFamilySelector() {
    const currentLabel = this.state.index[this.state.currentFamily].label;
    return (<p>
      <label htmlFor="select">Family:</label>
      <select value={currentLabel} className="full" id="selectf"
        onChange={e => this.handleFamilyChange(e)}>
        {
          Object.keys(this.state.index)
            .map(f => <option key={f}>{this.state.index[f].label}</option>)
        }
      </select>
    </p>);
  }

  renderModelSelector() {
    return (<p>
      <label htmlFor="select">Model:</label>
      <select value={this.state.currentModel.label}
        className="full" id="selectm"
        onChange={e => this.handleModelChange(e)}>
        {
          this.state.index[this.state.currentFamily].models
            .map(m => <option key={m.id}>{m.label}</option>)
        }
      </select>
    </p>);
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
          {this.renderFamilySelector()}
          {this.renderModelSelector()}
        </fieldset>
      </form>
    </div>);
  }
}

export default App;
