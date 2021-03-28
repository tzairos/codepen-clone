
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
//import "codemirror/addon/lint/html-lint";
// import "codemirror/addon/lint/css-lint";
// import "codemirror/addon/lint/javascript-lint";
//import "codemirror/addon/lint/lint"
//<i class="fas fa-angle-double-right"></i>
import { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight,faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
 const Editor=(props)=>{
     const [collapsed,setCollapsed]=useState(false);
    const { language, displayName, value, onChange } = props;
    const handleChange=(editor, data, value)=> {
        onChange(value);
      }
    return(
       
        <div className={`flex flex-col h-full  mx-2 ${collapsed? "flex-0" : "flex-1"}  `} style={{minWidth: '100px'}}>
          <div className="flex flex-row bg-gray-200 border  justify-between items-center   px-2 h-10 w-full">
            <p>{displayName}</p>
            <button type="button" onClick={()=>{setCollapsed(!collapsed)}} className="bg-blue-500 rounded text-white">
             <span><FontAwesomeIcon icon={collapsed? faAngleDoubleRight:faAngleDoubleLeft} /></span>
            </button>
          </div>
          <ControlledEditor 
          
            onBeforeChange={handleChange}
            value={value}
            className={`code-mirror-wrapper  h-full `}
            options={{
              lineWrapping: true,
              lint: true,
              mode: language,
              theme: "material",
              lineNumbers: true,
              
            }}
          />
        </div>
    )
}

export default Editor;