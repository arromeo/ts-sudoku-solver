(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,a){},16:function(t,e,a){},17:function(t,e,a){"use strict";a.r(e);var o=a(0),r=a.n(o),i=a(8),n=a.n(i),s=(a(15),a(16),a(2)),u=a(3),l=a(5),c=a(4),d=a(6),h=a(1);function v(t,e){return 3*Math.floor(t/3)+Math.floor(e/3)}function b(t,e){return t%3*3+e%3}function f(t,e){return 3*Math.floor(t/3)+Math.floor(e/3)}var m=function(t){var e="cell"+(2===t.column||5===t.column?" section-wall":"")+(2===t.row||5===t.row?" section-floor":"")+(t.valid?"":" invalid");return r.a.createElement("input",{type:"text",className:e,value:t.value,onChange:t.onchange})},g=function(){function t(){Object(s.a)(this,t),this.history=void 0,this.history=[]}return Object(u.a)(t,[{key:"add",value:function(t){this.history.push(t)}},{key:"merge",value:function(t){var e=this;t.forEach(function(t){return e.add(t)})}},{key:"length",value:function(){return this.history.length}},{key:"get",value:function(){return this.history.pop()}},{key:"ghostCount",value:function(){return this.history.filter(function(t){return!0===t.ghost}).length}}]),t}(),y=function(){function t(e){Object(s.a)(this,t),this.board=void 0,this.board=[];for(var a=0;a<9;a++){this.board.push([]);for(var o=0;o<9;o++)this.board[a].push(e)}}return Object(u.a)(t,[{key:"score",value:function(){var t=0;return this.board.forEach(function(e){e.forEach(function(e){t+=e})}),t}},{key:"print",value:function(){var t="";return this.board.forEach(function(e){t+=e.join("")+"\n"}),t}},{key:"toString",value:function(){for(var t=[],e=0;e<9;e++){t.push([]);for(var a=0;a<9;a++)t[e].push(this.board[e][a].toString())}return t}}]),t}(),p=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(c.a)(e).call(this,0))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"add",value:function(t,e,a){if(0===this.board[t][e])return this.board[t][e]=a,{row:t,column:e,value:a,boardType:"main",ghost:!1}}},{key:"remove",value:function(t,e){this.board[t][e]=0}}]),e}(y),w=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(c.a)(e).call(this,1))}return Object(d.a)(e,t),Object(u.a)(e,[{key:"add",value:function(t,e,a){return 1===this.board[t][e]?(this.board[t][e]=0,{row:t,column:e,value:a,boardType:"possibility",ghost:!1}):void 0}},{key:"remove",value:function(t,e){this.board[t][e]=1}}]),e}(y),k=function(){function t(){Object(s.a)(this,t),this.matrix=void 0,this.matrix=[];for(var e=0;e<9;e++)this.matrix.push(new w)}return Object(u.a)(t,[{key:"add",value:function(t,e,a){for(var o,r=[],i=f(t,e),n=0;n<9;n++)(o=this.matrix[n].add(t,e,n))&&r.push(o),(o=this.matrix[a].add(t,n,a))&&r.push(o),(o=this.matrix[a].add(n,e,a))&&r.push(o),(o=this.matrix[a].add(v(i,n),b(i,n),a))&&r.push(o);return r}},{key:"remove",value:function(t,e,a){this.matrix[a].remove(t,e)}},{key:"getSolvableItem",value:function(){for(var t,e,a=["row","column","block"],o=1;o<4;o++)for(var r=0;r<9;r++)for(var i=0;i<3;i++)for(var n=a[i],s=0;s<9;s++){for(var u=[],l=0;l<9;l++){switch(n){case"row":t=s,e=l;break;case"column":t=l,e=s;break;case"block":t=v(s,l),e=b(s,l)}if(1===this.matrix[r].board[t][e]&&(u.push(l),u.length>o))break}if(u.length===o)return{value:r,unitType:n,unitValue:s,solutions:u}}}}]),t}(),j=[1,2,3,4,5,6,7,8,9],O=function(){function t(){Object(s.a)(this,t),this.mainBoard=void 0,this.boardHistory=void 0,this.solveMatrix=void 0,this.status=void 0,this.totalRuns=void 0,this.mainBoard=new p,this.boardHistory=new g,this.solveMatrix=new k,this.status="forward",this.totalRuns=0}return Object(u.a)(t,[{key:"populateBoard",value:function(t){var e=this;t.forEach(function(t,a){t.forEach(function(t,o){var r=parseInt(t);j.includes(r)&&(e.boardHistory.merge(e.solveMatrix.add(a,o,r-1)),e.boardHistory.add(e.mainBoard.add(a,o,r)))})})}},{key:"solve",value:function(t){for(this.populateBoard(t);"forward"===this.status||"backward"===this.status;)if("forward"===this.status){var e=this.solveMatrix.getSolvableItem();if(void 0!==e)switch(e.unitType){case"row":if(e.solutions.length>1)for(var a=1;a<e.solutions.length;a++)this.boardHistory.add({row:e.unitValue,column:e.solutions[a],value:e.value,boardType:"main",ghost:!0});this.boardHistory.merge(this.solveMatrix.add(e.unitValue,e.solutions[0],e.value)),this.boardHistory.add(this.mainBoard.add(e.unitValue,e.solutions[0],e.value+1));break;case"column":if(e.solutions.length>1)for(var o=1;o<e.solutions.length;o++)this.boardHistory.add({row:e.solutions[o],column:e.unitValue,value:e.value,boardType:"main",ghost:!0});this.boardHistory.merge(this.solveMatrix.add(e.solutions[0],e.unitValue,e.value)),this.boardHistory.add(this.mainBoard.add(e.solutions[0],e.unitValue,e.value+1));break;case"block":if(e.solutions.length>1)for(var r=0;r<e.solutions.length;r++)this.boardHistory.add({row:v(e.unitValue,e.solutions[r]),column:b(e.unitValue,e.solutions[r]),value:e.value,boardType:"main",ghost:!0});this.boardHistory.merge(this.solveMatrix.add(v(e.unitValue,e.solutions[0]),b(e.unitValue,e.solutions[0]),e.value)),this.boardHistory.add(this.mainBoard.add(v(e.unitValue,e.solutions[0]),b(e.unitValue,e.solutions[0]),e.value+1));break;default:throw Error("Return type of SolveMatrix is not a solvable type")}else 405===this.mainBoard.score()?this.status="solved":this.status="backward"}else{if(!(this.boardHistory.length()>0))return this.status="unsolvable","We submitted the puzzle and the solver said no.";var i=this.boardHistory.get();if(!1===i.ghost)"main"===i.boardType?this.mainBoard.remove(i.row,i.column):this.solveMatrix.remove(i.row,i.column,i.value);else if(this.boardHistory.merge(this.solveMatrix.add(i.row,i.column,i.value)),this.boardHistory.add(this.mainBoard.add(i.row,i.column,i.value+1)),this.totalRuns++,console.log(this.totalRuns),this.status="forward",this.totalRuns>1e3)return console.log("setting to unsolvable"),"Looked into infinity and didn't see an answer."}return this.mainBoard.toString()}}]),t}(),S={board:Object(h.a)([Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""]),Object(h.a)(["","","","","","","","",""])]),invalid:Object(h.b)({row:Object(h.c)([]),column:Object(h.c)([]),block:Object(h.c)([])}),isValid:!1,errorMessage:""},V=function(t){function e(){var t,a;Object(s.a)(this,e);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(r)))).state=S,a}return Object(d.a)(e,t),Object(u.a)(e,[{key:"handleChange",value:function(t,e,a){var o,r=this,i=["1","2","3","4","5","6","7","8","9"];o=t.target.value.charAt(1)?i.includes(t.target.value.charAt(1))?t.target.value.charAt(1):"":i.includes(t.target.value.charAt(0))?t.target.value.charAt(0):"",this.setState(function(t){var r=t.board;return{board:r.set(e,r.get(e).set(a,o))}},function(){r.updateValidation()})}},{key:"handleSubmit",value:function(t){t.preventDefault();var e=(new O).solve(this.state.board.toJS());"string"===typeof e?this.setState({errorMessage:e}):this.setState({board:Object(h.d)(e)})}},{key:"updateValidation",value:function(){var t=this;this.setState({invalid:Object(h.d)(S.invalid),isValid:!0,errorMessage:""});for(var e=0,a=0;a<9;a++)for(var o=0;o<9;o++)""!==this.state.board.get(a).get(o)&&e++;e<17&&this.setState({isValid:!1,errorMessage:"Board needs at least 17 clues"});for(var r=function(e){for(var a=t.state.board.get(e).toJS(),o=0;o<9;o++)""!==a[o]&&a.indexOf(a[o])!==o&&t.setState(function(t){var a=t.invalid;return{invalid:a.set("row",a.get("row").add(e)),isValid:!1}})},i=0;i<9;i++)r(i);for(var n=function(e){for(var a=[],o=0;o<9;o++){var r=t.state.board.get(o).get(e);""!==r&&(!1===a.includes(r)?a.push(r):t.setState(function(t){var a=t.invalid;return{invalid:a.set("column",a.get("column").add(e)),isValid:!1}}))}},s=0;s<9;s++)n(s);for(var u=function(e){for(var a=[],o=0;o<9;o++){var r=v(e,o),i=b(e,o),n=t.state.board.get(r).get(i);""!==n&&(!1===a.includes(n)?a.push(n):t.setState(function(t){var a=t.invalid;return{invalid:a.set("block",a.get("block").add(e)),isValid:!1}}))}},l=0;l<9;l++)u(l)}},{key:"isCellValid",value:function(t,e){return!this.state.invalid.get("row").includes(t)&&!this.state.invalid.get("column").includes(e)&&!this.state.invalid.get("block").includes(f(t,e))}},{key:"handleClear",value:function(t){t.preventDefault(),this.setState({board:Object(h.d)(S.board)})}},{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"board-container"},r.a.createElement("h1",{className:"title"},"TypeScript Sudoku Solver"),r.a.createElement("form",{className:"board",onSubmit:function(e){return t.handleSubmit(e)}},this.state.board.map(function(e,a){return r.a.createElement("div",{key:a,className:"row"},e.map(function(e,o){return r.a.createElement(m,{key:a+"-"+o,row:a,column:o,value:e,valid:t.isCellValid(a,o),onchange:function(e){return t.handleChange(e,a,o)}})}))}),r.a.createElement("div",{className:"error"},this.state.errorMessage),r.a.createElement("div",{className:"button-container"},r.a.createElement("button",{className:"button",type:"submit",disabled:!this.state.isValid},"Solve"),r.a.createElement("button",{className:"button",onClick:function(e){return t.handleClear(e)}},"Clear"))),r.a.createElement("div",{className:"details"},"Find out how this works at the ",r.a.createElement("a",{href:"https://github.com/arromeo/ts-sudoku-solver"},"Github Repo")))}}]),e}(r.a.Component),x=function(){return r.a.createElement(V,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(r.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},9:function(t,e,a){t.exports=a(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.4decb8a0.chunk.js.map