class Calculadora{

    constructor(){
        this.setAttributes();
        this.getElements();
        this.listenEvents();
    }

    setAttributes(){
        this.sequence = '';
        this.lastKey  = '';
    }

    getElements(){
        this.clearBtn         = document.getElementById('clearBtn');
        this.screenNumber     = document.getElementById('screenNumber');
        this.numberButtons    = [...document.querySelectorAll('.numberBtn')];
        this.operationButtons = [...document.querySelectorAll('.operationBtn')];
    }

    listenEvents(){
        this.clearScreenListener( this.clearBtn )
        this.printOnClickListener( this.numberButtons )
        this.printOnClickListener( this.operationButtons )
        this.printOnPressListener();
    }

    // =================================
    //  Listeners
    // =================================
    clearScreenListener( btn ){
        if( !btn ) return;
        btn.addEventListener('click', () => {
            this.reset();
        });
    }

    printOnClickListener( btns ) {
        if( !btns ) return;
        btns.forEach( btn => {
            btn.addEventListener( 'click', (e) => {
                const elmBtn = e.target;
                let val = elmBtn.getAttribute('value');
                this.printOnScreen(val);
            })
        });
    }

    printOnPressListener() {
        document.addEventListener( 'keyup', (e) => {
            this.printOnScreen(e.key);
        });
    }

    validKeys(){
        return ['/', '*', '+', '-', '-', '.'];
    }

    // =================================
    //  Actions
    // =================================
    printOnScreen( val ){

        let isAnumber = !isNaN( +val ) ;
        let esValidaYnoRepetida = ( this.validKeys().includes(val)  && !this.validKeys().includes(this.lastKey) );

        // Backspace & enter
        if( val == 'Backspace' ){
            this.screenNumber.value = this.deleteCharacter( this.screenNumber.value );
        } else if( val == 'Enter' ) {
            this.getResult();
        }
        
        // Si la tecla es operable
        if( esValidaYnoRepetida || isAnumber ){

            // Si es número o decimal
            if( isAnumber || val === '.' ){
                
                if( +this.screenNumber.value !== 0){
                    this.screenNumber.value = this.screenNumber.value + val;
                } else {
                    this.screenNumber.value = val;
                }

            } else {
                // Si es operación
                this.clearInput();
            }
            
            this.lastKey  = val;
            this.sequence = this.sequence + val;

        } else if( val === '=' ) {
            // Si es resultado
            this.getResult();
        }

    };

    deleteCharacter( text ){
        return text.slice(0, text.length - 1)
    }

    clearInput(){
        this.screenNumber.value = '0';
    }

    reset(){
        this.sequence = '';
        this.screenNumber.value = '0';
    }

    getResult(){
        const result = eval(this.sequence).toString();
        this.screenNumber.value = result;
        this.sequence = result;
    }


}

const calc = new Calculadora();
