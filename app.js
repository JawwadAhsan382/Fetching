var getRow=document.querySelector('.row')
fetch('https://fakestoreapi.com/products')
.then(response => response.json())
.then(data => {
    var i=0
    data.forEach((cv)=>{
        if(cv.title.length>i){
            i=cv.title.length
        }
    })
    data.map((cv)=>{
        if(cv.title.length<i){
            var emp=''
            for(j=1;j<=(i-cv.title.length);j++){
                emp+='&nbsp; '
            }
            cv.title+=emp
        }
        getRow.innerHTML+=`<div class="col-10 col-sm-5 col-md-4 py-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${cv.category}</h5>
     <img src="${cv.image}" width="90%" height="200px" alt="">
                  <p class="card-text">ID: ${cv.id} <br> Price: ${cv.price}$ <br> Title:<br> ${cv.title}</p>
              <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
          </div>
        </div>`
    })
})
.catch(err=>{
console.log(err)
})