
  function Train() {
    const sweetness = parseFloat(document.getElementById('sweetness').value);
    const color = document.getElementById('color').value;
    const fruit = document.getElementById('fruit').value;

    
    let traineddata = JSON.parse(localStorage.getItem('traineddata')) || [];

    traineddata.push([sweetness, color, fruit]);

    
    localStorage.setItem('traineddata', JSON.stringify(traineddata));

    alert('Thank you for training me!');
}

  
  
  function Test() {
    const Sweetness = parseFloat(document.getElementById('sweetness').value);
    const Color = document.getElementById('color').value;

    const traineddata = JSON.parse(localStorage.getItem('traineddata')) || [];
    
    ///const isSweetnessNumeric = !isNaN(traineddata[k][0]);
    for (let k = 0; k < traineddata.length; k++){
      if ( traineddata[k][0] === Sweetness && traineddata[k][1] === Color) {
        alert(`The fruit is ${traineddata[k][2]}`);
        
        return; 
      }}
     
      for (let k = 0; k < traineddata.length; k++) { 
        Sweetness++;
        if( Sweetness > 10) break;
        if ( traineddata[k][0] === Sweetness && traineddata[k][1] === Color) {
        alert(`The fruit is ${traineddata[k][2]}`);
        
        return; 
      }}
      for (let k = 0; k < traineddata.length; k++) { 
        Sweetness++;
        if(Sweetness > 10) break;
        if ( traineddata[k][0] === Sweetness && traineddata[k][1] === Color) {
          alert(`The fruit is ${traineddata[k][2]}`);
          
          return; 
        }}
        for (let k = 0; k < traineddata.length; k++) { 
          Sweetness-=3;
          if(Sweetness < 0 ) break;
          if ( traineddata[k][0] === Sweetness && traineddata[k][1] === Color) {
            alert(`The fruit is ${traineddata[k][2]}`);
            
            return; 
          }}
          for (let k = 0; k < traineddata.length; k++) { 
            Sweetness--;
            if(Sweetness < 0 ) break;
            if ( traineddata[k][0] === Sweetness && traineddata[k][1] === Color) {
              alert(`The fruit is ${traineddata[k][2]}`);
              
              return; 
            }}     
      

    //default values
    if ((Color === 'red') || ((Color === 'yellow')  && (Sweetness === 4 || Sweetness === 3 || Sweetness === 2 || Sweetness === 1))) alert(`I think the fruit is Apple, if not please train me more!`);
    else if ((Color === 'yellow')  && (Sweetness === 10 || Sweetness === 9 || Sweetness === 8 || Sweetness === 7 || Sweetness === 6 || Sweetness === 5)) alert(`I think the fruit is Banana, if not please train me more!`);
    else if (Color === 'orange') alert(`I think the fruit is Orange, if not please train me more!`);
  }


  function Back() {
      window.location.href = "index.html";
  }
