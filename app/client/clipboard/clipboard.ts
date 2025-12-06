/**
 * @see https://stackoverflow.com/questions/6838104/pure-javascript-method-to-wrap-content-in-a-div
 */
const wrap = (el: Element, wrapper: Element) => {
  if (el.parentNode) el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
};
/**
 * 기능 자체는 동작함
 * TODO: 아이콘이 붙게 만들어야 함.
 */
const addBtn = (id: string) => {
  const docContent = document.getElementById(id);
  const preElements = docContent?.querySelectorAll('pre');

  preElements?.forEach((preElement) => {
    const codeblockWrapper = document.createElement('div');
    codeblockWrapper.classList.add('code-block-wraper');

    wrap(preElement, codeblockWrapper);

    const childDiv = preElement.querySelector('div');
    if (childDiv) return;

    const button = document.createElement('button');
    button.classList.add('copy-btn');
    button.classList.add('btn');
    button.ariaLabel = 'copy button';

    button.addEventListener('click', () => {
      button.classList.replace('copy-btn', 'clicked-copy-btn');

      const content = preElement.textContent ?? '';
      navigator.clipboard.writeText(content);

      // reset to old copyIcon after 1s
      setTimeout(() => button.classList.replace('clicked-copy-btn', 'copy-btn'), 2000);
    });

    const warrper = document.createElement('div');
    warrper.classList.add('copy-warrper');

    warrper.appendChild(button);
    codeblockWrapper.appendChild(warrper);
  });
};

const clipboard = () => {
  addBtn('content');
};

export default clipboard;
