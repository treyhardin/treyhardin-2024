
varying vec2 vUv;
varying float vDistance;
varying vec2 vPosition;

uniform sampler2D uImage;
uniform vec2 uMousePosition;
uniform vec2 uMouseSpeed;
uniform float uHoverState;

void main() {

    vec2 newUV = vUv;

    float pixelCount = 30.;
    float intensity = 100.;
    float cursorSize = 0.3;

    float divisionsX = (1.0 / pixelCount);
    float divisionsY =  (1.0 / pixelCount);

    vec2 pixelatedCoordinates = vec2(divisionsX * floor(vUv.x / divisionsX), divisionsY * floor(vUv.y / divisionsY));
    vec2 effectScale = uHoverState * abs(uMouseSpeed) * intensity * (1.0 - smoothstep(0.01, cursorSize, vDistance) ) ;

    vec4 imageTexture = texture2D(uImage, mix(vUv, pixelatedCoordinates, effectScale));

    gl_FragColor = vec4(imageTexture);
}