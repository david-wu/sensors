var editorContext = document.getElementById('editor')

function Editor(context){
    ace.edit.call(this);
}

module.exports = Editor;