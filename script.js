var displayCalc = document.getElementById("CalcNums");
var buttons = document.querySelectorAll("button");
var calcText = document.getElementById("calcText");
var textBorder = document.getElementById("textBorder");

var displayinput = '';
var calcinput = '';

function setButtonColor() {
    buttons.forEach(button => {
        if (!button.id && !button.classList.length) {
            button.style.color("#181F32");
        }

    });
    
}

function getPreviouschar(str) {
    index = str.length - 1;
    if (index > 0 && index < str.length) {
        return str[str.length - 1];
    }
    return null;
}

function addTextBorder(element, color, thickness) {
    // Set text-shadow dynamically to create the border effect
    element.style.textShadow = `
      ${thickness}px ${thickness}px 0 ${color},  /* Bottom-right */
      -${thickness}px ${thickness}px 0 ${color}, /* Bottom-left */
      ${thickness}px -${thickness}px 0 ${color}, /* Top-right */
      -${thickness}px -${thickness}px 0 ${color} /* Top-left */
    `;
  }

buttons.forEach(element => {
    element.addEventListener('click', ()=>{
        let value = element.textContent;
        
        calcText.style.color = "white";
        displayCalc.style.backgroundColor ="#181F32";

        if (displayCalc.value === 'Error') {
            displayinput = '';
            calcinput = '';
            displayCalc.value = '';
        }

        if (value === 'x') {
            value = '*';
        }

        if ((value === '/' || value === '*') && displayinput === '') {
            displayCalc.value = displayinput;
            return;
        }

        if (value === '=') {
            if (/[+\-*/.]$/.test(displayinput) || displayinput === '') {
                displayCalc.value = 'Error';
                return;
            }

            try{
                displayinput = eval(displayinput).toString();
                decimalIndex = displayinput.indexOf('.');
                if (decimalIndex > 0) {
                    displayinput = displayinput.slice(0, decimalIndex+4);
                }
                
                calcText.style.color = "#1E1E1E";
                // textBorder.style.border = '1px solid #000000';
                
                addTextBorder(textBorder, 'black', 1);
                displayCalc.style.backgroundColor ="#000";
                displayCalc.value = displayinput;
                displayinput = '';
            }
            catch(error){
                displayCalc.value = 'Error';
                displayinput = '';
            }
            
        }
        else if (value === 'DEL'){
            displayinput = displayinput.slice(0,-1);
            displayCalc.value = displayinput;
        }

        else if(value === 'RESET') {
            displayinput = '';
            displayCalc.value = displayinput;
        }
        else{
            var localinput = getPreviouschar(displayinput);
            if (/[+\-*/.]$/.test(value) && /[+\-*/.]$/.test(localinput)) {
                displayinput = displayinput.slice(0, displayinput.length -1);
            }
            displayinput += value;
            calcinput += value;
            displayCalc.value = displayinput;
        }
    });
    
});

