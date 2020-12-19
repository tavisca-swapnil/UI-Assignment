window.onload = function(){

    let leftNotesCount = 0;
    let midNotesCount = 0;
    let rightNotesCount = 0;

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
            likes.className += "likesCounter";
            likes.innerText = "+0";

            note.appendChild(content);
            note.appendChild(likes);

            document.getElementById(section).appendChild(note);
        }

    }

    document.addEventListener("click", function(event) 
        {
            if (hasClass(event.target, 'left')) {
                openNote(event, "left");
            }
            else if (hasClass(event.target, 'mid')) {
                openNote(event, "mid");
            }
            else if(hasClass(event.target, 'right')) {
                openNote(event, "right");
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

        note.className += id;
    }

}