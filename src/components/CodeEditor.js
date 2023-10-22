import React , {useState} from "react";
import Editor from "./Editor";
import './components.css';


const CodeEditor = () => {

const [html , setHtml] = useState('');
const [css , setCSS] = useState('');
const [js , setJs] = useState('');

//srcDoc constructed for rendering the output of written code - combining all three files
const srcDoc = 
`
<html>${html}</html>
<style>${css}</style>
<script>${js}</script>
`

// I have used codemirror library to implement my editor , although it can be done with simple textArea , but codemirror adds needed
//formatting and increases readability.
   return (
      <div className="container">
    <div className="container__codeEditor">
        <Editor 
        id='1'
         language="xml"
         displayName="HTML" 
         value={html} 
         onChange={setHtml}  />
        <Editor
        id='2'
         language="css"
         displayName="CSS" 
         value={css} 
         onChange={setCSS}             
        />
        <Editor
        id='3'
         language="javaScript"
         displayName="javaScript" 
         value={js} 
         onChange={setJs}              
        />
    </div>
    <div className="container__output">
      <h3>Output</h3>
        <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
        />
    </div>        
      </div>
   )
}

export default CodeEditor;