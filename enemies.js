var preference = [360]; // variables voor kunos ai
var go;
var goMinus;
var goPlus;
var record;
var minusRecord;

function drawEnemies(enemyX, enemyY, enemyRadius, enemyRed, enemyGreen, enemyBlue) {
  var enemyColorDark = [enemyRed - 30, enemyGreen - 30, enemyBlue - 30]

  for (i = 0; i < enemyColorDark; i++) {
    if (enemyColorDark[i] < 0) {
      enemyColorDark[i] = 0;
    }
  }

  strokeWeight(5);
  stroke(enemyColorDark); // apply enemyColorDark, this makes the border of the circle a slightly darker version of the original for style purposes
  fill(enemyRed, enemyGreen, enemyBlue);
  circle(enemyX - posX, enemyY - posY, enemyRadius);
  fill(0);
  text(i, enemyX - posX, enemyY - posY); // show i on top of enemy
}

// KUNO'S AI, dit werkt nog niet
function updateBots() {
  for (var i = 0; i < enemyX.size(); i++) {
    for (var j = 0; j < 360; j++) {
      preference[j] = 0;
    }
    for (var j=0; j<enemyX.size(); j++) {
      if (enemySize.get(j)<enemySize.get(i)) {
      //  preference[int(degrees(atan2(enemyX.get(j)-enemyX.get(i), enemyY.get(j)-enemyY.get(i)))+180)]+=10;
        piramid(int(degrees(atan2(enemyX.get(j)-enemyX.get(i), enemyY.get(j)-enemyY.get(i)))+180),(1000/dist(enemyX.get(i),enemyY.get(i),enemyX.get(j),enemyY.get(j))),int(1000/enemySize.get(j)));
      }
      if (enemySize.get(j)>=enemySize.get(i)) {
       // preference[int(degrees(atan2(enemyX.get(j)-enemyX.get(i), enemyY.get(j)-enemyY.get(i)))+180)]-=10;
        piramid(int(degrees(atan2(enemyX.get(j)-enemyX.get(i), enemyY.get(j)-enemyY.get(i)))+180),-(1000/dist(enemyX.get(i),enemyY.get(i),enemyX.get(j),enemyY.get(j))),int(1000/enemySize.get(j)));
      }
    }
    for(var j=0;j<coinsX.size();j++){
    //  preference[int(degrees(atan2(coinsX.get(j)-enemyX.get(i), coinsY.get(j)-enemyY.get(i)))+180)]+=1;
    }
    record=0;
    minusRecord=0;
    for(var j=0;j<360;j++){
      if(preference[j]>record){
        record=preference[j];
        go=j;
      }
    }
    raycast(0, 0, sin(radians(go))*50, sin(radians(go+90))*50);
    enemyX.set(i,enemyX.get(i)+(raycasty*(((1/(enemySize.get(i)/100))/2)+1)*2));
    enemyY.set(i,enemyY.get(i)+(raycastx*(((1/(enemySize.get(i)/100))/2)+1)*2));
    if (i==0) {
      noStroke();
      fill(0);
      for (var j=0; j<360; j++) {
        rect(j,100,1,preference[j]*-1);
      }
    }
    respawn();

    for (var j=0; j<coinsX.size(); j++) {
      if (dist(enemyX.get(i), enemyY.get(i), coinsX.get(j), coinsY.get(j))<enemySize.get(i)/2) {
        coinsX.remove(j);
        coinsY.remove(j);
        enemySize.set(i, enemySize.get(i)+1);
      }
    }
    for (var j=0; j<enemyX.size(); j++) {
      if (i!=j) {
        if (enemySize.get(i)>enemySize.get(j)) {
          if (dist(enemyX.get(i), enemyY.get(i), enemyX.get(j), enemyY.get(j))<enemySize.get(i)/2) {
            enemySize.set(i, sqrt((((enemySize.get(i)/2)*(enemySize.get(i)/2))*Math.PI+((enemySize.get(j)/2)*(enemySize.get(j)/2))*Math.PI)/Math.PI)*2);
            enemyX.remove(j);
            enemyY.remove(j);
            enemySize.remove(j);
            ren.remove(j);
            gen.remove(j);
            ben.remove(j);
            respawn();
          }
        }
      }
    }
  }
}

