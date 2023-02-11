let renderer, scene, camera
let cameraControl, stats, gui
let ambientLight
let cube 

let datGUIControls = new (function() {
  this.AmbientLight = true
  this.scaneAxes = true
  this.cubeAxes = true
  // this.AmbientLightColor = 0xffffff
  this.AutoRotate = false
  this.AutoRotateSpeed = 0
  this.positionX = 0
  this.positionY = 0
  this.positionZ = 0
  this.rotationX = 0;
  this.rotationY = 0;
  this.rotationZ = 0;
})()

function initStats() {
  const stats = new Stats()
  stats.setMode(0)
  document.getElementById('stats').appendChild(stats.domElement)
  return stats
}

const geometry = new THREE.BoxGeometry(10, 10, 10) // 幾何體
const materials =[
    new THREE.MeshPhongMaterial({color: 0x0000ff}),
    new THREE.MeshPhongMaterial({color: 0x00ff00}),
    new THREE.MeshPhongMaterial({color: 0xff0000}),
    new THREE.MeshPhongMaterial({color: 0x000000}),
    new THREE.MeshPhongMaterial({color: 0xffffff}),
    new THREE.MeshPhongMaterial({color: 0x00ffff}),
]
cube = new THREE.Mesh(geometry, materials) // 建立網格物件


// 畫面初始化
function init() {
  scene = new THREE.Scene()

  // scene.add(cube)
  
  scene.background = new THREE.Color(0xAAAAAA);

  // 相機設定
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(30, 30, 30)
  camera.lookAt(scene.position)

  let axes1 = new THREE.AxesHelper(20)
  let axes2 = new THREE.AxesHelper(20)
  scene.add(axes1)
  cube.add(axes2)

  stats = initStats()

  // 渲染器設定
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap

  // 建立 OrbitControls
  cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
  cameraControl.enableDamping = true // 啟用阻尼效果
  cameraControl.dampingFactor = 0.25 // 阻尼系數
  // cameraControl.enabled = false;
  // cameraControl.autoRotate = true // 啟用自動旋轉
  // cameraControl.autoRotateSpeed = 10

  // 設置環境光 AmbientLight
  ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(ambientLight)

  gui = new dat.GUI()
  gui.add(datGUIControls, 'AmbientLight').onChange(function(e) {
    ambientLight.visible = e
  })
  gui.add(datGUIControls, 'scaneAxes').onChange(function(e) {
    axes1.visible = e
  })
  gui.add(datGUIControls, 'cubeAxes').onChange(function(e) {
    axes2.visible = e
  })
  gui.add(datGUIControls, 'AutoRotate').onChange(function(e) {
    cameraControl.autoRotate = e
  })
  gui.add(datGUIControls, 'AutoRotateSpeed',-100, 100).onChange(function(val) {
    cameraControl.autoRotateSpeed = val
  })
  gui.add(datGUIControls, 'positionX', -100, 100).onChange(function (val){
    cube.position.x = val;
  });
  gui.add(datGUIControls, 'positionY', -100, 100).onChange(function (val){
    cube.position.y = val;
  });
  gui.add(datGUIControls, 'positionZ', -100, 100).onChange(function (val){
    cube.position.z = val;
  });
  gui.add(datGUIControls, 'rotationX', -Math.PI, Math.PI).onChange(function (val){
    cube.rotation.x = val;
  });
  gui.add(datGUIControls, 'rotationY', -Math.PI, Math.PI).onChange(function (val){
    cube.rotation.y = val;
  });
  gui.add(datGUIControls, 'rotationZ', -Math.PI, Math.PI).onChange(function (val){
    cube.rotation.z = val;
  });

  document.body.appendChild(renderer.domElement)
}

function render() {
  stats.update()
  cameraControl.update()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  console.log('render')
}

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init()
render()