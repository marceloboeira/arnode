#define AN_BAUD          9600
#define AN_HANDSHAKE_IN  "AN:HELLO_ARDUINO"
#define AN_HANDSHAKE_OUT "AN:HELLO_NODE"
#define AN_NL            '\n'


/**
 * Setup Arnode Stuff
 */
void setup() {
  // Open the serial port
  Serial.begin(AN_BAUD);
  // Wait for the hand-shake, before anything else
  _waitForHandShake();

  // test stuff
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
}

void loop(){

  // Scratch part, will be removed soon, now we need it for tests
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

/**
 * Private 'method' to wait until the hand-shake is done :)
 */
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
