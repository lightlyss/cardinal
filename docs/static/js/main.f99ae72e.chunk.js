(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(2),o=n.n(r),c=n(3),i=n(4),u=n(7),s=n(5),d=n(8),h=n(6),m=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={currentModel:"shizuku",models:["Epsilon2.1","haru01","haru02","shizuku","tsumiki"]},n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"initL2D",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:600;h.L2Dwidget.init({model:{jsonPath:"./models/".concat(e,"/").concat(e,".model.json")},display:{width:t,height:n}})}},{key:"handleChange",value:function(e){var t=e.target.value;t!==this.state.currentModel&&(this.setState({currentModel:t}),window.location.search="?model=".concat(t))}},{key:"componentDidMount",value:function(){var e=new URLSearchParams(window.location.search).get("model");e&&this.setState({currentModel:e}),this.initL2D(e||this.state.currentModel)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("h1",null,"Cardinal"),l.a.createElement("p",null,"Named after SAO's central authority."),l.a.createElement("h2",null,"Configuration"),l.a.createElement("form",null,l.a.createElement("fieldset",null,l.a.createElement("legend",null,"Settings"),l.a.createElement("p",null,l.a.createElement("label",{htmlFor:"select"},"Model:"),l.a.createElement("select",{value:this.state.currentModel,className:"full",id:"select",onChange:function(t){return e.handleChange(t)}},this.state.models.map(function(e){return l.a.createElement("option",{key:e},e)}))))))}}]),t}(l.a.Component);n(15);o.a.render(l.a.createElement(m,null),document.getElementById("root"))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.f99ae72e.chunk.js.map