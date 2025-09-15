const canvas = document.querySelector(".canvas")
let ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Preenche o fundo com branco
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);


document.querySelector('input[name="tool"][value="1"]').checked = true;

    // Botões de seleção
const pencilSize = document.querySelector(".pencilHeight")
const rgbPicker = document.querySelector(".rgbPicker")
const colorBox = document.querySelectorAll(".colorBox")
let toolEl = document.querySelectorAll('.toolR');

let actualColor = "black";
let tool = "1";
let isDrawing = false;

    // Detecta se a janela foi redimensionada e corrige o canvas    
window.addEventListener('resize', () => {
  // Salva o desenho atual
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(img, 0, 0);
});

    // Primeiro click do mouse/touch
function cursorStart(e){
    const rect = canvas.getBoundingClientRect();
    let coords = touchType(e, rect)
    const size = pencilSize.value

    ctx.save()
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    isDrawing = true
}

    // arrastar do mouse/touch
function cursorMove(e){
    const rect = canvas.getBoundingClientRect();
    let coords = touchType(e, rect)
    const size = pencilSize.value

    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
  if (isDrawing && tool === "1") {    
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = actualColor
    ctx.stroke()
  }
}

    // soltando o mouse/touch
function cursorUp(e){
    const rect = canvas.getBoundingClientRect();
    const size = pencilSize.value
    let coords = touchType(e, rect)
    ctx.lineWidth = size;
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = actualColor
    ctx.stroke()
    ctx.closePath()
    isDrawing = false
}

    // Detecta se o toque é mouse ou touch
function touchType(e, rect){
    if (e.touches) {
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        return {x: x,y: y}
    } else {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return {x: x,y: y}
    }
}

    // Detecta o primeiro click do mouse/touch
canvas.addEventListener('mousedown', e => cursorStart(e))
canvas.addEventListener('touchstart', e => cursorStart(e))

    // Detecta o arrastar do mouse/touch
canvas.addEventListener('mousemove', e => cursorMove(e));
canvas.addEventListener('touchmove', e => cursorMove(e));

    // Detecta quando o mouse/touch é solto
canvas.addEventListener('mouseup', e => cursorUp(e));
canvas.addEventListener('touchend', e => cursorUp(e));


    // Sensor nos botões de cor
colorBox.forEach(i => {
    i.addEventListener("click", e => {

        // Remove a marcação de "selecionado" das caixas de cores
        colorBox.forEach(ii => ii.classList.remove("colorBoxSelected"));

        // Adiciona marcação na nova caixa selecionada
        i.classList.toggle("colorBoxSelected");

        // Atualiza a cor atual
        actualColor = i.style.backgroundColor;
    });
});

    // Detecta a mudança da cor no input color
rgbPicker.addEventListener("change", e =>{
    for(let i of colorBox){
            i.classList.remove("colorBoxSelected")
        }
    actualColor = rgbPicker.value
})

toolEl.forEach(i => {
    i.addEventListener('click', e =>{
        tool = i.value
        console.log(tool)
    })
})

    // Baixar imagem
document.querySelector('.download').addEventListener('click', ()=> {
  const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  
  const element = document.createElement('a');
  const file = 'Art.png';
  element.setAttribute('href', image);
  element.setAttribute('download', file);

  element.click();
})



