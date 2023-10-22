import React, { useState, useEffect } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import './components.css';

const Editor = (props) => {
  // id is used to distinguish between the editors , to store and retrieve data from local storage , so that data remains intact 
  //upon refreshing the page
  const { id, displayName, language, value, onChange } = props;

  //I have used isLocked state to regulate --isLocked class which sets pointer-events to none whenever it is clicked 
  //we can toggle between the states making text editable/ non editable.
  const [isLocked, setIsLocked] = useState(false); 

  //I have used copied state to regulate --isCopied class 
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(`editorCode-${id}`);
    if (storedValue !== null && storedValue !== undefined) {
      onChange(storedValue);
    }
  }, [id, onChange]);

  const handleChange = (editor, data, newValue) => {
    if (!isLocked) {
      setCopied(false);
      onChange(newValue);
      localStorage.setItem(`editorCode-${id}`, newValue);
    }
  };

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };
 
  const handleCopy = () => {
    const textValue = value;
    const tempArea = document.createElement('textarea');
    tempArea.value = textValue;

    document.body.appendChild(tempArea);

    tempArea.select();

    //I am using document.execCommand('copy') command along with creating a temporary textArea , which is widely accepted method to copy
    //to clipboard , as clipboard api is not supported by some browsers.
    document.execCommand('copy'); 

    document.body.removeChild(tempArea);
    setCopied(true);
  };

  const editorAreaClassName = `editor__area ${isLocked ? '--isLocked' : ''}`;
  const copyBtnClassName = `editor__actions__ele editor__actions__btn btn ${
    copied ? '--isCopied' : ''
  }`;

  return (
    <>
      <div className="editor">
        <div className="editor__actions">
          <div className="editor__actions__ele editor__actions__title">{displayName}</div>
          <button className={copyBtnClassName} onClick={handleCopy}>
            {copied ? 'copied' : 'copy'}
          </button>
          <button
            className="editor__actions__ele editor__actions__btn btn"
            onClick={handleToggleLock}
          >
            {isLocked ? 'Unlock' : 'Lock'}
          </button>
        </div>
        <div className={editorAreaClassName}>
          <ControlledEditor
            onBeforeChange={handleChange}
            value={value}
            className="main-editor"
            options={{
              lineWrapping: true,
              lint: true,
              mode: language,
              lineNumbers: true,
              theme: 'material',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Editor;
