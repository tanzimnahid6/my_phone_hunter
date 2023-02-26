const loadPhone = (id) =>{
    const URL = `https://openapi.programming-hero.com/api/phones?search=${id}`
    fetch(URL)
    .then(res => res.json())
    .then (data => {
        showData(data.data)
    })
}

const showData = (phones) =>{
   
    const phoneContainer = document.getElementById('phone-container');
    const element = document.getElementById('show-all');
    if(phones.length > 9){
        phones = phones.slice(0,9)
        element.classList.remove('invisible')
        console.log(element);
    }
    else{
        element.classList.add('invisible')
    }
    
  
   console.log(phones.length);
    //NOT FOUND CONTAINER ADD=======
   if(phones.length === 0){
    const notFoundContainer = document.getElementById('not-found');
    const h1 = document.createElement('h1');
    h1.innerHTML = ` <h1 id="found" class="text-center text-3xl text-purple-700 "> NO PHONE FOUND ! PLEASE TRY ANOTHER SEARCH</h1>`;
    console.log('not found');
    notFoundContainer.appendChild(h1);
    document.getElementById('search-feild').value = ''
   }
   else{
    document.getElementById('found').classList.add('invisible')
   }
   


   phones.forEach(phone => {
    console.log(phone);
    const {phone_name,image,slug} = phone

    const phoneCard = document.createElement('div');
    phoneCard.classList.add('flex','justify-center')
    phoneCard.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl border-2 ">
    <figure class="px-10 pt-10">
      <img src="${image}" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone_name}</h2>
      <p>${slug}</p>
      <div class="card-actions">
        <label for="my-modal" onclick="phoneDetails('${slug}')" class="btn btn-primary">Details</label>
       
      </div>
    </div>
    </div>
    
    `;
    phoneContainer.appendChild(phoneCard)
    document.getElementById('search-feild').value = ''//clear search bar
   });
}



document.getElementById('search-btn').addEventListener('click',function(){
    document.getElementById('phone-container').innerHTML = ''
   const searchFeild = document.getElementById('search-feild');
   const searchText  = searchFeild.value ;
   loadPhone(searchText);
})

//show all button 
document.getElementById('show-all-btn').addEventListener('click',function(){
    phoneContainer = document.getElementById('phone-container').innerHTML = ''

    

})
loadPhone();


// modal detaisl
const phoneDetails = (idphone) =>{
    const URL = ` https://openapi.programming-hero.com/api/phone/${idphone}`
    console.log(URL);

    fetch(URL)
     .then(res => res.json())
     .then(data => {
        detailsData(data.data)
     } )
     const detailsData = (details) =>{
        const {name,image} = details
        console.log(details);
        console.log(image);
        document.getElementById('phone-name').innerHTML = `<h1>${name}</h1>`;
        document.getElementById("phone-img").src = `${image}`
     }
    
}