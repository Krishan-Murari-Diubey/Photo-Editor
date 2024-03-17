// backgroundImage change

let unsplashImages = [
  "https://source.unsplash.com/1920x1080/?nature",
  "https://source.unsplash.com/1920x1080/?architecture",
  "https://source.unsplash.com/1920x1080/?technology",
];

function changeBackground() {
  const randomIndex = Math.floor(Math.random() * unsplashImages.length);
  const imageUrl = unsplashImages[randomIndex];
  document.body.style.backgroundImage = `url('${imageUrl}')`;
}

setInterval(changeBackground, 50000);

changeBackground();

//   image upload
document.addEventListener("DOMContentLoaded", () => {
  let fileInput = document.getElementById("fileInput");
  let imagePath = document.querySelector(".img img");
  let ImgClass = document.querySelector(".img");

  ImgClass.addEventListener("click", () => {
    fileInput.click();
    const file = fileInput.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imagePath.src = imageUrl;
      imagePath.addEventListener("load", () => {
        document.querySelector(".section-left").classList.remove("disable");

        const filterIconsContainer = document.querySelector(".filter-icons");

        filterIconsContainer.addEventListener("click", (event) => {
          const target = event.target;
          console.log(target);

          if (target.tagName === "ION-ICON" || target.tagName === "SPAN") {
            document.querySelector(".active").classList.remove("active");
            target.classList.add("active");
            sliderInput.max = 100
          }
        });
      });
    } else {
      return;
    }
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imagePath.src = imageUrl;
      imagePath.addEventListener("load", () => {
        document.querySelector(".section-left").classList.remove("disable");

        const filterIconsContainer = document.querySelector(".filter-icons");

        filterIconsContainer.addEventListener("click", (event) => {
          const target = event.target;
          const id = target.id;

          if (
            target.tagName === "ION-ICON" ||
            target.tagName === "SPAN" ||
            target.id === id
          ) {
            document.querySelector(".active").classList.remove("active");
            target.classList.add("active");
            const sliderName = document.getElementById("slider-name");
            sliderName.innerHTML = target.id;
            sliderInput.max = 100
            sliderInput.value = 50
            sliderValue.innerHTML="50%"
          }
        });
      });
    } else {
      return;
    }
  });
});

// filters

let brightness =100;
let contrast = 100;
let saturate = 100;
let blur = 0;
let invert = 0;
let imagePath = document.querySelector(".img img")
const sliderInput = document.querySelector(".slider input");
const sliderValue = document.querySelector("#slider-value");
sliderInput.addEventListener("input", () => {
  sliderValue.innerHTML = `${sliderInput.value}%`;
  let sliderState = document.querySelector(".filter .active");

  if (sliderState) {
    if (sliderState.id === "Brightness") {
      brightness = sliderInput.value;
    } else if (sliderState.id === "Contrast") {
      contrast = sliderInput.value;
    } else if (sliderState.id === "Saturate") {
      saturate = sliderInput.value;
    } else if (sliderState.id === "Blur") {
      blur = sliderInput.value;
    } else if (sliderState.id === "Invert") {
      invert = sliderInput.value;
    }

    imagePath.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px) invert(${invert}%)`;
  }
});

// rotate & flip
let rotate = 0;
let scaleX = 1; 
let scaleY = 1; 

let rotate_icon = document.querySelector(".rotate-icons");
rotate_icon.addEventListener("click", (event) => {
  const target = event.target;
  
  if (target.id === "rotate-left") {
    rotate -= 90; 
  } else if (target.id === "rotate-right") {
    rotate += 90; 
  } else if (target.id === "flip-x") {
    
    scaleX = scaleX == 1 ? -1 : 1
  } else if (target.id === "flip-y") {
   
    scaleY = scaleY == 1 ? -1 : 1
  }

 
  imagePath.style.transform = `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
});


const reset_btn= document.querySelector(".reset-btn")
reset_btn.addEventListener("click",()=>{

  rotate = 0;
  scaleX = 1; 
   scaleY = 1; 
   brightness = 100;
 contrast = 100;
 saturate = 100;
 blur = 0;
 invert = 0;
 imagePath.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px) invert(${invert}%)`;
 imagePath.style.transform = `rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
})

const download_btn = document.querySelector(".export-btn")

download_btn.addEventListener("click",()=>{
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext("2d")
  canvas.width=imagePath.naturalWidth;
  canvas.height=imagePath.naturalHeight;
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px) invert(${invert}%)`;
  ctx.scale(scaleX,scaleY)
  ctx.translate(canvas.width/2,canvas.height/2)
  ctx.drawImage(imagePath,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
  const link = document.createElement("a")
  link.download = "img.jpg";
  link.href = canvas.toDataURL()
  link.click()
})
