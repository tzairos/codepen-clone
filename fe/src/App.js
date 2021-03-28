import "./App.css";
import Editor from "./Editor";
import { useState, useEffect, useCallback, useRef, Fragment } from "react";
// const captureConsole = `if (typeof console  != "undefined")
// if (typeof console.log != 'undefined')
//     console.olog = console.log;
// else
//     console.olog = function() {};

// console.log = function(message) {

//     window.parent.postMessage('<p>' + message + '</p>','http://localhost:3000');
// };
// console.error = console.debug = console.info =  console.log;
// `
import axios from 'axios';
const captureConsole = `
const console = {
    log: function(m){
        window.parent.postMessage({message: m },'http://localhost:3000'); 
    }       
};
`;

const useEventListener = () => {
  const [consoleLog, setConsoleLog] = useState();
  const preVal = useRef();
  useEffect(() => {
    window.addEventListener("message", (event) => messageListener(event));
    return window.removeEventListener("message", messageListener);
  }, []);
  const messageListener = (event) => {
    // IMPORTANT: check the origin of the data!
    if (event.origin == "null") {
      //   document.getElementById("debugDiv").innerHTML +=
      //     "<p>" + event.data.message ? event.data.message : event.data + "</p>";
      if (preVal != event.data.message) {
        preVal.current = event.data.message;
        setConsoleLog(event.data.message);
      }
    }
  };
  return consoleLog;
};

// const messageListener= event => {
//         // IMPORTANT: check the origin of the data!
//             if(event.origin=="null"){
//                 document.getElementById('debugDiv').innerHTML += ('<p>' + event.data.message ? event.data.message : event.data  + '</p>') ;
//             }

//     }
function App(props) {
  //   const testFunction = useCallback( () => {
  //     if (typeof console != "undefined")
  //       if (typeof console.log != "undefined") console.olog = console.log;
  //       else console.olog = function () {};

  //     console.log = function (message) {
  //       //console.olog(message);
  //       document.getElementById("debugDiv").innerHTML += "<p>" + message + "</p>";
  //     };
  //     console.oerror=console.error;
  //     console.error = console.debug = console.info = console.log;

  //   },[]);

  //   useEffect(()=>{
  //     testFunction();
  //   },[testFunction])

  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [exerciseList,setExerciseList]=useState();


const setExerciseContent=(exercise)=>{
    setJsCode(exercise.js_text);
    setHtmlCode(exercise.html_text);
    setCssCode(exercise.css_text);
}

  const consoleLog = useEventListener();

  useEffect(async () => {
    const result = await axios(
      'exercise/',
    );
 
    result.data ? setExerciseList(result.data) : console.log('no data');
  },[]);

  useEffect(() => {
    const timeoutToChange = setTimeout(() => {
      setSrcDoc(`
    <html>
        <head><script>${captureConsole}</script></head>
      <body>${htmlCode}</body>
      <style>${cssCode}</style>
      
      <script>${`try { ${jsCode} } catch(error){window.parent.postMessage(error,'http://localhost:3000'); }`} </script>
     
    </html>`);
    }, 2000);
    return () => clearTimeout(timeoutToChange);
  }, [jsCode, cssCode, htmlCode]);

  return (
    <Fragment>
      <div className="flex flex-col mx-auto bg-blue-500 py-2 px-4 h-screen w-full ">
        <div className="flex flex-row h-70 flex-1   w-full">
          <Editor 
            language="javascript"
            displayName="Javascript"
            onChange={setJsCode}
            value={jsCode}
          ></Editor>
          <Editor 
            language="xml"
            displayName="HTML"
            onChange={setHtmlCode}
            value={htmlCode}
          ></Editor>
          <Editor 
            language="css"
            displayName="CSS"
            onChange={setCssCode}
            value={cssCode}
          ></Editor>
        </div>
        <div className="flex-1 w-full h-100 bg-gray  px-2 my-4">
          <iframe
            className="w-full h-full bg-gray-300"
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts allow-modals"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
        <div className="px-2 my-5 w-full">
          <div id="debugDiv" className=" h-20 bg-white   ">
            {consoleLog ? consoleLog.toString() : ""}
          </div>
        </div>
      </div>
      <div className={`fixed ${open? 'bottom-0':'-bottom-20'}  w-full h-20 px-6`}>
        <div className="relative ">
          <div className="absolute center bottom-0 right-5 h-10 ">
              <button className="rounded my-0 bg-blue-300 hover:bg-blue-100 hover:text-black text-white w-20 h-10" onClick={()=> setOpen(open=>setOpen(!open))}>Examples</button>
          </div>
        </div>
        <div className={`w-full h-20 bg-blue-300 my-0 flex ${open? 'visible':'hidden'} justify-center items-center text-xl `}>
            {
                exerciseList?.map((exercise)=>{
                  return  <button key={exercise.pk} onClick={()=>setExerciseContent(exercise)} className="rounded my-0 bg-blue-300 text-white hover:bg-blue-100 hover:text-black h-10 mx-4 flex-1">{exercise.name}</button>
                })
            }
        
        </div>
        
      </div>
    </Fragment>
  );
}

export default App;
