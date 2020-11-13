// Assignment Code
var generateBtn = document.querySelector("#generate");
var lowerChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
var specChar = ['!', '@', '#', '$', '%', '^', '&', '*', '?'];




// ask questions and return the answers
function retreveRequirements() {
  // ask for pass length and waait for a response
  var questionLength = prompt("How long do you want your password to be? (8-128)");

  // check if answer is a num
  if (isNaN(questionLength)) {
    alert('You must enter a number')
    return
  }
  // check if its less than 8
  if (questionLength < 8) {
    alert("password must be greeater than 8");
    return
  }

  // checks if its bigger than 128
  if (questionLength > 128) {
    alert('must be less than 128');
    return
  }

  // value will either be true or false
  var questionLower = confirm('Do you want your password to include lowercase characters?')
  var questionUpper = confirm('Do you want your password to include uppercase characters?')
  var questionNum = confirm('Do you want your password to include numerical characters?')
  var questionSpecial = confirm('Do you want your password to include special characters?')

  // make sure they select at least one character type
  // if( questionLower === false && ...)
  if (!questionUpper && !questionLower && !questionNum && !questionSpecial) {
    alert('must choose at least one character type')
    return
  }
  // make object to hold all the answers and return them
  var passwordOptions = {
    length: questionLength,
    lowerChar: questionLower,  // their answer
    upperChar: questionUpper,
    numChar: questionNum,
    specialChar: questionSpecial,

  }
  return passwordOptions;

}

// this function expects an array to be given to it
function chooseRandChar(arr) {
  var randNum = Math.floor( Math.random() * arr.length)
  return arr[randNum]
}

// Take their answers to the questions and generate the random password
function generatePassword() {
  var passRequirements = retreveRequirements()
  // all possible chars to choose from
  var possibleChoices = []
  // one of each specified char type
  var guaranteedChoices = []
  // holds the newly created pass
  var generatedPassword = [];

  if(passRequirements.lowerChar){
    possibleChoices = possibleChoices.concat(lowerChar);
    guaranteedChoices.push( chooseRandChar(lowerChar) )
  }
  if(passRequirements.upperChar){
    possibleChoices = possibleChoices.concat(upperChar);
    guaranteedChoices.push( chooseRandChar(upperChar) )
  }
  if(passRequirements.numChar){
    possibleChoices = possibleChoices.concat(numChar);
    guaranteedChoices.push( chooseRandChar(numChar) )
  }
  if(passRequirements.specialChar){
    possibleChoices = possibleChoices.concat(specChar);
    guaranteedChoices.push( chooseRandChar(specChar) )
  }
  console.log('possible choices', possibleChoices)
  console.log('guentreed choices', guaranteedChoices)
  // loop through the password legnth and randoly select a character for each
  for(var i = 0; i < passRequirements.length; i++){
    generatedPassword.push( chooseRandChar(possibleChoices) )
  }
  // make sure we have one of each type of character
  for(var i = 0; i < guaranteedChoices.length; i++){

    generatedPassword[i] = guaranteedChoices[i]
  }
  console.log(generatedPassword.join(''))
    return generatedPassword.join('')

}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

