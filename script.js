// main.js
// Warten, bis die Seite geladen ist
document.addEventListener('DOMContentLoaded', init);

function init() {
    // --- Three.js Grundgerüst ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // für Schatten (optional)

    // Container für Canvas (muss in HTML existieren, z.B. <div id="canvas-container"></div>)
    const container = document.getElementById('canvas-container');
    container.appendChild(renderer.domElement);

    // --- Steuerung (damit das Modell drehbar ist) ---
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // --- Beleuchtung ---
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 5, 3);
    scene.add(dirLight);

    // Optional: Hilfslinien (Grid)
    const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x444444);
    scene.add(gridHelper);

    // --- Platzhalter: Ein Würfel (später durch dein Modell ersetzen) ---
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00b4d8, emissive: 0x112233 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // --- Falls du ein eigenes Modell laden willst (z.B. model.glb im Ordner models/) ---
    // Dazu musst du den GLTFLoader importieren (siehe HTML später)
    /*
    const loader = new THREE.GLTFLoader();
    loader.load(
        'models/mein_modell.glb',
        function (gltf) {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
            scene.add(model);
        },
        undefined,
        function (error) {
            console.error('Fehler beim Laden:', error);
        }
    );
    */

    // --- Animationsschleife ---
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // aktualisiert Auto-Rotation und Dämpfung
        renderer.render(scene, camera);
    }
    animate();

    // --- Größenanpassung bei Fensteränderung ---
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
