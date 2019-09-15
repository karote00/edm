(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(t,e,r){t.exports=r(30)},26:function(t,e,r){},29:function(t,e,r){},30:function(t,e,r){"use strict";r.r(e);var n={};r.r(n),r.d(n,"isUndefined",function(){return g});var i=r(0),a=r.n(i),o=r(7),c=r.n(o),s=(r(26),r(1)),u=r(2),l=r(10),d=r(8),h=r(11),f=r(9),m=r.n(f),g=function(t){return void 0===t},v=function(){function t(e){Object(s.a)(this,t),this.uuid=m()(),this.props=e}return Object(u.a)(t,[{key:"positions",value:function(){var t=this,e=!0;if(["x","y","width","height"].forEach(function(r){n.isUndefined(t.props[r])&&(e=!1)}),e){var r=this.props,i=r.x,a=r.y,o=r.width,c=r.height;if(o>0&&c>0){var s=o/2,u=c/2,l=[i-s,a-u,i+s,a-u,i-s,a+u,i+s,a+u];return l}}return null}}]),t}(),p={vsSource:"\n    attribute vec4 aVertexPosition;\n\n    uniform mat4 uModelViewMatrix;\n    uniform mat4 uProjectionMatrix;\n\n    void main() {\n      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n    }\n  ",fsSource:"\n    void main() {\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n    }\n  ",loadShader:function(t,e,r){var n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(n)),t.deleteShader(n),null)},initShaderProgram:function(t,e,r){var n=p.loadShader(t,t.VERTEX_SHADER,e),i=p.loadShader(t,t.FRAGMENT_SHADER,r),a=t.createProgram();return t.attachShader(a,n),t.attachShader(a,i),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?a:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(a)),null)}},w=p,b=r(3),S=new(function(){function t(){Object(s.a)(this,t),this.displayObjects={}}return Object(u.a)(t,[{key:"init",value:function(t){var e=document.getElementById(t).getContext("webgl");if(this.gl=e,null!==e){e.clearColor(0,0,0,1);var r=w.initShaderProgram(e,w.vsSource,w.fsSource);this.programInfo={program:r,attribLocations:{vertexPosition:e.getAttribLocation(r,"aVertexPosition")},uniformLocations:{projectionMatrix:e.getUniformLocation(r,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(r,"uModelViewMatrix")}}}else alert("Can't initialize WebGL that your browser doesn't support it")}},{key:"initBuffers",value:function(t){var e=this.gl,r=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array(t),e.STATIC_DRAW),{position:r}}},{key:"drawScene",value:function(){var t=this.gl;t.clear(t.COLOR_BUFFER_BIT),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);var e=45*Math.PI/180,r=t.canvas.clientWidth/t.canvas.clientHeight*1,n=b.a.create();b.a.perspective(n,e,r,.1,300);var i=b.a.create();b.a.translate(i,i,[-0,0,-300]);var a=t.FLOAT,o=new v({x:0,y:0,width:100,height:100}),c=this.initBuffers(o.positions());t.bindBuffer(t.ARRAY_BUFFER,c.position),t.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition,2,a,!1,0,0),t.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition),t.useProgram(this.programInfo.program),t.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix,!1,n),t.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix,!1,i);t.drawArrays(t.TRIANGLE_STRIP,0,4)}},{key:"drawRectangle",value:function(t){var e=new v(this,t);this.displayObjects[e.id]=e}}]),t}()),x=(r(29),function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){S.init("glCanvas"),S.drawScene()}},{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("canvas",{id:"glCanvas"}))}}]),e}(i.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.9a824f9f.chunk.js.map