(this["webpackJsonp2.6-2.10"]=this["webpackJsonp2.6-2.10"]||[]).push([[0],{17:function(e,n,t){e.exports=t(40)},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(16),u=t.n(c),o=t(6),l=t(2),i=function(e){var n=e.person,t=e.remove;return r.a.createElement(r.a.Fragment,null,n.map((function(e){return r.a.createElement("p",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})))},m=function(e){var n=e.submit,t=e.nameChange,a=e.phoneChange,c=e.name,u=e.phone;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t,value:c,required:!0})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:a,value:u,required:!0})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.filterChange,t=e.filter;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{onChange:n,value:t}))},f=t(4),d=t.n(f),h="api/persons",b=function(){return d.a.get(h).then((function(e){return e.data}))},v=function(e){return d.a.post(h,e).then((function(e){return e.data}))},p=function(e,n){return d.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return d.a.delete("".concat(h,"/").concat(e))},E=(t(39),function(e){var n=e.message;if(null==n.message)return null;var t={};return n.error&&(t={color:"red",borderColor:"red"}),r.a.createElement("div",{className:"message",style:t},n.message)}),j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),f=Object(l.a)(u,2),d=f[0],h=f[1],j=Object(a.useState)(""),O=Object(l.a)(j,2),C=O[0],w=O[1],y=Object(a.useState)(""),S=Object(l.a)(y,2),k=S[0],N=S[1],A=Object(a.useState)(Object(o.a)(t)),q=Object(l.a)(A,2),x=q[0],D=q[1],J=Object(a.useState)({message:null,error:!1}),L=Object(l.a)(J,2),B=L[0],F=L[1],I=function(){b().then((function(e){D(e),c(e)}))};Object(a.useEffect)((function(){I()}),[]);var M=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];F({message:e,error:n}),setTimeout((function(){F({message:null,error:!1})}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:B}),r.a.createElement(s,{filterChange:function(e){var n=e.target.value.toLowerCase();N(n),D(""===n?Object(o.a)(t):Object(o.a)(t).filter((function(e){return e.name.toLowerCase().includes(n)})))},filter:k}),r.a.createElement("h2",null,"Add New Number"),r.a.createElement(m,{submit:function(e){e.preventDefault();var n={name:d,number:C};if(t.map((function(e){return e.name})).includes(n.name)){if(window.confirm("".concat(n.name," is already added to phonebook, replace number?"))){var a=t.filter((function(e){return e.name===n.name}))[0].id;p(a,n).then((function(e){M("".concat(e.name,"'s contact has been updated successfully")),I()})).catch((function(){M("".concat(n.name," has already been removed from server"),!0),I()}))}}else v(n).then((function(e){M("".concat(e.name,"'s contact has been Added")),c(t.concat(e)),D(x.concat(e))})).catch((function(e){M(e.response.data.error||"An error occured, please try again!!",!0)}))},nameChange:function(e){return h(e.target.value)},phoneChange:function(e){return w(e.target.value)},name:d,phone:C}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{person:x,remove:function(e){window.confirm("Do you really want to delete this contact?")&&g(e).then((function(){var n=t.filter((function(n){return n.id!==e}));M("Contact has been deleted"),c(n),D(n)})).catch((function(e){M("Contact did not exist on server",!0),I()}))}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.4d24fbae.chunk.js.map