# SelfManageBot(SMB)

<aside>
💡 자기관리 봇 프로젝트 : 공부한 내용 기록 및 피드백 목적. 추후 가계부도 넣을 예정. https://github.com/yewl1110/selfManageHelpBot-backend

</aside>

# 🪄필요한 기능

차트 부분은 [https://apexcharts.com/](https://apexcharts.com/) 참고. 더 나은 라이브러리 있다면 채택함.

1. bcrypt를 이용해서 암호화된 로그인 아이디가 있어서 로그인할 때 복호화 필요. 자세한 건 env파일 참고.
2. Todo
    1. 무한 스크롤이 아닌 페이지 별로 가져올 예정
    2. 화면에서 CRUD 기능 필요
    3. 봇에서는 진행도 0%, 100%밖에 표현안함.
    4. Update
        1. 진행도 변경할때
        2. 완료, 미완료 버튼 클릭시 상태값 변경
        3. Todo 내용 바꿀 때
    5. Delete - (todoId값 참조)
    6. Insert
3. Study
    1. Insert, Update, Delete기능은 필요하지 않음. (오직 디코 봇으로만 제어할 예정)
    2. 기간에 따른 공부량, 내용 등을 보여줄 예정임(DB의 시작시간과 종료시간 참고)
        1. 따라서 기간에 맞는 DB값을 가져올 필요성 있음
    3. 목표했던 공부시간을 채웠는지를 UI로 그릴 예정(ChannelUserGoal와 Study 테이블 참고)

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled.png)

    4. 공부 진행했던 시간대 표기.(규칙적인 공부습관을 위한 피드백을 위한 그래프)

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%201.png)

4. Account Book
    1. CRUD 다 필요함.
    2. Create : 테이블에 맞는 정보를 입력할 수 있어야함. Date부분은 봇 에서는 오늘날짜로만 가능하지만 웹에서는 설정가능 할 수 있게끔 할 것.
    3. Read : 돈의 경우 고정, 변동 금액으로 구분되어있음. isFixed 가 true 면 고정, false면 변동.
        1. 변동 금액 - DB에서 가져올 땐 특정 기준(한달, 일주일 등)으로 변동지출 부분을 가져와야함.
        2. 고정 금액 - 기준 없이 고정 금액의 경우 모든 데이터를 가져와야함.
    4. Delete : 각 값마다 id가 있기 때문에 id기준으로 지울 예정
    5. Update : 잘 못 입력했을 때를 대비한 기능. 주로 고정지출 금액에 변동사항이 생기면 사용할 예정.

# 🗓️Part

[일정표](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%91%E1%85%AD%20c2043ea84b534a839ed4f4032fc9135a.csv)

# 🏞️ Frontend (React)

봇이 저장한 데이터를 차트 등으로 보여주는 역할

가계부가 추가 된다면 가계부도 차트 등으로 통계를 보여주도록 할 것.(즉 위에서 **확장가능하게** 제작해야함)

|  | url1 | url2 |
| --- | --- | --- |
| 로그인 | /login |  |
| 메인 | / |  |
| 공부 | /study |  |
| todo | /todo |  |
| 가계부 | /account |  |
|  |  |  |

