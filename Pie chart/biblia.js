//losowanie dowolnych liczb, sterowanie typem zwracanym
function uniRand(min, max = 0, strFormat = false, sepComma = false) {
  //strFormat - dla true zwraca wynik jako string, sepComma - dla true zamienia '.' na ','
  min = parseFloat(min);
  max = parseFloat(max);
  if (isNaN(min) || isNaN(max)) {
    // a może sprawdzić czy nie ma rzeczywistych np. -3.456
    console.log('Nieprawidłowa lista argumentów.');
    return false;
  } else {
    let temp = min;
    min = Math.min(min, max);
    max = Math.max(temp, max);
    mul =
      10 **
      parseInt(
        Math.max(
          Number.isInteger(min) ? 0 : min.toString().split('.')[1].length,
          Number.isInteger(max) ? 0 : max.toString().split('.')[1].length
        )
      );
    min *= mul;
    max *= mul;
    let result = (Math.trunc(Math.random() * (max - min + 1)) + min) / mul;
    return strFormat
      ? sepComma
        ? result.toString().replace('.', ',')
        : result.toString()
      : result;
  }
}

//losowanie liczb całkowitych z zadanego przedziału
function randIntFromRange(min_in, max_in) {
  max = Math.max(min_in, max_in); //zabezpieczenie na wypadek max_in < min_in
  min = Math.min(min_in, max_in);
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

//zamiana kąta podanego w stopniach (angle) na radiany
function angleToRad(angle) {
  return (Math.PI / 180) * angle;
}
