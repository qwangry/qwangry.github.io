const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg']
    /* Declaring the alternative text for each image file */
const alts = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg']
    /* Looping through images */
for (var i = 0; i < images.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', "images/" + images[i]);
    newImage.setAttribute('alt', alts[i]);
    newImage.addEventListener("click", (e) => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    })
    thumbBar.appendChild(newImage);

}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", (evt) => {
    if (evt.target.className === "dark") {
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)"
        btn.setAttribute("class", "light")
        btn.textContent = "Lighten"
    } else {
        overlay.style.backgroundColor = "rgba(0,0,0,0)"
        btn.setAttribute("class", "dark")
        btn.textContent = "Darken"
    }
})