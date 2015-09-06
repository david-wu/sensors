var editorContext = document.getElementById('editor')

function Editor(context){

    ace.edit.call(this);
}

// Editor.prototype = Object.create(ace.edit);
// debugger;
// var editor = ace.edit(editorContext)
// editor.setTheme('ace/theme/twilight');

// editor.getSession()
//     .setMode('ace/mode/javascript');

// setInterval(function(){
//     console.log(editor.getValue());
// },5000)

module.exports = Editor;