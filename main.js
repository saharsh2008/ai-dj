song = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""
leftWristCore = ""
rightWristCore = ""
currentSong = ""

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("remix2.mp3")
    currentSong = song1
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

    if (leftWristCore > 0.2) {
        currentSong = song1;
        circle(leftWristX, leftWristY, 20)
        song2.stop();
    }

    else if (rightWristCore > 0.2) {
        currentSong = song2;
        circle(rightWristX, rightWristY, 20)
        song1.stop();
    }

    else if (leftWristCore > rightWristCore) {
        currentSong = song1;
        circle(leftWristX, leftWristY, 20)
        song2.stop();
    }

    else if (rightWristCore > leftWristCore) {
        currentSong = song2;
        circle(rightWristX, rightWristY, 20)
        song1.stop();
    }

}

function play() {
    currentSong.play();
    currentSong.setVolume(1);
    currentSong.rate(1);
}

function modelLoaded() {
    console.log("Model is Loaded!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftwristx =" + leftWristX + " leftwristy =" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightwristx =" + rightWristX + " rightwristy =" + rightWristY);
        leftWristCore = results[0].pose.keypoints[9].score;
        rightWristCore = results[0].pose.keypoints[10].score;
    }
}