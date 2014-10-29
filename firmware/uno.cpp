#define AN_BAUD 9600

void setup() {
  Serial.begin(AN_BAUD);
  Serial.println("AN:HANDSHAKE");
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
}

void loop(){
  while (Serial.available() > 0) {
    int inByte = Serial.read();
    Serial.println(inByte);
    switch (inByte) {
      case '0':
         digitalWrite(13,LOW);
         break;
      case '1':
         digitalWrite(13,HIGH);
         break;
    }
  }
}



