---
sidebar_position: 4
tags: ['docker', 'security']
draft: true
toc_max_heading_level: 6
---

# Docker 보안

docker는 보안의 만능 해결책이 아닙니다. 먼저 docker 자체도 취약합니다. docker image 87%가 클라우드 리서치팀에서 취약하다고 보고 했습니다.

docker 이미지를 직접 만들어도 한계가 있습니다. docker는 격리만 해줄 뿐입니다. 멀웨어 실행파일의 활동 범위를 제한할 수 있어도 완전히 차단한 것은 아닙니다. 또 설치 중에 결국에는 `.env`를 탈취하려는 스크립트를 실행합니다. 기계에 발생할 수 있는 취약점만 줄여줄 뿐입니다.

패키지를 받는 방식에 따라 다릅니다. golang은 패키지를 root 디렉토리에 받습니다. 그렇기 때문에 실행하면 위험이 많습니다. deno도 이와 비슷한 정책입니다.

<iframe class="codepen" src="https://www.youtube.com/embed/1PBXB3RcDLs" title="What's really inside your docker containers?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
