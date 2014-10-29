#define AN_BAUD 9600
#define AN_HANDSHAKE_IN "AN:HELLO_ARDUINO"
#define AN_HANDSHAKE_OUT "AN:HELLO_NODE"
#define AN_NL '\n'

void setup() {
  Serial.begin(AN_BAUD);
  _waitForHandShake();
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

void _waitForHandShake(){
  bool handShaked = false;
  while (!handShaked) {
    String str = Serial.readStringUntil(AN_NL);
    if (str == AN_HANDSHAKE_IN) {
      Serial.write(AN_HANDSHAKE_OUT);
      handShaked = true;
    }
  }
}


