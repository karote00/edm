/** Shader lib */
const Shader = {
  // Vertex shader program
  vsSource: `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `,

  fsSource: `
    varying lowp vec4 vColor;

    void main() {
      gl_FragColor = vColor;
    }
  `,

  /**
   * @function loadShader
   * @description Create a shader of the giver type, uploads the source and compiles it.
   */
  loadShader: (gl, type, source) => {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  },

  /**
   * @function initShaderProgram
   * @description Initial shader program with WebGL
   */
  initShaderProgram: (gl, vsSource, fsSource) => {
    const vertexShader = Shader.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = Shader.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Error handle
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }
};

export default Shader;
