import React, { useState } from 'react'
import { 
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar
  } from 'react-simple-wysiwyg';

const RichText = ({handleChange}) => {
    const [value,setValue]=useState();
    function inputChange(e){
      setValue(e.target.value);
      handleChange('problemDesscription', e.target.value);
    }
  return (
    <EditorProvider>
      <Editor value={value} onChange={inputChange}>
        <Toolbar>
       
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
       
      </Editor>
    </EditorProvider>
  )
}

export default RichText
