document.querySelector(".control-buttons span").onclick = function(){

    let yourName =prompt("Whats Your Name?");

    if (yourName == null || yourName ==""){

        document.querySelector(".name span").innerHTML='Unknown';
    }else{
        document.querySelector(".name span").innerHTML= yourName;
    }
    document.querySelector(".control-buttons").remove();
};
//effect duration
let duration =1000;

//select blocks container 
let blockscontainer = document.querySelector('.memory-block');

//create array for game block
let blocks = Array.from(blockscontainer.children);

//range of keys
let orderRange = [...Array(blocks.length).keys()]; // (array from + code)

shuffle(orderRange);

//add order css to game block
blocks.forEach((block,index)=>{

    block.style.order = orderRange[index];

//add click event
block.addEventListener('click', function() {

    //trigger flip function
    flipblock(block);
});

});
//shuffle function (random)
function shuffle (array){
   
    //setting var
    let current =array.length,
        temp,
        random;
  while(current > 0){
    
    //get random number
    random = Math.floor(Math.random() * current)

    //decrease length by one
    current--;

    //save current element in stash (box)
    temp= array[current]

    //currentelement = randomelement
    array[current] = array[random]
    
    //randomelement = get element from stash
    array[random]= temp
  }      
  return array;
}
//flip block function
function flipblock (selectedBlock){

    //add class fliped
    selectedBlock.classList.add('is-flipped');
    //collect all flipped cards
   let allflipblocks = blocks.filter(flipblock => flipblock.classList.contains('is-flipped')); 

   //if there two selected blocks
   if(allflipblocks.length === 2){

    //stop click funcation
    stopclicking();


    //check matched block function
    matchedblock(allflipblocks[0],allflipblocks[1]);
   }
}
//stop click funcation
function stopclicking(){

// add class no click on main contianer
blockscontainer.classList.add('no-clicking');
   
setTimeout(() =>{

    //remove class no clicking after duration
    blockscontainer.classList.remove('no-clicking')
  }, duration);
}
//check matched block function
function matchedblock(firstblock , secondblock){
let triesElement = document.querySelector('.try span')
if (firstblock.dataset.technology === secondblock.dataset.technology){
 
    firstblock.classList.remove('is-flipped');
    secondblock.classList.remove('is-flipped');

    firstblock.classList.add('has-match');
    secondblock.classList.add('has-match');

    document.getElementById('success').play();

}else{
triesElement.innerHTML=parseInt(triesElement.innerHTML) + 1;

   setTimeout(()=>{

    firstblock.classList.remove('is-flipped');
    secondblock.classList.remove('is-flipped');
   
},duration);
   document.getElementById('fail').play();
}
}