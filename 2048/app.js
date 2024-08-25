board = document.getElementsByClassName('board')[0];
restart = document.getElementsByClassName('restart')[0];

document.body.addEventListener('keydown', (e) => {
    //prevents the arrows from scrolling
    e.preventDefault();
    
    //moves the board according to the direction
    moveBoard(e, board);

    //adds 2 or 4 in an empty space of the board. BUGGY
    addElement(board);
    
    //add here a function to add some nice colors
})

const addElement = (board) => {
    const size = board.children.length;
    let randomElement = board.children[Math.floor(Math.random() * size)];
    let array = []
    let score = 0;

    for (let elem of board.children) {
        array.push(parseInt(elem.innerText));
        score += parseInt(elem.innerText)
    }
    
    //DOES NOT WORK PROPERLY.
    //goes in the ELSE as soon as there's no more 0 on the board
    if (array.includes(0)) {
        while(randomElement.innerText !== '0') {
            randomElement = board.children[Math.floor(Math.random() * size)];
        }
        let twoOrFour = randomRoundNumber();
        if (twoOrFour) {
            randomElement.innerText = 4;
        } else {
            randomElement.innerText = 2;
        }
        
    } else {
        alert('perdu! Score : ')
        console.log(score);
    }
}

function randomRoundNumber() {
    return Math.round(Math.random());
}

const moveBoard = (direction, board) => {
    switch(direction.key) {

        case "ArrowLeft":

            for (let i=board.children.length-1; i>0; i-=3) {
                let firstElem = board.children[i];
                let secondElem = board.children[i-1];
                let thirdElem = board.children[i-2];
                
                let arr = [parseInt(firstElem.innerText), parseInt(secondElem.innerText), parseInt(thirdElem.innerText)];
                let shifted = addition(arr);

                firstElem.innerText = shifted[0];
                secondElem.innerText = shifted[1];
                thirdElem.innerText = shifted[2];
            }

            break;

        case "ArrowRight":
            for (let i=0; i<board.children.length; i+=3) {
                    let firstElem = board.children[i];
                    let secondElem = board.children[i+1];
                    let thirdElem = board.children[i+2];
                    
                    let arr = [parseInt(firstElem.innerText), parseInt(secondElem.innerText), parseInt(thirdElem.innerText)];
                    let shifted = addition(arr);

                    firstElem.innerText = shifted[0];
                    secondElem.innerText = shifted[1];
                    thirdElem.innerText = shifted[2];
                }
            break;

        case "ArrowUp":

            for (let i=board.children.length-1; i>5; i-=1) {
                let firstElem = board.children[i];
                let secondElem = board.children[i-3];
                let thirdElem = board.children[i-6];
                
                let arr = [parseInt(firstElem.innerText), parseInt(secondElem.innerText), parseInt(thirdElem.innerText)];
                let shifted = addition(arr);

                firstElem.innerText = shifted[0];
                secondElem.innerText = shifted[1];
                thirdElem.innerText = shifted[2];
            }
            
            break;

        case "ArrowDown":

            for (let i=0; i<board.children.length-6; i+=1) {
                let firstElem = board.children[i];
                let secondElem = board.children[i+3];
                let thirdElem = board.children[i+6];
                
                let arr = [parseInt(firstElem.innerText), parseInt(secondElem.innerText), parseInt(thirdElem.innerText)];
                let shifted = addition(arr);

                firstElem.innerText = shifted[0];
                secondElem.innerText = shifted[1];
                thirdElem.innerText = shifted[2];
            }
            break;
    }
}

function addition (liste) {
    //fonctionne
    if (isOpposes(liste)) {
        // console.log('opposés : ', liste)
        liste[2] *= 2;
        liste[1] = 0;
        liste[0] = 0;
        
        return liste;
    }
    //fonctionne
    if (isDerniers(liste)) {
        // console.log('derniers', liste);
        liste[2] *= 2;
        liste[1] = liste[0];
        liste[0] = 0;
        
        return liste;
    }
    //fonctionne
    if(isPremiers(liste)) {
        // console.log('premiers : ', liste)
        if (liste[2] == 0) {
            liste[2] = liste[1]*2;
            liste[1] = 0;
            liste[0] = 0;
        }
        else {
            liste[1] *= 2;
            liste[0] = 0;
        }
    }
    //si aucun doublons
    else {
        // 2-4-0 => 0-2-4
        if (liste[2] == 0 && liste[0]!=0 && liste[1]!=0) {
            liste[2] = liste[1];
            liste[1] = liste[0];
            liste[0] = 0;
        }
        // 2-0-4 => 0-2-4
        else if (liste[1] == 0 && liste[0] != 0 && liste[2] != 0) {
            liste[1] = liste[0];
            liste[0] = 0;
        }
        //ici on teste les cas de figure où on a 2*0 sur la mm ligne
        else {
            //0-2-0
            if (liste[1]!=0 && liste[0]==0 && liste[2]==0) {
                liste[2] = liste[1];
                liste[1] = 0;
                liste[0] = 0;
            }
            //2-0-0
            else if(liste[0]!=0 && liste[1]==0 && liste[2]==0) {
                liste[2]=liste[0];
                liste[1]=0;
                liste[0]=0;
            }
        }
    }
    return liste;
}

function isOpposes (liste) {
    //x-0-x 
    if (liste[0] == liste[2] && liste[1] == 0 && liste[0] != 0) {
        return true;
    }
    else {
        return false;
    }
}
function isPremiers (liste) {
    if (liste[0] == liste[1] && liste[0] != 0) {
        return true;
    }
    else {
        return false;
    }
}
function isDerniers (liste) {
    //y-x-x
    if (liste[1] == liste[2] && liste[1] != 0) {
        return true;
    }
    else {
        return false;
    }
}
