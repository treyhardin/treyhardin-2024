uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform float time;
uniform vec2 uMousePosition;

void main() {
    vec2 newUV = vUv;

    float density = 300.0;
    float speed = 0.05;
    float noiseIntensity = 0.05;
    float contrast = 1.0;
    float cutoff = 0.01;

    float noise = 10. * ( cnoise(vec3( vUv * density , time * speed)) );
    float detailNoise = cnoise(vec3(vUv * density * 2.0, noise));

    float pixelCount = 20.;
    float pixelationIntensity = 1.0;
    float divisionsX = (1.0 / pixelCount);
    float divisionsY =  (1.0 / pixelCount);

    float mask = 1.0 - smoothstep(-0.00, 0.3, newUV.y);
    // newUV.x -= (newUV.x - 0.5) * (mask) * sin(noise * 0.5) * 0.01;


    vec2 pixelatedCoordinates = vec2(divisionsX * floor(newUV.x / divisionsX), divisionsY * floor(newUV.y / divisionsY)) * pixelationIntensity;

    // vec4 diffuse = texture2D( tDiffuse, mix(newUV, pixelatedCoordinates, mask ));
    vec4 diffuse = texture2D( tDiffuse, newUV);
    diffuse.w = mix(diffuse.w, 0.0, clamp(detailNoise * mask, 0.0, 0.3) * detailNoise);
    // vec4 mixedDiffuse = vec4( mix(diffuse.xy, pixelatedCoordinates, newUV.y), newUV);

    // gl_FragColor = texture2D( tDiffuse, newUV);
    vec4 noisyDiffuse = vec4( mix(diffuse, vec4(0.0, 0.0, 0.0, contrast), step(detailNoise, cutoff) * noiseIntensity ) );
    // gl_FragColor = vec4(mask, mask, mask, 1.0);
    gl_FragColor = noisyDiffuse;
}