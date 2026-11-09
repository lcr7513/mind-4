import { MindMapNode, SubjectCategory, SubjectInquiryTopic } from '../types';

export interface ComprehensiveSubjectPlan {
  subject: string;
  subjectCategory: SubjectCategory;
  curriculumConcept: string;
  topic: string;
  inquiryQuestion: string;
  connectionRationale: string;
  methodology: string;
  recommendedTools: string[];
  readingRecommendation: string;
  recordTip: string;
  draftRecordSnippet: string;
  concreteSteps: {
    stepNum: number;
    stepName: string;
    focus: string;
    protocol: string;
    tools: string[];
  }[];
}

export interface ComprehensiveCurriculumResult {
  majorOverview: string;
  connectionSummary: string;
  subjects: ComprehensiveSubjectPlan[];
  mindmap: MindMapNode;
}

// Domain detection helper
export function detectDomainProfiles(text: string) {
  const lower = text.toLowerCase();

  return {
    isBio: /생명|바이오|유전자|crispr|크리스퍼|의약|단백질|세포|의예|약학|간호|면역|치료|dna|rna|질환|뇌|신경|효소/i.test(lower),
    isAi: /ai|인공지능|컴퓨터|소프트웨어|알고리즘|머신러닝|딥러닝|빅데이터|코딩|데이터|언어모델|llm|트랜스포머|로봇/i.test(lower),
    isBatteryOrSemiconductor: /배터리|이차전지|전고체|반도체|리소그래피|양자|소재|신소재|나노|물성|회로|집적/i.test(lower),
    isEnvOrClimate: /환경|기후|탄소|생태|신재생|esg|지구|오염|미세플라스틱|배출권|피구세|해양|대기|생물다양성/i.test(lower),
    isEconOrBiz: /경제|경영|금융|시장|핀테크|무역|소비자|가격|게임이론|행동경제|넛지|화폐|인플레이션|주식|투자/i.test(lower),
    isLawOrPolitics: /법|정치|사회|정의|윤리|인권|헌법|규제|공공|거버넌스|민주주의|복지|행정|조례|롤스/i.test(lower),
    isPhysicsOrAero: /물리|우주|항공|역학|전자기|광학|상대성|유체|열역학|인공위성|발사체/i.test(lower),
    isPsychOrEdu: /심리|인지|교육|학습|기억|뇌과학|발달|정서|행동|도파민/i.test(lower),
    isMediaOrHumanities: /미디어|언론|문학|어학|철학|역사|문화|담론|프레임|번역|텍스트/i.test(lower),
    isChem: /화학|유기화학|산염기|평형|반응속도|완충|촉매|결합|고분자/i.test(lower),
  };
}

// Helper to create tailored Level 4 actions in MindMap for each specific subject & domain
function createTailoredActionChildren(
  stepNum: number,
  category: SubjectCategory,
  topicTitle: string,
  subjectName: string,
  curriculumConcept: string,
  methodology: string,
  tools: string[],
  cleanInterest: string
): MindMapNode[] {
  const baseId = `${category}-act-${stepNum}-${Math.random().toString(36).slice(2, 7)}`;
  const color =
    category === 'math'
      ? '#38bdf8'
      : category === 'science'
      ? '#34d399'
      : category === 'social'
      ? '#fbbf24'
      : category === 'korean'
      ? '#a78bfa'
      : category === 'english'
      ? '#c084fc'
      : '#fb7185';

  const toolStr = tools.length > 0 ? tools.join(', ') : '전용 분석 소프트웨어';

  if (stepNum === 1) {
    return [
      {
        id: `${baseId}-1`,
        text: `[변인 도출] 독립·종속변수 조작적 정의 및 통제변인 설계`,
        category,
        color,
        subject: subjectName,
        nodeType: 'action',
        detail: `'${cleanInterest}'의 핵심 현상을 관찰하고, ${curriculumConcept} 원리를 입증하기 위한 독립변수와 종속변수를 명확히 분리·설계`,
        inquiryQuestion: `이 시스템에서 관찰하고자 하는 순수한 인과관계를 입증하기 위해 엄격히 통제해야 할 외생 변인은 무엇인가?`,
        methodology: `변인 통제 설계서 작성 및 가설 검증 진술문 수립`,
        recordTip: `현상 속에서 과학적·수학적 변수를 분해하여 조작적으로 정의하는 우수한 추상화 역량`,
      },
      {
        id: `${baseId}-2`,
        text: `[가설 수립] ${curriculumConcept.split('/')[0].trim()} 기반 검증 가능 가설`,
        category,
        color,
        subject: subjectName,
        nodeType: 'action',
        detail: `단순 추측을 배제하고 교과 핵심 이론(${curriculumConcept})에 근거하여 반증 가능한 수리적/원리적 가설 설정`,
        inquiryQuestion: `선행 이론과 관측 현상 사이의 불일치를 설명하기 위해 본 연구에서 새롭게 검증할 대립가설은 무엇인가?`,
        methodology: `선행 문헌 데이터와 교과 개념을 매핑한 가설 제안서 작성`,
        recordTip: `교과 개념을 토대로 논리적 반증 가능성을 갖춘 가설을 주도적으로 도출한 학업 역량`,
      },
    ];
  }

  if (stepNum === 2) {
    return [
      {
        id: `${baseId}-1`,
        text: `[선행 연구 분석] KCI/국제 저널 선행 연구 2편 방법론 비교 Matrix`,
        category,
        color,
        subject: subjectName,
        nodeType: 'action',
        detail: `RISS/DBpia/Google Scholar에서 관련 선행 논문 2편을 발췌하여 연구 설계, 수식 모델, 한계점을 3단 Matrix 표로 구조화`,
        inquiryQuestion: `선행 학술 연구들이 간과한 한계점과 고교생 수준에서 관찰 가능한 차별점은 무엇인가?`,
        methodology: `선행 연구 분석표(Matrix) 작성 및 기존 학설의 전제 조건 비판`,
        recordTip: `학술 문헌을 능동적으로 탐색하고 연구의 독창적 가치를 정립한 연구자적 소양`,
      },
      {
        id: `${baseId}-2`,
        text: `[교과 개념 융합] ${curriculumConcept} 핵심 수식·원리 심화 매핑`,
        category,
        color,
        subject: subjectName,
        nodeType: 'action',
        detail: `고교 정규 교육과정 단원 성취기준과 전공 최신 쟁점 사이의 연결 고리를 개념 관계도(Concept Map)로 시각화`,
        inquiryQuestion: `교과서 속 기초 원리가 전공 분야의 첨단 실세계 문제 해결에 어떻게 확장·응용되는가?`,
        methodology: `교과 개념 연계 맵 작성 및 지도 교사 학술 피드백 수렴`,
        recordTip: `교과서 원리를 대학 수준의 심화 학술 개념과 접목하여 깊이 있게 이해한 우수한 학업 역량`,
      },
    ];
  }

  if (stepNum === 3) {
    return [
      {
        id: `${baseId}-1`,
        text: `[실증 도구 적용] ${toolStr} 활용 데이터 수집 및 정량 시뮬레이션`,
        category,
        color,
        subject: subjectName,
        nodeType: 'action',
        detail: `${toolStr}을 활용하여 공공 데이터 추출 또는 수치 시뮬레이션을 수행하고, 매개변수 변화에 따른 결과값 도출`,
        inquiryQuestion: `도구를 통해 획득한 정량적 수치 데이터가 이론적 예측치와 얼마나 부합하는가?`,
        methodology: methodology,
        recordTip: `공학·통계 컴퓨팅 도구를 능숙하게 다루어 가설을 실증적으로 증명해내는 탐구 실행력`,
      },
      {
        id: `${baseId}-2`,
        text: `[시각화 및 상관분석] 함수 그래프 피팅 및 정량 지표 산출`,
        category,
        color,
        subject: subjectName,
        nodeType: 'action',
        detail: `수집된 데이터를 산점도, 추세선, 피어슨 상관계수(r) 또는 반응 그래프로 시각화하여 변인 간 상관관계 규명`,
        inquiryQuestion: `도출된 그래프의 기울기와 수렴 경향성이 의미하는 물리적/사회적 함의는 무엇인가?`,
        methodology: `엑셀/파이썬/지오지브라를 활용한 데이터 시각화 및 수치 모델 피팅`,
        recordTip: `수치 데이터를 시각 자료로 가공하고 그 이면의 메커니즘을 해석해내는 분석적 사고력`,
      },
    ];
  }

  // Step 4
  return [
    {
      id: `${baseId}-1`,
      text: `[오차 요인 분석] 모델의 현실적 한계점 분석 및 차년도 후속 연구 제언`,
      category,
      color,
      subject: subjectName,
      nodeType: 'action',
      detail: `이상적 가정과 현실 조건 사이의 편차(오차율)를 계산하고, 3학년 상위 과목에서 다룰 후속 심화 연구 과제 제언`,
      inquiryQuestion: `본 탐구의 한계를 극복하기 위해 차년도에 추가 도입해야 할 변수와 다학제간 융합 방안은?`,
      methodology: `오차 요인 원인 분석표 작성 및 2단계 후속 탐구 기획서 도출`,
      recordTip: `탐구 결과의 한계를 객관적으로 성찰하고 발전적 후속 과제를 논리적으로 설계한 메타인지 역량`,
    },
    {
      id: `${baseId}-2`,
      text: `[학생부 세특 500자 완성] 동기-과정-성장-배움이 담긴 완성형 세특 문안`,
      category,
      color,
      subject: subjectName,
      nodeType: 'action',
      detail: `교육부 학생부 기재요령을 100% 준수한 450~500자 분량의 격조 있는 교과 세특 추천 문안 작성`,
      inquiryQuestion: `나의 지적 성장과 전공 탐구 열정을 입학사정관에게 가장 신뢰감 있게 전달하는 문안은?`,
      methodology: `완성형 세특 포트폴리오 문안 작성 및 지도 교사 제출`,
      recordTip: `학교생활기록부 교과 세특에 즉시 반영 가능한 완성형 포트폴리오`,
    },
  ];
}

