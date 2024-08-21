//generowanie z tablicy liczb (max 36) i tablicy kolorów (tyle ile wartości) (jeśli ich nie ma to random bez powtórzeń) wykres kołowy. Jak (domyślnie) value=True i label=true to jest legenda z procentami i nazwami i na wykresie. Jak exposition to tablica z danych to 'wychodzi z koła lekko'. Jeśli value=False. Angle start to przesunięcie startu danych o dany kąt. True jak działa. false jak nie.
let c = document.getElementById('wykres')
let ctx = c.getContext('2d')
function wykres(
  data = [],
  names = [],
  colors = [],
  values = true,
  label = true,
  exposition = [],
  angleStart = 0
) {
  if (
    Array.isArray(data) == false ||
    Array.isArray(names) == false ||
    Array.isArray(colors) == false ||
    Array.isArray(exposition) == false
  ) {
    alert(
      'Podano bledne dane. Data, names, colors, exposition musza byc tablicami'
    )
    return false
  }
  if (data.length > 36) {
    alert('Podano za duzo danych (max 36)')
    return false
  }
  while (names.length < data.length) {
    names.push(names.length)
  }
  let col = ''
  while (colors.length < data.length) {
    col = `rgb(${uniRand(255)},${uniRand(255)},${uniRand(255)})`
    if (colors.findIndex != -1) {
      colors.push(col)
    }
  }
  console.log(colors)
  let x = c.width / 3
  let y = c.height / 3
  let r = 150
  let wsp = 0
  for (let n = 0; n < data.length; n++) {
    wsp += data[n]
  }
  wsp = 360 / wsp
  angleStart = angleToRad(angleStart)
  let angleEnd = angleStart
  let ang = angleStart
  for (let i = 0; i < data.length; i++) {
    angleEnd += angleToRad(wsp * data[i])
    ctx.beginPath()
    ctx.strokeStyle = colors[i]
    ang += angleToRad(data[i] * wsp)
    if (exposition[i] == 1) {
      ctx.arc(Math.cos((2 * ang - angleToRad(data[i] * wsp)) / 2) * r * 0.3 + x, Math.sin((2 * ang - angleToRad(data[i] * wsp)) / 2) * r * 0.3 + y, r, angleStart, angleEnd)
      ctx.lineTo(x + Math.cos((2 * ang - angleToRad(data[i] * wsp)) / 2) * r * 0.3, y + Math.sin((2 * ang - angleToRad(data[i] * wsp)) / 2) * r * 0.3)
    }
    else {
      ctx.arc(x, y, r, angleStart, angleEnd)
      ctx.lineTo(x, y)
    }
    ctx.fillStyle = colors[i]
    ctx.fill()
    angleStart += angleToRad(wsp * data[i])
    ctx.stroke()
    ctx.closePath()
  }

  if (label) {
    ctx.font = '15px Arial'
    let lx = x + 300
    let ly = y - 200
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillText("Legenda:", lx, ly - 10)
    for (let i = 0; i < data.length; i++) {
      ctx.beginPath()
      ctx.strokeStyle = colors[i]
      ctx.rect(lx, ly, 10, 10)
      ctx.fillStyle = colors[i]
      ctx.fill()
      ctx.stroke()
      ctx.fillText(names[i], lx + 15, ly + 10)
      ly += 15
      ctx.closePath()
    }
  }
  if (values) {

    let vx = 0
    let vy = 0
    let ang = angleStart
    ctx.font = '15px serif'
    ctx.fillStyle = "black"
    ctx.strokeStyle = "white"
    for (let i = 0; i < data.length; i++) {
      ang += angleToRad(data[i] * wsp)
      if (exposition[i] == 1) {
        vx = Math.cos((2 * ang - angleToRad(data[i] * wsp)) / 2) * (r * 1) + x
        vy = Math.sin((2 * ang - angleToRad(data[i] * wsp)) / 2) * (r * 1) + y
      }
      else {
        vx = Math.cos((2 * ang - angleToRad(data[i] * wsp)) / 2) * (r * 0.5) + x
        vy = Math.sin((2 * ang - angleToRad(data[i] * wsp)) / 2) * (r * 0.5) + y
      }
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(vx, vy)
      ctx.stroke()
      ctx.fillText((data[i] / ((1 / wsp) * 360) * 100).toFixed(2) + "%", vx, vy)
      ctx.closePath()
    }
  }

  return true
}

wykres([30, 17, 5, 20, 30, 4, 6, 7], ['tak', 'Marusz'], ['blue', 'orange'], true, 1, [1, 0, 1, 0, 1, 0, 1], 180)
