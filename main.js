music_1 = "music.mp3";
music_2 = "music2.mp3";
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
song_1_status = "";
song_2_status = "";

function preload(){
    music_1 = loadSound("music.mp3");
    music_2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist +"scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}


function draw(){
    image(video, 0, 0, 600, 500);
    song_1_status = music_1.isPlaying();
    song_2_status = music_2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        music_2.stop();
        if(song_1_status == false){
            music_1.play();
            document.getElementById("song").innerHTML = "Playing Song - Harry Potter";
        }
    }

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        music_1.stop();
        if(song_2_status == false){
            music_2.play();
            document.getElementById("song").innerHTML = "Playing Song - Peter Pan";
        }
    }
}

function play(){
    music_1.play();
    music_1.setVolume(1);
    music_1.rate(1);
}