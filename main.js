let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let catgeory = document.getElementById('catgeory');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let count = document.getElementById('count');
let mood = 'create';
let tmp;



//get total
function getTotal(){
    if( price.value !=''){
        let result = ( +price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background ='#a00d02'
    }
}



//create product and count && clean data and save localstorage
let datapro;
if(localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}

submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        total:total.innerHTML,
        catgeory:catgeory.value.toLowerCase(),
    }
    if(title.value != '' && catgeory.value !='' && price.value !=''&& 
        ads.value !=''&&taxes.value !=''&&newpro.count <= 100
        &&discount.value !=''&&count.value !=''){
        if (mood === 'create'){
            if(newpro.count > 1){
                for(let i = 0; i < newpro.count;i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }     
        }else{
            datapro[ tmp ]= newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        cleardata()
    }
    localStorage.setItem('product',JSON.stringify(datapro))
    showdata()
}

   

//clear inputs
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.value = '';
    catgeory.value = '';
    count.value = '';
}



//read
function showdata(){
    getTotal()
    let table = '';
    for(let i = 0; i < datapro.length;i++){
        table += `
         <tr>
               <td>${i+1}</td>
             <td>${datapro[i].title}</td> 
              <td>${datapro[i].price}</td>
               <td>${datapro[i].taxes}</td>
               <td>${datapro[i].ads}</td>
               <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
               <td>${datapro[i].catgeory}</td>
               <td><button onclick="updatedata(${i})" id="update">update</button></td>
               <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
            </tr>
           `;
   }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');
    if(datapro.length > 0){
        btndelete.innerHTML = `
        <button onclick= "deleteall()"> delete all (${datapro.length}) </button>
        `
    }else{
        btndelete.innerHTML = '';
    }
}
showdata()



//delete 
function deletedata(i)
{
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata()
}
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}



//update
function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    catgeory.value = datapro[i].catgeory;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}



//search
let searchmood = 'title';

function getsearchmood(id){
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood = 'title';
    }else{
        searchmood = 'catgeory';
        }
        search.placeholder = 'search by ' + searchmood;
    search.focus()
    search.value = '';
    showdata()
}

function searchdata(value){
    let table = '';
    for(let i = 0; i < datapro.length;i++){
        if(searchmood == 'title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td> 
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].catgeory}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
               </tr>`;
            }
    }else{
            if(datapro[i].catgeory.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td> 
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].catgeory}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr> `;
            }
    }
 }
  
    document.getElementById('tbody').innerHTML = table;
}
      