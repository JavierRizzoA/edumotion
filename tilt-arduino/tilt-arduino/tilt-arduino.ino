#include<Servo.h>

int posX = 90;
int posY = 90;
int input = 2;
Servo servoX;
Servo servoY;

void setup() {
  servoX.attach(7);
  servoY.attach(8);
  pinMode(10, INPUT);
  pinMode(11, INPUT);
  pinMode(13, OUTPUT);
  Serial.begin(9600);

}

void loop() {
  /*if(digitalRead(10) == 1) {
    posX -= 10;
    digitalWrite(13, HIGH);
  }
  if(digitalRead(11) == 1) {
    posX += 10;
    digitalWrite(13, LOW);
  }*/
  while(Serial.available() < 1);
  input = Serial.read();
  switch(input) {
    case 65:
    posX -= 10;
    break;
    case 66:
    posX += 10;
    break;
    case 67:
    posY -=10;
    break;
    case 68:
    posY += 10;
  
    break;
  }
  
  servoX.write(posX);
  servoY.write(posY);

}
