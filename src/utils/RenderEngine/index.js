import Rectangle from './Rectangle';
import Shader from './Shader';
import { mat4 } from 'gl-matrix';

/** Render engine for WebGL */
class RenderEngine {
  /** Map of all display objects */
  displayObjects = {}

  /**
   * @function init
   * @description Init WebGL to specific canvas
   */
  init(canvasId) {
    const canvas = document.getElementById(canvasId);
    const gl = this.checkWebGL(canvas);
    this.gl = gl;

    if (gl === null) {
      alert("Can't initialize WebGL that your browser doesn't support it");
      return;
    }

    // Clear background to black
    gl.clearColor(0, 0, 0, 1);

    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = Shader.initShaderProgram(gl, Shader.vsSource, Shader.fsSource);
    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };
  }

  /**
   * Check if WebGL is available
   */
  checkWebGL (canvas) {
    const contexts = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    let gl;
    contexts.forEach(ctx => {
      if (!gl) {
        try {
          gl = canvas.getContext(ctx);
        } catch (e) {}
      }
    });

    if (!gl) {
      alert('WebGL not available, sorry! Please use a new version of Chrome or Firefox.');
    }

    return gl;
  }

  /**
   * @function initBuffers
   * @param {array} positions - position list of the shape
   * @return The object of the position buffer
   */
  initBuffers(positions) {
    const gl = this.gl;

    // Create position buffer
    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

    return {
      position: positionBuffer,
    };
  }

  drawScene() {
    const gl = this.gl;
    gl.clearDepth(1.0);              // 清除所有東西
    gl.enable(gl.DEPTH_TEST);        // Enable 深度測試
    gl.depthFunc(gl.LEQUAL);         // Near things obscure far things

    // Initial canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = (gl.canvas.clientWidth / gl.canvas.clientHeight) * 1;
    const zNear = 0.1;
    const zFar = 300.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [-0.0, 0.0, -300.0]);  // amount to translate

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      const rect = new Rectangle({ x: 0, y: 0, width: 100, height: 100 });
      const rectBuffer = this.initBuffers(rect.positions());
      gl.bindBuffer(gl.ARRAY_BUFFER, rectBuffer.position);
      gl.vertexAttribPointer(
          this.programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          this.programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL to use our program when drawing
    gl.useProgram(this.programInfo.program);

    // Set the shader uniforms
    gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }

  /**
   * @function drawRectangle
   * @param {object} props - All props that a Rectangle needs
   */
  drawRectangle(props) {
    const rect = new Rectangle(this, props);
    this.displayObjects[rect.id] = rect;
  }
};

export default new RenderEngine();
