

class UI{
  constructor(){
    this.profile = document.querySelector('.profile');
    this.uL = document.querySelector('.nomination-list');
    this.defaultImg = "https://res.cloudinary.com/sajicode/image/upload/v1610909420/photo_not_found.jpg";
    this.input = document.querySelector("#text");
    this.star = document.querySelector(".stars-inner");
    
  }

  showAlert(message,className){

    this.removeAlert();

    const div = document.createElement('div');
    
    div.className = className;
    
    div.appendChild(document.createTextNode(message));

    const body = document.querySelector('.first-section-div');
    const header = document.querySelector('.first-section-input');

    body.insertBefore(div,header);

    setTimeout(() => {
      this.removeAlert();
    }, 2000);


  }

  removeAlert(){
    const currentAlert = document.querySelector('.alert');

    if(currentAlert){
      currentAlert.remove();
    }
  }

  showSearch(data, lists){
    
    
    data.Search.forEach(movie => {
      
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      galleryImg.innerHTML = `
              <div class="features__gridbox">
              <div class="gridbox-front">
              <div class="image">
              <img class="poster-1" src=${movie.Poster !== "N/A" ? movie.Poster : this.defaultImg}></img>
              <img class="poster-2" src=${movie.Poster !== "N/A" ? movie.Poster : this.defaultImg}></img>
              </div>
              <div class="movie-content">
              <div class="movie-type">
              <p>TYPE:-<span class="move">${movie.Type}</span></p>
              </div>
              <div class="movie-year">
              <p>YEAR:-<span class="move">${movie.Year}</span></p>
              </div>
              </div>
              <div class="movie-title">
              <p>${movie.Title}</p>
              </div>
              
              </div>
              <div class="gridbox-back">
              <button type="button" id="${movie.imdbID }" class="btn nomination-button">NOMINATE</button>
              </div>
              </div>             
              `;
      this.profile.appendChild(galleryImg);
  if(lists){
    lists.forEach(list => {
      if(list.imdbID === movie.imdbID){
        document.getElementById(list.imdbID).disabled = true;
      }
     
    })
  }else{
  return lists
  }
      
      
    });



  }

 showNominationList(data, total){
// Create li element
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// Add id
li.id = `list-${data.imdbID}`;
// add html to li
li.innerHTML = `
<div class="picture-des">
<img src=${data.Poster !== "N/A" ? data.Poster : this.defaultImg} alt="poster"></img>
</div>
<div class="description">
  <h3 class="description-title">${data.Title}(${data.Year})</h3>
  <p class="description-plot">${data.Plot}</p>
  <div class="description-rating">
    <div class="stars-outer">
      <div class="stars-inner" id="${data.imdbID}"></div>
    </div>
    <span class="number-rating">${data.imdbRating}</span>
  </div>
</div>
`
// Create new link element
const link = document.createElement('a');
// Add class
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<ion-icon class="trash" name="trash-outline" title="delete"></ion-icon>';
// Append the link to li
li.appendChild(link);

// Append li to ul
this.uL.appendChild(li);

const starPercentage = (data.imdbRating / total) * 100;
         
// Round to nearest 10
const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
const star = document.querySelector(`#${data.imdbID}`)

star.style.width= starPercentageRounded;

// document.getElementById(data.imdbID).disabled = true;
 }

 
 removeMovie(item){
   item.remove();
 }


 clearProfile(){
  this.profile.innerHTML = '';
  this.input.value = '';
 }

 clearInput(){
   this.input.disabled = true
 }

 openInput(){
  this.input.disabled = false
}

disableButton(data, listID){
  if( listID === data.imdbID){
    document.getElementById(listID).disabled = false;
     }else{
      document.getElementById(listID).disabled = true;  
     }
}

enableButton(data, ID){
  if( ID === data.imdbID){
    document.getElementById(data.imdbID).disabled = true;
     }else{
      document.getElementById(data.imdbID).disabled = false;  
     }
}


}