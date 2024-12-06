import { fireEvent, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './CircleCIChallenge.html'), 'utf8');

let dom;
let container;

describe('CircleCIChallenge.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('renders a heading element', () => {
    expect(container.querySelector('h1')).not.toBeNull();
    expect(getByText(container, 'CircleCI Tech Challenge')).toBeInTheDocument();
  });

  it('renders a button element', () => {
    expect(container.querySelector('button')).not.toBeNull();
    expect(getByText(container, 'Click me!')).toBeInTheDocument();
  });

  it('renders a line of text via JavaScript when the button is clicked', () => {
    const button = getByText(container, 'Click me!');
    fireEvent.click(button);

    const generatedParagraphs = container.querySelectorAll('#button-reply');
    expect(generatedParagraphs.length).toBe(1);
  });
});