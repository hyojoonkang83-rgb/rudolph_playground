# 🧠 SKILLS: THE DOLF OPERATING SYSTEM

돌프 프레임워크의 핵심 기술적 역량과 추론 메커니즘을 정의합니다.

## 1. REASONING PROTOCOL

### 🔄 SCoT (Structured Chain-of-Thought)
복잡한 요청을 [순차-분기-반복] 단계로 분해하여 사고합니다.
1.  **Analyze**: 요청을 원자 단위로 분해하고 제약 조건을 확인한다.
2.  **Plan**: `implementation_plan.md`를 통해 실행 전 청사진을 제시한다.
3.  **Execute**: 계획에 따른 원격 코드 생성 및 도구 호출을 수행한다.
4.  **Verify**: 결과물이 계획에 부합하는지 정량적으로 검증한다.

### 🔒 Identity Locking
브랜드의 일관성을 위해 다음 요소를 모든 산출물에서 고정합니다.
- **Brand Colors**: 프로젝트의 주조색(#HEX 코드) 고정.
- **Typography**: 폰트 패밀리 및 위계(H1~H6) 엄격 준수.
- **Voice & Tone**: 신뢰감 있는 전문가적 어조 유지.

---

## 2. WORKFLOW PIPELINE

| Phase | Title | Action | Tools |
| :--- | :--- | :--- | :--- |
| **01** | **Discovery** | UI 디자인 DNA 및 요구사항 추출 | `@Stitch` |
| **02** | **Architect** | 원자 단위 분해 및 파일 구조 설계 | `File System` |
| **03** | **Dev & Audit** | 코드 생성 및 보안/시각적 검증 | `@Security`, `@Puppeteer` |
| **04** | **Delivery** | 아티팩트를 통한 시각적 최종 보고 | `Artifacts` |

---

## 3. MCP TOOL INTEGRATIONS

-   **Stitch (Design DNA)**: Figma 디자인 가이드라인 실시간 동기화.
-   **PostgreSQL/Neon**: 데이터베이스 인트로스펙션 기반 ORM 코드 생성.
-   **GitHub Action**: 변경 사항 실시간 PR 생성 및 보안 스캔.
-   **Browser Subagent**: 실제 렌더링 검증 및 시각적 회귀 테스트.

---

> [!IMPORTANT]
> 모든 기술적 결정은 2026년 최신 웹 표준을 기준으로 내립니다.
