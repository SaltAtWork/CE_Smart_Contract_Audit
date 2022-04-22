(this["webpackJsonpscat-web"]=this["webpackJsonpscat-web"]||[]).push([[0],{180:function(e,t,c){},320:function(e,t,c){},321:function(e,t,c){"use strict";c.r(t);var n=c(0),i=c(62),a=c.n(i),s=c(12),r=(c(180),c(18));function d(e){return"Blank"!==e&&void 0!==e}function j(e,t){var c,n,i=1e9,a=1e6;return e>=i?(n=(c=Math.round(e/i*10)/10).toFixed(1))+" B":e>=a?(n=(c=Math.round(e/a*10)/10).toFixed(1))+" M":e>=1e3?(n=(c=Math.round(e/1e3*10)/10).toFixed(1))+" K":(n=(c=Math.round(10*e)/10).toFixed(1),c>0&&!0===t&&(n="+"+n),n)}var l=c(2);function h(e){var t=e.input,c=e.placeholder,n=Object(r.f)();return Object(l.jsxs)("tr",{onClick:function(){n.push("/info/"+t.name)},children:[Object(l.jsx)("td",{children:t.name}),Object(l.jsx)("td",{children:t.category}),Object(l.jsx)("td",{children:t.chain}),Object(l.jsx)("td",{children:t.lastExploited}),Object(l.jsx)("td",{children:c?"$ "+j(t.usdTVL,!1):t.usdTVL}),Object(l.jsx)("td",{children:c?j(t.usdTVLChanged,!0)+" %":t.usdTVLChanged})]})}function o(){return Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{children:"Name"}),Object(l.jsx)("th",{children:"Category"}),Object(l.jsx)("th",{children:"Chain"}),Object(l.jsx)("th",{children:"Last Exploit"}),Object(l.jsx)("th",{children:"Locked(USD)"}),Object(l.jsx)("th",{children:"%Change"})]})}var b=function(e){var t=e.input,c=e.filter,n=e.placeholder;return Object(l.jsxs)("table",{children:[Object(l.jsx)(o,{}),t.map((function(e){return"All"===c||c===e.category?Object(l.jsx)(h,{input:e,placeholder:n}):null}))]})},O=c(322),u=c(323),x=c(170),f=c(327),p=c(73),g=c(166),v=c(167);function m(e){var t=e.active,c=e.payload,n=e.label,i=e.currency;if(t&&c&&c.length){var a=new Date(1e3*n);return a=a.toLocaleString("th-TH",{dateStyle:"medium",timeStyle:"medium"}),Object(l.jsxs)("div",{className:"tooltip",children:[Object(l.jsx)("p",{children:"".concat(a," : ")}),Object(l.jsx)("p",{children:"".concat(i.toUpperCase()," : ").concat(j(c[0].value))})]})}return null}var k=function(e){var t=e.name,c=Object(n.useState)("usd"),i=Object(s.a)(c,2),a=i[0],r=i[1],h=Object(n.useState)(7),o=Object(s.a)(h,2),b=o[0],k=o[1],T=t.replace(/\s+/g,"-").toLowerCase(),L=Object(n.useState)("Blank"),C=Object(s.a)(L,2),A=C[0],E=C[1];Object(n.useEffect)((function(){fetch("http://127.0.0.1:4000/TVLHistory/history/"+T).then((function(e){if(e.ok)return e.json();throw e})).then((function(e){E(e)})).catch((function(e){console.log("Error fetching data : ",e),E("Blank")}))}));var y=A.slice(0,b),V=function(e){r(e.target.id)},S=function(e){k(e.target.id),y="All"!=b?A.slice(A.length-b):A},N=function(e){return a==e?"active":"not-active"},B=function(e){return b==e?"active":"not-active"};return Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Chart"}),Object(l.jsxs)("p",{class:"chart_left",children:[Object(l.jsx)("span",{class:N("usd"),id:"usd",onClick:V,children:"USD"}),Object(l.jsx)("span",{children:" | "}),Object(l.jsx)("span",{class:N("eth"),id:"eth",onClick:V,children:"ETH"}),Object(l.jsx)("span",{children:" | "}),Object(l.jsx)("span",{class:N("btc"),id:"btc",onClick:V,children:"BTC"})]}),Object(l.jsxs)("p",{class:"chart_right",children:[Object(l.jsx)("span",{class:B(365),onClick:S,id:365,children:"1 Year"}),Object(l.jsx)("span",{children:" | "}),Object(l.jsx)("span",{class:B(90),onClick:S,id:90,children:"3 Months"}),Object(l.jsx)("span",{children:" | "}),Object(l.jsx)("span",{class:B(30),onClick:S,id:30,children:"1 Month"}),Object(l.jsx)("span",{children:" | "}),Object(l.jsx)("span",{class:B(7),onClick:S,id:7,children:"1 Week"})]}),Object(l.jsx)("p",{}),Object(l.jsx)("p",{}),Object(l.jsx)("div",{class:"padbottom",children:d(A)?Object(l.jsx)(O.a,{width:"100%",height:300,children:Object(l.jsxs)(u.a,{margin:{left:10,bottom:10,right:10},data:d(y)?y.reverse():[],children:[Object(l.jsx)(x.a,{type:"linear",dataKey:a,stroke:"#8884d8"}),Object(l.jsx)(f.a,{stroke:"#ccc",vertical:!1}),Object(l.jsx)(p.a,{content:Object(l.jsx)(m,{currency:a})}),Object(l.jsx)(g.a,{dataKey:"timestamp",hide:!0}),Object(l.jsx)(v.a,{domain:["auto","auto"],tickFormatter:function(e){return j(e)}})]})}):Object(l.jsx)("h4",{class:"centerh3",children:"No Chart Available"})})]})};var T=function(e){var t=e.name,c=Object(n.useState)("Blank"),i=Object(s.a)(c,2),a=i[0],r=i[1];return Object(n.useEffect)((function(){fetch("http://127.0.0.1:4000/ecosystems/"+t).then((function(e){if(e.ok)return e.json();throw e})).then((function(e){r(e)})).catch((function(e){console.log("Error fetching data : ",e),r("Blank")}))})),Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Project's Links"}),d(a)?a.map((function(e){return Object(l.jsx)("p",{children:Object(l.jsx)("a",{href:e.linkAddress,children:e.description})})})):Object(l.jsx)("p",{children:"No Link Available"})]})};var L=function(e){var t=e.name,c=Object(n.useState)("Blank"),i=Object(s.a)(c,2),a=i[0],r=i[1],j=Object(n.useState)(!1),h=Object(s.a)(j,2),o=h[0],b=h[1];return Object(n.useEffect)((function(){o||fetch("http://127.0.0.1:4000/audits/"+t).then((function(e){if(e.ok)return e.json();throw e})).then((function(e){r(e),b(!0)})).catch((function(e){console.log("Error fetching data : ",e),r("Blank"),b(!1)}))})),Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Audit History"}),d(a)?a.map((function(e){return Object(l.jsx)("p",{children:Object(l.jsx)("a",{href:e.linkAddress,children:e.description})})})):Object(l.jsx)("p",{children:"No Audit Available"})]})},C=c(168);function A(e){var t=e.data;return Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Total Value Locked"}),Object(l.jsxs)("table",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{id:"head",children:"in USD"}),Object(l.jsx)("td",{id:"data",children:d(t[0].usdTVL)?"$"+j(t[0].usdTVL,!1):"N/A"}),Object(l.jsx)("td",{id:"data",children:d(t[0].usdTVLChanged)?j(t[0].usdTVLChanged,!0)+"%":"N/A"})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{id:"head",children:"in ETH"}),Object(l.jsx)("td",{id:"data",children:d(t[0].ethTVL)?j(t[0].ethTVL,!1)+" ETH":"N/A"}),Object(l.jsx)("td",{id:"data",children:d(t[0].ethTVLChanged)?j(t[0].ethTVLChanged,!0)+"%":"+ x.x"})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{id:"head",children:"in BTC"}),Object(l.jsx)("td",{id:"data",children:d(t[0].btcTVL)?j(t[0].btcTVL,!1)+" BTC":"N/A"}),Object(l.jsx)("td",{id:"data",children:d(t[0].btcTVLChanged)?j(t[0].btcTVLChanged,!0)+"%":"+ x.x"})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{id:"head",children:"ETH Locked"}),Object(l.jsx)("td",{id:"data",children:d(t)?j(t[0].ethLocked,!1)+" ETH":"N/A"}),Object(l.jsx)("td",{id:"data",children:"N/A"})]})]})]})}function E(e){e.name;var t=e.data;return Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Timestamps"}),Object(l.jsxs)("table",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{id:"head",children:"Project Launch Date"}),Object(l.jsx)("td",{id:"data",children:d(t[0].launchDate)?t[0].launchDate:"N/A"})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{id:"head",children:"Last Exploited"}),Object(l.jsx)("td",{id:"data",children:d(t[0].lastExploited)?t[0].lastExploited:"N/A"})]})]})]})}function y(e){var t=e.name,c=e.data;return Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsxs)("h3",{children:[t,"'s Description"]}),d(c[0].description)?Object(l.jsx)("p",{children:c[0].description}):Object(l.jsx)("p",{children:"No description available"})]})}function V(e){var t=e.data;return Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Analysis"}),d(t[0].riskAnalysis)?Object(l.jsx)("p",{children:t[0].riskAnalysis}):Object(l.jsx)("p",{children:"No risk analysis available"})]})}function S(e){e.name;var t=e.data;return Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Attack History"}),d(t[0].attackHistory)?Object(l.jsx)("p",{children:t[0].attackHistory}):Object(l.jsx)("p",{children:"No attack history available"})]})}function N(e){e.name;var t=e.data;return Object(l.jsxs)("div",{class:"infoitem",children:[Object(l.jsx)("h3",{children:"Result From Our Scanner"}),d(t[0].result)?Object(l.jsx)("p",{children:t[0].result}):Object(l.jsx)("p",{children:"No result available"})]})}var B=function(e){var t=e.match.params.name,c=Object(r.f)(),i="http://127.0.0.1:4000/projects/"+t,a=Object(n.useState)("Blank"),j=Object(s.a)(a,2),h=j[0],o=j[1],b=Object(n.useState)(!1),O=Object(s.a)(b,2),u=O[0],x=O[1];return Object(n.useEffect)((function(){u||fetch(i).then((function(e){if(e.ok)return e.json();throw e})).then((function(e){console.log(e),o(e),x(!0)})).catch((function(e){console.log("Error fetching data : ",e),o("Blank"),x(!1)}))})),Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{id:"infotop",children:Object(l.jsx)("h1",{onClick:function(){return c.goBack()},children:"SCAT"})}),Object(l.jsxs)("div",{class:"infopage",children:[Object(l.jsxs)("div",{class:"infolist-c",children:[Object(l.jsx)("h1",{children:t}),Object(l.jsx)("h3",{children:"Key Statistic"})]}),Object(l.jsxs)("div",{class:"infolist-d",children:[Object(l.jsx)(C.Rating,{ratingValue:d(h[0].rating)?h[0].rating:0,size:30,readonly:!0}),d(h[0].rating)?Object(l.jsxs)("h3",{class:"righth3",children:["Rating : ",h[0].rating/20,"/5"]}):Object(l.jsx)("h3",{class:"righth3",children:"No Rating"})]})]}),Object(l.jsxs)("div",{class:"infopage",children:[Object(l.jsxs)("div",{class:"infolist-a",children:[Object(l.jsx)(A,{data:h}),Object(l.jsx)(E,{name:t,data:h}),Object(l.jsx)(T,{name:t}),Object(l.jsx)(L,{name:t})]}),Object(l.jsxs)("div",{class:"infolist-b",children:[Object(l.jsx)(k,{name:t}),Object(l.jsx)(y,{name:t,data:h}),Object(l.jsx)(V,{data:h}),Object(l.jsx)(S,{name:t,data:h}),Object(l.jsx)(N,{name:t,data:h})]})]})]})},w=(c(150),function(){return Object(l.jsxs)("div",{id:"title",children:[Object(l.jsx)("h1",{children:"SCAT"}),Object(l.jsx)("h2",{children:"SMART CONTRACT SECURITY AUDITING TEAM"}),Object(l.jsx)("p",{children:"SCAT is our project to analyze DeFi projects risk and weakness in smart contract, while also provide general risk analysis and risk factor data on the project"})]})}),M=[{id:"All",tag:"All Projects"},{id:"Lending",tag:"Lending Projects"},{id:"Trading",tag:"Trading Projects"},{id:"Asset",tag:"Asset Projects"}],H=[{name:"Alpha Homura",category:"Lending",chain:"Ethereum",lastExploited:"13/02/2021",usdTVL:"$736.1M",usdTVLChanged:"+0.78%"},{name:"Curve Finance",category:"Lending",chain:"Ethereum",lastExploited:"13/02/2021",usdTVL:"$640.8M",usdTVLChanged:"-5.08%"},{name:"Aave",category:"Lending",chain:"Ethereum",lastExploited:"14/09/2020",usdTVL:"$14.9M",usdTVLChanged:"+3.36%"},{name:"Warp Finance",category:"Lending",chain:"Ethereum",lastExploited:"18/12/2020",usdTVL:"$5.9M",usdTVLChanged:"+3.57%"},{name:"Balancer",category:"Trading",chain:"Ethereum",lastExploited:"28/06/2020",usdTVL:"$1.92B",usdTVLChanged:"+2.99%"},{name:"Yearn Finance",category:"Asset",chain:"Ethereum",lastExploited:"06/02/2021",usdTVL:"$4.47B",usdTVLChanged:"+2.28%"}];function D(e){var t=e.data,c=Object(n.useState)("All"),i=Object(s.a)(c,2),a=i[0],r=i[1],j=Object(n.useState)(!1),h=Object(s.a)(j,2),o=(h[0],h[1],function(e){r(e.target.id)});return Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{id:"filter",children:M.map((function(e){return a===e.id?Object(l.jsx)("div",{className:"active",id:e.id,onClick:o,children:e.tag}):Object(l.jsx)("div",{className:"not-active",id:e.id,onClick:o,children:e.tag})}))}),Object(l.jsx)("div",{id:"defitable",children:Object(l.jsx)(b,{input:d(t)?t:H,filter:a,placeholder:d(t)})})]})}var F=function(){var e=Object(n.useState)("Blank"),t=Object(s.a)(e,2),c=t[0],i=t[1],a=Object(n.useState)(!1),d=Object(s.a)(a,2),j=d[0],h=d[1];return Object(n.useEffect)((function(){j||fetch("http://127.0.0.1:4000/projects").then((function(e){if(e.ok)return e.json();throw e})).then((function(e){i(e),h(!0)})).catch((function(e){console.log("Error fetching data : ",e),i("Blank"),h(!1)}))})),Object(l.jsx)("div",{id:"bg",children:Object(l.jsxs)(r.c,{children:[Object(l.jsxs)(r.a,{path:"/",exact:!0,children:[Object(l.jsx)(w,{}),Object(l.jsx)(D,{data:c})]}),Object(l.jsx)(r.a,{path:"/info/:name",component:B})]})})},$=(c(320),c(64));a.a.render(Object(l.jsx)($.a,{children:Object(l.jsx)(F,{})}),document.getElementById("root"))}},[[321,1,2]]]);
//# sourceMappingURL=main.d856143b.chunk.js.map