// Definicion de Pines como constantes
# define LEDVERDE 2
# define LEDAMARILLO 3
# define LEDROJO 4
# define TRIGGER 5
# define ECHO 6
# define BUZZER 9

// Constantes para hacer operaciones
const float sonido = 34300.0; // Velocidad del sonido en cm/s
const float limite1 = 30.0;
const float limite2 = 20.0;
const float limite3 = 10.0;

// Configuracion
void setup() {
    // Inicia el monitor serie
    Serial.begin(9600);

    // Modo entrada/salida de los pines
    pinMode(LEDVERDE, OUTPUT);
    pinMode(LEDAMARILLO, OUTPUT);
    pinMode(LEDROJO, OUTPUT);
    pinMode(ECHO, INPUT);
    pinMode(TRIGGER, OUTPUT);
    pinMode(BUZZER, OUTPUT);

    // Apagar todos los LEDs
    apagarLEDs(); //Funcion para apagar LEDs
}

// Instruccion
void loop() { 
    // Preparar el sensor de ultrasonidos
    iniciarTrigger();

    // Obtener la distancia
    float distancia = calcularDistancia();

    // Pagar todos los LEDs
    apagarLEDs();

    // Se lanza una alerta si esta dentro del rango de peligro
    if (distancia < limite1) {
        alertas(distancia); //Lanza alertas
    }
}

/* 
    Funcion que apaga todos los LEDs
*/
void apagarLEDs(){
    digitalWrite(LEDVERDE, LOW);
    digitalWrite(LEDAMARILLO, LOW);
    digitalWrite(LEDROJO, LOW);
}

/* 
    Funcion que comprueba si hay que lanzar alguna alerta visual o sonora
*/
void alertas(float distancia){
    if(distancia < limite1 && distancia >= limite2) { //Si la distancia es menor al limite 1 y menor o igual al limite 2
        digitalWrite(LEDVERDE, HIGH);// Enciende el LED verde
        tone(BUZZER, 2000, 200); // El buzzer suena a 2000 Hz durante 200 ms
    } else if(distancia < limite2 && distancia > limite3){ // Si la distancia es menor al limite 2 y mar al limite 3
        digitalWrite(LEDAMARILLO, HIGH); // Enciende led amarillo
        tone(BUZZER, 2500, 200); // El buzzer suena a 2500 Hz durante 200 ms
    } else if( distancia <= limite3){ //Si la distancia es menor o igual al limite 3 (Ya esta muy cerca)
        digitalWrite(LEDROJO, HIGH); // Enciende led amarillo
        tone(BUZZER, 3000, 200); // El buzzer suena a 3000 Hz durante 200 ms
    }
}


/*
  Metodo que calcula la distancia a la se encuentra un objeto
  Devuelve una variable tipo float que dice la distancia
 */

float calcularDistacia() {
    // pulseIn (Funcion nativa de arduino) obtiene el tiempo que tarda en cambiar entre estados, en este caso a HIGH
    unsigned long tiempo = pulseIn(ECHO, HIGH);

    // Obtener la distancia en cm
    // Convertir el tiempo en segundos ya que esta en microsegundos por eso se multiplica por 0.000001
    float distancia = tiempo * 0.000001 * sonido / 2.0; // Distacia = velocidad(en este caso la del sonido) por tiempo (convertido a segundos), se divide entre dos porque hizo el trayecto dos veces, ida y vuelta.
    // imprimo en el monitor serie la distancia en serie
    Serial.print(distancia);
    Serial.print("cm");
    Serial.println();
    delay(500); // Espero 500 ms

    return distancia; // Regreso la distancia
}

/* 
    Método que inica la secuencia del Trigger para comenzar a medir
*/
void iniciarTrigger(){
    digitalWrite(TRIGGER, LOW);//Trigger en estado bajo
    delayMicroseconds(2);//Esperar 2 ms

    digitalWrite(TRIGGER, HIGH);//Trigger en estado alto
    delayMicroseconds(10);//Esperar 10 ms

    digitalWrite(TRIGGER, LOW); // Comienza con el pin Trigger en estado bajo
}