var getRow=document.querySelector('.row')
var getWindow=document.querySelector('.window')
var getCartBut=document.querySelector('.cart-but')
var getCart=document.querySelector('.cart')
var getBill=document.querySelector('.bill')
getCartBut.disabled=true
var getBadge=document.querySelector('.badge')
var getSearch=document.querySelector('.srch')
var getCross=document.querySelector('.cross')
fetch('https://fakestoreapi.com/products')
.then(response => response.json())
.then(data => {
    var i=0
    data.forEach((cv)=>{
        if(cv.title.length>i){
            i=cv.title.length
        }
    })
    data.map((cv,ci)=>{
        if(cv.title.length<i){
            var emp=''
            for(j=1;j<=(i-cv.title.length);j++){
                emp+='&nbsp; '
            }
            cv.title+=emp
        }
        getRow.innerHTML+=`<div class="col-10 col-sm-5 col-md-4 py-2"><div class="card"><div class="card-body">
              <h5 class="card-title">${cv.category}</h5>
              <img src="${cv.image}" width="90%" height="200px" alt="">
              <p class="card-text">ID: ${cv.id} <br> Price: <span class="price-${ci}">${cv.price}</span>$ <br> Title:<br> ${cv.title}</p>
              <button value=${ci} class="btn btn-primary" onclick="addToCart(this)">Add to cart</button></div></div></div>`
    })
})
.catch(err=>{
console.log(err)
})
function addToCart(a){
    getCartBut.disabled=false
    getWindow.innerHTML+=a.parentNode.parentNode.parentNode.innerHTML
    getWindow.lastChild.lastChild.lastChild.className='btn btn-danger'
    getWindow.lastChild.lastChild.lastChild.setAttribute('onclick','removeFromCart(this)')
    getWindow.lastChild.lastChild.lastChild.innerText='Remove'
    getBadge.innerHTML=getWindow.childNodes.length
    getBadge.style.display='inline'
    a.disabled=true
    getBill.innerText=Array.from(getWindow.childNodes).reduce((acc,cv)=>{
        return acc+Number(document.querySelector('.price-'+cv.lastChild.lastChild.value).innerText)
    },0).toFixed(2)
}
function removeFromCart(a){
    a.parentNode.parentNode.remove()
    getRow.childNodes[a.value].firstChild.lastChild.lastChild.disabled=false
    getBadge.innerHTML=getWindow.childNodes.length
    if(getWindow.childNodes.length==0){
        getCartBut.disabled=true
        getBadge.style.display='none'
        getCart.style.display='none'
        getCartBut.value=0
    }
    getBill.innerText=Array.from(getWindow.childNodes).reduce((acc,cv)=>{
        return acc+Number(document.querySelector('.price-'+cv.lastChild.lastChild.value).innerText)
    },0).toFixed(2)
}
function appear(){
    if(getCartBut.value==0){
        getCart.style.display='flex'
        getCartBut.value=1
    }
    else{
        getCart.style.display='none'
        getCartBut.value=0
    }
}
function filtering(){
    Array.from(getRow.childNodes).map((cv)=>{cv.style.display='block'})
    var filteredArray=Array.from(getRow.childNodes).filter((cv)=>{
        if(cv.firstChild.firstChild.childNodes[1].innerText.indexOf(getSearch.value.split(' ').filter((cv)=>{ return cv}).join('').toLowerCase())==-1){
            return true
        }
        else{
            return false
        }
    })
    filteredArray.map((cv)=>{cv.style.display='none'})
    getCross.childNodes[0].childNodes[1].innerText=getRow.childNodes.length-filteredArray.length
    getCross.style.display='flex'
}
function goBack(){
    getSearch.value=''
    getCross.childNodes[0].childNodes[1].innerText=0
    getCross.style.display='none'
    Array.from(getRow.childNodes).map((cv)=>{cv.style.display='block'})
}