[Light Bootstrap Dashboard React by Creative Tim](https://www.creative-tim.com/product/light-bootstrap-dashboard-react)

[React Free Templates](https://www.creative-tim.com/templates/react-free)

- 정해진 layout 없음
- 보여줄 정보 :
    - 개인 목표 달성율
        - 하루 달성율
        - 7일 평균 달성율
        - 7일을 한번에 보여주는 거(차트쓰면될듯)
    - 공부한 내용
        - 타임라인 형식으로
    - Todo List
        - 완료체크 기능이 있어야함
        - 완료체크를 누른 todo는 삭제 및 체크해제 불가
- 차트 : chartjs
- Alert : SweetAlert2
- Decode : bcrypt
- Todo Checking 부분은 한번에 많은 db호출이 있을 수도 있으니 lodash의 debounce사용.(더 좋은 것이 있다면 그거 사용해도 상관 x)

# 🔧 Backend (?? & Node.js)

- DB에 있는 정보를 뿌려주는 역할 (REST API)

    [REST API](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/REST%20API%20a21b53286c1f48f885995f9b53ee07f1.csv)


# 🔋 Bot Server (Nodejs - [Discord.js](https://discord.js.org/))

봇은 자기가 공부했던 내용과 시간 등을 기록하고 Todo List형식으로 할일을 기록하는 기능으로 제작할 예정. 앞의 기능들을 제작 후 가계부도 만들 예정임. 가계부는 개인정보가 담겨있기 때문에 따로 처리가 필요할 것 같음.

## 가) 고려사항 및 일정

- Log(Winston) ⇒ Info, Error Log
- Variables ⇒ Camel Case
- Code Convention ⇒ EsLint, Prettier, Typescript
- Dependencies Injection ⇒ Awilix ( Type 재정의 필요 )

    [Awilix cradle 타입 재정의](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Awilix%20cradle%20%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20%E1%84%8C%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4%2039800f1aba8b49db8114a480bda3f92f.md)


[Todo](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Todo%206b4f71a98a0349e8b2a6f172e7896f39.csv)

## 나) Command

- Param에 있는 **opt는 optional의 줄임말**.
- init하기 전에는 다른 커맨드 실행불가
- enrollUser아래의 커맨드들은 enrollUser를 하기 전까진 실행 불가
- commit은 git의 commit역할을 하고 end는 git의 push역할을 담당함.
- commit할때 배열에 담아두고 end할때 DB에 저장.
- getId는 웹에서 로그인에 필요한 값을 뿌려줌. 해당 커맨드를 입력시 무작위 랜덤 값(숫자, 문자를 혼용한 12글자?)를 보여주고 DB에 값을 저장함. 저장할 때는 암호화를 할 것.

| Name | Description | Param1 | Type&Ex | Param2 | Type&Ex | Param3 | Param4 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| init | 서버등록 |  |  |  |  |  |  |
| enroll
user | 유저등록 |  |  |  |  |  |  |
| setuser
goal | 목표설정 | minute(분) | number-60 | content(opt) | string-’목표내용’ |  |  |
| start | 타이머시작 |  |  |  |  |  |  |
| stop | 타이머중단(기록삭제) |  |  |  |  |  |  |
| end | 타이머종료 | title | string-”제목” |  |  |  |  |
| commit | 공부한내용 | title | string-”제목” | content(opt) | string-”내용” |  |  |
| enrolltodo | 할일등록 | title | string-”제목” | content(opt) | string-”내용” |  |  |
| complete
todos | 완료한할일 | Todo Number | string-“1,2,4,5” |  |  |  |  |
| mytodo | 내 할일 | True or False | 완료한 todo인지 |  |  |  |  |
| getId | 내 아이디 |  |  |  |  |  |  |
| enroll Account | 가계부 등록 | isFixed | boolean | category | string-카테고리 | content(opt) | amount |
| my Account | 총 지출액 |  |  |  |  |  |  |
| delete Account | 잘못작성한 기록 삭제 | accountId | Number |  |  |  |  |

## 다) CI/CD ( AWS  - 포기: 봇 커맨드 입력이라 요금이 많이 나올거라 예상됨)

**AWS Elastic Beanstalk(PaaS)**

- AWS에서 손쉽게 애플리케이션을 배포할 수 있는 서비스
- 코드를 업로드하기만 하면 애플리케이션을 배포, 관리 및 조정을 한다.
- AWS Management Console, Git 리포지토리 또는 Eclipse나 Visual Studio와 같은 IDE(통합 개발 환경)를 통해 애플리케이션을 업로드를 할 수 있다.
- 용량 프로비저닝, 로드 밸런싱, Auto Scaling, 애플리케이션 상태 모니터링에 대한 배포 정보를 자동으로 처리한다.

**AWS CodeBuild**

- 소스 코드를 컴파일하는 단계부터 테스트 실행 후 소프트웨어 패키지를 개발하여 배포하는 단계까지 마칠 수 있는 완전관리형의 지속적 통합 서비스
- Settings
    1. 프로젝트 생성

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%202.png)

    2. Github 와 연결

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%203.png)

    3. 환경 셋팅. 이때 운영 체제에서 Amazon Linux2 로 하게 된다면 nodejs 12 버전까지만 사용 가능하기 때문에 Ubuntu 환경으로 사용한다.(강제적으로 올릴 수 있는 방법을 찾지 못했음)

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%204.png)

    4. Build Spec은 다음과 같이 맞춰주도록 한다. phases를 다음과 같이 맞춰주면 빌드할 때 Nodejs 의 버전을 16버전까지 올려서 빌드하게 된다. 이 프로젝트는 **Node.js 16.6.0** 이상의 버전이 필요하기 때문에 버전을 올려줘야한다.

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%205.png)

    5. 위의 설정으로 빌드를 하게 된다면 14버전에서 16버전으로 끌어올린 뒤 NPM 모듈들을 다운로드 받는 것을 확인할 수 있다.

    ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%206.png)


