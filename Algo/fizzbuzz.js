
const lastNumberToDisplay = 42;

function displayFizzBuzz(number) {
    for (let i = 1 ; i < number; i++) {
        let stringToDisplay = '';
        if (i % 3 === 0) {
            stringToDisplay = 'Fizz';
        } 
        if (i % 5 === 0) {
            stringToDisplay += 'Buzz';
        }
        console.log(stringToDisplay.length > 0 ? stringToDisplay : i);
    }
}

displayFizzBuzz(lastNumberToDisplay);