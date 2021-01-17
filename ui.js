

class UI{
  constructor(){
    this.profile = document.querySelector('.profile');
    this.uL = document.querySelector('.nomination-list');
    this.defaultImg = "https://res.cloudinary.com/sajicode/image/upload/v1610909420/photo_not_found.jpg";
    this.input = document.querySelector("#text");
    
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

  showSearch(data){
    
    data.Search.forEach(movie => {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      galleryImg.innerHTML = `
              <div class="image">
              <img src=${movie.Poster !== "N/A" ? movie.Poster : this.defaultImg}></img>
              </div>
              <div class="gallery-info">
              <p><span id="title" class="movie-info">TITLE:</span>&nbsp&nbsp${movie.Title}</p>
              <p><span id="type" class="movie-info">TYPE:</span>&nbsp&nbsp${movie.Type}</p>
              <p><span id="year" class="movie-info">YEAR:</span>&nbsp&nbsp${movie.Year}</p>
              <button type="button" id="${movie.imdbID}" class="nomination-button">NOMINATE</button>
              </div>
              
              `;
      this.profile.appendChild(galleryImg);
    });

  }

 showNominationList(data){
// Create li element
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// Add id
li.id = `list-${data.imdbID}`;
// add html to li
li.innerHTML = `
    <p class="list_p"><ion-icon class="circle" name="arrow-redo-circle-outline"></ion-icon>${data.Title}(${data.Year})</p>
`
// Create new link element
const link = document.createElement('a');
// Add class
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<ion-icon class="trash" name="trash-outline"></ion-icon>';
// Append the link to li
li.appendChild(link);

// Append li to ul
this.uL.appendChild(li);


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
}