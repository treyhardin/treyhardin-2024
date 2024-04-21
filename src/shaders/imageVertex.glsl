varying vec2 vUv;
varying float vDistance;
varying vec2 vPosition;
uniform vec2 uMousePosition;
uniform vec2 uMouseSpeed;
uniform float uHoverState;
uniform float uTime;

void main() {
    vUv = uv;
    vec3 newPosition = position;


    vDistance = distance(vUv, uMousePosition);

    // newPosition.z += 1.0 - uHoverState * ((1.0 - vDistance) * 0.1) * 500.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}