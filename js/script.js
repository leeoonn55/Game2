'use strict';

//deklacje #########################################################################################

var buttonPaper = document.getElementById('button-paper');     
var buttonStone = document.getElementById('button-stone');
var buttonShears = document.getElementById('button-shears');
var buttonStart = document.getElementById('button-start');
var buttons = document.getElementsByClassName('button_play'); 

var outScore = document.getElementById('output-score');
var outResult = document.getElementById('result');
var outResult1 = document.getElementById('result1');
var outResult2 = document.getElementById('result2');
var newGame = document.getElementById('new_game');
var newGame1 = document.getElementById('new_game1');

var params = {  //Zmienne w postaci obiektu
    resultPlayer: 0, 
    resultKomputer: 0, 
    maxGame: ' ', 
    maxGameRob: 0,      
    maxGameRob1: 0,
};  

var resultTable = [];

// OBSŁUGA PRZYCISKÓW #########################################################################################
for (var i=0; i < buttons.length; i++) {    
  buttons[i].addEventListener('click', function() {    
    if (!(params.maxGame > 0)) {                                                                       //sprawdzenie czy jest ustawiona max ilość wygranych    
        params.maxGame = Math.round(window.prompt('Podaj ilość wygranych rund'));                      //okno pobierające ilość wygranych rund        
        if (params.maxGame > 0) {                                                                      //sprawdzenie czy podano popraną wartość wygranych rund
          playerMove(this.dataset.id , randomNumber());                                          //Odpalenie jednej rundy gry                                                        
        } else {
          alert('Wprowadz poprawną wartość ilości wygranych rund');                        //komunikat w przyadku niepoprawnego wprowadzenia danych 
        }
    } else {                                                                                  //odpalenie jednej rundy w przytpadku kiedy ustawiona była max ilości wyganych
      playerMove(this.dataset.id , randomNumber());
    }
  });
}

newGame.addEventListener('click' , function() {                                                    // rozpoczęcie nowej gry
    location.reload();
});


// PROGRAM GŁÓWNY #########################################################################################
function  playerMove(inPlayer, InKomputer) {
    var wynikTury;

    
    if (params.maxGame > params.maxGameRob) {                                                                                                             // sprawdzenie czy osiągnięo maksymalną ilośc gier
        if (inPlayer == InKomputer) {                                                                                                       //warunek dla remisu
            wynikTury = 0;
        }

        if ((inPlayer == 1 && InKomputer == 2) || (inPlayer == 2 && InKomputer == 3) || (inPlayer == 3 && InKomputer == 1)) {               // waunek dla zwyciestwa gracza
            params.resultPlayer ++;                                                                                                                // dodanie wartiości do licznika zwycieztwa gracza
            wynikTury = 1;        
        }
        
        if ((inPlayer == 1 && InKomputer == 3) || (inPlayer == 2 && InKomputer == 1) || (inPlayer == 3 && InKomputer == 2)) {               // warunek dla porazki gracza - zwycięstwo komputer
            params.resultKomputer ++;                                                                                                              // dodanie wartiości do licznika zwycieztwa komputer
            wynikTury = 2;        
        }

        if (params.resultPlayer > params.resultKomputer) {                                                                        // warunek dla większej ilości zwycięstw gracza
            params.maxGameRob = params.resultPlayer;                                                                              // ustawienie aktualnej ilości zwyciestw
        }
        
        if (params.resultPlayer < params.resultKomputer) {                                                                        // warunek dla większej ilości zwycięstw komputera
            params.maxGameRob = params.resultKomputer;                                                                            // ustawienie aktualnej ilości zwyciestw
        } 

        // wyświetlanie komunikatów
        outScore.innerHTML =  '<br><br> Gra toczy się do : ' + params.maxGame +  ' zwycięstw. <br><br> Obecna tura: ' + params.maxGameRob + ' <br> Gracz wybrał:' + innDisplay(inPlayer) + ' Komputer wylosował ' + innDisplay(InKomputer) + '<br> Runda zakończona: ' + innDisplay1(wynikTury) ; 
        outResult.innerHTML =  'Wynik gracza :' + params.resultPlayer +  '  wynik komputera: ' +  params.resultKomputer  ; 
        resultTable[params.maxGameRob1] = '&nbsp  ' + (params.maxGameRob1 + 1) + ' runda;   gracz: ' + innDisplay(inPlayer) + ' - komputer: ' + innDisplay(InKomputer) + ' --> Runda zakończona:  ' + innDisplay1(wynikTury);      //wpisanie pojedynczego wyniku do tabeli

        if (params.maxGame <= params.maxGameRob) {                                                                                //wyświetlanie komunikatu po skończeniu gry
            if (params.resultPlayer > params.resultKomputer) {
                outResult1.innerHTML =  '<br> WGRAŁEŚ Gratulacje :-)' ; 
            }   else {
                    outResult1.innerHTML =  '<br> PRZEGRAŁEŚ spróbuj ponownie :-(' ;  
            }            
            newGame.innerHTML = '<button id="button-start">Nowa gra</button> ';                                     // wyświetlenie przycisku nowa gra
            showModal();
        } 
    } 
    params.maxGameRob1 ++; 
}

// funkcje wyświetlające informacje  #########################################################################################
function innDisplay(inDisplay1) {        //funkcja wyswietlająca napis w zależności od wyboru  papier kamień nożyce  
    if (inDisplay1 == 1) {
        return ' PAPIER ';
    }

    if (inDisplay1 == 2) {
        return ' KAMIEŃ ';
    } 

    if (inDisplay1 == 3) {
        return ' NOŻYCE ';
    }           
}

function innDisplay1(inDisplay1) {        //funkcja wyswietlająca napis w zależności od wyboru  remis zwycięctwo porażka  
    if (inDisplay1 == 0) {
        return ' REMISEM ';
    }

    if (inDisplay1 == 1) {
        return ' ZWYCIĘSTWEM ';
    } 
    
    if (inDisplay1 == 2) {
        return ' PORAŻKĄ ';
    }           
}

function outResultModal() {             //funkcja wyswietlająca tabelkę w modalu
    var outResultModalRob = ''
    for(var i = 0; i < resultTable.length; i++){
        outResultModalRob = outResultModalRob + resultTable[i] + '<br>';        
    }
    return outResultModalRob;
}

// funkcja losująca liczby --> 1 (papier) 2(kamień) 3 (nożyczki)  #########################################################################################
function randomNumber() {
    var number_random = (Math.floor(Math.random()*10));
    if (number_random < 4) {
        return 1; 
    }   else if (number_random >= 4 && number_random < 8) {
            return 2;
    }   else {
            return 3;
    }
}

// funkcja wyświetająca modal  #########################################################################################

function showModal(){               //włączne modalu
    event.preventDefault();    	
    document.querySelector('#modal-overlay').classList.add('show');				// dołożenie clasy show	
    outResult2.innerHTML = outResultModal();
    document.querySelector('#modal-one').classList.add('show');						// dołożenie clasy show
}

// funkcje wyłaczjące modal na klik
var hideModal = function(event){
    event.preventDefault();
    location.reload();
    document.querySelector('#modal-overlay').classList.remove('show');
    var modalRemoves = document.getElementsByClassName('modal'); 			// wyszukanie elemtów dla kórych trzeba usunąc clasę how
    for(var i = 0; i < modalRemoves.length; i++){							
        modalRemoves[i].classList.remove('show');							//Usunięcie klasy show
    }
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
}

// Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 	
document.querySelector('#modal-overlay').addEventListener('click', hideModal);    

// Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 	
var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
        event.stopPropagation();
    });
}	