**EC2 인스턴스**

- 클라우드의 가상 서버
- Elastic Beanstalk는 환경을 생성할 때 하나 이상의 Amazon EC2 인스턴스를 프로비저닝한다.

# 🐙 DB(MongoDB)

- 참고 자료

[MongoDB 스키마 디자인을 위한 6가지 규칙 요약](https://edykim.com/ko/post/summary-of-six-rules-for-designing-a-mongodb-schema/)

[What are naming conventions for MongoDB?](https://stackoverflow.com/questions/5916080/what-are-naming-conventions-for-mongodb)

- DB Variables ⇒ Camel Case (ex: user id ⇒ userId)

## 가) **User**

- 유저 정보
- accessKey 는 웹에서 자기계정에 접근하기 위한 임시키. 해당 키로 로그인 할 시 파괴해서 매번 로그인을 할때마다 발급하는 방향으로 생각중
- nickname trim필요

| Name | Type | Options |
| --- | --- | --- |
| userId | string | unique, required |
| nickname | string | required |
| channelList | Array<Channel> |  |
| studieList | Array<Study> |  |
| todoList | Array<Todo> |  |
| accessKey | string |  |

## 나) Study

- 공부한 목록
- commit배열 구조는 “{ title: ‘제목’, content: ‘내용’ , date: Date.now, isSecret: false}” 형식
- owner에는 유저와 서버정보가 들어있어야 함
- title, comment trim 필요

| Name | Type | Options |
| --- | --- | --- |
| title | String | required |
| commentList | Array<{title: String, content:String, date: Date, isSecret: Boolean}> |  |
| startDate | Date | required |
| endDate | Date | required |
| owner | ChannelUserGoal | required |

## 다) Todo

- Todo리스트와 같은 역할
- 서버상관없이 공용으로 사용할 예정
- title, content trim 필요

| Name | Type | Options |
| --- | --- | --- |
| content | string | required |
| owner | User | required |
| date | Date | default: Date.now |
| isCompleted | Boolean | default: false |
| todoId | Number | auto_increment |
| proceed | Number | default: 0 |

## 라) Channel

- 채널 정보

| Name | Type | Options |
| --- | --- | --- |
| channelId | String | unique |
| userList | Array<User> | default: [] |
| name | string |  |

## 마) ChannelUserGoal

- 채널과 유저 사이의 정보
- user와 channel은 unique가 아니지만 channel과 user가 동시에 겹치면 안됨
- content trim 필요

| Name | Type | Options |
| --- | --- | --- |
| channel | Channel | required |
| user | User | required |
| goalTime | Number | default: 30 |
| content | String |  |

## 바) AccountBook

- 가계부 용도 Table
- 채널 상관없이 유저가 DB에 있다면 공유
- isFixed은 고정지출인지 변동지출인지
- category는 식비, 자기관리비 등을 적든 자유임. 나중에 이 카테고리별로 그래프를 만들거기 때문에 사용자는 이걸 유의하면서 적어야함.
- content는 적을 내용

| Name | Type | Options |
| --- | --- | --- |
| user | User | required |
| amount | Number | required |
| isFixed | Boolean | required |
| category | String |  |
| content | String |  |
| date | Date | default: Date.now |
| accountId | Numver | auto_increment |

## 사) Counter

- auto_increment가 Mongo DB는 따로 지원하지 않기 때문에 Counter 테이블 생성


    | Name | Type | Options |
    | --- | --- | --- |
    | name | String | required |
    | seq_value | Number | required |