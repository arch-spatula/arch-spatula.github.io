---
sidebar_position: 9
---

# 리액트에 유용한 라이브러리 목록

[@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/)

- 리액트 활용하기 좋은 UI 에디터입니다.

[quill](https://quilljs.com/)

- 영어권에서 많이 활용하는 텍스트 에디터입니다.

[swiper](https://swiperjs.com/)

- 캐러셀 라이브러리입니다.

[react spinners](https://www.davidhu.io/react-spinners/)

- 리액트 스피너입니다. 간단하고 유용합니다.

[react-error-boundary](https://github.com/bvaughn/react-error-boundary#readme)

- Error boundary를 설정하는 대표적인 라이브러리입니다.

## custom hook 라이브러리

[usehooks](https://usehooks.com/)

<!-- 
## TOAST UI

[TOAST UI](https://github.com/nhn/tui.editor)

- 역사와 전통의 텍스트 에디터입니다.
- 하지만 리액트는 Virtual DOM에 의존하기 때문에 안 좋습니다.
- ~~이론이지만 컴파일러를 사용하는 라이브러리와는 상태 공유는 모르겠지만 호한은 잘 될 것 같습니다.~~

## toast-ui Image

next.js에서 이미지 업로드하는 방법입니다. 역사와 전통을 너무 억지로 강요하지 말아야 합니다.

```ts
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

import { type Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { RefObject, useEffect } from 'react';
import supabase from '@/lib/supabase';
import imageCompression from 'browser-image-compression';
import { useRecoilState } from 'recoil';
import { postContent as recoilPostContent } from '@/lib/recoil';

/**
 * @TODO storage 삭제 구현 필요
 * @TODO uuid flag 꽂아야 함 >> 게시와 임시저장의 용도로 분류
 */

interface PostEditorProps {
  editorRef: RefObject<Editor>;
}

const PostEditor = ({ editorRef }: PostEditorProps) => {
  const [postContent, setPostContent] = useRecoilState(recoilPostContent);

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'], // <-- 이미지 추가 툴바
    ['code'],
    ['scrollSync'],
  ];

  useEffect(() => {
    if (editorRef.current) {
      const editorIns = editorRef.current.getInstance();
      editorIns.removeHook('addImageBlobHook');
      editorIns.addHook('addImageBlobHook', addImage);
    }
  }, []);
  // ------------- image Function ------------- // 에디터에 이미지 추가

  type HookCallback = (url: string, text?: string) => void;

  const addImage = async (blob: File, dropImage: HookCallback) => {
    const img = await compressImg(blob); // 이미지 압축
    if (!img) return;
    const url = await uploadImage(img); // 업로드된 이미지 서버 url
    if (!url) return;
    dropImage(url, `${blob.name}`); // 에디터에 이미지 추가
  };

  // 이미지 업로드

  const uploadImage = async (blob: File) => {
    try {
      const imgPath = crypto.randomUUID();
      await supabase.storage.from('post-image').upload(imgPath, blob);

      // 이미지 올리기
      const urlResult = await supabase.storage
        .from('post-image')
        .getPublicUrl(imgPath);
      return urlResult.data.publicUrl;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // //이미지 압축
  const compressImg = async (blob: File): Promise<File | void> => {
    const options = {
      maxSize: 1,
      initialQuality: 0.55, // initial 0.7
    };
    const result = await imageCompression(blob, options)
      .then((res) => res)
      .catch((e) => console.log(e, '압축 에러'));
    return result;
  };

  const handleOnEditorChange = () => {
    // 유효성 검사
    const editorText = editorRef.current?.getInstance().getMarkdown();
    if (editorText === ' ' || editorText === '' || editorText === undefined) {
      return;
    }
    // HTML 대신에 Markdown으로 저장합니다.
    setPostContent(editorText);
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={postContent ?? null}
      previewStyle="vertical"
      // previewHighlight={false}
      height="600px"
      initialEditType="markdown"
      useCommandShortcut
      toolbarItems={toolbarItems}
      language="ko-KR"
      plugins={[colorSyntax]}
      hooks={{
        // @ts-ignore
        addImageBlobHook: addImage,
      }}
      onChange={handleOnEditorChange}
    />
  );
};

export default PostEditor;
```
-->
