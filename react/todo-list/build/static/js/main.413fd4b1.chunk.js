(this["webpackJsonptodo-list"]=this["webpackJsonptodo-list"]||[]).push([[0],{12:function(e,t,n){e.exports=n(20)},17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(8),c=n.n(r),l=(n(17),n(2)),u=n(3),i=n(4),s=n(5),d=n(11),m=n(10),p=(n(18),function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).handleSubmit=function(t){t.preventDefault(),e.state.text&&e.props.insertTodo(e.state.text),e.setState({text:""})},e.handleInputChange=function(t){e.setState({text:t.target.value})},e.state={text:""},e}return Object(u.a)(n,[{key:"render",value:function(){return o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("div",{className:"text-field"},o.a.createElement("label",null,"Add New Item"),o.a.createElement("input",{type:"text",value:this.state.text,placeholder:"Eg: Watch Game of Thrones",onChange:this.handleInputChange})),o.a.createElement("button",{onClick:this.handleSubmit},"Add Item"))}}]),n}(a.Component)),h=n(6),v=n(9);n(19);function f(e){var t=e.item,n=e.index,a=e.removeTodo,r=e.changeTodoStatus,c=t.completed?"complete":"incomplete";return o.a.createElement("li",{className:c},o.a.createElement("span",null,t.value),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){a(n)}},o.a.createElement(v.a,null)),o.a.createElement("button",{onClick:function(){r(n)}},t.completed?o.a.createElement(h.b,null):o.a.createElement(h.a,null))))}var b=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement("ul",{className:"todo-list"},this.props.todoList.map((function(t,n){return o.a.createElement(f,{key:n,index:n,item:t,removeTodo:e.props.removeTodo,changeTodoStatus:e.props.changeTodoStatus})})))}}]),n}(a.Component),E=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).insertTodo=function(t){var n={value:t,completed:!1};e.setState({todos:[].concat(Object(m.a)(e.state.todos),[n])})},e.removeTodo=function(t){var n=e.state.todos.filter((function(e,n){return t!==n}));e.setState({todos:n})},e.changeTodoStatus=function(t){var n=e.state.todos.map((function(e,n){return n!==t?e:Object(d.a)({},e,{completed:!e.completed})}));e.setState({todos:n})},e.state={todos:[{value:"Go to market",completed:!1},{value:"Play FIFA",completed:!0}]},e}return Object(u.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Todo List"),o.a.createElement(p,{insertTodo:this.insertTodo}),o.a.createElement(b,{todoList:this.state.todos,removeTodo:this.removeTodo,changeTodoStatus:this.changeTodoStatus}))}}]),n}(a.Component),j=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return o.a.createElement("div",{className:"main-container-wrapper"},o.a.createElement(E,null))}}]),n}(a.Component);c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(j,null)),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.413fd4b1.chunk.js.map