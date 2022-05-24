var cvs = document.getElementById("canvas"); //Определили холст на котором будем творить
var ctx = cvs.getContext("2d"); //Определили контекст холста
var startButton = document.getElementById('startButton');

var easyButton = document.getElementById('easyButton');
var normalButton = document.getElementById('normalButton');
var hardButton = document.getElementById('hardButton');

var difficultyText = document.getElementById('difficulty');

var startGame = false;

var linePlayer = canvas.height -100;

var easySpeed = 888.88888888;
var normalSpeed = 444.444444444;
var hardSpeed = normalSpeed/2;



var gameSpeed = normalSpeed;

easyButton.onclick = function() {
    gameSpeed = easySpeed;
    difficultyText.innerHTML = "Easy mode is selected";
};

normalButton.onclick = function() {
    gameSpeed = normalSpeed;
    difficultyText.innerHTML = "Normal mode is selected";
};

hardButton.onclick = function() {
    gameSpeed = hardSpeed;
    difficultyText.innerHTML = "Hard mode is selected";
};

var score = document.getElementById('score').innerHTML;
score = parseInt(score)

var highScore = document.getElementById('highscore').innerHTML;
highScore = parseInt(highScore)

class Note{
    constructor(x, y, speed, radius, color){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.color = color;
    }

    draw(){
       ctx.beginPath()
       ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
       ctx.fillStyle = this.color
       ctx.fill()
    }

    spawn(){
        this.draw()
        this.y += this.speed   
    }
}


var notes = []

function spawnNote(){
    
        const notePositions = [150, 250, 350, 450];
        let x = notePositions[Math.floor(Math.random()*notePositions.length)];
        let y = 0
        let radius = 30
        let color;
        let speed = 5;

        if(x == 150){
            color = '#FFABAB'
        }

        if(x == 250){
            color = '#FFFFD1'
        }

        if(x == 350){
            color = '#AFD8DB'
        }

        if(x == 450){
            color = '#6EB5FF'
        }

      
        notes.push(new Note(x, y, speed, radius, color))
    
}

var noteCheckers = []

class noteChecker{
        constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.strokeStyle = this.color;
        ctx.stroke(); 
     }
}


function drawTracks(){
    let tracks = 5;
    let trackWidth = 100;
    ctx.strokeStyle = '#ffffcf';
   for(let i = 0; i < tracks; i++){
    ctx.beginPath();       
    ctx.moveTo(trackWidth, 0);    
    ctx.lineTo(trackWidth, canvas.height-100); 
    ctx.stroke(); 

    trackWidth+=100
   }

   ctx.beginPath();       
   ctx.moveTo(0, 0);    
   ctx.lineTo(canvas.width, 0); 
   ctx.strokeStyle = '#ffffcf';
   ctx.stroke(); 

   ctx.beginPath();       
   ctx.moveTo(0, linePlayer);    
   ctx.lineTo(canvas.width, linePlayer); 
   ctx.stroke(); 
}

noteCheckers.push(new noteChecker(150, linePlayer, 30, '#FFD1DC'))
noteCheckers.push(new noteChecker(250, linePlayer, 30, '#FFD1DC'))
noteCheckers.push(new noteChecker(350, linePlayer, 30, '#FFD1DC'))
noteCheckers.push(new noteChecker(450, linePlayer, 30, '#FFD1DC'))



function draw(){
    requestAnimationFrame(draw); 
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(startGame == true){
        notes.forEach(note => {
                note.spawn()
       
                if((note.y == canvas.height-50)){

                    notes.shift()
                   
                 }
        })
    }
    
    drawTracks()
    noteCheckers.forEach(noteChecker => {
        noteChecker.draw()
    })
}


startButton.onclick = function() {
    var music = document.getElementById("music");
    music.muted = false;
    setTimeout(() =>{
        music.play()
    }, 1900)

    startGame = true

    if(startGame == true){
        setInterval(() => {
            spawnNote()
        
            console.log(notes)
        }, gameSpeed);
    }

    music.onended=function(){
       
        startGame = false
        music.pause()
    };
  };

 

  let isNoteInTime = false;


