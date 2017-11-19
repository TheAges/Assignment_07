var capture,
		mic,
		vol,
		icon,
		amount=100,
		s = 0,
		mode = true,
		MicON = false,
		invertMODE = false;
		infoMODE = false;
		alph1 = 255,
		alph2 = 0,
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
	capture.size(500, 500);
	capture.hide();

	mic = new p5.AudioIn();
	mic.start();

	icon = loadImage("assets/mic_icon.png");
}

function draw() {

	if (s>4) {s=0}
	if (s<0) {s=4}

	if (amount<25) {amount=25}
	if (amount>100) {amount=100}

	if (mode==true) {fill("white");rect(0,0,width,height)}

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
	//filter(INVERT)

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
	if (invertMODE == true) {filter(INVERT)};

	if (infoMODE == true ) {alph1=255;alph2=255}
	else {if ((millis()/1000)>15) {alph1-=35;alph2-=35}}


	push()
		fill(255,0,0,alph1)
		textAlign(CENTER)
		textSize(15)

		text("Work best on Chrome",width/2,height/10)
		text("Press i for toggle info",width/2,height/10+18)

		fill(255,0,0,alph2)

		text("Press any key to toggle continuous mode",width/2,8*height/10)
		text("Press the mouse button to cycle digits sets",width/2,8*height/10+18)
		text("Scroll up or down to increase or decrease resolution",width/2,8*height/10+36)
		text("Press the center mouse button to enable mic mode",width/2,8*height/10+54)
		text("Press enter to toggle invert mode",width/2,8*height/10+70)
	pop()

	if (MicON==true) {	image(icon, 0, 10, icon.width/5, icon.height/5);}

}

function mouseWheel(event) {
  if (event.delta>0) {amount-=25}
	else {amount+=25}
}

function keyReleased(EVENT) {
	//print(EVENT)
	//print(keyCode)
	if (keyCode == ENTER) {invertMODE=!invertMODE}
	else if (keyCode == 73) {infoMODE=!infoMODE}
	else {mode = !mode}
}

function mouseReleased() {
	if (mouseButton == LEFT) {s++}
	//if (mouseButton == RIGHT) {s--}
	if (mouseButton == CENTER) {MicON=!MicON}
}
