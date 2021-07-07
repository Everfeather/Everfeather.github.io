//photo dump js june - 2021
class image {
    /**
     * @param {String} imageLink 
     * @param {String[]} tags 
     */
    constructor(imageLink, tags) {
        this.imageLink = imageLink;
        this.tags = tags;
    }
    /**
     * @return {String};
     */
    get getLink(){
        return this.imageLink;
    }
    /**
     * @return {String[]}
     */
    get tagList(){
        return this.tags;
    }
}

class node {
    /**
     * 
     * @param {image} data
     */
    constructor(data){
        this.data = data;
        this.next = null;
        this.last = null;
        this.isVisable = true;
    }
    /**
     * @param {node} node ;
     */
    set nextNode(node){
        this.next = node;
    }

    /**
     * @param {boolean} visablility
     */
    set visable(visablility){
        this.isVisable = visablility;
    }

    /**
     * @param {node} node;
     */
    set lastNode(node){
        this.last = node;
    }
    get getData(){
      return this.data;
    }
    printData(){
      console.log(this.data);
    }

}
class cdll {
    constructor(){
        this.head = null;
        this.size = 0;
        this.selectNode = null;
    }
    
    get getSelectNode(){
        return this.selectNode;
    }
    set setSelectNode(node){
        this.selectNode = node;
    }
    /**
     * 
     * @param {Boolean} tagBool 
     */
    increaseSelect(){
        this.setSelectNode = this.selectNode.next;
        while(!this.selectNode.isVisable){
            this.selectNode = this.selectNode.next
        }
    }
            
    
    
    decreaseSelect(){
        this.selectNode = this.selectNode.last;
        while(!this.selectNode.isVisable){
            this.selectNode = this.selectNode.last;
        }
    }
    
    append(data) {
        let newNode = new node(data);
        let head = this.head;
        if(this.size === 0){
          
            newNode.nextNode = newNode;
            newNode.lastNode = newNode;
            this.head = newNode;
            this.setSelectNode = this.head;

        }else{
          //console.log(typeof this.head.last);
            let prevNode = this.head.last;
            prevNode.nextNode = newNode;
            newNode.nextNode = this.head;
            newNode.lastNode = prevNode;
            this.head.lastNode = newNode;
            }
        
        this.size++;  
    }
    //functions starting here are image specific, maybe later I'll seperate the classes and make an imageCircleDoubleLinkList that inheirits from this class so code is more reusable (:.
    /**
     * 
     * @param {String} tagString 
     */
    sortByTag(tagString){
        let tags = tagString.split(",");
        
        let curNode = this.head;
        for(let i = 0; i < this.size; i++){
            curNode.visable = true;
            curNode = curNode.next;
            }
        curNode = this.head;
        if(this.hasTag(tagString)){
            
            for(let i = 0; i < this.size; i++){
                let hasTag = false;
                for(let j = 0; j < tags.length; j++){
                    if(curNode.getData.tagList.includes(tags[j])){
                        hasTag = true;
                        break;
                    }
                }
                if(hasTag === false){
                    curNode.visable = false;
                }
                curNode = curNode.next;
            }
        }
    }

    hasTag(tagString){
        let tags = tagString.split(",");
        
        let curNode = this.head;
        if(tags.length != 0){
            
            for(let i = 0; i < this.size; i++){
                for(let j = 0; j < tags.length; j++){
                    if(curNode.getData.tagList.includes(tags[j])){
                        return true;
                    }
                }
                curNode = curNode.next;
            }
        }
        return false;
    }
    printTest(){
        let curNode = this.head;
        console.log("checking forwards");
        for(let i = 0; i < this.size; i++){
            curNode.printData();
            curNode = curNode.next;
        }
        console.log("checking backwards");
        curNode = this.head;
        for(let j = 0; j < this.size; j++){
            curNode.printData();
            curNode = curNode.last;
        }
    }
}
const link = new cdll();
const img_1 = new image("cat_sneeze.jpg",["cat","animal","winston"]);
const img_2 = new image("colluseam.jpg",["rome","building","history","italy"]);
const img_3 = new image("pompaii.jpg",["italy","history","building","ruin"]);
const img_4 = new image("purple_flower.jpg",["flower","nature","pretty"]);
const img_5 = new image("shadow.jpg",["cat","cute","shadow","animal"]);
const img_6 = new image("tree_mushroom.jpg",["nature","mushroom","tree"]);
const img_7 = new image("white_flower.jpg",["flower","nature","pretty"]);
    //const imageArray = [firstImage,secondImage,thirdImage];
    let listOfTags = ["animal","mushroom","tree","nature","flower","pretty","cute","shadow","cat","building","ruin","history","italy","rome","winston"];    
    link.append(img_1);
    link.append(img_2);
    link.append(img_3);
    link.append(img_4);
    link.append(img_5);
    link.append(img_6);
    link.append(img_7);
function onLoad(){
    document.getElementById("item3").style.backgroundImage = 'url('+ link.getSelectNode.getData.getLink +')';
    
}

function buttonIncrease(){
    link.increaseSelect();
    if(link.getSelectNode.isVisable){
        document.getElementById("item3").style.backgroundImage = 'url('+ link.getSelectNode.getData.getLink +')';
    }
}

function buttonDecrease(){
    link.decreaseSelect();
    if(link.getSelectNode.isVisable){
        document.getElementById("item3").style.backgroundImage = 'url('+ link.getSelectNode.getData.getLink +')';
    }
}
/**
 * 
 * @param {String} tags 
 */
function searchTags(){
    let tags = document.getElementById("searchbar").value;
    link.sortByTag(tags);
    if(!link.getSelectNode.isVisable){
        while(!link.selectNode.isVisable){
            link.setSelectNode = link.selectNode.next;
            
        }
    }
    document.getElementById("item3").style.backgroundImage = 'url('+ link.getSelectNode.getData.getLink +')';    
}

let validChar = "abcdefghijklmnopqrstuvwxyz";
setInterval(() => {
    let word = listOfTags[Math.floor(Math.random() * listOfTags.length)];
    document.getElementById("suggestTags").innerHTML = "try searching " + word;
}, 1000);
//testing stub
/*
link.printTest();
console.log("Print Test Complete");

console.log(link.selectedNode());
link.increaseSelect();
console.log(link.selectedNode());
link.increaseSelect();
console.log(link.selectedNode());
console.log("Selected Node Test Complete");
*/