document.addEventListener("keydown", function(event){
    if (event.code == 'KeyZ'){
       
        notes.forEach(note => {
            
            if(note.x == 150){
                if(note.y > linePlayer-45 && note.y < linePlayer+45){
                    isNoteInTime = true
                    score += 10;

                    noteCheckers[0].color = "green";
                    setTimeout(() =>{
                        noteCheckers[0].color = '#FFD1DC';
                    }, 100)
                }
            }
            
           
             if(isNoteInTime){
                document.addEventListener("keydown", function(event){
                    if (event.code == 'KeyZ'){
                        document.getElementById('score').innerHTML = score
                        if(score > highScore){
                            document.getElementById('highscore').innerHTML =  score
                        }
                    }
                });
               
            } 
             
    })
    notes.shift()
    isNoteInTime = false;
    }
});

document.addEventListener("keydown", function(event){
    if (event.code == 'KeyX'){
       
        notes.forEach(note => {
            
            if(note.x == 250){
                if(note.y > linePlayer-45 && note.y < linePlayer+45){
                    isNoteInTime = true
                    score += 10;

                    noteCheckers[1].color = "green";
                    setTimeout(() =>{
                        noteCheckers[1].color = '#FFD1DC';
                    }, 100)
                }
            }
            
           
             if(isNoteInTime){
                document.addEventListener("keydown", function(event){
                    if (event.code == 'KeyX'){
                        document.getElementById('score').innerHTML = score
                        if(score > highScore){
                            document.getElementById('highscore').innerHTML =  score
                        }
                    }
                });
               
            } 
             
    })
    notes.shift()
    isNoteInTime = false;
    }
});


document.addEventListener("keydown", function(event){
    if (event.code == 'KeyN'){
       
        notes.forEach(note => {
            
            if(note.x == 350){
                if(note.y > linePlayer-45 && note.y < linePlayer+45){
                    isNoteInTime = true
                    score += 10;

                    noteCheckers[2].color = "green";
                    setTimeout(() =>{
                        noteCheckers[2].color = '#FFD1DC';
                    }, 100)
                }
            }
            
           
             if(isNoteInTime){
                document.addEventListener("keydown", function(event){
                    if (event.code == 'KeyN'){
                        document.getElementById('score').innerHTML = score
                        if(score > highScore){
                            document.getElementById('highscore').innerHTML =  score
                        }
                    }
                });
               
            } 
             
    })
    notes.shift()
    isNoteInTime = false;
    }
});


document.addEventListener("keydown", function(event){
    if (event.code == 'KeyM'){
       
        notes.forEach(note => {
            
            if(note.x == 450){
                if(note.y > linePlayer-45 && note.y < linePlayer+45){
                    isNoteInTime = true
                    score += 10;

                    noteCheckers[3].color = "green";
                    setTimeout(() =>{
                        noteCheckers[3].color = '#FFD1DC';
                    }, 100)
                }
            }
            
           
             if(isNoteInTime){
                document.addEventListener("keydown", function(event){
                    if (event.code == 'KeyM'){
                        document.getElementById('score').innerHTML = score
                        if(score > highScore){
                            document.getElementById('highscore').innerHTML =  score
                        }
                    }
                });
               
            } 
             
    })
    notes.shift()
    isNoteInTime = false;
    }
});

const buttonZ = document.getElementById('button-z');
const buttonX = document.getElementById('button-x');
const buttonN = document.getElementById('button-n');
const buttonM = document.getElementById('button-m');

document.addEventListener("keydown", function(event){
    if (event.code == 'KeyZ'){
        buttonZ.classList.add("pressed")
    }
});

document.addEventListener("keyup", function(event){
    if (event.code == 'KeyZ'){
        buttonZ.classList.remove("pressed")
    }
});


document.addEventListener("keydown", function(event){
    if (event.code == 'KeyX'){
        buttonX.classList.add("pressed")
    }
});

document.addEventListener("keyup", function(event){
    if (event.code == 'KeyX'){
        buttonX.classList.remove("pressed")
    }
});


document.addEventListener("keydown", function(event){
    if (event.code == 'KeyN'){
        buttonN.classList.add("pressed")
    }
});

document.addEventListener("keyup", function(event){
    if (event.code == 'KeyN'){
        buttonN.classList.remove("pressed")
    }
});

document.addEventListener("keydown", function(event){
    if (event.code == 'KeyM'){
        buttonM.classList.add("pressed")
    }
});

document.addEventListener("keyup", function(event){
    if (event.code == 'KeyM'){
        buttonM.classList.remove("pressed")
    }
});


draw()