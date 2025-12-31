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

    it('should render object array with properties', () => {
      const template = '{{#each USERS}}<div><h3>{{name}}</h3><p>{{email}}</p></div>{{/each}}';
      const data = {
        USERS: [
          { name: 'John', email: 'john@example.com' },
          { name: 'Jane', email: 'jane@example.com' },
        ],
      };
      const result = renderEach(template, data);

      expect(result).toContain('<h3>John</h3>');
      expect(result).toContain('<p>john@example.com</p>');
      expect(result).toContain('<h3>Jane</h3>');
      expect(result).toContain('<p>jane@example.com</p>');
    });

    it('should handle nested each loops', () => {
      const template = `{{#each POSTS}}
<article>
  <h2>{{title}}</h2>
  <ul>
    {{#each tags}}
    <li>{{this}}</li>
    {{/each}}
  </ul>
</article>
{{/each}}`;
      const data = {
        POSTS: [
          { title: 'First Post', tags: ['JavaScript', 'React'] },
          { title: 'Second Post', tags: ['TypeScript', 'Node.js'] },
        ],
      };
      const result = renderEach(template, data);

      expect(result).toContain('<h2>First Post</h2>');
      expect(result).toContain('<li>JavaScript</li>');
      expect(result).toContain('<li>React</li>');
      expect(result).toContain('<h2>Second Post</h2>');
      expect(result).toContain('<li>TypeScript</li>');
      expect(result).toContain('<li>Node.js</li>');
    });

    it('should handle empty nested arrays', () => {
      const template = `{{#each POSTS}}
<article>
  <h2>{{title}}</h2>
  <ul>
    {{#each tags}}
    <li>{{this}}</li>
    {{/each}}
  </ul>
</article>
{{/each}}`;
      const data = {
        POSTS: [
          { title: 'Post with Tags', tags: ['Tag1'] },
          { title: 'Post without Tags', tags: [] },
        ],
      };
      const result = renderEach(template, data);

      expect(result).toContain('<h2>Post with Tags</h2>');
      expect(result).toContain('<li>Tag1</li>');
      expect(result).toContain('<h2>Post without Tags</h2>');
      // 빈 배열은 아무것도 렌더링하지 않음
      expect(result.match(/<li>/g)?.length).toBe(1);
    });

    it('should handle object properties with undefined values', () => {
      const template = '{{#each ITEMS}}<div><h3>{{title}}</h3><p>{{description}}</p></div>{{/each}}';
      const data = {
        ITEMS: [
          { title: 'Has Description', description: 'Some text' },
          { title: 'No Description', description: undefined },
        ],
      };
      const result = renderEach(template, data);

      expect(result).toContain('<h3>Has Description</h3>');
      expect(result).toContain('<p>Some text</p>');
      expect(result).toContain('<h3>No Description</h3>');
      expect(result).toContain('<p></p>');
    });

    it('should leave unmatched placeholders for missing object properties', () => {
      const template = '{{#each ITEMS}}<div>{{title}}: {{missing}}</div>{{/each}}';
      const data = {
        ITEMS: [{ title: 'Test' }],
      };
      const result = renderEach(template, data);

      // renderEach는 존재하지 않는 속성의 플레이스홀더를 남겨둠
      // 이는 나중에 render 함수의 renderTemplate에서 처리됨
      expect(result).toContain('<div>Test: {{missing}}</div>');
    });

    it('should render blog post structure correctly', () => {
      const template = `<main>
  <ul>
    {{#each posts}}
    <li>
      <a href="{{filePath}}">
        <h2>{{title}}</h2>
        <p>{{description}}</p>
        <p>{{date}}</p>
      </a>
      <ul>
        {{#each tags}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
    </li>
    {{/each}}
  </ul>
</main>`;
      const data = {
        posts: [
          {
            filePath: '/2023-04-12.html',
            title: '원티드 프리온보딩 과제 - 3일차',
            description: '원티드 과제 진행과정',
            date: '2023-04-12',
            tags: ['blog', 'wanted', 'pre-on-boarding'],
          },
          {
            filePath: '/2023-04-13.html',
            title: 'Go 언어 어디에 써야 할까?',
            description: 'golang 컨프런스를 다녀왔습니다.',
            date: '2023-04-13',
            tags: ['blog', 'golang'],
          },
        ],
      };
      const result = renderEach(template, data);

      // 첫 번째 포스트 확인
      expect(result).toContain('<a href="/2023-04-12.html">');
      expect(result).toContain('<h2>원티드 프리온보딩 과제 - 3일차</h2>');
      expect(result).toContain('<p>원티드 과제 진행과정</p>');
      expect(result).toContain('<p>2023-04-12</p>');

      // 첫 번째 포스트의 태그 확인
      expect(result).toContain('<li>blog</li>');
      expect(result).toContain('<li>wanted</li>');
      expect(result).toContain('<li>pre-on-boarding</li>');

      // 두 번째 포스트 확인
      expect(result).toContain('<a href="/2023-04-13.html">');
      expect(result).toContain('<h2>Go 언어 어디에 써야 할까?</h2>');
      expect(result).toContain('<p>golang 컨프런스를 다녀왔습니다.</p>');
      expect(result).toContain('<li>golang</li>');
    });

    it('should handle array property rendering with join', () => {
      const template = '{{#each POSTS}}<div>Authors: {{authors}}</div>{{/each}}';
      const data = {
        POSTS: [{ authors: ['John', 'Jane'] }, { authors: ['Bob'] }],
      };
      const result = renderEach(template, data);

      expect(result).toContain('<div>Authors: John, Jane</div>');
      expect(result).toContain('<div>Authors: Bob</div>');
    });

    it('should handle deeply nested each loops', () => {
      const template = `{{#each CATEGORIES}}
<section>
  <h2>{{name}}</h2>
  {{#each posts}}
  <article>
    <h3>{{title}}</h3>
    <ul>
      {{#each tags}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
  </article>
  {{/each}}
</section>
{{/each}}`;
      const data = {
        CATEGORIES: [
          {
            name: 'Tech',
            posts: [
              {
                title: 'Post 1',
                tags: ['JavaScript'],
              },
            ],
          },
        ],
      };
      const result = renderEach(template, data);

      expect(result).toContain('<h2>Tech</h2>');
      expect(result).toContain('<h3>Post 1</h3>');
      expect(result).toContain('<li>JavaScript</li>');
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

    it('should handle missing object properties by removing placeholders', () => {
      const template = '{{#each ITEMS}}<div>{{title}}: {{description}}</div>{{/each}}';
      const data = {
        ITEMS: [{ title: 'First' }, { title: 'Second', description: 'Has description' }],
      };
      const result = render(template, data);

      // render 함수는 최종적으로 미처리된 플레이스홀더를 제거함
      expect(result).toContain('<div>First: </div>');
      expect(result).toContain('<div>Second: Has description</div>');
    });

    it('should render complete blog post list with nested tags', () => {
      const template = `<main>
  <ul>
    {{#each posts}}
    <li>
      <a href="{{filePath}}">
        <h2>{{title}}</h2>
        <p>{{description}}</p>
        <p>{{date}}</p>
      </a>
      <ul>
        {{#each tags}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
    </li>
    {{/each}}
  </ul>
</main>`;
      const data = {
        posts: [
          {
            filePath: '/post1.html',
            title: 'First Post',
            description: 'Description 1',
            date: '2024-01-01',
            tags: ['tag1', 'tag2'],
          },
          {
            filePath: '/post2.html',
            title: 'Second Post',
            description: 'Description 2',
            date: '2024-01-02',
            tags: ['tag3'],
          },
        ],
      };
      const result = render(template, data);

      // 포스트 확인
      expect(result).toContain('<a href="/post1.html">');
      expect(result).toContain('<h2>First Post</h2>');
      expect(result).toContain('<p>Description 1</p>');
      expect(result).toContain('<p>2024-01-01</p>');

      // 태그 확인
      expect(result).toContain('<li>tag1</li>');
      expect(result).toContain('<li>tag2</li>');
      expect(result).toContain('<li>tag3</li>');

      // 두 번째 포스트 확인
      expect(result).toContain('<a href="/post2.html">');
      expect(result).toContain('<h2>Second Post</h2>');
    });

    it('should handle posts with empty tags array', () => {
      const template = `{{#each posts}}
<article>
  <h2>{{title}}</h2>
  <ul>
    {{#each tags}}
    <li>{{this}}</li>
    {{/each}}
  </ul>
</article>
{{/each}}`;
      const data = {
        posts: [
          { title: 'Post 1', tags: ['tag1'] },
          { title: 'Post 2', tags: [] },
          { title: 'Post 3', tags: ['tag2', 'tag3'] },
        ],
      };
      const result = render(template, data);

      expect(result).toContain('<h2>Post 1</h2>');
      expect(result).toContain('<li>tag1</li>');
      expect(result).toContain('<h2>Post 2</h2>');
      expect(result).toContain('<h2>Post 3</h2>');
      expect(result).toContain('<li>tag2</li>');
      expect(result).toContain('<li>tag3</li>');

      // tag1, tag2, tag3만 있어야 함 (총 3개)
      const tagMatches = result.match(/<li>tag\d<\/li>/g);
      expect(tagMatches).toHaveLength(3);
    });

    it('should handle three levels of nesting', () => {
      const template = `{{#each categories}}
<section>
  <h2>{{name}}</h2>
  {{#each posts}}
  <article>
    <h3>{{title}}</h3>
    <ul>
      {{#each tags}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
  </article>
  {{/each}}
</section>
{{/each}}`;
      const data = {
        categories: [
          {
            name: 'Tech',
            posts: [
              { title: 'Post 1', tags: ['js', 'ts'] },
              { title: 'Post 2', tags: ['go'] },
            ],
          },
          {
            name: 'Life',
            posts: [{ title: 'Post 3', tags: ['blog'] }],
          },
        ],
      };
      const result = render(template, data);

      expect(result).toContain('<h2>Tech</h2>');
      expect(result).toContain('<h3>Post 1</h3>');
      expect(result).toContain('<li>js</li>');
      expect(result).toContain('<li>ts</li>');
      expect(result).toContain('<h3>Post 2</h3>');
      expect(result).toContain('<li>go</li>');
      expect(result).toContain('<h2>Life</h2>');
      expect(result).toContain('<h3>Post 3</h3>');
      expect(result).toContain('<li>blog</li>');
    });
  });

  describe('render with escaped template syntax', () => {
    it('should not process escaped template syntax', () => {
      // 마크다운에서 변환된 HTML은 {{ }}가 HTML 엔티티로 이스케이프됨
      const template =
        '<p>Normal {{VAR}}</p><code>&#123;&#123;#each items&#125;&#125;&#123;&#123;this&#125;&#125;&#123;&#123;/each&#125;&#125;</code>';
      const data = { VAR: 'value' };
      const result = render(template, data);

      // 일반 템플릿은 처리되고, 이스케이프된 것은 그대로 유지
      expect(result).toContain('<p>Normal value</p>');
      expect(result).toContain('&#123;&#123;#each items&#125;&#125;');
    });

    it('should process real templates but ignore escaped ones', () => {
      const template = `{{#each items}}<span>{{this}}</span>{{/each}}<code>&#123;&#123;#each items&#125;&#125;&#123;&#123;this&#125;&#125;&#123;&#123;/each&#125;&#125;</code>`;
      const data = { items: ['A', 'B'] };
      const result = render(template, data);

      expect(result).toContain('<span>A</span><span>B</span>');
      expect(result).toContain('&#123;&#123;#each items&#125;&#125;');
    });
  });
});
