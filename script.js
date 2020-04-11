function getBreedList(){
    console.log('handle')
    var xhr = new XMLHttpRequest();
    // var xhr= new xmlHttpRequest()
    xhr.open('GET', 'https://dog.ceo/api/breeds/list')
    xhr.send()
    xhr.onload= function(){
      if(xhr.status==200){
      // console.log(xhr.response)
        var breed= JSON.parse(xhr.response)
        showBreedList(breed)
        
        }else{
          console.log(xhr.response)
      }
    }
}
  function showBreedList(breedList){
    var list=breedList.message
    var select= document.getElementById('byBreed')
    for(var i=0; i<list.length; i++){
      var option = document.createElement("option");
      option.value = list[i];
      option.text = list[i];
      select.appendChild(option);
      // console.log(list[i])
    }
    
  }
  
  var getBtn= document.getElementById('getBtn')
  getBtn.addEventListener('click', function(){
    getSelectedBreed(displaySelected)
  })
  
  function getSelectedBreed(callback){
    var selected= document.getElementById('byBreed').value
    var renderDom= document.getElementById('res')
    //get selected breed dog images from server
    var xhr= new XMLHttpRequest()
    xhr.open('GET', `https://dog.ceo/api/breed/${selected}/images`)
    xhr.send()
    xhr.onload=function(){
      if(xhr.status==200){
        var imageResponse= JSON.parse(xhr.response)
        callback(imageResponse, renderDom, selected)
      }
    }
    // result.append(selected)
    // callback(selected)
    
  }
  function displaySelected(img, renderDom, selectedBreed){
    renderDom.innerHTML=''
    var selectedBreedImgs=img.message
    
    selectedBreedImgs.forEach(function(ele, ind){
      if(ind<9){
        
        var div= document.createElement('div')
        div.setAttribute('class', 'p-2 col-12 col-md-6 col-lg-4 text-center')
        var img= document.createElement('img')
        img.setAttribute('src', ele)
        img.setAttribute('alt', selectedBreed)
        img.setAttribute('class', 'img-fluid rounded img-thumbnail')
        
        img.setAttribute('title', selectedBreed+' Breed')
        img.setAttribute('style', 'height:250px')
        // img.setAttribute('style', 'width:200px')
        
        div.append(img)
        renderDom.append(div)
      }  
    })
    console.log(img.message)
  }
  
  //=====================random images code================
  function getRandom(){
    var xhr= new XMLHttpRequest()
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random/3')
    xhr.send()
    xhr.onload=function(){
      if(xhr.status==200){
        var random3= JSON.parse(xhr.response)
        console.log(random3)
        showRangdom(random3)
      }else{
        console.log(`Error: ${xhr.response}`)
      }
    }
  }
  function showRangdom(random3){
    var randomImgArray= random3.message
    //DOM manipulation
    //showing random images on DOM
    var res= document.getElementById('randomDisplay')
    var row=document.createElement('div')
    row.setAttribute('class', 'row')
    
    randomImgArray.forEach(function(url){
      res.innerHTML=''
      console.log(url)
      var col= document.createElement('div')
      col.setAttribute('class', 'col-lg-4 col-md-6 col-12 text-center')
      var img= document.createElement('img')
      img.setAttribute('src', url)
      img.setAttribute('alt', 'random images')
      img.setAttribute('class', "rounded img img-thumbnail ")
      img.setAttribute('style', 'height:200px')
      col.append(img)
      row.append(col)
      res.append(row)

    })

  }
  

  // call functions
  getBreedList()