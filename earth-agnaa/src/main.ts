import { Viewer, Cartesian3, Color, Ion, createWorldImageryAsync, IonImageryProvider } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./style.css";

// Agnaa branding integration
// Cesium Ion Token could be injected via environment variables
// For now, we use the default for development

const viewer = new Viewer('cesiumContainer', {
  terrainProvider: undefined, // Standard terrain
  animation: false,
  timeline: false,
  geocoder: true,
  homeButton: false,
  infoBox: false,
  sceneModePicker: true,
  selectionIndicator: false,
  navigationHelpButton: false,
  baseLayerPicker: true,
});

// Configure aesthetics
viewer.scene.globe.showGroundAtmosphere = true;
viewer.scene.globe.baseColor = Color.fromCssColorString('#0D0D14');
viewer.scene.fog.enabled = true;
viewer.scene.fog.density = 0.0001;
viewer.scene.fog.screenSpaceErrorFactor = 2.0;

// Set initial view to a beautiful angle of Earth
viewer.camera.setView({
  destination: Cartesian3.fromDegrees(78.9629, 20.5937, 20000000.0), // India centered
});

// Add a button listener
document.getElementById('resetView')?.addEventListener('click', () => {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(78.9629, 20.5937, 20000000.0),
    duration: 3
  });
});

console.log("Earth.Agnaa Initialized");
