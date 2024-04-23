
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

vec3 rgbShift( vec2 uv, vec2 offsetR, vec2 offsetG, vec2 offsetB) {
   float r = texture2D(uImage, uv + offsetR).x;
   float g = texture2D(uImage, uv + offsetG).y;
   float b = texture2D(uImage, uv + offsetB).z;
   return vec3(r,g, b);
 }

void main() {

    vec2 newUV = backgroundCoverUv(uElementSize, uImageSize, vUv);

    float pixelDivisions = 40.0 ;
    float colorShiftR = 0.5;
    float colorShiftG = 0.0;
    float colorShiftB = 0.8;
    float effectSensitivity = 200.;
    float cursorSize = 0.5;

    float aspectRatio = uElementSize.x / uElementSize.y;
    vec2 gridSize = vec2( pixelDivisions, floor(pixelDivisions / aspectRatio) );

    vec2 pixelatedCoordinates = vec2( floor(newUV * gridSize)  / gridSize );
    vec2 effectScale = uHoverState * uMouseSpeed * effectSensitivity * (1.0 - smoothstep(0.01, cursorSize, vDistance) );

    vec3 shiftedImage = rgbShift( newUV, uMouseSpeed * colorShiftR, uMouseSpeed * colorShiftG, uMouseSpeed * colorShiftB );
    vec4 imageTexture = texture2D(uImage, mix(newUV, pixelatedCoordinates, effectScale));

    gl_FragColor = vec4( mix( imageTexture.xyz, shiftedImage, length(effectScale) * 0.2), 1.0);
    // gl_FragColor = vec4( mix( imageTexture.xyz, shiftedImage, uHoverState), 1.0);
}