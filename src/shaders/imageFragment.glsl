
varying vec2 vUv;
varying float vDistance;
varying vec2 vPosition;

uniform sampler2D uImage;
uniform vec2 uImageSize;
uniform vec2 uElementSize;
uniform vec2 uMousePosition;
uniform vec2 uMouseSpeed;
uniform float uHoverState;
uniform vec2 uImageScale;

vec2 backgroundCoverUv(vec2 screenSize, vec2 imageSize, vec2 uv) {
  float screenRatio = screenSize.x / screenSize.y;
  float imageRatio = imageSize.x / imageSize.y;
    
  vec2 newSize = screenRatio < imageRatio
    ? vec2(imageSize.x * screenSize.y / imageSize.y, screenSize.y)
    : vec2(screenSize.x, imageSize.y * screenSize.x / imageSize.x);
    
  vec2 newOffset = (screenRatio < imageRatio
    ? vec2((newSize.x - screenSize.x) / 2.0, 0.0)
    : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
      
  return uv * screenSize / newSize + newOffset;
}

void main() {

    // vec2 newUV = vUv;
    vec2 newUV = backgroundCoverUv(uElementSize, uImageSize, vUv);
    // newUV *= uImageScale;
    // vec2 scaledUV = (newUV - 0.5) * uImageScale + 0.5;
    // newUV = (newUV - 0.5) * uImageScale + 0.5;

    float pixelCount = 30.;
    float intensity = 100.;
    float cursorSize = 0.3;

    float divisionsX = (1.0 / pixelCount);
    float divisionsY =  (1.0 / pixelCount);

    vec2 pixelatedCoordinates = vec2(divisionsX * floor(newUV.x / divisionsX), divisionsY * floor(newUV.y / divisionsY));
    vec2 effectScale = uHoverState * abs(uMouseSpeed) * intensity * (1.0 - smoothstep(0.01, cursorSize, vDistance) ) ;

    vec4 imageTexture = texture2D(uImage, mix(newUV, pixelatedCoordinates, effectScale));

    gl_FragColor = vec4(imageTexture);
}