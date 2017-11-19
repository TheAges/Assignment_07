var capture,
		mic,
		vol,
		amount=100,
		s = 0,
		mode = true,
		MicON = false,
		alph = 255,
		testoAll = [
			[0,1],
			[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","w","v","x","y","z","ò","ç","à","è","é",".",",","!","£","$","%","&","/","€","@","#","°","/","*","-","+"],
			[0,1,2,3,4,5,6,7,8,9],
			["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","w","v","x","y","z"],
			[".",",","!","£","$","%","&","/","€","@","#","°","/","*","-","+"],
		];

function setup() {
  //rectMode(CENTER)
	createCanvas(500, 500);
	noStroke()

	capture = createCapture(VIDEO);
	capture.size(640, 480);
	capture.hide();

	mic = new p5.AudioIn();
	mic.start();
}

function draw() {

	if (s>4) {s=0}
	if (s<0) {s=4}

	if (amount<25) {amount=25}
	if (amount>100) {amount=100}

	if (MicON==true) {
		vol = mic.getLevel();
		vol = map(vol,0,1,50,100);
		vol = Math.floor(vol);
		console.log(vol)
		amount=vol;
	}

	var testo = testoAll[s],
			WPixel=width/amount,
			HPixel=height/amount;

	var myImage = capture.loadPixels();
	//filter(THRESHOLD);
	filter(INVERT);

	if (mode==true) {fill("black");rect(0,0,width,height)}

  for(var a=1; a<amount; a++) {

		for(var b=1; b<amount; b++) {
			var x = a*WPixel,
	        y = b*WPixel,
	        c = myImage.get(a*WPixel,b*WPixel);

    	fill(c)
			textSize((WPixel)+2)
    	text(random(testo),a*WPixel,b*WPixel)

    }

}
	//image(myImage, 0, 0, 640, 480);
	filter(THRESHOLD);
	filter(INVERT)

	if ((millis()/1000)>15) {alph-=20}

	push()
		fill(255,0,0,alph)
		textAlign(CENTER)
		textSize(15)
		text("Work best on Chrome",width/2,height/10)
		text("Press any key to toggle continuous mode",width/2,8*height/10)
		text("Press the mouse button to cycle digits sets",width/2,8*height/10+18)
		text("Scroll up or down to increase or decrease resolution",width/2,8*height/10+36)
		text("Press the center mouse button to enable mic mode",width/2,8*height/10+54)
	pop()

	if (mouseIsPressed) {
    if (mouseButton == LEFT) {s++}
    //if (mouseButton == RIGHT) {s--}
		if (mouseButton == CENTER) {MicON=!MicON}
	}


}

function mouseWheel(event) {
  if (event.delta>0) {amount-=25}
	else {amount+=25}
}

function keyReleased() {
	mode = !mode
}
