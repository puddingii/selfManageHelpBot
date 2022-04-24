# Command추가

Assignee: 익명
Date Created: 2022년 3월 10일 오전 10:18
Priority: High 🔥
Status: 진행 중
type: system logic

- [x]  init
- [x]  enrollUser
- [x]  setUserGoal
- [x]  start
- [x]  stop
- [x]  end
- [x]  commit
- [x]  enrollTodo
- [ ]  completeTodos
- [ ]  myTodo
- [ ]  myId

| Name | Description | Param1 | Type&Ex | Param2 | Type&Ex |
| --- | --- | --- | --- | --- | --- |
| init | 서버등록 |  |  |  |  |
| enrolluser | 유저등록 |  |  |  |  |
| setusergoal | 목표설정 | minute | number-60(분) | content(opt) | string-’목표내용’ |
| start | 타이머시작 |  |  |  |  |
| stop | 타이머중단(기록삭제) |  |  |  |  |
| end | 타이머종료 | title | string-”제목” |  |  |
| commit | 공부한내용 | title | string-”제목” | content(opt) | string-”내용” |
| enrolltodo | 할일등록 | title | string-”제목” | content(opt) | string-”내용” |
| completetodos | 완료한할일 | Todo Number | string-“1,2,4,5” |  |  |
| mytodo | 내 할일 |  |  |  |  |
| getId | 내 아이디 |  |  |  |  |