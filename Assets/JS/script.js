//html objects assignment to useable variables
let randomGenerateButton = document.getElementById("randomGoButton");
let randomPasswordReturn = document.getElementById("randomPasswordReturn");
let CaesarenerateButton = document.getElementById("caesarGoButton");
let CaesarPasswordReturn = document.getElementById("caesarPasswordReturn");

/*
* getInput
* Creates a prompt window and returns the text entered.
* @param {promptText} The text to display in the prompt window
* @param {defaultText} the default text to display in the input part of the prompt window 
*/
function getInput(promptText, defaultText) 
{
    var retVal = window.prompt(promptText, defaultText);

    return retVal;
} 

/*
* sendAlert 
* creates an alert window and does not return anything
* @param {promptText} The text to display in the alert window
*/
function sendAlert(promptText)
{
    window.alert(promptText);

    return;
}

/*
* doConfirm 
* creates an confirm window and returns a bool based on user choice
* @param {promptText} The text to display in the confirm window
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
* An Object to hold all the parameters and methods to set and check those parameters for a randomly generated password.
*
* @param {randomGeneratedPassword} String - The resulting password to be generated.
* @param {length} Int/Number - Length of randomly generated password.
* @param {hasValidLength} bool - should be true when {length} is between 8 and 128.
* @param {charTypes} Object - object containing bools for character set types to be used in random generation.
* @param {validCharSelection} bool - should be true when at least one charType in {charTypes} is true.
*
* @method {getRandomPasswordParameters} used to set object params for randomly generating a password.
!         {getRandomPasswordParameters} will return undefined value and break operation if {length} === "cancel".
* @method {generateRandomPassword} uses object params for randomly generate password.
!         {generateRandomPassword} will return "Your Password Here" to spoof a cancel operation if {length} === "cancel".
* @method {getUserLength} calls a prompt box to get user input and assigns user input to {length}.
!         {getUserLength} will set {length} to "cancel" if cancel button is pressed in prompt window.
* @method {checkLength} verifies {length} is between 8 and 128 and sets {hasValidLength} true if so.
!         {checkLength} will set {hasValidLength} true if length === "cancel".
* @method {getCharTypes} Uses a series of confirm boxes to first check if user wants to specify which character types they want to use
*                        and then if yes asks per character type if they want it included in the randomly generated password and assigns true to 
*                        corresponding keys in {charTypes}. Sets all to true if user does not want to specify.
* @method {checkCharTypes} checks to see if at least one value for keys in {charTypes} is true and confirms selection.
* @method {resetParams} resets all @params to default values.
*
*/
let password = 
{
    //--------------- Password and generator ---------------//
    randomGeneratedPassword:"",
    getRandomPasswordParameters:function()
        {
            //reset the password object for generating a new password
            this.resetParams();

            //get length for the password -- will set length to "cancel" if cancel button is pressed during getUserLength()
            while(!this.hasValidLength)
            {
                this.getUserLength();
                //do a check for if user pressed cancel
                if (this.length === "cancel")
                {
                    break;
                }
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
            //check for cancel length passed by pressing cancel button in getUserLength()
            if (this.length === "cancel")
            {
                return "Your Password Here";
            }
            else
            {
                //create an array that will make password creation and manipulation easier to handle
                let arrPassword = [];
                //array of special char to randomly pull from
                let arrSpecials = ["~","!","@","#","$","%","^","&","*","-",".","?"];

                //write a random password by going through each char type and if set to true add a char ot arrPassword
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
                
                //joins arrPassword into single string and asigns it randomGeneratedPassword for possible manipulation later
                this.randomGeneratedPassword = arrPassword.join("");

                return this.randomGeneratedPassword;
            }
        },
    //--------------- length ---------------//
    length:0,
    hasValidLength:false,
    getUserLength:function()
        {
            //get a length from the user
            let input = getInput("How long would you like your password to be?", "Enter a number between 8 and 128");

            //if the cancel button was pressed set to specialtag "cancel"
            if (input === null)
            {
                this.length = "cancel";
            }
            else
            {
                //ceils the user input to the next biggest whole number incase user inputs float for some reason
                this.length = Math.ceil(input);
            }
        },
    checkLength:function()
        {
            //check if length is between 8 and 128
            if (this.length >= 8 && this.length <= 128)
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
            //define an array of Chartypes for easy iteration and manipulation
            let arrCharTypes = [];
            //for all keys in charTypes if the value is true add to array
            for(let key of Object.keys(this.charTypes))
            {
                this.charTypes[key] == true? arrCharTypes.push(key): null;
            }
            //make sure at least one charType has a value of true
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
    password.getRandomPasswordParameters();
    randomPasswordReturn.textContent = password.generateRandomPassword();
    if(password.length !== "cancel")
    {
        randomPasswordReturn.style.opacity = 1;
    }
});