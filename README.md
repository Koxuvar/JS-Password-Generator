# JS-Password-Generator
A deployable web application that generates a password based on given user parameters. 

## For learning purposes only as the source code for the encryption algorithm is available publicaly in this repo.

## Description

The user is prompted to enter a length for the generated password. 
  * params: Must be between 8 and 128 characters in length to satistfy the majority of requirements for passwords.

User is then prompted for types of character sets they would like included in the randomized password
  Chartypes include:
    * lowercase alpha (a-z)
    * uppercase alpha (A-Z)
    * digits          (0-9)
    * special characters (~!@#$%^&*-.?)
      - brackets of any kind as well as a few other characters are omitted due to illegality on some platforms


