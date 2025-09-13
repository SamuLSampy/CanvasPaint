const canvas = document.querySelector(".canvas")
let ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

document.querySelector('input[name="tool"][value="1"]').checked = true;

    // Botões de seleção
const pencilSize = document.querySelector(".pencilHeight")
const rgbPicker = document.querySelector(".rgbPicker")
const colorBox = document.querySelectorAll(".colorBox")
let toolEl = document.querySelectorAll('.tool');

let actualColor = "black";
let tool = "1"

    // Detecta se a janela foi redimensionada e corrige o canvas    
window.addEventListener('resize', () => {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.putImageData(imgData, 0, 0);
});

    // Detecta o primeiro click do mouse
canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = pencilSize.value

    ctx.save()
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(x, y);
})

    // Detecta o arrastar do mouse
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = pencilSize.value
  if (e.buttons === 1 && tool === "1") {
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = actualColor
    ctx.stroke()
  }
});

    // Detecta quando o mouse é solto
canvas.addEventListener('mouseup', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = pencilSize.value

    ctx.lineWidth = size;
    ctx.lineTo(x, y);
    ctx.strokeStyle = actualColor
    ctx.stroke()
});


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
        console.log(i.value)
    })
})




