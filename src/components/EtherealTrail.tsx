import { useEffect, useRef } from 'react';

const TRAIL_VERTEX = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const TRAIL_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uVel;
  uniform sampler2D uPrevFrame;
  uniform float uDecay;
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  vec2 curl(vec2 p) {
    float eps = 0.01;
    float n1 = noise(p + vec2(0.0, eps));
    float n2 = noise(p - vec2(0.0, eps));
    float n3 = noise(p + vec2(eps, 0.0));
    float n4 = noise(p - vec2(eps, 0.0));
    float dy = (n1 - n2) / (2.0 * eps);
    float dx = (n3 - n4) / (2.0 * eps);
    return vec2(dy, -dx);
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    
    // Advection with curl noise
    vec2 advectedUV = uv + curl(uv * 3.0 + uTime * 0.1) * 0.008 * uVel;
    vec3 prevColor = texture2D(uPrevFrame, advectedUV).rgb;
    
    // Mouse trail
    vec2 mouseUV = uMouse;
    vec2 prevMouseUV = uPrevMouse;
    mouseUV.x *= aspect.x;
    prevMouseUV.x *= aspect.x;
    vec2 uvAspect = uv * aspect;
    
    float trail = 0.0;
    vec2 diff = mouseUV - prevMouseUV;
    float len = length(diff);
    if (len > 0.001) {
      vec2 dir = diff / len;
      for (float i = 0.0; i < 20.0; i++) {
        vec2 pos = prevMouseUV + dir * (i / 20.0) * len;
        float d = length(uvAspect - pos);
        float size = 0.03 * (1.0 - i / 20.0);
        trail += smoothstep(size, 0.0, d) * (1.0 - i / 20.0);
      }
    }
    
    float pointDist = length(uvAspect - mouseUV);
    trail += smoothstep(0.025, 0.0, pointDist);
    
    // Warm cream trail color
    vec3 trailColor = vec3(0.91, 0.85, 0.77) * trail * uVel * 3.0;
    
    // Cool smoke from curl
    vec2 smokeUV = uv + curl(uv * 2.0 + uTime * 0.05) * 0.005;
    vec3 smoke = texture2D(uPrevFrame, smokeUV).rgb * uDecay;
    
    vec3 color = smoke + trailColor;
    color *= uDecay;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const DISPLAY_VERTEX = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const DISPLAY_FRAGMENT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTrailMap;
  uniform float uChromaticAberration;
  uniform float uDistortion;
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  void main() {
    vec2 uv = vUv;
    
    vec3 trail = texture2D(uTrailMap, uv).rgb;
    vec2 advected = vec2(trail.r + trail.g + trail.b) / 3.0;
    vec2 displacement = (advected - 0.5) * uDistortion;
    
    float chromaticOffset = uChromaticAberration * 0.01;
    
    vec2 rUV = uv + displacement + vec2(chromaticOffset, 0.0);
    vec2 gUV = uv + displacement;
    vec2 bUV = uv + displacement - vec2(chromaticOffset, 0.0);
    
    float r = texture2D(uTrailMap, rUV).r;
    float g = texture2D(uTrailMap, gUV).g;
    float b = texture2D(uTrailMap, bUV).b;
    
    vec3 color = vec3(r, g, b);
    float alpha = length(color) * 2.0;
    
    gl_FragColor = vec4(color * 1.5, alpha * 0.7);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const vertShader = createShader(gl, gl.VERTEX_SHADER, vs);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vertShader || !fragShader) return null;
  
  const program = gl.createProgram()!;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

export function EtherealTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return;

    // Check for float texture support
    const floatExt = gl.getExtension('OES_texture_float');
    const halfFloatExt = gl.getExtension('OES_texture_half_float');
    const linearExt = gl.getExtension('OES_texture_float_linear') || gl.getExtension('OES_texture_half_float_linear');

    let textureType: number = gl.UNSIGNED_BYTE;
    if (halfFloatExt) textureType = halfFloatExt.HALF_FLOAT_OES as number;
    else if (floatExt) textureType = gl.FLOAT;

    // Create trail program
    const trailProgram = createProgram(gl, TRAIL_VERTEX, TRAIL_FRAGMENT);
    const displayProgram = createProgram(gl, DISPLAY_VERTEX, DISPLAY_FRAGMENT);
    if (!trailProgram || !displayProgram) return;

    // Fullscreen quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    // Ping-pong FBOs
    let fbo0 = gl.createFramebuffer();
    let fbo1 = gl.createFramebuffer();
    let tex0 = gl.createTexture();
    let tex1 = gl.createTexture();

    function setupFBO(tex: WebGLTexture | null, fbo: WebGLFramebuffer | null) {
      if (!tex || !fbo) return;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, canvas!.width, canvas!.height, 0, gl!.RGBA, textureType, null);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, linearExt ? gl!.LINEAR : gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, linearExt ? gl!.LINEAR : gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        setupFBO(tex0, fbo0);
        setupFBO(tex1, fbo1);
      }
    }

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const mouse = { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, vel: 0 };
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = (e.clientX * dpr) / canvas.width;
      mouse.y = 1.0 - (e.clientY * dpr) / canvas.height;
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.vel = Math.min(Math.sqrt(dx * dx + dy * dy) * 50, 1.0);
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => { isMoving = false; }, 100);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Uniform locations
    const trailLocs = {
      resolution: gl.getUniformLocation(trailProgram, 'uResolution'),
      time: gl.getUniformLocation(trailProgram, 'uTime'),
      mouse: gl.getUniformLocation(trailProgram, 'uMouse'),
      prevMouse: gl.getUniformLocation(trailProgram, 'uPrevMouse'),
      vel: gl.getUniformLocation(trailProgram, 'uVel'),
      prevFrame: gl.getUniformLocation(trailProgram, 'uPrevFrame'),
      decay: gl.getUniformLocation(trailProgram, 'uDecay'),
    };

    const displayLocs = {
      trailMap: gl.getUniformLocation(displayProgram, 'uTrailMap'),
      chromatic: gl.getUniformLocation(displayProgram, 'uChromaticAberration'),
      distortion: gl.getUniformLocation(displayProgram, 'uDistortion'),
    };

    const trailPosLoc = gl.getAttribLocation(trailProgram, 'position');
    const displayPosLoc = gl.getAttribLocation(displayProgram, 'position');

    let time = 0;
    let currentFBO = fbo0;
    let currentTex = tex0;
    let nextFBO = fbo1;
    let nextTex = tex1;
    let animId: number;

    function render() {
      animId = requestAnimationFrame(render);
      
      if (!isMoving && mouse.vel < 0.01) {
        mouse.vel *= 0.95;
      }

      time += 0.01;

      // Trail pass
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, nextFBO);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.useProgram(trailProgram);

      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuffer);
      gl!.enableVertexAttribArray(trailPosLoc);
      gl!.vertexAttribPointer(trailPosLoc, 2, gl!.FLOAT, false, 0, 0);

      gl!.uniform2f(trailLocs.resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(trailLocs.time, time);
      gl!.uniform2f(trailLocs.mouse, mouse.x, mouse.y);
      gl!.uniform2f(trailLocs.prevMouse, mouse.prevX, mouse.prevY);
      gl!.uniform1f(trailLocs.vel, mouse.vel);
      gl!.uniform1f(trailLocs.decay, 0.97);

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, currentTex);
      gl!.uniform1i(trailLocs.prevFrame, 0);

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      // Display pass
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.useProgram(displayProgram);

      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);

      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuffer);
      gl!.enableVertexAttribArray(displayPosLoc);
      gl!.vertexAttribPointer(displayPosLoc, 2, gl!.FLOAT, false, 0, 0);

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, nextTex);
      gl!.uniform1i(displayLocs.trailMap, 0);
      gl!.uniform1f(displayLocs.chromatic, 0.25);
      gl!.uniform1f(displayLocs.distortion, 0.6);

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      gl!.disable(gl!.BLEND);

      // Swap
      const tempFBO = currentFBO;
      const tempTex = currentTex;
      currentFBO = nextFBO;
      currentTex = nextTex;
      nextFBO = tempFBO;
      nextTex = tempTex;

      mouse.vel *= 0.92;
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}