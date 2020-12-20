window.onload = function(){

    let leftNotesCount = 0;
    let midNotesCount = 0;
    let rightNotesCount = 0;
    let openNoteId = "";
    let notes = [{}];

    document.getElementById("addLeft").addEventListener("click", function() {addNote("left")});

    document.getElementById("addMid").addEventListener("click", function() {addNote("mid")});

    document.getElementById("addRight").addEventListener("click", function() {addNote("right")});

    function addNote(position)
    {
        var lastNoteLeft = document.getElementById("leftSection").lastElementChild;
        var lastNoteMid = document.getElementById("midSection").lastElementChild;
        var lastNoteRight = document.getElementById("rightSection").lastElementChild;

        if(lastNoteLeft!= null && lastNoteLeft.firstChild.innerHTML=="")
        {
            document.getElementById(lastNoteLeft.id).remove();
            leftNotesCount--;
        }

        if(lastNoteMid != null && lastNoteMid.firstChild.innerHTML=="")
        {
            document.getElementById(lastNoteMid.id).remove();
            midNotesCount--;
        }

        if(lastNoteRight != null && lastNoteRight.firstChild.innerHTML=="")
        {
            document.getElementById(lastNoteRight.id).remove();
            rightNotesCount--;
        }

        var section = position + "Section";
        var lastNote = document.getElementById(section).lastElementChild;

        if(lastNote == null || lastNote.firstChild.innerHTML!="")
        {
            let count = 0;            
            if(position == "left")
            {
                leftNotesCount++;
                count = leftNotesCount;
            }
            else if(position == "mid")
            {
                midNotesCount++;
                count = midNotesCount;
            }
            else
            {
                rightNotesCount++;
                count = rightNotesCount;
            }

            var note = document.createElement("DIV");
            note.className += "note-item ";
            note.className += position;
            note.id = position + "_" + count;

            var content = document.createElement("P");
            content.className += "note";

            var likes = document.createElement("P");
            likes.className += "likesCounter ";
            likes.innerText = "+0";

            note.appendChild(content);
            note.appendChild(likes);

            document.getElementById(section).appendChild(note);
        }

    }

    document.addEventListener("click", function(event) 
        {
            if (hasClass(event.target, 'left')) {
                openNote(event, "leftOpenNote");
            }
            else if (hasClass(event.target, 'mid')) {
                openNote(event, "midOpenNote");
            }
            else if(hasClass(event.target, 'right')) {
                openNote(event, "rightOpenNote");
            }
        });

    function hasClass(element, className) {
        return element.className.split(' ').indexOf(className) > -1;
    }

    function openNote(event, id)
    {
        let note = document.getElementById("openNote");
        let blur = document.getElementById("blur");

        note.style.display = "block";
        blur.style.display = "block";

        note.className += id + " ";
        openNoteId = event.target.id;

        let openNoteObject = notes.find(x => x.id == openNoteId);
        if(openNoteObject == undefined)
        {
            let newNote = {
                id : openNoteId,
                likes : 0,
                content : "",
                dateCreated : new Date()
            }
            openNoteObject = newNote;
            notes.push(newNote);
        }
        let contentArea = document.getElementById("openNoteContent");
        contentArea.value = openNoteObject.content;
        contentArea.autofocus = true;

        let openLike = document.getElementById("openNoteLike");
        openLike.innerText = "+" + openNoteObject.likes;
    }

    document.getElementById("close").addEventListener("click", function() {closeNote()});

    function closeNote()
    {
        let note = document.getElementById("openNote");
        let blur = document.getElementById("blur");

        note.style.display = "none";
        blur.style.display = "none";

        note.className = "";

        let openNoteContentObject = notes.find(x => x.id == openNoteId);
        let contentArea = document.getElementById("openNoteContent");
        openNoteContentObject.content = contentArea.value;

        let openNote = document.getElementById(openNoteId);
        openNote.firstElementChild.innerText = contentArea.value;
        openNote.lastElementChild.innerText = "+" + openNoteContentObject.likes;
    }

    document.getElementById("like").addEventListener("click", function() {incrementLikeCount()});

    function incrementLikeCount()
    {
        let openNoteContentObject = notes.find(x => x.id == openNoteId);
        openNoteContentObject.likes++;

        let openLike = document.getElementById("openNoteLike");
        openLike.innerText = "+" + openNoteContentObject.likes;

        let openNote = document.getElementById(openNoteId);
        openNote.lastElementChild.innerText = "+" + openNoteContentObject.likes;
    }

    document.getElementById("delete").addEventListener("click", function() {deleteNote()});

    function deleteNote()
    {
        notes = notes.filter(note => note.id != openNoteId);
        document.getElementById(openNoteId).remove();

        let note = document.getElementById("openNote");
        let blur = document.getElementById("blur");

        note.style.display = "none";
        blur.style.display = "none";

        note.className = "";
    }

    document.getElementById("blur").addEventListener("click", function() {closeNote()});

    document.getElementById("filter").addEventListener("input", function(event) {filter(event)});

    function filter(event)
    {
        let input = event.target.value;
        let allNotes = document.getElementsByClassName("note");

        Array.from(allNotes).forEach(element => {
            if(!element.innerText.includes(input))
            {
                element.parentElement.style.display = "none";
            }
            if(input == "")
            {
                element.parentElement.style.display = "block";
            }
        });
    }

    document.getElementById("sections").addEventListener("change", function(event) {selectSection(event)});

    function selectSection(event)
    {
        let input = event.target.value;
        let left = document.getElementById("leftSection");
        let mid = document.getElementById("midSection");
        let right = document.getElementById("rightSection");
        
        if(input == "1")
        {
            left.style.display = "";
            mid.style.display = "none";
            right.style.display = "none";
        }
        else if(input == "2")
        {
            left.style.display = "none";
            mid.style.display = "";
            right.style.display = "none";
        }
        else if(input == "3")
        {
            left.style.display = "none";
            mid.style.display = "none";
            right.style.display = "";
        }
        else
        {
            left.style.display = "";
            mid.style.display = "";
            right.style.display = "";
        }
    }
}