import React, { useState } from 'react';
import { render, fireEvent, cleanup, prettyDOM, wait } from 'react-testing-library';
import userEvent from 'user-event';
import browserEnv from 'browser-env';

browserEnv();

const TextArea = function () {
  const [postText, setPostText] = useState('');
  console.log(`TextArea render. PostType: '${postText}'`);

  return (
    <textarea
      placeholder='Write post...'
      value={postText}
      onChange={event => setPostText(event.target.value)}
    />
  );
};




// 1

let root = render(<TextArea />);
let textarea = root.getByPlaceholderText('Write post...');
userEvent.click(textarea);
userEvent.type(textarea, 'Hello world!');

console.log('textarea after first input:\n', prettyDOM(textarea));
root.getByText('Hello world!');
cleanup();

console.log('----- PASSED TEST ONE -----\n\n\n\n');



// 2

root = render(<TextArea />);
textarea = root.getByPlaceholderText('Write post...');
userEvent.click(textarea);
userEvent.type(textarea, 'Hello world!'); // no re-renders, no updated value

console.log('textarea after second input:\n', prettyDOM(textarea));
root.getByText('Hello world!'); // fails
cleanup();

console.log('----- PASSED TEST TWO ------');
