// Defino los pines para los LED's como constantes
# define LEDVERDE 2
# define LEDAMARILLO 3
# define LEDROJO 4
# define ANALOGPILA

// Defincion de variables
int valorAnalogo = 0;
float voltaje = 0;
int ledDelay = 800; // Para que el led parpade

// Rangos de voltaje que va a medir
float maximo = 1.5; // Pila llena
float medio = 1.3; 
float minimo = 0.3; //Pila vacia

// Configuracion
void setup() {
    // Iniciamos el monitor serie
    Serial.begin(9600); 

    // Configuro los pines de los LEDs como salidas
    pinMode(LEDVERDE, OUTPUT);
    pinMode(LEDAMARILLO, OUTPUT);

}

// Instrucciones
void loop() {
    // Leo el valor de la entrada analógica de la pila (y lo guardo en valorAnalogo)
    valorAnalogo = analogRead(ANALOGPILA);

    // Obtenemos el voltaje
    voltaje = 0.0048 * valorAnalogo; //Convertir la señal analogica a un voltaje
    // Imprimo el voltaje
    Serial.print("Voltaje: ");
    Serial.println(voltaje);

    //Ahora que sé que voltaje tiene la pila, lo valoro.
    if (voltaje >= maximo){ //Si es mayor o igual al voltaje maximo
        // Parpadea el LED verde
        digitalWrite(LEDVERDE, HIGH);
        delay(ledDelay);
        digitalWrite(LEDVERDE, LOW);
    } else if(voltaje < maximo && voltaje > medio){ // Si es menor al voltaje maximo y mayor al voltaje medio
        // Parpadea el LED amarillo
        digitalWrite(LEDAMARILLO, HIGH);
        delay(ledDelay);
        digitalWrite(LEDAMARILLO, LOW);
    } else if(voltaje < medio && voltaje > minimo){ // Si es menor al voltaje medio y mayor al minimo
        // Parpadea el LED rojo
        digitalWrite(LEDROJO, HIGH);
        delay(ledDelay);
        digitalWrite(LEDROJO, LOW);
    }
    
    // Apago todos los LEDs, para estar en un estado conocido (DURA MUY POCO, CASI IRRECONOCIBLE)
    digitalWrite(LEDVERDE, LOW);
    digitalWrite(LEDROJO, LOW);
    digitalWrite(LEDVERDE, LOW);
}