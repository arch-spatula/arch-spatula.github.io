import { describe, it, expect } from 'vitest';
import { renderTemplate, renderConditional, renderEach, render } from './templateEngine';

describe('templateEngine', () => {
  describe('renderTemplate', () => {
    it('should replace single placeholder', () => {
      const template = '<h1>{{TITLE}}</h1>';
      const data = { TITLE: 'Hello World' };
      const result = renderTemplate(template, data);

      expect(result).toBe('<h1>Hello World</h1>');
    });

    it('should replace multiple placeholders', () => {
      const template = '<title>{{TITLE}}</title><meta name="description" content="{{DESCRIPTION}}" />';
      const data = {
        TITLE: 'My Blog',
        DESCRIPTION: 'A blog about coding',
      };
      const result = renderTemplate(template, data);

      expect(result).toBe('<title>My Blog</title><meta name="description" content="A blog about coding" />');
    });

    it('should replace same placeholder multiple times', () => {
      const template = '{{NAME}} loves {{NAME}}';
      const data = { NAME: 'John' };
      const result = renderTemplate(template, data);

      expect(result).toBe('John loves John');
    });

    it('should replace undefined values with empty string', () => {
      const template = '<div>{{MISSING}}</div>';
      const data = { MISSING: undefined as unknown as string };
      const result = renderTemplate(template, data);

      expect(result).toBe('<div></div>');
    });

    it('should remove unused placeholders', () => {
      const template = '<div>{{USED}} and {{UNUSED}}</div>';
      const data = { USED: 'Hello' };
      const result = renderTemplate(template, data);

      expect(result).toBe('<div>Hello and </div>');
    });

    it('should handle empty template', () => {
      const template = '';
      const data = { TITLE: 'Test' };
      const result = renderTemplate(template, data);

      expect(result).toBe('');
    });

    it('should handle empty data', () => {
      const template = '<h1>Static Content</h1>';
      const data = {};
      const result = renderTemplate(template, data);

      expect(result).toBe('<h1>Static Content</h1>');
    });
  });

  describe('renderConditional', () => {
    it('should render content when condition is truthy', () => {
      const template = '{{#if SHOW}}<div>Visible</div>{{/if}}';
      const data = { SHOW: true };
      const result = renderConditional(template, data);

      expect(result).toBe('<div>Visible</div>');
    });

    it('should not render content when condition is falsy', () => {
      const template = '{{#if SHOW}}<div>Visible</div>{{/if}}';
      const data = { SHOW: false };
      const result = renderConditional(template, data);

      expect(result).toBe('');
    });

    it('should handle truthy string values', () => {
      const template = '{{#if TEXT}}<p>{{TEXT}}</p>{{/if}}';
      const data = { TEXT: 'Hello' };
      const result = renderConditional(template, data);

      expect(result).toBe('<p>{{TEXT}}</p>');
    });

    it('should handle empty string as falsy', () => {
      const template = '{{#if TEXT}}<p>Text</p>{{/if}}';
      const data = { TEXT: '' };
      const result = renderConditional(template, data);

      expect(result).toBe('');
    });

    it('should handle undefined as falsy', () => {
      const template = '{{#if MISSING}}<p>Text</p>{{/if}}';
      const data = {};
      const result = renderConditional(template, data);

      expect(result).toBe('');
    });

    it('should handle multiple conditions', () => {
      const template = '{{#if A}}<div>A</div>{{/if}}{{#if B}}<div>B</div>{{/if}}';
      const data = { A: true, B: false };
      const result = renderConditional(template, data);

      expect(result).toBe('<div>A</div>');
    });

    it('should handle nested HTML in condition', () => {
      const template = '{{#if SHOW}}<div><p>Nested</p><span>Content</span></div>{{/if}}';
      const data = { SHOW: true };
      const result = renderConditional(template, data);

      expect(result).toBe('<div><p>Nested</p><span>Content</span></div>');
    });

    it('should handle multiline content', () => {
      const template = `{{#if SHOW}}
<div>
  <p>Line 1</p>
  <p>Line 2</p>
</div>
{{/if}}`;
      const data = { SHOW: true };
      const result = renderConditional(template, data);

      expect(result).toContain('<p>Line 1</p>');
      expect(result).toContain('<p>Line 2</p>');
    });
  });

  describe('renderEach', () => {
    it('should render array items', () => {
      const template = '<ul>{{#each ITEMS}}<li>{{this}}</li>{{/each}}</ul>';
      const data = { ITEMS: ['Apple', 'Banana', 'Cherry'] };
      const result = renderEach(template, data);

      expect(result).toBe('<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>');
    });

    it('should handle empty array', () => {
      const template = '<ul>{{#each ITEMS}}<li>{{this}}</li>{{/each}}</ul>';
      const data = { ITEMS: [] };
      const result = renderEach(template, data);

      expect(result).toBe('<ul></ul>');
    });

    it('should handle non-array values', () => {
      const template = '<ul>{{#each ITEMS}}<li>{{this}}</li>{{/each}}</ul>';
      const data = { ITEMS: 'not an array' };
      const result = renderEach(template, data);

      expect(result).toBe('<ul></ul>');
    });

    it('should handle undefined array', () => {
      const template = '<ul>{{#each ITEMS}}<li>{{this}}</li>{{/each}}</ul>';
      const data = {};
      const result = renderEach(template, data);

      expect(result).toBe('<ul></ul>');
    });

    it('should handle numeric array items', () => {
      const template = '{{#each NUMBERS}}{{this}},{{/each}}';
      const data = { NUMBERS: [1, 2, 3] };
      const result = renderEach(template, data);

      expect(result).toBe('1,2,3,');
    });

    it('should handle single item array', () => {
      const template = '{{#each TAGS}}<span>{{this}}</span>{{/each}}';
      const data = { TAGS: ['JavaScript'] };
      const result = renderEach(template, data);

      expect(result).toBe('<span>JavaScript</span>');
    });

    it('should replace multiple {{this}} in template', () => {
      const template = '{{#each ITEMS}}<div>{{this}}: {{this}}</div>{{/each}}';
      const data = { ITEMS: ['A', 'B'] };
      const result = renderEach(template, data);

      expect(result).toBe('<div>A: A</div><div>B: B</div>');
    });

    it('should handle multiline array template', () => {
      const template = `{{#each ITEMS}}
<div class="item">
  <span>{{this}}</span>
</div>
{{/each}}`;
      const data = { ITEMS: ['First', 'Second'] };
      const result = renderEach(template, data);

      expect(result).toContain('<span>First</span>');
      expect(result).toContain('<span>Second</span>');
    });
  });

  describe('render (integrated)', () => {
    it('should handle template with all features', () => {
      const template = `
<article>
  <h1>{{TITLE}}</h1>
  {{#if DATE}}<time>{{DATE}}</time>{{/if}}
  {{#if TAGS}}
  <div class="tags">
    {{#each TAGS}}<span>{{this}}</span>{{/each}}
  </div>
  {{/if}}
  <div>{{CONTENT}}</div>
</article>
      `;

      const data = {
        TITLE: 'My Post',
        DATE: '2024-01-01',
        TAGS: ['JavaScript', 'Node.js'],
        CONTENT: 'Post content here',
      };

      const result = render(template, data);

      expect(result).toContain('<h1>My Post</h1>');
      expect(result).toContain('<time>2024-01-01</time>');
      expect(result).toContain('<span>JavaScript</span>');
      expect(result).toContain('<span>Node.js</span>');
      expect(result).toContain('<div>Post content here</div>');
    });

    it('should handle missing optional fields', () => {
      const template = `
<article>
  <h1>{{TITLE}}</h1>
  {{#if DESCRIPTION}}<p>{{DESCRIPTION}}</p>{{/if}}
  {{#if TAGS}}<div>{{#each TAGS}}{{this}}{{/each}}</div>{{/if}}
</article>
      `;

      const data = {
        TITLE: 'Simple Post',
      };

      const result = render(template, data);

      expect(result).toContain('<h1>Simple Post</h1>');
      expect(result).not.toContain('<p>');
      expect(result).not.toContain('<div>{{#each');
    });

    it('should convert array to comma-separated string for direct placeholder', () => {
      const template = '<div>Authors: {{AUTHORS}}</div>';
      const data = { AUTHORS: ['John', 'Jane', 'Bob'] };
      const result = render(template, data);

      expect(result).toBe('<div>Authors: John, Jane, Bob</div>');
    });

    it('should handle object values by stringifying', () => {
      const template = '<div>{{METADATA}}</div>';
      const data = { METADATA: { key: 'value', count: 5 } };
      const result = render(template, data);

      expect(result).toContain('{"key":"value","count":5}');
    });

    it('should handle null values', () => {
      const template = '<div>{{VALUE}}</div>';
      const data = { VALUE: null };
      const result = render(template, data);

      expect(result).toBe('<div></div>');
    });

    it('should handle number values', () => {
      const template = '<div>Count: {{COUNT}}</div>';
      const data = { COUNT: 42 };
      const result = render(template, data);

      expect(result).toBe('<div>Count: 42</div>');
    });

    it('should handle boolean values', () => {
      const template = '<div>Active: {{ACTIVE}}</div>';
      const data = { ACTIVE: true };
      const result = render(template, data);

      expect(result).toBe('<div>Active: true</div>');
    });

    it('should clean up all unused placeholders', () => {
      const template = '<div>{{USED}} {{UNUSED1}} {{UNUSED2}}</div>';
      const data = { USED: 'Hello' };
      const result = render(template, data);

      expect(result).toBe('<div>Hello  </div>');
    });

    it('should process conditions before placeholders', () => {
      const template = '{{#if SHOW}}<p>{{TEXT}}</p>{{/if}}';
      const data = { SHOW: true, TEXT: 'Visible' };
      const result = render(template, data);

      expect(result).toBe('<p>Visible</p>');
    });

    it('should process arrays before placeholders', () => {
      const template = '{{#each ITEMS}}<span>{{LABEL}}: {{this}}</span>{{/each}}';
      const data = { ITEMS: ['A', 'B'], LABEL: 'Item' };
      const result = render(template, data);

      expect(result).toContain('<span>Item: A</span>');
      expect(result).toContain('<span>Item: B</span>');
    });
  });
});
