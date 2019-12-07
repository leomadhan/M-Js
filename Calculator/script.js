class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }

    clear()
    {
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined
        this.allClear=true;        
    }

    delete()
    {
        //this.currentOperand=this.currentOperand.toString().slice(0,-1)
        this.currentOperand=currentOperandTextElement.innerText.slice(0,-1)
        this.onDelete = true
    }
    
    appendNumber(number)
    {
        this.currentOperand=number
        this.onDelete=false
    }

    chooseOperation(operation)
    {
        this.operation=operation
        this.previousOperand=this.currentOperand  
        this.currentOperand ="" 
    }

    compute()
    {
        let computation
      
        const prev=parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)
        if(isNaN(prev)&&isNaN(curr)) return
        switch(this.operation){
            case '÷':
                computation=(prev/curr).toString()
                break;
            case '*':
                computation=(prev*curr).toString()
                break;
            case '-':
                    computation=(prev-curr).toString()
                break;
            case '+':
                    computation=(prev+curr).toString()
                break;
        }    
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''
    }

    updateDisplay()
    {
        if(this.currentOperand.length>0){
            this.currentOperand=this.currentOperandTextElement.innerText+this.currentOperand
        }
        
        if(this.onDelete) {
            this.currentOperandTextElement.innerText = this.currentOperand
            this.onDelete=false
        }
        else if(this.allClear || this.operation!=null){
            this.currentOperandTextElement.innerText = this.currentOperand
            this.previousOperandTextElement.innerText = this.previousOperand
            this.allClear=false            
        }else {
            this.currentOperandTextElement.innerText = this.currentOperand            
        }        
    }
    
}
const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const allclearbuttons=document.getElementById('data-all-clear')
// const deleteButtons=document.querySelectorAll('[data-delete]')
const deleteButtons=document.getElementById('data-delete')
const equalsButtons=document.getElementById('data-equals')
const previousOperandTextElement=document.getElementById('data-previous-operand')
const currentOperandTextElement=document.getElementById('data-current-operand')

const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button=>{
        button.addEventListener("click", function(){
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

allclearbuttons.addEventListener("click", function(){
    calculator.clear();
    calculator.updateDisplay();
});

deleteButtons.addEventListener("click", function(){
    calculator.delete();
    calculator.updateDisplay();
  });

equalsButtons.addEventListener("click", function(){
    calculator.compute();
    calculator.updateDisplay();
})
