const omdbApi = new Omdbapi;
const ui = new UI;


let count = 0;
let ID ;
const profile = document.querySelector('.profile');
const uL = document.querySelector('.nomination-list');
const button = document.querySelector('.nomination-button');


//Get list from Local storage
document.addEventListener('DOMContentLoaded', getLists);
function getLists(){
 
  document.querySelector('.nomination-list').style.display = 'block';
  
  // Show loader
  document.querySelector('#loading').style.display = 'none';

  let lists;
  if(localStorage.getItem('lists') === null){
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }

  lists.forEach(List => {
    // Create li element
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// Add id
li.id = `list-${List.imdbID}`;
// add html to li
li.innerHTML = `
    <p class="list_p"><ion-icon class="circle" name="arrow-redo-circle-outline"></ion-icon>${List.Title}(${List.Year})</p>
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
uL.appendChild(li);
})

}



document.getElementById('text').addEventListener('keyup', (e) => {
  
  const textInput = e.target.value;

 if(textInput !== ''){

  omdbApi.searchMovieApi(textInput)
  .then(data => {
    console.log(data)
   if(data.Response === "False"){
     ui.showAlert('This movie is not available','alert');
     
   }else{
    ui.showSearch(data);

   }
  })
  .catch(err =>{
    console.log(err)
  })

 }else{
   ui.clearProfile()
 }

 });







 profile.addEventListener("click",nominationButtonClick);

 function nominationButtonClick(e){
     ID = e.target.id;
   if(e.target.classList.contains("nomination-button")){
    document.querySelector('.nomination-list').style.display = 'none';
  
    // Show loader
    document.querySelector('#loading').style.display = 'block';
 
    console.log(count)
    // scroll to top
    window.scrollTo(300, 230);

    if(count <= 3 ){
      count++
    }else{
      $('.modal').modal('show');
      ui.clearProfile()
    
    }

    setTimeout(function(){
      
      omdbApi.searchidApi(ID)
      .then(data => {
        console.log(data)
       if(data.Response === "False"){
         ui.showAlert('This movie is not available','alert');
         
       }else{
        ui.showNominationList(data);
        
    
       }
      })
      .catch(err =>{
        console.log(err)
      });

     

      document.querySelector('.nomination-list').style.display = 'block';
  
      // Show loader
      document.querySelector('#loading').style.display = 'none';

      
        
    }, 2000);
  
    document.getElementById(ID).disabled = true;
    
  
    e.preventDefault();

   }
  
 }
//store data in local storage
 function storeListInLocalStorage(list) {
  let lists;
  if(localStorage.getItem('lists') === null){
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }

  lists.push(list);

  localStorage.setItem('lists', JSON.stringify(lists));
}





 uL.addEventListener("click", (e) => {
 
  if(e.target.parentElement.classList.contains('delete-item')) {
    const elementID = e.target.parentElement.parentElement.id;
    const specificID = elementID.split("-");
    const listID = specificID[1];

    omdbApi.searchidApi(listID)
    .then(data => {
      
        if( listID === data.imdbID){
          document.getElementById(listID).disabled = false;
         }
         e.target.parentElement.parentElement.remove();
        
      
    })
    .catch(err =>{
      console.log(err)
    });

    if(confirm("Are you sure??")){
      removeListFromLocalStorage(listID)
      ui.removeMovie(e.target.parentElement.parentElement)

    }
    
    }
 })






function removeListFromLocalStorage(item) {

  let lists;
  if(localStorage.getItem('lists') === null){
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }

  lists.forEach(function(list, index){
    if(item == list.imdbID){
      lists.splice(index, 1);
    }

  });

  localStorage.setItem('lists', JSON.stringify(lists));
}


