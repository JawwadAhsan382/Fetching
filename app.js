var getRow=document.querySelector('.row')
var getWindow=document.querySelector('.window')
var getCartBut=document.querySelector('.cart-but')
getCartBut.disabled=true
var getBadge=document.querySelector('.badge')
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
              <p class="card-text">ID: ${cv.id} <br> Price: ${cv.price}$ <br> Title:<br> ${cv.title}</p>
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
}
function removeFromCart(a){
    a.parentNode.parentNode.remove()
    getRow.childNodes[a.value].firstChild.lastChild.lastChild.disabled=false
    getBadge.innerHTML=getWindow.childNodes.length
    if(getWindow.childNodes.length==0){
        getCartBut.disabled=true
        getBadge.style.display='none'
        getWindow.style.display='none'
        getCartBut.value=0
    }
}
function appear(){
    if(getCartBut.value==0){
        getWindow.style.display='flex'
        getCartBut.value=1
    }
    else{
        getWindow.style.display='none'
        getCartBut.value=0
    }
}