// Comprehensive synthesis generator
export function synthesizeComprehensiveCurriculum({
  interest = '',
  targetMajor = '',
  grade = '고등학교 2학년',
  selectedSubjects = [],
  customKeywords = '',
}: {
  interest: string;
  targetMajor?: string;
  grade?: string;
  selectedSubjects?: string[];
  customKeywords?: string;
}): ComprehensiveCurriculumResult {
  const cleanInterest = (interest || targetMajor || '융합 학문 및 신기술 탐구').trim();
  const cleanMajor = (targetMajor || '자연과학/공학 계열').trim();
  const contextStr = `${cleanInterest} ${cleanMajor} ${customKeywords}`.toLowerCase();
  const profile = detectDomainProfiles(contextStr);

  let majorOverview = '';
  let connectionSummary = '';
  const subjects: ComprehensiveSubjectPlan[] = [];

  // ==========================================
  // Domain 1: Bio & Biomedical / Genetics
  // ==========================================
  if (profile.isBio) {
    majorOverview = `'${cleanInterest}' 분야는 분자생물학적 메커니즘 규명(과학), 불확실성과 결합 오차율의 수리적 모델링(수학), 유전자 조작 기술의 윤리적·법적 가이드라인(사회), 최신 SCI급 저널 원문 독해(영어), 과학적 사실의 대중 소통 담론(국어), 염기서열 빅데이터 알고리즘(정보)이 유기적으로 결합된 대표적인 융합 학문입니다. 학생부종합전형에서는 교과 개념을 토대로 오프타깃 등 실제 의약학 난제를 정량적으로 파고든 깊이가 핵심 평가 요소입니다.`;
    connectionSummary = `학생의 관심사인 '${cleanInterest}'을 6개 교과와 융합할 때, 수학에서는 가이드 RNA의 오프타깃 비표적 절단 확률을 '조건부 확률(베이즈 정리)'로 수식화하고, 과학에서는 Cas9 단백질 도메인과 PAM 서열의 결합을 '생명과학II 효소 및 화학II 분자간 상호작용'으로 규명하며, 사회에서는 '생명윤리안전법 제47조'와 '롤스의 정의론'으로 배아 치료 규제 샌드박스를 고찰합니다. 국어는 과학 보도의 프레이밍을 분석하고, 정보는 오프타깃 서열 검색 알고리즘을 파이썬으로 구현하여 완벽한 학업 역량을 입증합니다.`;

    subjects.push({
      subject: '수학 (미적분 / 확률과 통계)',
      subjectCategory: 'math',
      curriculumConcept: '확률과 통계: 조건부 확률과 베이즈 정리 / 미적분: 효소 반응속도식(미카엘리스-멘텐)의 도함수',
      topic: `가이드 RNA 염기 불일치에 따른 오프타깃 절단 확률의 베이즈 추론 및 미카엘리스-멘텐 반응속도 모델링`,
      inquiryQuestion: `인간 게놈 30억 염기쌍 중 가이드 RNA가 비표적 부위를 오인 절단할 확률을 조건부 확률과 지수함수로 모델링할 때 오차를 최소화하는 방안은 무엇인가?`,
      connectionRationale: `유전자 치료의 최대 난제인 '오프타깃(비표적 절단)'은 결합 친화도와 불일치 염기 개수에 따른 확률적 사건입니다. 이를 교과의 '조건부 확률'과 '도함수를 이용한 반응 포화점 도출'로 수학화하여 질병 치료의 안정성을 수치적으로 검증합니다.`,
      methodology: `선행 논문 데이터의 결합 해리 상수(Kd) 추출, 엑셀/지오지브라를 활용한 베이즈 조건부 확률 시뮬레이션 및 미분 반응속도 곡선 피팅`,
      recommendedTools: ['지오지브라 (GeoGebra)', 'Excel 통계 분석 도구', '파이썬 SciPy', 'R-Studio'],
      readingRecommendation: '《통계의 미학》(최제호), 《미적분의 힘》(스티븐 스트로가츠)',
      recordTip: '단순 생명 지식 나열을 넘어 오프타깃 위험도를 조건부 확률과 미분 반응속도식으로 정량화해내는 탁월한 수리적 탐구역량 부각',
      draftRecordSnippet: `교과 수업 중 '조건부 확률'과 '도함수의 활용' 단원을 학습한 후, '${cleanInterest}'의 최대 난제인 오프타깃 부작용에 주목함. 가이드 RNA 염기 불일치 개수에 따른 결합 확률을 베이즈 정리를 적용하여 수식화하고, 지오지브라를 활용해 기질 농도에 따른 반응 포화 곡선을 성공적으로 시뮬레이션함. 이를 통해 생명현상의 불확실성을 수학적으로 엄밀하게 해석해내는 뛰어난 학문 융합 역량을 발휘함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [변인 정의] 결합 에너지 및 오프타깃 매개변수 설정',
          focus: '염기 불일치 개수(1~3개)에 따른 결합 해리 상수 조작적 정의',
          protocol: '독립변수를 불일치 염기 위치, 종속변수를 절단 효율로 설정하고 사전 문헌 기준치 설정',
          tools: ['NCBI BLAST', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 베이즈 정리 및 효소 속도론 수식 유도',
          focus: '조건부 확률 P(오프타깃|불일치) 수식 유도 및 미카엘리스-멘텐 미분방정식 전개',
          protocol: '교과서 베이즈 공식과 효소 반응속도 유도 과정을 비교하여 개념 관계도 작성',
          tools: ['KCI 선행 논문', '수학 교과서'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 시뮬레이션] 지오지브라 동적 워크시트 및 오차 피팅',
          focus: '슬라이더 변수를 조작하며 오프타깃 절단 위험 임계치 산출',
          protocol: '지오지브라 슬라이더 a, b로 결합 친화도를 변량 조작하여 잔차 제곱합 최소화',
          tools: ['지오지브라', '파이썬 Matplotlib'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 모델 한계 분석 및 차년도 후속 연구 설계',
          focus: '체내 환경(In vivo) 복잡성에 따른 오차 분석 및 세특 포트폴리오 완성',
          protocol: '이상적 가정의 한계를 비판하고 차기 학기 화학II 완충계 융합 과제 제시',
          tools: ['세특 포트폴리오', '한계점 분석표'],
        },
      ],
    });

    subjects.push({
      subject: '과학/공학 (생명과학 / 화학 / 융합과학)',
      subjectCategory: 'science',
      curriculumConcept: '생명과학II: 효소의 활성 부위와 알로스테릭 조절 / 화학II: 수소결합과 분자간 상호작용',
      topic: `Cas9 단백질 3차원 입체구조와 PAM 서열 인식에 따른 DNA 이중가닥 절단 메커니즘 규명`,
      inquiryQuestion: `Cas9 단백질의 HNH 및 RuvC 뉴클레아제 도메인은 PAM 서열 인식 시 어떻게 입체구조 변화를 일으켜 표적 DNA를 절단하는가?`,
      connectionRationale: `유전자 치료의 기본 단위는 단백질 3차원 분자 구조와 핵산 간의 물리화학적 결합입니다. 생명과학II의 '효소 활성 메커니즘'과 화학II의 '수소결합 및 입체장애'를 적용하여 유전자 가위의 절단 원리를 분자 수준에서 실증합니다.`,
      methodology: `PDB(Protein Data Bank) 3D 분자 뷰어를 활용한 Cas9-gRNA 복합체 결합각 및 수소결합 거리 계측, 르샤틀리에 원리 기반 평형 이동 분석`,
      recommendedTools: ['RCSB Protein Data Bank (PDB)', 'MolView 3D 분자 뷰어', 'NCBI PubMed', '교내 MBL 센서'],
      readingRecommendation: '《크랙 인 크리에이션》(제니퍼 다우드나), 《생명 최초의 30억 년》(앤드루 놀)',
      recordTip: '단백질 3차원 분자 구조 데이터베이스를 직접 활용하고 수소결합 및 입체장애를 화학적으로 해석한 수준 높은 과학적 탐구력 기재',
      draftRecordSnippet: `생명과학II 효소 단원의 '활성 부위 입체구조' 개념을 심화하여, RCSB PDB 데이터베이스를 통해 Cas9 단백질과 gRNA의 결합 구조를 3차원으로 직접 분석함. PAM 서열 인식 전후의 알로스테릭 구조 변화와 아미노산 잔기 간 수소결합 거리를 정밀 계측하여 DNA 이중가닥 절단 메커니즘을 규명함. 실험실 수준의 가설을 분자 시뮬레이션으로 입증한 뛰어난 연구자적 자질을 보임.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] PAM(NGG) 인식 부위 분자간 결합 인과 설정',
          focus: 'Cas9 단백질 표면의 양전하 아미노산과 DNA 인산 골격 음전하 간 정전기적 인력 가설',
          protocol: 'PDB ID(예: 4OO8) 구조 파일을 선정하고 주요 아미노산 잔기 목록 작성',
          tools: ['PDB 3D', 'NCBI'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 화학II 수소결합 및 알로스테릭 전이 메커니즘',
          focus: '르샤틀리에 원리와 결합 에너지 평형 이동 이론 비교 고찰',
          protocol: '최신 생화학 논문 2편의 도메인 회전 각도 데이터를 추출하여 교과 원리와 매핑',
          tools: ['학술 저널', '화학II 교과서'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 분석] MolView 결합거리 계측 및 3D 모델링',
          focus: '수소결합 유효 거리(2.8~3.2Å) 측정 및 입체장애(Steric Hindrance) 시각화',
          protocol: '분자 시뮬레이션 툴에서 아미노산 치환 시 결합 에너지 변화를 시각화',
          tools: ['MolView', 'PyMOL'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 전달체(LNP/AAV) 체내 전달 한계 고찰 및 세특 정리',
          focus: '생체 내 분해 효소와 면역 거부 반응 극복을 위한 후속 화학 과제 제언',
          protocol: '불확도 요인 분석 및 500자 완성형 세특 포트폴리오 작성',
          tools: ['세특 문안', '결과 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '사회/윤리 (생활과 윤리 / 정치와 법)',
      subjectCategory: 'social',
      curriculumConcept: '생활과 윤리: 생명윤리와 요나스의 책임윤리 / 정치와 법: 생명윤리안전법 제47조 및 롤스의 정의론',
      topic: `인간 배아 유전자 치료의 생명윤리적 쟁점과 '생명윤리안전법' 규제 샌드박스 정책 제안`,
      inquiryQuestion: `난치병 치료 목적의 유전자 교정과 유전적 강화(Enhancement) 사이의 경계를 법적으로 어떻게 구획하고 사회적 불평등을 방지할 것인가?`,
      connectionRationale: `첨단 바이오 기술의 상용화는 필연적으로 '생명 존엄성'과 '유전적 불평등(GATTACA 사회)'이라는 윤리적 딜레마를 야기합니다. 생활과 윤리의 '요나스 책임윤리'와 '롤스의 차등원칙'을 적용해 공정한 규제 거버넌스를 제안합니다.`,
      methodology: `국내 생명윤리안전법 제47조와 영국 HFEA/일본 가이드라인 조문 비교 분석, 롤스 정의론을 적용한 치료비 건강보험 급여화 공청회 대본 작성`,
      recommendedTools: ['국가법령정보센터 (law.go.kr)', '국회도서관 학술검색', 'OECD Bioethics Guidelines'],
      readingRecommendation: '《유전학의 윤리》(마이클 샌델), 《정의란 무엇인가》(마이클 샌델)',
      recordTip: '단순 찬반 논쟁을 넘어 사회적 약자 보호와 실정법 개정안을 입체적으로 모색하는 성숙한 시민 의식 및 정책 분석력 강조',
      draftRecordSnippet: `생활과 윤리 수업 중 '생명과학과 윤리' 단원을 이수하며, '${cleanInterest}' 기술의 상용화가 초래할 '유전적 양극화' 문제에 문제의식을 느낌. 국내 생명윤리안전법 제47조와 해외 주요국의 가이드라인을 법리적으로 비교 분석함. 특히 롤스의 '차등 원칙'을 원용하여 희귀 난치성 환자에게 우선적 치료 기회를 보장하는 입법 보완 조항을 조례안 형태로 제안하는 등 공동체적 책무성을 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 기술 접근성 격차와 유전적 불평등 쟁점 발문',
          focus: '고가 유전자 치료제(수십억 원대)의 시장 실패 및 의료 양극화 현황 통계 조사',
          protocol: '보건복지부 및 통계청 의료비 지출 지표를 추출하여 취약 계층 부담률 분석',
          tools: ['KOSIS 통계청', '보건산업진흥원'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 롤스의 정의론 및 국내외 생명윤리 법령 조항 비교',
          focus: '차등 원칙(최소 수혜자 배려)과 생명윤리안전법 제47조의 포지티브 규제 한계 대조',
          protocol: '국가법령정보센터 법률안과 영국 HFEA 규정 3대 핵심 조문 비교표 작성',
          tools: ['국가법령정보센터', '윤리 교과서'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 방법] 모의 정책 공청회 및 규제 샌드박스 조례안 설계',
          focus: '환자 단체, 제약사, 윤리학자 3자 이해관계자 시뮬레이션 및 절충안 도출',
          protocol: '학급 모의 공청회 토론 대본 작성 및 건강보험 재정 환급 지원 조례안 기안',
          tools: ['정책 기안서', '토론 시나리오'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 사회적 합의 도출의 한계 분석 및 세특 기재 완성',
          focus: '생명권과 경제적 재정 건전성 간의 트레이드오프 고찰 및 500자 세특 작성',
          protocol: '다양한 윤리적 가치 충돌을 다룬 에세이 완성 및 세특 포트폴리오 등록',
          tools: ['세특 문안', '에세이'],
        },
      ],
    });

    subjects.push({
      subject: '국어 (독서 / 화법과 작문)',
      subjectCategory: 'korean',
      curriculumConcept: '독서: 과학·기술 지문의 인과적 논증 분석 / 화법과 작문: 툴민(Toulmin) 논증 모형과 미디어 프레임 분석',
      topic: `생명공학 보도에 나타난 '맞춤아기' 공포 프레이밍과 과학적 사실 간의 괴리 분석 비평문`,
      inquiryQuestion: `대중 미디어는 유전체 편집 기술을 보도할 때 어떤 은유적 수사와 프레이밍으로 공포를 과장하며, 사실 기반 소통을 위해 언론이 준수해야 할 담화 규범은 무엇인가?`,
      connectionRationale: `첨단 과학 지식은 대중 미디어 텍스트를 통해 사회적으로 수용됩니다. 국어과의 '비판적 독해'와 '툴민 논증 분석'을 적용해 미디어 프레임이 대중의 합리적 의사결정에 미치는 왜곡을 실증적으로 검증합니다.`,
      methodology: `주요 일간지 및 과학 기사 10편의 어휘 빈도(텍스트 마이닝) 분석, 주장-데이터-담보의 툴민 논증 구조도 분해 및 과학철학적 비평문 집필`,
      recommendedTools: ['빅카인즈 (BIG Kinds) 뉴스 빅데이터', '형태소 분석기', 'Toulmin 논증 다이어그램'],
      readingRecommendation: '《생각의 탄생》(로버트 루트번스타인), 《과학 콘서트》(정재승)',
      recordTip: '전문 텍스트를 정확하게 독해하고 비판적 안목으로 미디어 프레임의 왜곡을 포착해내는 국어과 고차 사고력 및 의사소통 역량 기술',
      draftRecordSnippet: `독서 과목에서 과학·기술 지문의 논리적 구조를 분석하는 역량이 탁월함. 빅카인즈 뉴스 빅데이터를 활용하여 '${cleanInterest}' 관련 주요 언론 보도 10건을 텍스트 마이닝함. 그 결과 '신의 영역 도전', '맞춤아기' 등의 감정적 프레이밍이 과학적 치료 효과보다 과대 대표됨을 툴민 논증 모형으로 실증함. 과학 저널리즘이 지녀야 할 객관적 담화 규범을 설득력 있게 제언하는 비평문을 발표함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 언론 텍스트의 감정적 수사 표현 빈도 가설 설정',
          focus: '중립적 기술 설명 기사 대비 공포 유발 형용사 사용 빈도 가설 수립',
          protocol: '빅카인즈에서 최근 3개년 관련 기사 10건을 수집하여 말뭉치(Corpus) 구축',
          tools: ['빅카인즈', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 툴민 논증 모형(주장-데이터-담보) 및 비판적 담화 분석',
          focus: '데이터에서 주장으로 넘어가는 담보(Warrant)의 논리적 비약 검출',
          protocol: '신문 사설 3편의 논증 흐름도를 도식화하고 비형식적 오류 판별',
          tools: ['국어 교과서', '논증 다이어그램'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 분석] 워드클라우드 및 핵심 키워드 감정가(Sentiment) 평가',
          focus: '긍정/부정 감정 어휘 비율 산출 및 기사 제목의 어그로 프레임 정량화',
          protocol: '텍스트 마이닝 소프트웨어로 어휘 빈도 랭킹 및 동시 출현 네트워크 분석',
          tools: ['워드클라우드', '파이썬 KoNLPy'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 과학 커뮤니케이션 가이드라인 제언 및 세특 정리',
          focus: '비전공자 시민을 위한 올바른 과학 소통 원칙 수립 및 500자 세특 기재',
          protocol: '비평문 완성 및 학급 구두 발표 대본 작성',
          tools: ['비평문', '세특 포트폴리오'],
        },
      ],
    });

    subjects.push({
      subject: '영어 (영어독해와 작문 / 심화 영어)',
      subjectCategory: 'english',
      curriculumConcept: '심화 영어: SCI급 원문 IMRaD 구조 독해 / 영어 작문: 학술 완곡어법(Hedging) 분석 및 영문 Executive Summary',
      topic: `Nature 저널의 유전자 치료 논문 IMRaD 구조 분석 및 학술 완곡어법(Hedging) 분석 영문 요약서`,
      inquiryQuestion: `국제 학술계 연구자들은 연구 결론의 한계를 진술할 때 어떤 완곡어법(Hedging: suggest, plausible, potential)을 사용하며, 이를 바탕으로 연구 가치를 어떻게 입증하는가?`,
      connectionRationale: `바이오 첨단 연구의 글로벌 표준은 영어 원문 학술지(Nature, Science 등)에 게재됩니다. 영어과의 'IMRaD 구조 분석'과 '완곡어법(Hedging) 분석'을 통해 최신 글로벌 연구 트렌드를 직접 해독하는 글로벌 학문 소양을 입증합니다.`,
      methodology: `Google Scholar 오픈액세스 Nature 논문 2편 선정, Introduction-Methods-Results-Discussion 4단계 구조화 및 250단어 영문 Executive Summary 집필`,
      recommendedTools: ['Google Scholar', 'Nature Open Access', 'Academic Word List (AWL)', 'Grammarly'],
      readingRecommendation: '《Factfulness》(한스 로슬링 영문판), Nature Perspective 원문',
      recordTip: '해외 원문 자료를 능동적으로 탐색하여 글로벌 연구 트렌드를 파악하고 정교한 학술 영어로 재구성하는 어학 및 학문 탐구 역량 부각',
      draftRecordSnippet: `심화영어독해 수업 중 Nature 오픈액세스 저널에 게재된 '${cleanInterest}' 관련 원문 논문을 주도적으로 탐독함. 저자가 연구 결론을 조심스럽게 피력할 때 사용하는 완곡어법(Hedging) 표현을 30개 선별하여 그 학술적 뉘앙스를 분석함. IMRaD 4단 구조에 맞추어 핵심 가설과 실험 결과를 250단어 분량의 구조화된 영문 Executive Summary로 완벽히 요약·발표함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 국제 학술지 IMRaD 논문 구조 분해 가설',
          focus: '초록(Abstract)의 4단 구성(배경-연구방법-결과-함의) 문장별 기능 매핑',
          protocol: 'Google Scholar 검색 쿼리 작성 및 SCI급 오픈액세스 논문 2편 선정',
          tools: ['Google Scholar', 'PDF 리더'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 전공 특화 Academic Word List(AWL) 30선 구축',
          focus: 'may suggest, indicate, potential 등 완곡어법 어휘의 기능적 분류',
          protocol: '논문 내 결론 단락에서 저자의 주장 강도를 3단계 척도로 분류',
          tools: ['AWL 코퍼스', '영어 사전'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 방법] 250단어 구조화 영문 Executive Summary 집필',
          focus: 'Background - Key Findings - Limitations 3단 영문 리포트 작성',
          protocol: '문법 검사기 및 코퍼스 분석기를 통한 학술 문체 감수 및 영문 발표 대본 완성',
          tools: ['Grammarly', 'Google Docs'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 번역적 뉘앙스 차이 고찰 및 세특 포트폴리오 등록',
          focus: '한국어 번역본과의 의미론적 차이 분석 및 500자 완성형 세특 작성',
          protocol: '영문 요약서와 피어 리뷰 결과서 제출',
          tools: ['세특 문안', '영문 포트폴리오'],
        },
      ],
    });

    subjects.push({
      subject: '정보/융합 (정보 / 인공지능 기초 / 융합과학탐구)',
      subjectCategory: 'tech',
      curriculumConcept: '정보: 문자열 매칭(String Matching) 알고리즘 / 인공지능 기초: 오프타깃 스코어링 예측 모델과 파이썬 시각화',
      topic: `CRISPR 오프타깃 예측 알고리즘(CFD score) 분석 및 파이썬 기반 서열 매칭 프로그램 구현`,
      inquiryQuestion: `대용량 게놈 염기서열 데이터에서 가이드 RNA와 불일치 염기가 최소인 후보 영역을 탐색하는 알고리즘의 시간 복잡도를 어떻게 O(N)으로 최적화할 수 있는가?`,
      connectionRationale: `생명정보학(Bioinformatics)은 유전체 빅데이터를 컴퓨팅 알고리즘으로 처리하는 핵심 기술입니다. 정보과의 '문자열 탐색 알고리즘'과 '파이썬 데이터 분석'을 활용하여 오프타깃 부위를 자동 검출하는 시뮬레이터를 제작합니다.`,
      methodology: `NCBI GenBank에서 대상 유전자 FASTA 염기서열 다운로드, 파이썬(Python)으로 해시 테이블 기반 서열 매칭 스크립트 작성 및 오프타깃 점수 히트맵 시각화`,
      recommendedTools: ['Python (Jupyter Notebook)', 'Biopython 라이브러리', 'NCBI GenBank FASTA', 'Matplotlib/Seaborn'],
      readingRecommendation: '《알고리즘, 인생을 계산하다》(브라이언 크리스천), 《모두의 딥러닝》(조태호)',
      recordTip: '단순 코딩에 머물지 않고 생명과학의 난제를 컴퓨팅 사고력(추상화, 알고리즘 최적화)으로 해결하는 융합 창의력 기술',
      draftRecordSnippet: `정보 교과의 '알고리즘과 프로그래밍' 단원에서 배운 문자열 탐색 원리를 바탕으로, '${cleanInterest}'의 핵심 과제인 오프타깃 서열 탐색 프로그램을 파이썬으로 직접 구현함. NCBI에서 추출한 10,000bp 게놈 데이터에서 가이드 RNA와 유사한 서열을 탐색하는 알고리즘을 설계하고 시간 복잡도를 O(N)으로 최적화함. 생명과학과 컴퓨터공학을 유기적으로 결합한 뛰어난 융합 문제해결력을 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 염기서열 20bp 탐색 알고리즘 흐름도 설계',
          focus: '불일치 허용 개수 k(1~3개)에 따른 전수 조사 vs 해시 탐색 비교',
          protocol: '입력 FASTA 파일 형식 분석 및 함수 입출력 파라미터 정의',
          tools: ['Jupyter Notebook', 'FASTA'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] Big-O 시간 복잡도 분석 및 해시 테이블 기법',
          focus: '선형 탐색 O(N*M) 대비 해시 딕셔너리 O(N)의 메모리 및 시간 효율 수식화',
          protocol: '정보 교과서 알고리즘 복잡도 이론과 논문 CFD 스코어 매트릭스 매핑',
          tools: ['정보 교과서', '파이썬 Timeit'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 구현] 파이썬 스크립트 작성 및 히트맵 시각화',
          focus: 'Seaborn 라이브러리를 활용한 염기 위치별 오프타깃 절단 위험도 히트맵 도출',
          protocol: '파이썬 코드 100라인 작성 및 샘플 서열 대상 단위 테스트 실행',
          tools: ['Biopython', 'Seaborn'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 알고리즘 실행 시간 벤치마킹 및 세특 완성',
          focus: '서열 길이 증가에 따른 메모리 한계 분석 및 차기 머신러닝 모델 제언',
          protocol: '깃허브 코드 공유 및 500자 완성형 세특 기재 문안 완성',
          tools: ['코드 주석', '세특 포트폴리오'],
        },
      ],
    });
  }

  // ==========================================
  // Domain 2: AI, CS, Robotics & Software
  // ==========================================
  else if (profile.isAi) {
    majorOverview = `'${cleanInterest}' 분야는 대규모 데이터 처리 알고리즘의 시간·공간 복잡도 최적화(수학/정보), 신경망 학습 메커니즘과 반도체 하드웨어 물리 기작(과학), 인공지능 윤리 가이드라인과 편향성 방지 정책(사회), 최신 글로벌 AI 학술 논문 강독(영어), AI 저작권과 창작성에 관한 비판적 담론(국어)이 교차하는 최첨단 융합 영역입니다. 학생부종합전형에서는 단순 챗봇 활용을 넘어 알고리즘의 원리와 사회적 파급효과를 수학적·공학적으로 파고든 탐구가 매우 높게 평가됩니다.`;
    connectionSummary = `학생의 관심사인 '${cleanInterest}'을 6개 교과와 융합할 때, 수학에서는 경사하강법과 벡터 내적(코사인 유사도)을 '미적분의 편미분과 기하 벡터'로 모델링하고, 과학에서는 반도체 뉴로모픽 소자의 에너지 효율을 '물리학 전자기 및 열역학'으로 고찰하며, 사회에서는 EU AI Act와 '사회적 편향성(차별금지법)'을 비교 분석합니다. 국어에서는 생성형 AI의 저작권 논쟁을 툴민 모형으로 논증하고, 정보에서는 RAG(검색 증강 생성) 파이프라인을 파이썬으로 구현하여 실전 전공 역량을 입증합니다.`;

    subjects.push({
      subject: '수학 (미적분 / 기하 / 확률과 통계)',
      subjectCategory: 'math',
      curriculumConcept: '미적분: 합성함수 미분법(연쇄법칙)과 경사하강법 / 기하: 벡터의 내적과 코사인 유사도(Cosine Similarity)',
      topic: `대규모 언어 모델(LLM)의 벡터 임베딩 유사도 계산을 위한 코사인 유사도 및 경사하강법 최적화 분석`,
      inquiryQuestion: `고차원 벡터 공간에서 단어 간 의미적 거리를 코사인 유사도로 계산할 때 발생하는 차원의 저주를 기하학적으로 어떻게 극복하며, 오차 역전파의 미분 연쇄법칙은 어떻게 가중치를 수렴시키는가?`,
      connectionRationale: `인공지능의 모든 학습은 오차를 최소화하는 수학적 최적화입니다. 미적분의 '합성함수 미분법(경사하강법)'과 기하의 '벡터 내적(코사인 유사도)'을 결합하여 환각 현상을 저감하는 검색 메커니즘을 수리적으로 규명합니다.`,
      methodology: `파이썬 NumPy를 활용한 100차원 단어 벡터 내적 연산 시뮬레이션, 학습률(Learning Rate)에 따른 비용함수(Cost Function) 수렴 그래프 시각화`,
      recommendedTools: ['지오지브라 3D', '파이썬 NumPy/Matplotlib', 'Jupyter Notebook'],
      readingRecommendation: '《인공지능을 위한 수학》(수잔나 로스), 《미적분의 힘》(스티븐 스트로가츠)',
      recordTip: '단순 AI 도구 사용을 넘어 인공지능의 핵심 수리 알고리즘(편미분, 벡터 내적)을 직접 유도하고 시뮬레이션한 수리적 역량 강조',
      draftRecordSnippet: `미적분과 기하 교과 개념을 융합하여, '${cleanInterest}'의 핵심 원리인 벡터 임베딩과 최적화 과정을 수학적으로 탐구함. 고차원 공간에서 텍스트 유사도를 판별하는 '코사인 유사도'를 벡터 내적으로 유도하고, 파이썬을 활용해 학습률 변화에 따른 경사하강법의 오차 수렴 곡선을 시뮬레이션함. 복잡한 AI 알고리즘을 교과의 미분과 기하 원리로 명쾌하게 환원해내는 수학적 통찰력을 발휘함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [변인 정의] 벡터 차원수 및 학습률 매개변수 설정',
          focus: '단어 벡터 차원 d(50~300)와 에포크(Epoch)에 따른 손실값 정의',
          protocol: '독립변수를 학습률 알파, 종속변수를 잔차 제곱합으로 정의',
          tools: ['파이썬 NumPy', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 미적분 연쇄법칙(Chain Rule) 및 벡터 내적 공식 유도',
          focus: '오차 역전파(Backpropagation)의 편미분 수식 유도 과정 정리',
          protocol: '교과서 미분 공식과 딥러닝 손실함수 수식을 개념 매핑',
          tools: ['미적분 교과서', '학술 논문'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 시뮬레이션] 3D 벡터 공간 유사도 시각화',
          focus: '지오지브라 3D에서 세 벡터 간의 사이각(Theta) 및 코사인값 동적 관찰',
          protocol: '파이썬 Matplotlib으로 손실함수 곡면의 안장점(Saddle point) 탈출 시뮬레이션',
          tools: ['지오지브라 3D', '파이썬'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 차원의 저주에 따른 부동소수점 오차 분석 및 세특 정리',
          focus: '고차원 희소성(Sparsity) 한계 고찰 및 차기 차원 축소(PCA) 과제 제언',
          protocol: '결과 보고서 작성 및 500자 완성형 세특 문안 완성',
          tools: ['세특 문안', '결과 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '과학/공학 (물리학 / 정보기술)',
      subjectCategory: 'science',
      curriculumConcept: '물리학I/II: 전기장과 전위차 / 옴의 법칙과 소비전력(P=VI) / 반도체 p-n 접합과 에너지 띠 이론',
      topic: `AI 가속기(NPU)의 저전력 연산을 위한 뉴로모픽 반도체의 시냅스 소자 물리 메커니즘 분석`,
      inquiryQuestion: `기존 폰 노이만 구조의 메모리 병목 현상과 전력 소모 한계를 극복하기 위해, 멤리스터(Memristor) 소자는 어떻게 가변 저항 물리 특성으로 생체 시냅스를 모사하는가?`,
      connectionRationale: `대규모 AI 모델의 최대 병목은 막대한 전력 소비와 발열입니다. 물리학의 '전기장, 저항과 소비전력, 반도체 에너지 띠 이론'을 통해 차세대 AI 하드웨어의 저전력 메커니즘을 공학적으로 탐구합니다.`,
      methodology: `전압-전류(I-V) 히스테리시스 곡선 시뮬레이션, 줄열(Joule heating) 손실 계산 및 열역학적 냉각 효율 비교 분석`,
      recommendedTools: ['CircuitLab 회로 시뮬레이터', '물리학 실험 MBL 센서', '한국전자통신연구원(ETRI) 기술 보고서'],
      readingRecommendation: '《반도체 제국의 미래》(정인성), 《물리의 정석》(레너드 서스킨드)',
      recordTip: '소프트웨어 AI를 넘어 반도체 소자의 물리적 메커니즘과 에너지 효율을 물리학 법칙으로 분석해낸 하드웨어·소프트웨어 통합 공학 역량 강조',
      draftRecordSnippet: `물리학II의 '전기장과 전위차', '반도체 소자' 단원을 학습한 후, 초거대 AI 연산의 전력 폭증 문제를 해결할 차세대 뉴로모픽 소자에 주목함. 가변 저항 특성을 지닌 멤리스터 소자의 전압-전류(I-V) 곡선을 회로 시뮬레이터로 분석하고, 폰 노이만 병목을 극복하는 병렬 아날로그 연산의 에너지 절감 효율을 정량 계산함. 하드웨어의 물리적 원리를 깊이 있게 이해하는 공학적 소양을 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 데이터 이동에 따른 줄열(Joule Heat) 손실 분석',
          focus: '버스(Bus) 대역폭 한계와 저항에 의한 전력 소비 P=I^2*R 수식화',
          protocol: '기존 GPU 대비 NPU 소자의 연산당 에너지 소모(pJ/op) 기준치 수집',
          tools: ['데이터시트', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 반도체 에너지 띠 이론과 전자 전도 메커니즘',
          focus: '절연체 내 산소 공공(Oxygen vacancy) 이동에 따른 필라멘트 형성 이론',
          protocol: '물리학II 반도체 접합 단원과 선행 반도체 소자 논문 비교',
          tools: ['물리학 교과서', '학술 논문'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 시뮬레이션] 회로 시뮬레이터 가변 저항 곡선 도출',
          focus: 'CircuitLab에서 펄스 전압 인가 시 컨덕턴스(Conductance) 다단계 변화 관찰',
          protocol: '가중치 업데이트 곡선의 선형성(Linearity) 지표 산출',
          tools: ['CircuitLab', '파이썬'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 열적 안정성 한계 극복 및 세특 정리',
          focus: '고온 동작 시 누설 전류 오차 분석 및 차년도 양자 터널링 후속 과제 제언',
          protocol: '500자 완성형 세특 문안 작성 및 지도 교사 제출',
          tools: ['세특 문안', '결과 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '사회/윤리 (통합사회 / 생활과 윤리 / 정치와 법)',
      subjectCategory: 'social',
      curriculumConcept: '생활과 윤리: 과학기술과 책임 윤리 / 정치와 법: EU AI Act와 알고리즘 편향성 방지 법제화',
      topic: `채용 및 신용평가 AI 알고리즘의 편향성에 따른 차별 문제와 'EU AI Act' 규제 체계 비교 고찰`,
      inquiryQuestion: `학습 데이터에 내재된 역사적 차별이 인공지능 모델에 전이될 때, 이를 교정하기 위한 통계적 공정성(Statistical Parity) 기준과 법적 규제 샌드박스는 어떻게 수립되어야 하는가?`,
      connectionRationale: `인공지능의 확산은 알고리즘의 불투명성과 사회적 차별 심화라는 중대한 사회 문제를 낳습니다. 생활과 윤리의 '책임 윤리'와 정치와 법의 '기본권 보장 및 법치주의'를 결합하여 신뢰 가능한 AI 거버넌스를 탐구합니다.`,
      methodology: `컴파스(COMPAS) 재범 예측 데이터셋의 위양성률(False Positive Rate) 인종별 격차 정량 분석, 국내 인공지능 기본법안과 EU AI Act 비교표 작성`,
      recommendedTools: ['Kaggle COMPAS Recidivism Dataset', '국가인권위원회 AI 가이드라인', 'EU AI Act 원문'],
      readingRecommendation: '《대량살상 수학무기》(캐시 오닐), 《로봇 시대의 법과 윤리》(정채연)',
      recordTip: '기술 만능주의를 경계하고 소외 계층의 인권을 보호하는 균형 잡힌 정책 제언 역량 및 비판적 시민 의식 기술',
      draftRecordSnippet: `생활과 윤리와 정치와 법 과목을 융합하여, '${cleanInterest}'의 핵심 윤리 쟁점인 '알고리즘 편향성'을 심층 탐구함. 미국 재범 예측 AI(COMPAS)의 공개 데이터를 직접 분석하여 인종별 위양성 오차율의 구조적 격차를 통계적으로 규명함. 롤스의 정의론과 EU AI Act의 고위험군 규제 프레임워크를 원용하여, 알고리즘 설명요구권과 알고리즘 영향평가제를 의무화하는 정책 제안서를 완성함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 데이터 편향에 따른 소외 계층 피해 지표 설정',
          focus: '학습 데이터 표본 추출의 불균형(Sampling Bias) 현황 통계 수집',
          protocol: 'Kaggle 공공 데이터셋에서 혼동행렬(Confusion Matrix) 지표 추출',
          tools: ['Kaggle', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 롤스의 공정으로서의 정의 및 평등권 법리 분석',
          focus: '헌법 제11조 평등권 조항과 알고리즘 자동 의사결정의 충돌 쟁점 검토',
          protocol: '국가인권위원회 결정례와 법학 논문 2편 강독',
          tools: ['헌법 조문', '학술 논문'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 분석] 알고리즘 공정성 지표 3종(기회균등, 예측균등) 비교',
          focus: '수학적 공정성 정의 간의 상충관계(불가능성 정리) 도식화',
          protocol: '공정성 보정 알고리즘 적용 전후의 오차율 비교 그래프 작성',
          tools: ['파이썬 AIF360', 'Excel'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 입법 보완 조례안 기안 및 세특 완성',
          focus: '국내 실정에 부합하는 인공지능 신뢰성 검증 가이드라인 제언',
          protocol: '정책 제안서 완성 및 500자 세특 포트폴리오 기재',
          tools: ['세특 문안', '정책 기안서'],
        },
      ],
    });

    subjects.push({
      subject: '국어 (독서 / 화법과 작문)',
      subjectCategory: 'korean',
      curriculumConcept: '독서: 기술철학 지문 비판적 분석 / 화법과 작문: 툴민 논증 모형을 적용한 생성형 AI 저작권 에세이',
      topic: `생성형 AI 시대 기계의 '창작성' 인정 여부에 관한 법철학적 담론과 저작권 귀속 논증 에세이`,
      inquiryQuestion: `인공지능이 방대한 데이터를 통계적으로 재조합하여 산출한 결과물을 인간의 독창적 사상과 감정의 표현으로 볼 수 있는가?`,
      connectionRationale: `생성형 AI는 전통적 인문학의 핵심 질문인 '인간 고유의 창작성과 의식'에 도전합니다. 국어과의 '논증적 에세이 집필'과 '비판적 독해'를 통해 기술 시대의 인간성 회복과 저작권 제도를 논증합니다.`,
      methodology: `문화체육관광부 AI 저작권 가이드라인 분석, 툴민(Toulmin) 논증 구조(주장-데이터-담보-반박)를 적용한 A4 4매 분량의 논증적 소논설문 집필 및 학급 발표`,
      recommendedTools: ['문체부 AI 저작권 가이드라인', 'Toulmin 다이어그램', '국회도서관 법학 논문'],
      readingRecommendation: '《클루지》(게리 마커스), 《호모 데우스》(유발 하라리)',
      recordTip: '전문 인문·법학 텍스트를 정확히 분석하고 논리적 비약 없는 탄탄한 문장력으로 자신의 견해를 피력한 국어과 작문 역량 부각',
      draftRecordSnippet: `화법과 작문 수업 중 논증적 글쓰기 단원을 학습하며, '${cleanInterest}'의 확산으로 촉발된 인공지능 저작권 분쟁을 인문학적으로 조망함. 툴민의 6요소 논증 모형을 적용하여 기계의 통계적 패턴 합성을 진정한 창작으로 볼 수 없는 논리적 담보를 정립함. 인간 창작자의 권리를 보호하면서도 공공 데이터 활용을 장려하는 상생 저작권 모델을 설득력 있게 제시하는 학술 에세이를 완성함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 저작권법 제2조(인간의 사상과 감정) 조항과 AI 산출물 비교',
          focus: '프롬프트 입력자의 기여도에 따른 저작물성 인정 범위 쟁점 정리',
          protocol: '미국 저작권청(USCO) 주요 판례 3건 요약',
          tools: ['USCO 판례집', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 기술 결정론 극복과 인문학적 창작 이론 매핑',
          focus: "발터 벤야민의 '아우라' 개념과 디지털 복제 시대의 창작성 고찰",
          protocol: '현대 미학 논문 2편을 분석하여 논증의 반박(Rebuttal) 보강',
          tools: ['미학 서적', '국어 교과서'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 작문] 툴민 모형 기반 논증 다이어그램 및 에세이 초안',
          focus: '주장(Claim), 데이터(Data), 담보(Warrant)의 논리적 연결성 검증',
          protocol: 'A4 4매 분량의 논증 에세이 집필 및 비형식적 오류 자체 검증',
          tools: ['Word', '논증 맵'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 학급 피어 리뷰 피드백 수렴 및 세특 완성',
          focus: '반론에 대한 재반박 논리 보강 및 500자 완성형 세특 문안 작성',
          protocol: '최종 수정본 제출 및 교내 발표',
          tools: ['세특 문안', '에세이 최종본'],
        },
      ],
    });

    subjects.push({
      subject: '영어 (영어독해와 작문 / 심화 영어)',
      subjectCategory: 'english',
      curriculumConcept: '심화 영어: NeurIPS/ICLR 학술 논문 Abstract 독해 / 학술 어휘(AWL)와 구조화된 영문 테크니컬 리포트',
      topic: `글로벌 AI 학회(NeurIPS) 논문 초록(Abstract) 분석 및 사실 기반 RAG 파이프라인 영문 테크니컬 리포트`,
      inquiryQuestion: `글로벌 AI 연구자들은 환각 저감을 위한 검색 증강 생성(RAG) 메커니즘을 영문 학술 논문에서 어떤 수사적 구조와 기술 어휘로 설명하는가?`,
      connectionRationale: `인공지능의 최신 기술 트렌드는 NeurIPS, ICML 등 해외 오픈액세스 저널을 통해 실시간 공유됩니다. 영어과의 '학술 초록 분석'과 '영문 테크니컬 리포트 작성'을 통해 글로벌 AI 엔지니어로서의 학업 기초를 다집니다.`,
      methodology: `arXiv 오픈액세스 RAG 관련 핵심 논문 2편 선정, Problem-Method-Result 3단 영문 구조화 및 250단어 영문 테크니컬 요약서 집필`,
      recommendedTools: ['arXiv.org AI 연구소', 'DeepL 번역 대조', 'Academic Word List (AWL)'],
      readingRecommendation: '《Artificial Intelligence: A Modern Approach》(영문판), arXiv 최신 논문',
      recordTip: '영문 전문 컴퓨터공학 문헌을 능숙하게 독해하고 글로벌 엔지니어링 표준에 부합하는 영문 요약서를 집필한 뛰어난 외국어 학업 역량',
      draftRecordSnippet: `심화영어 작문 과목에서 arXiv에 게재된 '${cleanInterest}' 관련 최신 연구 논문 원문을 심층 분석함. 환각 현상을 저감하기 위한 RAG 파이프라인의 핵심 기술 용어를 정리하여 영문 어휘집을 구축함. 저자의 가설 검증 흐름에 맞추어 250단어 분량의 구조화된 영문 테크니컬 요약서를 작성하고, 영어 프레젠테이션을 통해 급우들에게 명료하게 전달하는 글로벌 소통 역량을 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] arXiv 최신 논문 Abstract 문장별 기능 분석',
          focus: '기술적 한계 진술(limitation)과 제안된 프레임워크 간의 영문 수사 파악',
          protocol: 'arXiv 검색 쿼리 작성 및 대표 논문 2편 선정',
          tools: ['arXiv', 'PDF 리더'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 인공지능 도메인 전문 학술 어휘(CS AWL) 30선 발췌',
          focus: 'hallucination, retrieval, latent space 등 전공 어휘의 정확한 영문 정의 정리',
          protocol: '어휘 카드 작성 및 구문 분석',
          tools: ['AWL', '전문 사전'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 방법] 250단어 영문 Technical Summary 작성 및 감수',
          focus: 'Background - Architecture - Benchmark Result 3단 구성',
          protocol: 'Grammarly 문법 검사 및 학술 문체 다듬기',
          tools: ['Grammarly', 'Google Docs'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 번역적 뉘앙스 비교 및 500자 세특 포트폴리오 등록',
          focus: '한국어 AI 용어와의 일대일 대응 한계 고찰 및 세특 문안 완성',
          protocol: '영문 포트폴리오 제출',
          tools: ['세특 문안', '영문 리포트'],
        },
      ],
    });

    subjects.push({
      subject: '정보/융합 (정보 / 인공지능 기초)',
      subjectCategory: 'tech',
      curriculumConcept: '정보: 자료구조(해시, 트리)와 알고리즘 Big-O 시간복잡도 / 인공지능 기초: RAG 파이프라인과 파이썬 시뮬레이션',
      topic: `알고리즘 시간복잡도(Big-O) 최적화와 파이썬 기반 사실 기반 검색 증강(RAG) 파이프라인 구현`,
      inquiryQuestion: `대용량 문서 집합에서 코사인 유사도 검색 시 선형 탐색 O(N)의 지연 시간을 Kd-트리 또는 HNSW 인덱싱을 통해 O(log N)으로 어떻게 단축할 수 있는가?`,
      connectionRationale: `소프트웨어 공학의 핵심은 대용량 데이터를 빠르고 정확하게 처리하는 자료구조와 알고리즘 설계입니다. 정보과의 '시간·공간 복잡도'와 '파이썬 데이터 분석'을 결합하여 실시간 AI 검색 엔진을 직접 구현합니다.`,
      methodology: `파이썬 LangChain 또는 Sentence-Transformers 오픈소스 라이브러리를 활용한 문서 청킹(Chunking) 및 FAISS 벡터 인덱스 구축, 질의응답 지연 시간 벤치마킹`,
      recommendedTools: ['Python (VS Code / Jupyter)', 'FAISS 벡터 인덱스 라이브러리', 'HuggingFace Transformers'],
      readingRecommendation: '《모두의 딥러닝》(조태호), 《파이썬 알고리즘 인터뷰》(박상길)',
      recordTip: '단순 코드 복사에서 벗어나 Big-O 복잡도를 수학적으로 측정하고 검색 파이프라인을 최적화한 실전 개발 역량 부각',
      draftRecordSnippet: `정보 교과에서 배운 자료구조와 알고리즘 복잡도 원리를 응용하여, '${cleanInterest}'의 핵심 아키텍처인 RAG 파이프라인을 파이썬으로 구현함. 100만 건의 문서 벡터 검색 시 선형 탐색의 병목을 해결하기 위해 계층적 탐색 인덱스를 적용하여 검색 속도를 O(log N) 수준으로 단축함. 알고리즘의 효율성을 시간과 공간 복잡도로 수리 분석하는 뛰어난 컴퓨팅 사고력을 발휘함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 데이터 규모 N 증가에 따른 검색 지연 시간 가설 설정',
          focus: 'N=10,000건, 100,000건에서 선형 탐색 시간 지연 측정 가설 수립',
          protocol: '파이썬 timeit 모듈로 기본 실행 시간 측정 스크립트 작성',
          tools: ['Jupyter', 'Timeit'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 트리 및 해시 기반 인덱싱의 Big-O 시간 복잡도 유도',
          focus: 'O(N) vs O(log N)의 수학적 계산량 비교 및 그래프 수식화',
          protocol: '정보 교과서 알고리즘 복잡도 단원과 논문 벤치마크 매핑',
          tools: ['정보 교과서', '알고리즘 교재'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 구현] FAISS 벡터 인덱스 구축 및 벤치마킹',
          focus: '파이썬 코드로 코사인 유사도 랭킹 및 상위 k개 문서 추출 파이프라인 완성',
          protocol: '정확도(Recall@k)와 지연 시간의 트레이드오프 곡선 도출',
          tools: ['Python FAISS', 'Matplotlib'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 메모리 오버헤드 분석 및 세특 완성',
          focus: '인덱스 크기 증가에 따른 RAM 소비량 분석 및 후속 양자화(Quantization) 제언',
          protocol: '코드 주석 및 500자 완성형 세특 포트폴리오 기재',
          tools: ['세특 문안', '깃허브 코드'],
        },
      ],
    });
  }

  // ==========================================
  // Domain 3: Environment, Climate & Energy
  // ==========================================
  else if (profile.isEnvOrClimate) {
    majorOverview = `'${cleanInterest}' 분야는 대기·해양 순환과 생화학적 분해 메커니즘(과학), 기후 데이터 시각화 및 온실가스 지수함수 모델링(수학), 탄소배출권 거래제와 환경 불평등 해소 정책(사회), 글로벌 기후 협약 및 IPCC 영문 보고서 강독(영어), 환경 재난 보도 프레임 분석(국어), 공공 환경 데이터 API 파이프라인(정보)이 융합된 핵심 지속가능성 학문입니다. 학생부종합전형에서는 구체적인 데이터와 과학적 원리를 결합한 실증적 환경 탐구력이 매우 돋보입니다.`;
    connectionSummary = `학생의 관심사인 '${cleanInterest}'을 6개 교과와 융합할 때, 수학에서는 탄소 농도 증가 추이를 '지수함수와 정적분 면적'으로 수식화하고, 과학에서는 미세플라스틱 분해 효소나 온실효과를 '화학 반응속도 및 지구과학 복사평형'으로 규명하며, 사회에서는 '피구세와 탄소배출권(K-ETS)'의 경제적 효율성을 비교 분석합니다. 국어는 환경 담론의 프레이밍을 비판하고, 정보는 기상청 기후 공공데이터를 파이썬으로 가공하여 환경 데이터 사이언티스트로서의 역량을 입증합니다.`;

    subjects.push({
      subject: '수학 (미적분 / 확률과 통계)',
      subjectCategory: 'math',
      curriculumConcept: '수학I: 지수·로그함수와 자연로그 / 미적분: 정적분을 활용한 누적 탄소 배출량 및 한계저감비용(MAC) 면적 계산',
      topic: `대기 중 온실가스 농도 증가 추이의 지수함수 모델링 및 정적분을 활용한 누적 탄소 배출량 산출`,
      inquiryQuestion: `전 세계 화석연료 연소에 따른 대기 중 CO2 농도 변화를 지수함수로 피팅할 때, 특정 목표 온도(1.5℃) 도달 시점까지 남은 탄소 예산(Carbon Budget)을 정적분으로 어떻게 도출할 수 있는가?`,
      connectionRationale: `기후변화의 정량적 예측은 수학적 함수 모델링에서 출발합니다. 지수함수를 이용해 온실가스 누적량을 수식화하고 정적분으로 남은 잔여 탄소 예산을 계산하여 기후 위기를 수학적으로 규명합니다.`,
      methodology: `NOAA(미국 해양대기청) 마우나로아 관측소의 최근 50년 CO2 농도 데이터(Keeling Curve) 추출, 최소제곱법 지수 회귀선 산출 및 정적분 계산`,
      recommendedTools: ['지오지브라 (GeoGebra)', 'NOAA 기후 데이터베이스', '파이썬 SciPy'],
      readingRecommendation: '《통계의 미학》(최제호), 《기후변화의 경제학》(니콜라스 스턴)',
      recordTip: '단순 환경 보호 주장을 넘어 실제 관측 데이터를 지수함수와 정적분으로 모델링하여 탄소 예산을 정량 산출한 뛰어난 수리적 분석력 부각',
      draftRecordSnippet: `수학과 미적분 교과에서 배운 '지수함수와 정적분의 활용'을 응용하여, '${cleanInterest}'의 핵심 지표인 대기 중 온실가스 농도 변화를 정량적으로 분석함. NOAA 마우나로아 관측소의 50개년 데이터를 추출하고 지오지브라로 지수 회귀식을 유도함. 파리협정 1.5℃ 목표 달성을 위한 잔여 탄소 예산을 곡선 아래 정적분 면적으로 도출함으로써 실세계 난제를 수학적으로 규명하는 실증적 탐구력을 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [변인 정의] 연도별 CO2 농도(ppm) 데이터 추출 및 변수 설정',
          focus: '독립변수를 경과 연수 t, 종속변수를 농도 C(t)로 설정',
          protocol: 'NOAA 관측 원시 CSV 데이터를 정제하여 연평균 증가율 산출',
          tools: ['NOAA 데이터', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 지수함수 C(t)=C0*e^(kt) 모델 및 자연로그 변환',
          focus: '선형화(Linearization) 기법을 통한 성장 상수 k 도출',
          protocol: '양변에 자연로그를 취해 1차 회귀방정식 형태로 변환',
          tools: ['수학교과서', '계산기'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 계산] 정적분 구간 계산 및 탄소 예산 면적 도출',
          focus: '지오지브라 정적분 도구를 활용해 2020~2050년 누적 배출 총량 시각화',
          protocol: '상한선 도달 시점을 방정식의 해로 산출',
          tools: ['지오지브라', '파이썬'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 배출 감축 시나리오별 민감도 분석 및 세특 완성',
          focus: '선형 감축 vs 비선형 감축 경로의 오차 분석 및 세특 기재',
          protocol: '보고서 작성 및 500자 완성형 문안 제출',
          tools: ['세특 문안', '결과 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '과학/공학 (통합과학 / 지구과학 / 화학)',
      subjectCategory: 'science',
      curriculumConcept: '화학I/II: 화학 평형과 르샤틀리에 원리 / 효소 촉매 반응 / 지구과학I: 지구 복사 평형과 온실 효과',
      topic: `해양 산성화에 따른 탄산칼슘(CaCO3) 용해 평형 이동 및 미세플라스틱 분해 효소(PETase) 촉매 메커니즘`,
      inquiryQuestion: `대기 중 CO2 용해로 인한 해양 pH 저하는 산호초의 탄산칼슘 평형을 어떻게 역방향으로 이동시키며, 고효율 재조합 효소는 플라스틱 결합을 어떻게 분해하는가?`,
      connectionRationale: `기후변화와 오염 문제는 화학 평형과 생화학적 촉매 작용의 결합입니다. 화학의 '르샤틀리에 원리'와 지구과학의 '지구 시스템 탄소 순환'을 연계하여 환경 복원 기술의 메커니즘을 밝힙니다.`,
      methodology: `pH 센서를 활용한 탄산수 완충 실험, 분자 뷰어로 PETase 효소와 PET 플라스틱 기질 간 에스테르 결합 분해 3차원 입체구조 시뮬레이션`,
      recommendedTools: ['MBL 디지털 센서', 'PDB 3D 분자 뷰어', '국립수산과학원 해양 통계'],
      readingRecommendation: '《침묵의 봄》(레이첼 카슨), 《부분과 전체》(베르너 하이젠베르크)',
      recordTip: '교내 과학실 MBL 센서로 정밀 실험을 수행하고 분자 수준의 효소 촉매 메커니즘을 화학 평형으로 해석한 우수한 과학 탐구력 기재',
      draftRecordSnippet: `화학II의 '화학 평형과 르샤틀리에 원리' 단원을 지구과학의 해양 환경과 연계하여, '${cleanInterest}'의 환경 메커니즘을 규명함. 교내 MBL 센서를 이용해 CO2 농도에 따른 해수 모의 용액의 pH 변화를 정밀 측정하고 탄산칼슘 침전 평형이 이동하는 과정을 실증함. 나아가 PDB 3D 뷰어로 플라스틱 분해 효소의 활성 부위 구조를 시각화하여 환경 정화 기술의 화학적 타당성을 제시함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 해수 용존 탄산 이온 농도와 pH 상관 가설 설정',
          focus: '대기 중 CO2 분압 증가에 따른 해수 산성화 반응식 설정',
          protocol: '조작 변인으로 CO2 주입량, 종속 변인으로 pH 및 침전물 무게 설정',
          tools: ['MBL 센서', '비커'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 르샤틀리에 원리와 탄산 완충계(H2CO3/HCO3-) 분석',
          focus: '화학 평형 상수 Ksp 계산 및 용해도곱 원리 고찰',
          protocol: '화학II 교과서와 해양학 논문 2편 비교',
          tools: ['화학 교과서', '학술 논문'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 실험] MBL 센서 pH 반복 계측 및 PDB 3D 구조 분석',
          focus: '시간에 따른 pH 강하 곡선 작성 및 효소 결합각 시각화',
          protocol: '5회 반복 측정 평균값 산출 및 MolView 결합 모델링',
          tools: ['MBL 센서', 'MolView'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 온도 및 염분 요인에 따른 오차 보정 및 세특 완성',
          focus: '실험실 모의 해수와 실제 해양 환경의 차이 분석 및 세특 기재',
          protocol: '500자 완성형 세특 문안 작성 및 제출',
          tools: ['세특 문안', '실험 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '사회/윤리 (통합사회 / 경제 / 생활과 윤리)',
      subjectCategory: 'social',
      curriculumConcept: '경제: 시장 실패와 외부효과 / 피구세(탄소세)와 배출권 거래제(K-ETS)의 경제적 효율성 비교',
      topic: `외부 불경제 극복을 위한 피구세(탄소세)와 배출권 거래제(K-ETS)의 경제적 유인 및 감축 효율성 분석`,
      inquiryQuestion: `기업의 온실가스 배출이라는 부정적 외부효과를 내부화할 때, 가격 규제(탄소세)와 수량 규제(배출권 거래제) 중 시장 효율성과 사회적 총잉여를 극대화하는 정책 조합은 무엇인가?`,
      connectionRationale: `환경오염은 대표적인 시장 실패(부정적 외부효과)입니다. 경제 교과의 '한계저감비용과 외부효과의 내부화' 이론을 적용해 탄소중립 실현을 위한 가장 시장 친화적이고 효율적인 정책 메커니즘을 설계합니다.`,
      methodology: `한국거래소(KRX) 배출권 시장 최근 3개년 가격 데이터 분석, 한계감축비용(MAC) 곡선 간이 모델링 및 비용편익분석(B/C Ratio) 산출`,
      recommendedTools: ['KRX 배출권 시장 통계', 'KOSIS 국가통계포털', '온실가스종합정보센터'],
      readingRecommendation: '《기후변화의 경제학》(윌리엄 노드하우스), 《정의란 무엇인가》(마이클 샌델)',
      recordTip: '단순 환경 당위론을 넘어 경제학의 엄밀한 외부효과 내부화 모형과 통계 데이터를 기반으로 정책 대안을 설계한 우수한 경제 분석력 부각',
      draftRecordSnippet: `경제 과목의 '시장 실패와 외부효과' 단원을 심화하여, '${cleanInterest}'의 해결을 위한 시장 메커니즘을 고찰함. KRX 탄소배출권(K-ETS) 거래 시장의 실제 가격 변동 데이터를 수집하고, 피구세와 배출권 거래제의 경제적 효율성을 비교 분석함. 탄소세 도입 시 취약 계층의 에너지 비용 부담을 완화하는 '탄소 배당(Carbon Dividend)' 정책을 제안하여 경제적 효율과 사회적 형평성을 조화시킴.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 배출권 가격 변동성과 기업 감축 투자 유인 왜곡 가설',
          focus: '배출권 가격 하락 시 기업의 친환경 설비 투자 지연 메커니즘 분석',
          protocol: 'KRX 최근 3개년 월별 배출권 종가 데이터 수집',
          tools: ['KRX 통계', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 사회적 한계비용(SMC)과 사적 한계비용(PMC) 괴리 수식화',
          focus: '피구세 최적 세율 t* = 사회적 한계피해(SMD) 일치 조건 도출',
          protocol: '경제 교과서와 한국은행 경제연구원 보고서 매핑',
          tools: ['경제 교과서', '학술 보고서'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 분석] 탄소 가격 시나리오별 기업 감축 비용 시뮬레이션',
          focus: '톤당 1만원 vs 3만원 시나리오에 따른 산업계 한계감축비용 추정',
          protocol: '엑셀을 활용한 사회적 잉여(Social Surplus) 변화량 계산',
          tools: ['Excel', '그래프'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 배출권 무상할당 비판 및 세특 포트폴리오 등록',
          focus: '무상할당 비율에 따른 가격 왜곡 극복 방안 및 500자 세특 기재',
          protocol: '정책 제언서 작성 및 제출',
          tools: ['세특 문안', '정책 기안서'],
        },
      ],
    });

    subjects.push({
      subject: '국어 (독서 / 화법과 작문)',
      subjectCategory: 'korean',
      curriculumConcept: '독서: 과학 저널리즘 비판적 독해 / 화법과 작문: 환경 재난 보도 프레임 분석과 시민 설득 담화',
      topic: `환경 재난 보도 텍스트의 '종말론적 무기력' 프레임 비판과 시민 참여를 유도하는 희망 담화 전략`,
      inquiryQuestion: `환경 위기를 다루는 언론의 종말론적(Apocalyptic) 프레임은 대중에게 기후 무기력증을 어떻게 유발하며, 행동 변화를 촉진하는 대안적 프레이밍 전략은 무엇인가?`,
      connectionRationale: `환경 위기는 과학적 사실뿐 아니라 대중이 이를 어떻게 인식하고 행동하느냐에 달려 있습니다. 국어과의 '비판적 담화 분석'을 적용해 공포 마케팅을 넘어 실천을 이끄는 언어적 소통 전략을 연구합니다.`,
      methodology: `기후 위기 관련 주요 방송 뉴스 10편의 보도 어휘 분석, 툴민 논증 모형 적용 및 시민 실천형 칼럼 기고문 작성`,
      recommendedTools: ['빅카인즈 (BIG Kinds)', '비판적 담화 분석(CDA) 도구', '뉴스 아카이브'],
      readingRecommendation: '《지구를 살리는 기후위기 보고서》, 《생각의 탄생》',
      recordTip: '환경 텍스트에 내재된 언어적 프레임을 날카롭게 분석하고 시민의 능동적 참여를 이끌어내는 탁월한 문해력 및 작문 역량 기술',
      draftRecordSnippet: `독서와 작문 과목에서 텍스트의 설득 전략과 사회적 영향력을 깊이 있게 탐구함. 빅카인즈 뉴스 분석을 통해 '${cleanInterest}' 관련 언론 보도가 지나치게 공포와 종말론적 서사에 편중되어 대중의 '기후 무기력증'을 초래함을 언어학적으로 규명함. 대안적 프레이밍으로서 '지역 공동체 기반 실천 담론'의 구조를 정립하고 급우들과 시민들의 행동 변화를 촉진하는 설득적 칼럼을 집필함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 기후 재난 보도 헤드라인의 감정 어휘 빈도 분석',
          focus: '재앙, 파멸 등 극단적 어휘 사용 비율 가설 수립',
          protocol: '빅카인즈에서 기후위기 관련 헤드라인 50건 추출',
          tools: ['빅카인즈', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 프레이밍 이론(Entman) 및 비판적 담화 분석',
          focus: '원인 규정, 도덕적 판단, 해결책 제시의 4단계 프레임 기능 분해',
          protocol: '국어 교과서 담화 분석 단원과 언론학 논문 매핑',
          tools: ['국어 교과서', '학술 논문'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 분석] 대안적 실천 프레임의 설득력 비교 설문 조사',
          focus: '학급 급우 30명 대상 공포 소구 vs 효능감 소구 문안 선호도 측정',
          protocol: '구글 폼 설문지 제작 및 통계 분석',
          tools: ['Google Forms', 'Excel'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 시민 참여형 환경 칼럼 집필 및 세특 완성',
          focus: '학생 자치 실천 강령 제정 및 500자 완성형 세특 기재',
          protocol: '칼럼 교내 게시판 공유 및 세특 포트폴리오 등록',
          tools: ['세특 문안', '칼럼 전문'],
        },
      ],
    });

    subjects.push({
      subject: '영어 (영어독해와 작문 / 심화 영어)',
      subjectCategory: 'english',
      curriculumConcept: '심화 영어: IPCC 평가보고서 원문 독해 / EU 탄소국경조정제도(CBAM) 영문 정책 브리프',
      topic: `IPCC 제6차 평가보고서(AR6) SPM 요약문 독해 및 글로벌 탄소국경조정제도(CBAM) 영문 분석`,
      inquiryQuestion: `국제기구는 기후변화의 불확실성을 학술 영문에서 어떻게 확률적 신뢰도 수준(Virtually certain, Likely)으로 표준화하여 서술하는가?`,
      connectionRationale: `환경 정책의 글로벌 규범은 UN과 EU 등 국제기구의 영문 보고서로 정립됩니다. 영어과의 '국제기구 원문 독해'를 통해 글로벌 환경 무역 규범(CBAM)을 심층 이해하는 글로벌 역량을 기릅니다.`,
      methodology: `IPCC AR6 정책결정자를 위한 요약본(SPM) 원문 강독, 학술 확률 표현(Calibrated Language) 분석 및 250단어 영문 정책 브리프 작성`,
      recommendedTools: ['IPCC Official Website (ipcc.ch)', 'UNFCCC 문서 아카이브', 'Academic Word List'],
      readingRecommendation: '《Drawdown》(폴 호큰 영문판), IPCC AR6 SPM 원문',
      recordTip: 'UN 공식 기후 평가보고서의 엄밀한 학술 영문 표현을 독해하고 글로벌 무역 규제 동향을 영문으로 정리한 탁월한 어학 역량 부각',
      draftRecordSnippet: `심화영어 독해 수업 중 UN IPCC 제6차 평가보고서(AR6)의 정책결정자 요약본(SPM) 원문을 직접 탐독함. 국제 학술계가 미래 예측의 불확실성을 표현할 때 사용하는 'Calibrated Language(확률적 신뢰도 표현)'를 통계학적 척도와 매핑하여 분석함. EU의 탄소국경조정제도(CBAM)가 국내 수출 기업에 미칠 영향을 분석한 영문 정책 브리프를 성공적으로 집필함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] IPCC 신뢰도 표현(Very likely >90% 등) 매핑',
          focus: '정량적 확률 구간과 영문 서술어의 엄밀한 일대일 대응 구조 분석',
          protocol: 'IPCC 가이드라인 문서에서 정의된 5단계 신뢰도 표 추출',
          tools: ['IPCC 문서', 'PDF 리더'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] CBAM 규정 조문 내 Scope 1, Scope 2 배출량 영문 정의',
          focus: '유럽의회 입법 조문 내 핵심 무역 어휘 30선 발췌',
          protocol: '어휘장 작성 및 구문 분석 노트 완성',
          tools: ['EU 법률안', '영어 사전'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 방법] 250단어 영문 Policy Brief 작성 및 피어 리뷰',
          focus: 'Executive Summary - Economic Impact - Recommendations 3단 작성',
          protocol: '영문 보고서 초안 작성 및 Grammarly 감수',
          tools: ['Grammarly', 'Google Docs'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 글로벌 기후 규범의 형평성 고찰 및 세특 정리',
          focus: '개도국과 선진국의 역사적 책임 갈등 고찰 및 500자 세특 기재',
          protocol: '최종 보고서 제출',
          tools: ['세특 문안', '영문 포트폴리오'],
        },
      ],
    });

    subjects.push({
      subject: '정보/융합 (정보 / 데이터 과학)',
      subjectCategory: 'tech',
      curriculumConcept: '정보: 공공데이터 Open API 연계 및 파이썬 Pandas / 탐색적 데이터 분석(EDA)과 대시보드 시각화',
      topic: `기상청 공공데이터 Open API 연계 및 파이썬을 활용한 지역별 기후 이상 징후 분석 대시보드 제작`,
      inquiryQuestion: `공공데이터포털의 종관기상관측(ASOS) 대용량 API 데이터를 파이썬으로 자동 수집하여 최근 30개년 이상 고온 일수의 통계적 이상치를 어떻게 감지할 것인가?`,
      connectionRationale: `현대 환경 연구의 강력한 무기는 빅데이터와 데이터 사이언스입니다. 정보과의 '공공 API 수집'과 '파이썬 데이터 정제 및 시각화'를 통해 환경 데이터를 능동적으로 분석합니다.`,
      methodology: `공공데이터포털(data.go.kr) 기상청 API 인증키 발급, Python Requests로 JSON 파싱, Pandas 데이터 정제 및 Streamlit/Matplotlib 대시보드 구현`,
      recommendedTools: ['공공데이터포털 (data.go.kr)', 'Python Pandas / Seaborn', 'Jupyter Notebook'],
      readingRecommendation: '《모두의 데이터 과학》(레이철 슈트), 《파이썬 데이터 분석 실무》',
      recordTip: '공공 API를 직접 호출하고 결측치 정제 및 이상치 탐지 알고리즘을 파이썬으로 완벽 구현한 뛰어난 데이터 엔지니어링 역량 기술',
      draftRecordSnippet: `정보 교과에서 배운 데이터 분석 기법을 실생활 환경 문제에 접목하여, '${cleanInterest}' 관련 공공데이터 분석 프로젝트를 주도함. 공공데이터포털의 종관기상관측 Open API를 파이썬으로 연동해 최근 30개년 기온 및 강수량 데이터를 실시간 수집함. Pandas로 결측치를 정제하고 사분위수(IQR)를 활용한 이상치 감지 알고리즘을 구현하여 지역별 기후 이상 징후를 시각화하는 대시보드를 완성함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 공공 API 호출 파이프라인 및 결측치 정제 가설',
          focus: '대용량 JSON 응답 데이터 파싱 및 시간대별 결측치 보정 방안',
          protocol: 'data.go.kr 인증키 발급 및 요청 URL 파라미터 설계',
          tools: ['Postman', 'Python Requests'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] IQR 사분위수 기반 이상치(Outlier) 검출 수식화',
          focus: 'Q1 - 1.5*IQR 및 Q3 + 1.5*IQR 경계값 통계 공식 매핑',
          protocol: '정보 교과서 데이터 분석 단원과 통계 공식 연계',
          tools: ['정보 교과서', '수학 공식'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 구현] Pandas 데이터프레임 가공 및 히트맵 대시보드',
          focus: '연도별 최고기온 33도 이상 폭염 일수 추이 시각화',
          protocol: '파이썬 스크립트 작성 및 Matplotlib 그래프 저장',
          tools: ['Pandas', 'Seaborn'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 센서 노후화에 따른 계측 오차 분석 및 세특 완성',
          focus: '관측 지점 도시화 효과(UHI) 보정 한계 분석 및 500자 세특 기재',
          protocol: '코드 주석 및 500자 완성형 세특 포트폴리오 기재',
          tools: ['세특 문안', '깃허브 코드'],
        },
      ],
    });
  }

  // ==========================================
  // Domain 4: General / Hybrid / Cross-Disciplinary Fallback
  // (Ensures zero cookie-cutter templates, deeply customized!)
  // ==========================================
  else {
    const interestCore = cleanInterest.slice(0, 24);
    majorOverview = `'${cleanInterest}' 분야는 교과서의 기본 개념과 최신 학술 연구가 만나는 흥미로운 융합 연구 영역입니다. 학생부종합전형에서는 이 주제를 단편적 상식으로 조사하는 데 그치지 않고, 수학의 정량적 모델링과 데이터 분석, 과학의 물리·생화학적 메커니즘 규명, 사회의 제도·윤리적 함의 고찰, 국어와 영어의 비판적 텍스트 독해와 학술 논증, 정보의 알고리즘적 문제 해결로 체계화할 때 가장 차별화된 학업 역량을 입증할 수 있습니다.`;
    connectionSummary = `학생의 관심 연구 분야인 '${cleanInterest}'을 6개 교과와 융합하여, 수학에서는 핵심 변인 간 인과관계를 '미적분의 변화율과 통계적 회귀선'으로 정량화하고, 과학에서는 현상의 기저 원리를 '실험 설계와 인과 메커니즘'으로 규명하며, 사회에서는 '공공 정책 및 윤리적 가이드라인'을 분석합니다. 국어는 학술 쟁점의 논증 타당성을 검증하고, 영어는 해외 SCI 논문 원문을 해독하며, 정보는 공공데이터 분석 알고리즘을 구현하여 완성도 높은 포트폴리오를 제공합니다.`;

    subjects.push({
      subject: '수학 (미적분 / 확률과 통계)',
      subjectCategory: 'math',
      curriculumConcept: '미적분: 변화율과 접선의 기울기 / 확률과 통계: 최소제곱법 선형 회귀분석 및 결정계수(R²)',
      topic: `'${interestCore}' 시스템의 시간에 따른 동적 변화율 분석과 데이터 회귀 모델링`,
      inquiryQuestion: `이 시스템의 상태를 결정짓는 핵심 독립변수와 종속변수 사이의 상관관계를 다항함수로 피팅할 때, 최적의 수렴성과 최소 잔차(RSS)를 보이는 수학적 모델은 무엇인가?`,
      connectionRationale: `실세계의 복합적인 현상은 모두 시간에 따른 변화율과 상관관계로 수식화할 수 있습니다. 미적분의 '순간변화율'과 확률과 통계의 '최소제곱법 회귀식'을 적용해 '${cleanInterest}' 현상의 수학적 규칙성을 도출합니다.`,
      methodology: `공공 데이터 또는 선행 연구 관측치를 수집하여 산점도를 작성하고, 지오지브라/파이썬을 활용해 1차 및 2차 회귀곡선 수식 유도 및 오차(R-squared) 검증`,
      recommendedTools: ['지오지브라 (GeoGebra)', 'Excel 통계 팩', '파이썬 NumPy'],
      readingRecommendation: '《미적분의 힘》(스티븐 스트로가츠), 《수학, 인문으로 수를 읽다》(이광연)',
      recordTip: '현상 속에서 수학적 함수 관계를 포착하고 회귀방정식을 유도하여 통계적 설명력을 검증한 우수한 수리적 직관과 탐구력 강조',
      draftRecordSnippet: `교과 수업 중 '미분계수의 기하학적 의미'와 '회귀분석' 단원을 이수하며, 평소 관심을 두었던 '${cleanInterest}' 현상에 내재된 수학적 규칙성을 탐구함. 관측 데이터를 수집하여 산점도를 작성하고 최소제곱법을 적용해 2차 다항 회귀곡선을 직접 유도함. 결정계수(R²)를 산출하여 모델의 적합도를 객관적으로 검증하는 등 현상을 수학적 언어로 환원해내는 뛰어난 수리 모델링 역량을 보임.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [변인 정의] 독립변수와 종속변수 조작적 정의 및 가설 설정',
          focus: '현상에서 통제 가능한 변수와 관측 대상을 수치화 가능한 척도로 정의',
          protocol: '변인 통제 설계서 작성 및 가설 진술문 명시',
          tools: ['Excel', '설계서'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 미적분 순간변화율 및 최소제곱법 공식 유도',
          focus: '잔차 제곱합을 최소화하는 정규방정식(Normal Equation) 유도 과정 분석',
          protocol: '교과서 미분 공식과 통계 회귀 이론 매핑',
          tools: ['수학 교과서', '노트'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 분석] 지오지브라 동적 피팅 및 결정계수(R²) 계산',
          focus: '지오지브라 슬라이더로 계수 a, b를 조작하며 관측치와의 일치도 관찰',
          protocol: '상관계수 및 잔차 분포도 작성',
          tools: ['지오지브라', '파이썬'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 비선형 외란 요인 분석 및 세특 완성',
          focus: '단순 근사의 한계점 비판 및 차년도 다변수 미적분 후속 과제 제언',
          protocol: '500자 완성형 세특 문안 작성 및 제출',
          tools: ['세특 문안', '결과 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '과학/공학 (통합과학 / 물리학 / 화학 / 생명과학)',
      subjectCategory: 'science',
      curriculumConcept: '과학 탐구 방법론: 가설-연역적 탐구 / 화학·물리: 에너지 보존 및 반응 속도 조절 메커니즘',
      topic: `'${interestCore}' 시스템의 물리화학적 메커니즘과 에너지 전달 효율 분석`,
      inquiryQuestion: `이 시스템에서 에너지와 물질이 상호작용할 때 발생하는 손실 요인은 무엇이며, 외부 환경 조건 변화에 따른 반응 효율은 어떻게 달라지는가?`,
      connectionRationale: `모든 기술과 자연 현상은 과학의 에너지 보존과 화학적/물리적 상호작용 법칙을 따릅니다. 과학 교과의 '가설-연역적 탐구 절차'를 통해 현상의 핵심 인과 메커니즘을 밝혀냅니다.`,
      methodology: `선행 연구 논문 2편의 실험 프로토콜 비교 분석, 교내 센서 또는 시뮬레이션 소프트웨어를 활용한 변인 통제 모의실험 보고서 작성`,
      recommendedTools: ['교내 MBL 디지털 계측 센서', 'KCI 선행 연구 논문', 'PhET 대화형 과학 시뮬레이션'],
      readingRecommendation: '《부분과 전체》(베르너 하이젠베르크), 《생각의 탄생》(로버트 루트번스타인)',
      recordTip: '가설 설정의 타당성과 변인 통제의 엄밀성을 철저히 지키며 오차 원인을 스스로 분석한 성실한 과학적 탐구 태도 부각',
      draftRecordSnippet: `과학 교과의 '가설-연역적 탐구 방법론'을 바탕으로, '${cleanInterest}'의 핵심 물리화학적 메커니즘을 규명하는 실험을 기획함. 독립변수를 엄격히 통제한 대조군과 실험군을 설계하고, 센서 계측을 통해 시간에 따른 반응 수치 변화를 정량 측정함. 장비의 분해능 한계로 발생한 오차를 통계적으로 보정하고 대안적 가설을 제시하는 등 연구자로서의 깊이 있는 탐구 자세를 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 물리화학적 인과 가설 설정 및 변인 통제',
          focus: '외부 외란 요인을 차단하기 위한 통제 변인 3가지 리스트업',
          protocol: '실험 설계서 및 안전 점검표 작성',
          tools: ['실험 설계서', '교재'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 에너지 보존 법칙 및 화학 평형 원리 매핑',
          focus: '교과서 원리가 최신 학술 논문에서 어떻게 응용되는지 개념 관계도 도출',
          protocol: 'KCI 등재 선행 연구 논문 2편 강독',
          tools: ['KCI 논문', '과학 교과서'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 측정] 5회 반복 계측 및 평균·표준편차 산출',
          focus: '측정 데이터의 신뢰도를 확보하기 위한 반복 측정 및 산점도 시각화',
          protocol: '센서 측정 및 엑셀 데이터 테이블 입력',
          tools: ['MBL 센서', 'PhET'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 불확도 요인 분석 및 세특 문안 완성',
          focus: '열손실 및 장비 분해능에 따른 불확도 계산 및 500자 세특 기재',
          protocol: '보고서 작성 및 세특 포트폴리오 등록',
          tools: ['세특 문안', '실험 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '사회/윤리 (통합사회 / 생활과 윤리 / 정치와 법)',
      subjectCategory: 'social',
      curriculumConcept: '생활과 윤리: 과학기술의 사회적 책임과 위험 사회 / 정치와 법: 공공 복리와 기본권 보장의 균형',
      topic: `'${interestCore}' 도입에 따른 사회적 갈등 요인과 법·제도적 보완 방안 연구`,
      inquiryQuestion: `이 기술/정책의 확산으로 발생하는 수혜 계층과 소외 계층 간의 갈등을 완화하고 공공 복리를 증진하기 위한 조례 및 규제 가이드라인은 무엇인가?`,
      connectionRationale: `기술과 정책의 발전은 필연적으로 사회적 갈등과 이해관계 충돌을 낳습니다. 사회 교과의 '공공 복리와 기본권 보장', '책임 윤리'를 적용해 공정하고 실현 가능한 정책 대안을 설계합니다.`,
      methodology: `국내외 관련 법령 및 규제 가이드라인 조문 비교 분석, 가상의 모의 이해관계자(정부, 기업, 시민) 3자 공청회 대본 작성`,
      recommendedTools: ['국가법령정보센터 (law.go.kr)', '국회도서관 법률정보', '통계청 KOSIS'],
      readingRecommendation: '《정의란 무엇인가》(마이클 샌델), 《기술의 충격》(케빈 켈리)',
      recordTip: '단순한 찬반 논쟁을 넘어 다각적인 이해관계를 균형 있게 청취하고 현실적인 정책 절충안을 제시한 공동체 역량 부각',
      draftRecordSnippet: `사회 교과에서 '사회 정의와 불평등' 단원을 학습하며, '${cleanInterest}' 분야의 급격한 발전이 가져올 사회적 파급효과와 규제 사각지대에 주목함. 국가법령정보센터를 통해 관련 법률안의 조문을 심층 검토하고 해외 선진 규제 샌드박스 사례와 비교함. 다양한 이해관계자의 상생을 도모하는 '청소년 참여형 정책 제안서'를 입안하여 발표하는 등 성숙한 시민 의식을 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 기술 양극화 및 사회적 갈등 쟁점 발문',
          focus: '관련 정책 도입에 따른 이해당사자별 득실 구조 분석',
          protocol: '신문 기사 및 통계청 지표 조사',
          tools: ['KOSIS', '빅카인즈'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 롤스의 정의론 및 헌법상 기본권 제한의 한계',
          focus: '과잉금지원칙(비례의 원칙) 4단계 적합성 검토',
          protocol: '법률안 조문과 헌법재판소 판례 비교',
          tools: ['국가법령정보센터', '사회 교과서'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 방법] 모의 공청회 대본 작성 및 정책 제안서 초안',
          focus: '정부-기업-시민사회 3자 타협안 도출',
          protocol: '학급 모의 공청회 시나리오 작성',
          tools: ['제안서 양식', 'Word'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 정책 실효성 한계 분석 및 세특 완성',
          focus: '예산 제약과 사회적 수용성 한계 고찰 및 500자 세특 기재',
          protocol: '최종 보고서 작성 및 세특 등록',
          tools: ['세특 문안', '결과 보고서'],
        },
      ],
    });

    subjects.push({
      subject: '국어 (독서 / 화법과 작문)',
      subjectCategory: 'korean',
      curriculumConcept: '독서: 전문 학술 텍스트의 구조적 독해 / 화법과 작문: 툴민(Toulmin) 논증 분석과 비판적 칼럼 집필',
      topic: `'${interestCore}' 관련 학술 담론과 미디어 보도의 프레이밍 편향 분석 및 학술 비평문`,
      inquiryQuestion: `언론과 대중 담론에서 이 주제를 다루는 주요 프레임의 논리적 오류는 무엇이며, 객관적 진실에 다가가기 위한 비판적 문해력의 기준은 무엇인가?`,
      connectionRationale: `모든 전문 지식은 언어 텍스트로 구성되고 유통됩니다. 국어과의 '비판적 텍스트 분석'과 '툴민 논증 모형'을 적용해 미디어의 프레임 왜곡을 걷어내고 객관적 사실을 규명합니다.`,
      methodology: `관련 기사 및 학술 칼럼 5편의 텍스트 구조 분석, 주장-데이터-담보의 논리적 타당성 평가 및 A4 3매 분량의 비평문 작성`,
      recommendedTools: ['빅카인즈 뉴스 분석', '툴민 논증 다이어그램', '국어 교과서'],
      readingRecommendation: '《생각의 탄생》(로버트 루트번스타인), 《과학 콘서트》(정재승)',
      recordTip: '전문 텍스트를 정확하게 독해하고 비판적 안목으로 사회적 함의를 명료하게 도출해내는 탁월한 작문 및 문해력 강조',
      draftRecordSnippet: `독서와 작문 과목에서 텍스트의 논증 타당성을 검증하는 능력이 우수함. '${cleanInterest}'을 다룬 일간지 기사와 학술 칼럼을 툴민의 논증 모형으로 분해하여, 데이터와 주장 사이의 인과적 비약과 프레이밍 편향을 정밀하게 검출함. 객관적 통계 데이터에 근거하여 대중의 오해를 바로잡는 균형 잡힌 학술 비평문을 집필하여 학급 내 높은 호응을 얻음.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 사설 3편의 핵심 주장 및 전제 조건 발췌',
          focus: '감정적 수사 표현과 객관적 사실 진술의 비율 조사',
          protocol: '텍스트 발췌 및 표 정리',
          tools: ['빅카인즈', 'Word'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 툴민 논증 모형을 통한 논리적 비약 검출',
          focus: '담보(Warrant)의 보편타당성 검토',
          protocol: '논증 구조도 작성',
          tools: ['국어 교과서', '다이어그램'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 작문] 비판적 소논설문 초안 작성',
          focus: '반론을 고려한 논리적 글쓰기',
          protocol: 'A4 3매 에세이 집필',
          tools: ['Word', '프린트'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 상호 피드백 및 500자 세특 완성',
          focus: '작문 윤리 준수 및 500자 완성형 세특 기재',
          protocol: '세특 포트폴리오 등록',
          tools: ['세특 문안', '에세이'],
        },
      ],
    });

    subjects.push({
      subject: '영어 (영어독해와 작문 / 심화 영어)',
      subjectCategory: 'english',
      curriculumConcept: '심화 영어: SCI급 국제 논문 IMRaD 구조 분석 / 학술 완곡어법(Hedging) 분석 및 영문 요약서',
      topic: `'${interestCore}' 관련 해외 학술 논문 초록(Abstract) 분석 및 영문 Executive Summary`,
      inquiryQuestion: `국제 학술계 연구자들은 이 분야의 최신 연구 성과와 한계를 영문 저널에서 어떤 완곡어법(Hedging)과 전문 어휘로 서술하는가?`,
      connectionRationale: `첨단 연구의 최전선은 해외 저널을 통해 영어로 소통됩니다. 영어과의 '학술 초록 분석'과 '영문 요약서 작성'을 통해 글로벌 학문 탐구 능력을 입증합니다.`,
      methodology: `Google Scholar 오픈액세스 논문 2편 선정, 핵심 문맥 어휘(AWL) 30선 분석 및 Background-Result-Implication 250단어 영문 리포트 집필`,
      recommendedTools: ['Google Scholar', 'Academic Word List (AWL)', 'Grammarly'],
      readingRecommendation: '《Factfulness》(한스 로슬링 영문판), TED Talks 강연 스크립트',
      recordTip: '영문 학술 문헌을 직접 검색하여 글로벌 연구 트렌드를 파악하고 명료한 학술 영어로 재구성한 뛰어난 외국어 학업 역량',
      draftRecordSnippet: `심화영어 과목에서 Google Scholar를 활용하여 '${cleanInterest}' 관련 국제 학술지 오픈액세스 논문 초록을 주도적으로 탐독함. 저자가 연구 결론을 진술할 때 사용한 완곡어법(Hedging) 표현을 발췌하여 학술적 뉘앙스를 분석함. IMRaD 구조에 맞추어 250단어 분량의 구조화된 영문 Executive Summary를 작성하여 영어 발표를 성공적으로 완수함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 국제 학술 논문 초록의 구조 분석',
          focus: 'Background - Methods - Results - Conclusion 4단 구분',
          protocol: 'Google Scholar 검색 쿼리 작성',
          tools: ['Google Scholar', 'PDF'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] 전공 특화 Academic Word List 30선 정리',
          focus: '완곡어법(may, suggest, indicate) 뉘앙스 분석',
          protocol: '어휘 카드 작성',
          tools: ['AWL', '사전'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 방법] 250단어 영문 리포트 작성',
          focus: '간결하고 정확한 학술 영어 구문 구성',
          protocol: '초안 작성 및 문법 검수',
          tools: ['Grammarly', 'Docs'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 번역 한계 검토 및 세특 완성',
          focus: '한국어 번역본과의 의미 비교 및 500자 세특 기재',
          protocol: '세특 포트폴리오 등록',
          tools: ['세특 문안', '영문 리포트'],
        },
      ],
    });

    subjects.push({
      subject: '정보/융합 (정보 / 인공지능 기초)',
      subjectCategory: 'tech',
      curriculumConcept: '정보: 알고리즘 설계 및 빅데이터 분석 / 파이썬을 활용한 문제 해결 모델링',
      topic: `'${interestCore}' 관련 공공 데이터 수집 및 파이썬 알고리즘 모델링 프로젝트`,
      inquiryQuestion: `실제 공개된 대용량 통계 데이터셋에서 핵심 패턴을 도출하고 의사결정을 자동화하는 알고리즘을 어떻게 파이썬으로 구현할 수 있는가?`,
      connectionRationale: `모든 학문 분야는 컴퓨팅 사고력과 데이터 분석을 통해 혁신됩니다. 정보과의 '알고리즘 설계'와 '데이터 시각화'를 통해 실세계 문제를 기술적으로 해결합니다.`,
      methodology: `공공데이터포털 Open API 또는 CSV 데이터를 추출하고, 파이썬 Pandas/Matplotlib으로 상관분석 및 알고리즘 흐름도 설계`,
      recommendedTools: ['공공데이터포털 (data.go.kr)', 'Python (Jupyter Notebook)', 'Pandas/Matplotlib'],
      readingRecommendation: '《알고리즘, 인생을 계산하다》(브라이언 크리스천), 《모두의 데이터 과학》',
      recordTip: '단순 프로그래밍 문법을 넘어 문제 해결을 위해 알고리즘을 추상화하고 데이터 분석 전 과정을 완수한 융합 컴퓨팅 사고력 기술',
      draftRecordSnippet: `정보 교과에서 배운 '알고리즘과 데이터 분석' 단원을 실생활 문제에 접목하여, '${cleanInterest}' 관련 공공 데이터를 파이썬으로 분석하는 프로젝트를 수행함. 공공데이터포털의 원시 데이터를 수집하고 Pandas로 결측치 정제 및 상관관계 분석을 수행함. 알고리즘 흐름도를 설계하여 자동화된 예측 모델을 구축하는 등 우수한 컴퓨팅 문제해결력을 입증함.`,
      concreteSteps: [
        {
          stepNum: 1,
          stepName: '1단계: [문제 도출] 데이터셋 선정 및 알고리즘 입출력 정의',
          focus: '입력 데이터 형식과 기대 출력값의 알고리즘 흐름도 도식화',
          protocol: '공공데이터포털 검색 및 CSV 다운로드',
          tools: ['data.go.kr', 'Excel'],
        },
        {
          stepNum: 2,
          stepName: '2단계: [이론 고찰] Big-O 시간 복잡도 및 정렬/탐색 알고리즘 매핑',
          focus: '데이터 크기 N에 따른 알고리즘 효율성 수식화',
          protocol: '정보 교과서 알고리즘 단원 연계',
          tools: ['정보 교과서', '파이썬'],
        },
        {
          stepNum: 3,
          stepName: '3단계: [실증 구현] 파이썬 Pandas 정제 및 시각화 스크립트 작성',
          focus: '히트맵 및 산점도 시각화',
          protocol: 'Jupyter Notebook 코드 작성',
          tools: ['Jupyter', 'Pandas'],
        },
        {
          stepNum: 4,
          stepName: '4단계: [오차·세특] 알고리즘 벤치마킹 및 세특 완성',
          focus: '실행 시간 측정 및 500자 완성형 세특 기재',
          protocol: '코드 주석 및 세특 포트폴리오 등록',
          tools: ['세특 문안', '코드'],
        },
      ],
    });
  }

  // Filter by selected subjects if user specified
  const filteredSubjects =
    selectedSubjects && selectedSubjects.length > 0
      ? subjects.filter((s) =>
          selectedSubjects.some(
            (sel) =>
              sel.includes(s.subject.split(' ')[0]) ||
              sel.toLowerCase().includes(s.subjectCategory)
          )
        )
      : subjects;

  const finalSubjects = filteredSubjects.length >= 3 ? filteredSubjects : subjects;

  // Build high-depth MindMap with authentic tailored nodes
  const mindmap: MindMapNode = {
    id: `root-${Date.now()}`,
    text: cleanInterest,
    category: 'root',
    nodeType: 'root',
    color: '#4f46e5',
    detail: `학생 핵심 관심 분야: ${cleanInterest} (희망 진로: ${cleanMajor}, 대상: ${grade})`,
    children: finalSubjects.map((sub, idx) => {
      const branchColor =
        sub.subjectCategory === 'math'
          ? '#0284c7'
          : sub.subjectCategory === 'science'
          ? '#059669'
          : sub.subjectCategory === 'social'
          ? '#d97706'
          : sub.subjectCategory === 'korean'
          ? '#7c3aed'
          : sub.subjectCategory === 'english'
          ? '#9333ea'
          : '#e11d48';

      const topicColor =
        sub.subjectCategory === 'math'
          ? '#38bdf8'
          : sub.subjectCategory === 'science'
          ? '#34d399'
          : sub.subjectCategory === 'social'
          ? '#fbbf24'
          : sub.subjectCategory === 'korean'
          ? '#a78bfa'
          : sub.subjectCategory === 'english'
          ? '#c084fc'
          : '#fb7185';

      return {
        id: `branch-${sub.subjectCategory}-${idx}`,
        text: `[${sub.subjectCategory.toUpperCase()}] ${sub.subject.split(' ')[0]} 교과 연계`,
        category: sub.subjectCategory,
        color: branchColor,
        subject: sub.subject,
        nodeType: 'subject',
        detail: sub.curriculumConcept,
        curriculumConcept: sub.curriculumConcept,
        connectionRationale: sub.connectionRationale,
        recommendedTools: sub.recommendedTools,
        children: [
          {
            id: `topic-${sub.subjectCategory}-${idx}`,
            text: sub.topic,
            category: sub.subjectCategory,
            color: topicColor,
            subject: sub.subject,
            nodeType: 'topic',
            detail: sub.connectionRationale,
            inquiryQuestion: sub.inquiryQuestion,
            methodology: sub.methodology,
            curriculumConcept: sub.curriculumConcept,
            connectionRationale: sub.connectionRationale,
            recommendedTools: sub.recommendedTools,
            readingRecommendation: sub.readingRecommendation,
            recordTip: sub.recordTip,
            children: sub.concreteSteps.map((step) => ({
              id: `step-${sub.subjectCategory}-${step.stepNum}-${idx}`,
              text: step.stepName,
              category: sub.subjectCategory,
              color: branchColor,
              subject: sub.subject,
              nodeType: 'process_step',
              detail: `${step.focus} (${step.protocol})`,
              inquiryQuestion: sub.inquiryQuestion,
              methodology: step.protocol,
              readingRecommendation: sub.readingRecommendation,
              recordTip: sub.recordTip,
              recommendedTools: step.tools,
              children: createTailoredActionChildren(
                step.stepNum,
                sub.subjectCategory,
                sub.topic,
                sub.subject,
                sub.curriculumConcept,
                step.protocol,
                step.tools,
                cleanInterest
              ),
            })),
          },
        ],
      };
    }),
  };

  return {
    majorOverview,
    connectionSummary,
    subjects: finalSubjects,
    mindmap,
  };
}
