
//to get the whole app tag from the web
const notesContainer=document.querySelector(".app");


//to get the add button tag from the web
const addNoteButton=notesContainer.querySelector(".add-note");

//code for rendering the elements in order in web page
//note is object which has id and content
getNotes().forEach(note=>
                   {
  //storing the element in the HTML tag vales in noteElement
  const noteElement=createNotesElement(note.id,note.content);
  notesContainer.insertBefore(noteElement,addNoteButton);
  
})

//for getting data from the localstorage
function getNotes()
{
    
    //it will return the string of empty array if the data is not
    //available in the local storage
    return JSON.parse(localStorage.getItem("sticky-notes")||"[]");
    
    
}

//code for the click listner function in the UI
addNoteButton.addEventListener("click",()=>addNotes())

//to save new in the data client browser local storage
function saveNotes(notes)
{
    //it will ssave the data in the local storage 
    localStorage.setItem("sticky-notes",JSON.stringify(notes));
    
}



//to create a new element(such as textarea element) which is going to add as the new note on the webpage
function createNotesElement(id,content)
{
    //creating new textarea element 
    const element=document.createElement("textarea");
    
    element.classList.add("note");
    element.value=content;
    element.placeholder="empty sticky note";
  
    element.addEventListener("change",()=>
                         {
      console.log("content");
      updateNotes(id,element.value);
    })
  element.addEventListener("dblclick",()=>
                      {
    const doDelete=confirm("Are sure do you want to delete the note");
    if(doDelete==true)
      {
        deleteNotes(id,element);
      }
  })
  
  return element;
    
}



//it is used to add element in the html but also to save it in the local server
function addNotes()
{
  //getting notes from the local storage
    const notes=getNotes();
  //creating the random id number and empty string for the content
  const noteObject={
      id:Math.floor(Math.random() * 1000),
      content:" "};
  //created the new white space element 
  console.log("id: "+noteObject.id+" "+"content: "+typeof noteObject.content);
  const noteElement=createNotesElement(noteObject.id,noteObject.content);
  //added the new white box before the add button
  notesContainer.insertBefore(noteElement,addNoteButton);
  //pushing the new data into the array of objects
  notes.push(noteObject);
  //saving the new localstorage data
  saveNotes(notes);
}

//delete the data from the database and Html
function deleteNotes(id,element)
{
    const notes=getNotes().filter(note=>note.id!=id);
    saveNotes(notes);
    notesContainer.removeChild(element);
    console.log(" notes deleted");
    
//  console.log(id,element);
}

//it is used to update the note instead of creating a new note
function updateNotes(id,newContent)
{
  //getting data from local storage
  const notes=getNotes();
  //selecting the target noted that needs to be update
  const targetNote=notes.filter(note=>note.id==id)[0];
  targetNote.content=newContent;
  saveNotes(notes);
  //console.log(newContent);
 // console.log("notes updated");
 // console.log(id,newContent);
}
