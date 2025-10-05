<script lang="ts">
	import { Tween } from "svelte/motion";
	import * as THREE from "three";
	import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

	import {
		MapLibre,
		Projection,
		Light,
		Sky,
		CustomLayer,
	} from "svelte-maplibre-gl";

	let thetaDeg = new Tween(0);
	let p = $derived(
		(Math.acos(Math.cos((thetaDeg.target / 180 + 1) * Math.PI)) / Math.PI) *
			180,
	);
	let a = $derived(
		90 +
			(Math.atan2(0, Math.sin((thetaDeg.target / 180 + 1) * Math.PI)) /
				Math.PI) *
				180,
	);

	let { coord = $bindable() } = $props();

	const interval = setInterval(() => {
		thetaDeg.set(thetaDeg.current + 0.5);
	}, 500);
	$effect(() => {
		return () => clearInterval(interval);
	});

	class CustomLayerImpl
		implements Omit<maplibregl.CustomLayerInterface, "id" | "type">
	{
		renderingMode = "3d" as const;
		private camera = new THREE.Camera();
		private scene = new THREE.Scene();
		private renderer: THREE.WebGLRenderer | null = null;
		private map: maplibregl.Map | null = null;
		private modelOrigin: [number, number] | null = null;
		private modelAltitude = 10000000;
		private animationInterval: number | null = null;

		constructor(modelOrigin: [number, number]) {
			this.modelOrigin = modelOrigin;
		}

		onAdd(map: maplibregl.Map, gl: WebGL2RenderingContext) {
			this.map = map;
			const directionalLight1 = new THREE.DirectionalLight(0xffffff);
			directionalLight1.position.set(0, -70, 100).normalize();
			this.scene.add(directionalLight1);

			const directionalLight2 = new THREE.DirectionalLight(0xffffff);
			directionalLight2.position.set(0, 70, 100).normalize();
			this.scene.add(directionalLight2);

			const loader = new GLTFLoader();
			loader.load("/asteroid.glb", (gltf) => {
				this.scene.add(gltf.scene);
			});

			this.renderer = new THREE.WebGLRenderer({
				canvas: map.getCanvas(),
				context: gl,
				antialias: true,
			});
			this.renderer.autoClear = false;

			this.animationInterval = window.setInterval(() => {
				this.modelAltitude -= 100000;
				this.map!.triggerRepaint();

				if (this.animationInterval && this.modelAltitude === 0) {
					window.clearInterval(this.animationInterval);
				}
			}, 1000 / 30); // 30 fps
		}

		render(
			_gl: WebGL2RenderingContext | WebGLRenderingContext,
			args: maplibregl.CustomRenderMethodInput,
		) {
			const scaling = 100;
			const modelMatrix = this.map!.transform.getMatrixForModel(
				this.modelOrigin!,
				this.modelAltitude,
			);
			const m = new THREE.Matrix4().fromArray(
				args.defaultProjectionData.mainMatrix,
			);
			const l = new THREE.Matrix4()
				.fromArray(modelMatrix)
				.scale(new THREE.Vector3(scaling, scaling, scaling));

			this.camera.projectionMatrix = m.multiply(l);
			this.renderer!.resetState();
			this.renderer!.render(this.scene, this.camera);
		}

		onRemove() {
			if (this.animationInterval !== null) {
				window.clearInterval(this.animationInterval);
			}
		}
	}

	const customLayerImpl = $derived(new CustomLayerImpl(coord));
</script>

<MapLibre
	class="h-full bg-black"
	style={{
		version: 8,
		sources: {
			satellite: {
				type: "raster",
				tiles: [
					"https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
				],
				tileSize: 256,
			},
		},
		layers: [
			{
				id: "satellite",
				type: "raster",
				source: "satellite",
			},
		],
	}}
	zoom={1}
	center={{ lng: -73.9, lat: 40.7 }}
>
	<!-- <Light anchor="map" position={[100, a, p]} /> -->
	<!-- <Sky -->
	<!-- 	atmosphere-blend={[ -->
	<!-- 		"interpolate", -->
	<!-- 		["linear"], -->
	<!-- 		["zoom"], -->
	<!-- 		0, -->
	<!-- 		1, -->
	<!-- 		5, -->
	<!-- 		1, -->
	<!-- 		7, -->
	<!-- 		0, -->
	<!-- 	]} -->
	<!-- /> -->
	<CustomLayer implementation={customLayerImpl} />

	<Projection type="globe" />
</MapLibre>
