song = "";
leftWX = 0;
leftWY = 0;

rightWY = 0;
rightWX = 0;

scoreRightW = 0;
scoreLeftW = 0;
function setup(){
canvas = createCanvas(450, 350);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function draw(){
image(video, 0, 0, 450, 350);

fill("#FF0000")
stroke("#FF0000")
if(scoreRightW > 0.2){


circle(rightWX, rightWY, 20);

if(rightWY >0 && rightWX <= 100){
    document.getElementById("speed").innerHTML = "Speed 0.5x";
    song.rate(0.5);
}
else if(rightWY >100 && rightWX <= 200){
    document.getElementById("speed").innerHTML = "Speed 1x";
    song.rate(1);
}
else if(rightWY >200 && rightWX <= 300){
    document.getElementById("speed").innerHTML = "Speed 1.5x";
    song.rate(1.5);
}
else if(rightWY >300 && rightWX <= 400){
    document.getElementById("speed").innerHTML = "Speed 2x";
    song.rate(2);
}
else if(rightWY >400 && rightWX <= 500){
    document.getElementById("speed").innerHTML = "Speed 2.5x";
    song.rate(2.5);
}
}
if(scoreLeftW > 0.2)
{
circle(leftWX, leftWY, 20);
InNumberleftWY = Number(leftWY);
removeDecimals = floor(InNumberleftWY * 2);
volume = removeDecimals/1000;
document.getElementById("volume").innerHtml = "Volume = " + volume;
song.setVolume(volume);
}
}
function preload(){
    song = loadSound("yeet.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scoreRightW = results[0].pose.keypoints[10].score;
        scoreLeftW = results[0].pose.keypoints[9].score;
        console.log("scoreLeftW =" + scoreLeftW);
        leftWX = results[0].pose.leftWrist.x;
        leftWY = results[0].pose.leftWrist.y;
        console.log("leftWX ="+ leftWX +"leftWY ="+leftWY);

        rightWX = results[0].pose.rightWrist.x;
        rightWY = results[0].pose.rightWrist.y;
        console.log("rightWX ="+ rightWX +"leftWY ="+rightWY);
    
    }

}
function modelLoaded(){
    console.log('posenet is initialized');
}
