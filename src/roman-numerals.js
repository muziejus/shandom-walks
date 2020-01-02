/* from https://blog.usejournal.com/create-a-roman-numerals-converter-in-javascript-a82fda6b7a60 */

const romanToArabic = function(n) {
  const romanNumbers = ["CM","M","CD","D","XC","C","XL","L","IX","X","IV","V","I"];
  const translations = [900,1000,400,500,90,100,40,50,9,10,4,5,1];
  let index = 0, num = 0;
  n = n.toUpperCase();
  for(let rn in romanNumbers){
    index = n.indexOf(romanNumbers[rn]);
    while(index !== -1){
      num += parseInt(translations[rn], 10);
      n = n.replace(romanNumbers[rn], "-");
      index = n.indexOf(romanNumbers[rn]);
    }
  }
  return num;
}

exports.romanToArabic = romanToArabic;

