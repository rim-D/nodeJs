console.log(this); // global?

function a() {
    console.log(this === global);
}
a();