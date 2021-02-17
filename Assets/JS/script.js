//html objects assignment to useable variables
let randomGenerateButton = document.getElementById("randomGoButton");
let randomPasswordReturn = document.getElementById("randomPasswordReturn");
let CaesarenerateButton = document.getElementById("caesarGoButton");
let CaesarPasswordReturn = document.getElementById("caesarPasswordReturn");

/*
* getInput
* Creates a prompt window and returns the text entered.
* @param promptText The text to display in the prompt window
* @param defaultText the default text to display in the input part of the prompt window 
*/
function getInput(promptText, defaultText) 
{
    var retVal = window.prompt(promptText, defaultText);

    return retVal;
} 

/*
* sendAlert 
* creates an alert window and does not return anything
* @param promptText The text to display in the alert window
*/
function sendAlert(promptText)
{
    window.alert(promptText);

    return;
}

/*
* doConfirm 
* creates an confirm window and returns a bool based on user choice
* @param promptText The text to display in the confirm window
*/
function doConfirm(promptText)
{
    var retVal = window.confirm(promptText)

    return retVal;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
* password Object
* an Object to hold all the parameters and methods to set and check those parameters for a randomly generated password
*/
let password = 
{
    //--------------- Password and generator ---------------//
    generatedPassword:"",
    getPasswordParameters:function()
        {
            //reset the password object for generating a new password
            this.resetParams();

            //get length for the password -- will set length to "cancel" if cancel button is pressed during getUserLength()
            while(!this.hasValidLength)
            {
                this.getUserLength();
                this.checkLength();
            } 

            //break out of the function if the cancel button was pressed in getUserLength()
            if (this.length === "cancel")
            {
                return;
            }

            //ask if the user wants specific types of characters. if returns false, all character types are used
            if(doConfirm("Would you like to specify what types of characters your password has? (Cancel for all alphanumeric and special characters)"))
            {
            //set values true or false for keys in the password.charTypes object
                while(!this.validCharSelection)
                {
                    this.getCharTypes();
                    this.checkCharTypes();
                }
            }
            else
            {
                this.charTypes.lowercase = true;
                this.charTypes.uppercase = true;
                this.charTypes.digits = true;
                this.charTypes.specials = true;
            }

            return;
        },
    generateRandomPassword:function()
        {
            if (this.length === "cancel")
            {
                return "Your Password Here";
            }
            else
            {
                let arrPassword = [];
                let arrSpecials = ["~","!","@","#","$","%","^","&","*","-",".","?"];

                while(arrPassword.length < this.length)
                {
                    if(this.charTypes.lowercase)
                    {
                        arrPassword.push(String.fromCharCode(getRandomInt(26) + 'a'.charCodeAt(0)));
                    }

                    if(this.charTypes.uppercase)
                    {
                        arrPassword.push(String.fromCharCode(getRandomInt(26) + 'A'.charCodeAt(0)));
                    }

                    if(this.charTypes.digits)
                    {
                        arrPassword.push(getRandomInt(10));
                    }

                    if(this.charTypes.specials)
                    {
                        arrPassword.push(arrSpecials[getRandomInt(arrSpecials.length)]);
                    }
                }
                    
                return arrPassword.join("");
            }
        },
    //--------------- length ---------------//
    length:0,
    hasValidLength:false,
    getUserLength:function()
        {
            let input = getInput("How long would you like your password to be?", "Enter a number between 8 and 128");

            if (input === null)
            {
                this.length = "cancel";
            }
            else
            {
                this.length = input;
            }
        },
    checkLength:function()
        {
            if (this.length >= 8 && this.length <= 128)
            {
                this.hasValidLength = true;
            }
            else if (this.length === "cancel")
            {
                this.hasValidLength = true;
            }
            else
            {
                sendAlert("Please Enter a valid number between 8 and 128.");
            }
        },
    //--------------- Character Types ---------------//
    charTypes: {lowercase:false, uppercase:false, digits:false, specials: false},
    validCharSelection: false,
    getCharTypes: function ()
        {
            this.charTypes.lowercase = doConfirm("Would you like your password to contain lowercase letters(a-z)? \n(OK for yes, Cancel for no.)");
            this.charTypes.uppercase = doConfirm("Would you like your password to contain UPPERCASE letters(A-Z)? \n(OK for yes, Cancel for no.)");
            this.charTypes.digits = doConfirm("Would you like your password to contain digits(0-9)? \n(OK for yes, Cancel for no.)");
            this.charTypes.specials = doConfirm("Would you like your password to contain special characters?\n(~!@#$%^&*-.?) \n(OK for yes, Cancel for no.)");
        },
    checkCharTypes: function()
        {
            let arrCharTypes = [];
            for(let key of Object.keys(this.charTypes))
            {
                this.charTypes[key] == true? arrCharTypes.push(key): null;
            }
            if(arrCharTypes.length != 0)
            {
                this.validCharSelection = true;
                sendAlert("Youve selected " + arrCharTypes.join(', '));
            }
            else
            {
                sendAlert("Please select at least one character type.");
            }
        },
    //--------------- reset ---------------//
    resetParams: function()
        {
            this.length = 0;
            this.hasValidLength = false;
            this.charTypes = {lowercase:false, uppercase:false, digits:false, specials: false};
            this.validCharSelection = false;
        }
}

/*
* Event listener for onClick of var generateButton
*/
randomGenerateButton.addEventListener("click", e =>
{
    password.getPasswordParameters();
    randomPasswordReturn.textContent = password.generateRandomPassword();
    if(password.length !== "cancel")
    {
        randomPasswordReturn.style.opacity = 1;
    }
});