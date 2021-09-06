
const inNumberArray = [9, 8, 9];

function increment(number) {

    let canContinue = true;
    //Duplicate to not modify the entry
    const incrementsNumber = number.slice(); 

    for (let i = incrementsNumber.length - 1; i >= 0 && canContinue; i--) {

        //Ensure it's a number
        incrementsNumber[i] = parseInt(incrementsNumber[i], 10);
        incrementsNumber[i]++;
        if (incrementsNumber[i] === 10) {
            //last digit reached, return to 0 and keep going for the carry 
            incrementsNumber[i] = 0;
            canContinue = true;
            if (i === 0) {
                //Last digit but we still have a carry, we have to add 1 in first position
                incrementsNumber.unshift(1);
            }
        } else {
            //We don't need to keep going
            canContinue = false;
        }
        
    }
    return incrementsNumber;
}



console.log(`Entry number : ${inNumberArray.join('')}`);
const outNumberArray = increment(inNumberArray);
console.log(`Incremented number : ${outNumberArray.join('')}`);