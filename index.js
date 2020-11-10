const {Board, Led, Sensor, Button, Piezo} = require("johnny-five");
let code = "";
let rightCode = "1324";


const board = new Board({
  repl: false
});

board.on("ready", () => {
  let LDR = new Sensor({
    pin: "A0",
    freq: 250
  });
  let piezo = new Piezo(3);
  let button1 = new Button(11);
  let button2 = new Button(10);
  let button3 = new Button(9);
  let button4 = new Button(8);
  let red = new Led(7);
  let green = new Led(6);

  let alarm = true;


  LDR.on("data", function() {
    console.log(this.value);
    if(this.value < 500 && alarm === true){
      piezo.play({
        song: "C G",
        beats: 1/4,
        tempo: 100
      });
      red.on();
      green.off();
    }

    if(this.value > 500){
      piezo.stop();
      red.off();
      green.off();
      alarm = true;
    }
  });

  button1.on("down", function() {
    code += "1";
    console.log(code);
    checkCode();

  });

  button2.on("down", function(){
    code += "2";
    console.log(code);
    checkCode();
  })

  button3.on("down", function(){
    code += "3";
    console.log(code);
    checkCode();
  })

  button4.on("down", function(){
    code += "4";
    console.log(code);
    checkCode();
  })

  const checkCode = () => {
    if(code.length === 4){
      console.log('code compleet');
      console.log(code);
      if(code === rightCode){
        code = '';
        console.log("this is the right code");
        alarm = false;
        piezo.play({
          song: "C4 - E4 - G4 - C4",
          beats: 1/4,
          tempo: 100
        });
        red.off();
        green.on();
      } else {
        console.log("this is the wrong code");
        code = '';
        piezo.play({
          song: "C5 - C5 - C5 - C5",
          beats: 1/4,
          tempo: 100
        })
        red.blink();
        setTimeout(() => {
          red.stop();
        }, 1000)
      }
    }
  }




  // button4.on("down", function() {
  //   button3.on("down", function() {
  //     button2.on("down", function() {
  //       button4.on("down", function() {
  //         alarm = false;
  //         piezo.play({
  //           song: "C E G C",
  //           beats: 1/4,
  //           tempo: 100
  //         });
  //         red.off();
  //         green.on();
  //       });
        
  //     });
    
  //   });
  
  // });

  // button1.on("down", function() {
  //   button2.on("down", function() {
  //     button3.on("down", function() {
  //       button4.on("down", function() {
  //         piezo.play({
  //           song: "C B",
  //           beats: 1/4,
  //           tempo: 100
  //         })
  //         red.blink();
  //         setTimeout(() => {
  //           red.stop();
  //         }, 1000)
  //       });
      
  //     });
  //   });
  // });


});