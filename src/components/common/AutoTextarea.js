import { useState, useEffect, useRef } from 'react';

const AutoTextarea = props => {
  const textareaRef = useRef(null);
  const [text, setText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  useEffect(() => {
    setParentHeight(`${textareaRef.current?.scrollHeight}px`);
    setTextAreaHeight(`${textareaRef.current?.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = event => {
    setTextAreaHeight('auto');
    setParentHeight(`${textareaRef.current?.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div
      style={{
        minHeight: parentHeight,
      }}
    >
      <textarea
        {...props}
        ref={textareaRef}
        rows={1}
        style={{
          height: textAreaHeight,
        }}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default AutoTextarea;
