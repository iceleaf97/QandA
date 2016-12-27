/**
 * Created by iceleaf on 2016/10/18.
 */
var scene, camera, WIDTH, HEIGHT, fov, aspect, near, far,
    renderer, container, control;

// a web page has completely loaded, and run the function init()
window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();
    render();
    createOrbit();
    loop();
}

function createScene() {
    scene = new THREE.Scene();
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    fov = 50;
    aspect = WIDTH/HEIGHT;
    near = 1;
    far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 80);
}

function createLight() {
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6);
    directionalLight.position.set( 50, 50, 50 );
    scene.add( directionalLight );
}

var texture = new THREE.TextureLoader().load( "textures/images.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 3, 2 );

function createModel(){
    var geometry = new THREE.SphereGeometry(10, 16, 16);
    var material2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture,
        bumpMap: texture,
        bumpScale: 0.8,
        // wireframe: true
    });
    var mesh = new THREE.Mesh(geometry, material2);
    mesh.position.set(-15, 0, 0);
    scene.add(mesh);

    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load('./models/ballUV.json', addJson, addConsole, addError);
    function addJson(geometry, material) {
        var mtl= new THREE.MeshFaceMaterial(material);
        var jsonMesh= new THREE.Mesh(geometry, material2);
        jsonMesh.position.set(15, 0, 0);
        scene.add(jsonMesh);
    }
    function addConsole() {
        console.log("loading");
    }

    function addError() {
        console.log("loading error");
    }

}

function render() {
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor(0x000000,1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    container = document.getElementById('scene');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.object.position.set(0, 0, 80);
    control.target.set(0, 0, 0);
    control.update();
}

function loop() {
     renderer.render(scene, camera);
     requestAnimationFrame(loop);
     control.update();
}




