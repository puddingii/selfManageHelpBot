# SelfManageBot(SMB)

<aside>
๐ก ์๊ธฐ๊ด๋ฆฌ ๋ด ํ๋ก์ ํธ : ๊ณต๋ถํ ๋ด์ฉ ๊ธฐ๋ก ๋ฐ ํผ๋๋ฐฑ ๋ชฉ์ . ์ถํ ๊ฐ๊ณ๋ถ๋ ๋ฃ์ ์์ . https://github.com/yewl1110/selfManageHelpBot-backend

</aside>

# ๐ชํ์ํ ๊ธฐ๋ฅ

์ฐจํธ ๋ถ๋ถ์ [https://apexcharts.com/](https://apexcharts.com/) ์ฐธ๊ณ . ๋ ๋์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์๋ค๋ฉด ์ฑํํจ.

1. bcrypt๋ฅผ ์ด์ฉํด์ ์ํธํ๋ ๋ก๊ทธ์ธ ์์ด๋๊ฐ ์์ด์ ๋ก๊ทธ์ธํ  ๋ ๋ณตํธํ ํ์. ์์ธํ ๊ฑด envํ์ผ ์ฐธ๊ณ .
2. Todo
    1. ๋ฌดํ ์คํฌ๋กค์ด ์๋ ํ์ด์ง ๋ณ๋ก ๊ฐ์ ธ์ฌ ์์ 
    2. ํ๋ฉด์์ CRUD ๊ธฐ๋ฅ ํ์
    3. ๋ด์์๋ ์งํ๋ 0%, 100%๋ฐ์ ํํ์ํจ.
    4. Update
        1. ์งํ๋ ๋ณ๊ฒฝํ ๋
        2. ์๋ฃ, ๋ฏธ์๋ฃ ๋ฒํผ ํด๋ฆญ์ ์ํ๊ฐ ๋ณ๊ฒฝ
        3. Todo ๋ด์ฉ ๋ฐ๊ฟ ๋
    5. Delete - (todoId๊ฐ ์ฐธ์กฐ)
    6. Insert
3. Study
    1. Insert, Update, Delete๊ธฐ๋ฅ์ ํ์ํ์ง ์์. (์ค์ง ๋์ฝ ๋ด์ผ๋ก๋ง ์ ์ดํ  ์์ )
    2. ๊ธฐ๊ฐ์ ๋ฐ๋ฅธ ๊ณต๋ถ๋, ๋ด์ฉ ๋ฑ์ ๋ณด์ฌ์ค ์์ ์(DB์ ์์์๊ฐ๊ณผ ์ข๋ฃ์๊ฐ ์ฐธ๊ณ )
        1. ๋ฐ๋ผ์ ๊ธฐ๊ฐ์ ๋ง๋ DB๊ฐ์ ๊ฐ์ ธ์ฌ ํ์์ฑ ์์
    3. ๋ชฉํํ๋ ๊ณต๋ถ์๊ฐ์ ์ฑ์ ๋์ง๋ฅผ UI๋ก ๊ทธ๋ฆด ์์ (ChannelUserGoal์ Study ํ์ด๋ธ ์ฐธ๊ณ )

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled.png)

    4. ๊ณต๋ถ ์งํํ๋ ์๊ฐ๋ ํ๊ธฐ.(๊ท์น์ ์ธ ๊ณต๋ถ์ต๊ด์ ์ํ ํผ๋๋ฐฑ์ ์ํ ๊ทธ๋ํ)

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%201.png)

4. Account Book
    1. CRUD ๋ค ํ์ํจ.
    2. Create : ํ์ด๋ธ์ ๋ง๋ ์ ๋ณด๋ฅผ ์๋ ฅํ  ์ ์์ด์ผํจ. Date๋ถ๋ถ์ ๋ด ์์๋ ์ค๋๋ ์ง๋ก๋ง ๊ฐ๋ฅํ์ง๋ง ์น์์๋ ์ค์ ๊ฐ๋ฅ ํ  ์ ์๊ฒ๋ ํ  ๊ฒ.
    3. Read : ๋์ ๊ฒฝ์ฐ ๊ณ ์ , ๋ณ๋ ๊ธ์ก์ผ๋ก ๊ตฌ๋ถ๋์ด์์. isFixed ๊ฐ true ๋ฉด ๊ณ ์ , false๋ฉด ๋ณ๋.
        1. ๋ณ๋ ๊ธ์ก - DB์์ ๊ฐ์ ธ์ฌ ๋ ํน์  ๊ธฐ์ค(ํ๋ฌ, ์ผ์ฃผ์ผ ๋ฑ)์ผ๋ก ๋ณ๋์ง์ถ ๋ถ๋ถ์ ๊ฐ์ ธ์์ผํจ.
        2. ๊ณ ์  ๊ธ์ก - ๊ธฐ์ค ์์ด ๊ณ ์  ๊ธ์ก์ ๊ฒฝ์ฐ ๋ชจ๋  ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์์ผํจ.
    4. Delete : ๊ฐ ๊ฐ๋ง๋ค id๊ฐ ์๊ธฐ ๋๋ฌธ์ id๊ธฐ์ค์ผ๋ก ์ง์ธ ์์ 
    5. Update : ์ ๋ชป ์๋ ฅํ์ ๋๋ฅผ ๋๋นํ ๊ธฐ๋ฅ. ์ฃผ๋ก ๊ณ ์ ์ง์ถ ๊ธ์ก์ ๋ณ๋์ฌํญ์ด ์๊ธฐ๋ฉด ์ฌ์ฉํ  ์์ .

# ๐๏ธPart

[์ผ์ ํ](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%91%E1%85%AD%20c2043ea84b534a839ed4f4032fc9135a.csv)

# ๐๏ธ Frontend (React)

๋ด์ด ์ ์ฅํ ๋ฐ์ดํฐ๋ฅผ ์ฐจํธ ๋ฑ์ผ๋ก ๋ณด์ฌ์ฃผ๋ ์ญํ 

๊ฐ๊ณ๋ถ๊ฐ ์ถ๊ฐ ๋๋ค๋ฉด ๊ฐ๊ณ๋ถ๋ ์ฐจํธ ๋ฑ์ผ๋ก ํต๊ณ๋ฅผ ๋ณด์ฌ์ฃผ๋๋ก ํ  ๊ฒ.(์ฆ ์์์ **ํ์ฅ๊ฐ๋ฅํ๊ฒ** ์ ์ํด์ผํจ)

|  | url1 | url2 |
| --- | --- | --- |
| ๋ก๊ทธ์ธ | /login |  |
| ๋ฉ์ธ | / |  |
| ๊ณต๋ถ | /study |  |
| todo | /todo |  |
| ๊ฐ๊ณ๋ถ | /account |  |
|  |  |  |

[Light Bootstrap Dashboard React by Creative Tim](https://www.creative-tim.com/product/light-bootstrap-dashboard-react)

[React Free Templates](https://www.creative-tim.com/templates/react-free)

- ์ ํด์ง layout ์์
- ๋ณด์ฌ์ค ์ ๋ณด :
    - ๊ฐ์ธ ๋ชฉํ ๋ฌ์ฑ์จ
        - ํ๋ฃจ ๋ฌ์ฑ์จ
        - 7์ผ ํ๊ท  ๋ฌ์ฑ์จ
        - 7์ผ์ ํ๋ฒ์ ๋ณด์ฌ์ฃผ๋ ๊ฑฐ(์ฐจํธ์ฐ๋ฉด๋ ๋ฏ)
    - ๊ณต๋ถํ ๋ด์ฉ
        - ํ์๋ผ์ธ ํ์์ผ๋ก
    - Todo List
        - ์๋ฃ์ฒดํฌ ๊ธฐ๋ฅ์ด ์์ด์ผํจ
        - ์๋ฃ์ฒดํฌ๋ฅผ ๋๋ฅธ todo๋ ์ญ์  ๋ฐ ์ฒดํฌํด์  ๋ถ๊ฐ
- ์ฐจํธ : chartjs
- Alert : SweetAlert2
- Decode : bcrypt
- Todo Checking ๋ถ๋ถ์ ํ๋ฒ์ ๋ง์ dbํธ์ถ์ด ์์ ์๋ ์์ผ๋ lodash์ debounce์ฌ์ฉ.(๋ ์ข์ ๊ฒ์ด ์๋ค๋ฉด ๊ทธ๊ฑฐ ์ฌ์ฉํด๋ ์๊ด x)

# ๐ง Backend (?? & Node.js)

- DB์ ์๋ ์ ๋ณด๋ฅผ ๋ฟ๋ ค์ฃผ๋ ์ญํ  (REST API)

    [REST API](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/REST%20API%20a21b53286c1f48f885995f9b53ee07f1.csv)


# ๐ Bot Server (Nodejs - [Discord.js](https://discord.js.org/))

๋ด์ ์๊ธฐ๊ฐ ๊ณต๋ถํ๋ ๋ด์ฉ๊ณผ ์๊ฐ ๋ฑ์ ๊ธฐ๋กํ๊ณ  Todo Listํ์์ผ๋ก ํ ์ผ์ ๊ธฐ๋กํ๋ ๊ธฐ๋ฅ์ผ๋ก ์ ์ํ  ์์ . ์์ ๊ธฐ๋ฅ๋ค์ ์ ์ ํ ๊ฐ๊ณ๋ถ๋ ๋ง๋ค ์์ ์. ๊ฐ๊ณ๋ถ๋ ๊ฐ์ธ์ ๋ณด๊ฐ ๋ด๊ฒจ์๊ธฐ ๋๋ฌธ์ ๋ฐ๋ก ์ฒ๋ฆฌ๊ฐ ํ์ํ  ๊ฒ ๊ฐ์.

## ๊ฐ) ๊ณ ๋ ค์ฌํญ ๋ฐ ์ผ์ 

- Log(Winston) โ Info, Error Log
- Variables โ Camel Case
- Code Convention โ EsLint, Prettier, Typescript
- Dependencies Injection โ Awilix ( Type ์ฌ์ ์ ํ์ )

    [Awilix cradle ํ์ ์ฌ์ ์](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Awilix%20cradle%20%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20%E1%84%8C%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4%2039800f1aba8b49db8114a480bda3f92f.md)


[Todo](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Todo%206b4f71a98a0349e8b2a6f172e7896f39.csv)

## ๋) Command

- Param์ ์๋ **opt๋ optional์ ์ค์๋ง**.
- initํ๊ธฐ ์ ์๋ ๋ค๋ฅธ ์ปค๋งจ๋ ์คํ๋ถ๊ฐ
- enrollUser์๋์ ์ปค๋งจ๋๋ค์ enrollUser๋ฅผ ํ๊ธฐ ์ ๊น์ง ์คํ ๋ถ๊ฐ
- commit์ git์ commit์ญํ ์ ํ๊ณ  end๋ git์ push์ญํ ์ ๋ด๋นํจ.
- commitํ ๋ ๋ฐฐ์ด์ ๋ด์๋๊ณ  endํ ๋ DB์ ์ ์ฅ.
- getId๋ ์น์์ ๋ก๊ทธ์ธ์ ํ์ํ ๊ฐ์ ๋ฟ๋ ค์ค. ํด๋น ์ปค๋งจ๋๋ฅผ ์๋ ฅ์ ๋ฌด์์ ๋๋ค ๊ฐ(์ซ์, ๋ฌธ์๋ฅผ ํผ์ฉํ 12๊ธ์?)๋ฅผ ๋ณด์ฌ์ฃผ๊ณ  DB์ ๊ฐ์ ์ ์ฅํจ. ์ ์ฅํ  ๋๋ ์ํธํ๋ฅผ ํ  ๊ฒ.

| Name | Description | Param1 | Type&Ex | Param2 | Type&Ex | Param3 | Param4 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| init | ์๋ฒ๋ฑ๋ก |  |  |  |  |  |  |
| enroll
user | ์ ์ ๋ฑ๋ก |  |  |  |  |  |  |
| setuser
goal | ๋ชฉํ์ค์  | minute(๋ถ) | number-60 | content(opt) | string-โ๋ชฉํ๋ด์ฉโ |  |  |
| start | ํ์ด๋จธ์์ |  |  |  |  |  |  |
| stop | ํ์ด๋จธ์ค๋จ(๊ธฐ๋ก์ญ์ ) |  |  |  |  |  |  |
| end | ํ์ด๋จธ์ข๋ฃ | title | string-โ์ ๋ชฉโ |  |  |  |  |
| commit | ๊ณต๋ถํ๋ด์ฉ | title | string-โ์ ๋ชฉโ | content(opt) | string-โ๋ด์ฉโ |  |  |
| enrolltodo | ํ ์ผ๋ฑ๋ก | title | string-โ์ ๋ชฉโ | content(opt) | string-โ๋ด์ฉโ |  |  |
| complete
todos | ์๋ฃํํ ์ผ | Todo Number | string-โ1,2,4,5โ |  |  |  |  |
| mytodo | ๋ด ํ ์ผ | True or False | ์๋ฃํ todo์ธ์ง |  |  |  |  |
| getId | ๋ด ์์ด๋ |  |  |  |  |  |  |
| enroll Account | ๊ฐ๊ณ๋ถ ๋ฑ๋ก | isFixed | boolean | category | string-์นดํ๊ณ ๋ฆฌ | content(opt) | amount |
| my Account | ์ด ์ง์ถ์ก |  |  |  |  |  |  |
| delete Account | ์๋ชป์์ฑํ ๊ธฐ๋ก ์ญ์  | accountId | Number |  |  |  |  |

## ๋ค) CI/CD ( AWS  - ํฌ๊ธฐ: ๋ด ์ปค๋งจ๋ ์๋ ฅ์ด๋ผ ์๊ธ์ด ๋ง์ด ๋์ฌ๊ฑฐ๋ผ ์์๋จ)

**AWS Elastic Beanstalk(PaaS)**

- AWS์์ ์์ฝ๊ฒ ์ ํ๋ฆฌ์ผ์ด์์ ๋ฐฐํฌํ  ์ ์๋ ์๋น์ค
- ์ฝ๋๋ฅผ ์๋ก๋ํ๊ธฐ๋ง ํ๋ฉด ์ ํ๋ฆฌ์ผ์ด์์ ๋ฐฐํฌ, ๊ด๋ฆฌ ๋ฐ ์กฐ์ ์ ํ๋ค.
- AWS Management Console, Git ๋ฆฌํฌ์งํ ๋ฆฌ ๋๋ Eclipse๋ Visual Studio์ ๊ฐ์ IDE(ํตํฉ ๊ฐ๋ฐ ํ๊ฒฝ)๋ฅผ ํตํด ์ ํ๋ฆฌ์ผ์ด์์ ์๋ก๋๋ฅผ ํ  ์ ์๋ค.
- ์ฉ๋ ํ๋ก๋น์ ๋, ๋ก๋ ๋ฐธ๋ฐ์ฑ, Auto Scaling, ์ ํ๋ฆฌ์ผ์ด์ ์ํ ๋ชจ๋ํฐ๋ง์ ๋ํ ๋ฐฐํฌ ์ ๋ณด๋ฅผ ์๋์ผ๋ก ์ฒ๋ฆฌํ๋ค.

**AWS CodeBuild**

- ์์ค ์ฝ๋๋ฅผ ์ปดํ์ผํ๋ ๋จ๊ณ๋ถํฐ ํ์คํธ ์คํ ํ ์ํํธ์จ์ด ํจํค์ง๋ฅผ ๊ฐ๋ฐํ์ฌ ๋ฐฐํฌํ๋ ๋จ๊ณ๊น์ง ๋ง์น  ์ ์๋ ์์ ๊ด๋ฆฌํ์ ์ง์์  ํตํฉ ์๋น์ค
- Settings
    1. ํ๋ก์ ํธ ์์ฑ

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%202.png)

    2. Github ์ ์ฐ๊ฒฐ

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%203.png)

    3. ํ๊ฒฝ ์ํ. ์ด๋ ์ด์ ์ฒด์ ์์ Amazon Linux2 ๋ก ํ๊ฒ ๋๋ค๋ฉด nodejs 12 ๋ฒ์ ๊น์ง๋ง ์ฌ์ฉ ๊ฐ๋ฅํ๊ธฐ ๋๋ฌธ์ Ubuntu ํ๊ฒฝ์ผ๋ก ์ฌ์ฉํ๋ค.(๊ฐ์ ์ ์ผ๋ก ์ฌ๋ฆด ์ ์๋ ๋ฐฉ๋ฒ์ ์ฐพ์ง ๋ชปํ์)

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%204.png)

    4. Build Spec์ ๋ค์๊ณผ ๊ฐ์ด ๋ง์ถฐ์ฃผ๋๋ก ํ๋ค. phases๋ฅผ ๋ค์๊ณผ ๊ฐ์ด ๋ง์ถฐ์ฃผ๋ฉด ๋น๋ํ  ๋ Nodejs ์ ๋ฒ์ ์ 16๋ฒ์ ๊น์ง ์ฌ๋ ค์ ๋น๋ํ๊ฒ ๋๋ค. ์ด ํ๋ก์ ํธ๋ **Node.js 16.6.0** ์ด์์ ๋ฒ์ ์ด ํ์ํ๊ธฐ ๋๋ฌธ์ ๋ฒ์ ์ ์ฌ๋ ค์ค์ผํ๋ค.

        ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%205.png)

    5. ์์ ์ค์ ์ผ๋ก ๋น๋๋ฅผ ํ๊ฒ ๋๋ค๋ฉด 14๋ฒ์ ์์ 16๋ฒ์ ์ผ๋ก ๋์ด์ฌ๋ฆฐ ๋ค NPM ๋ชจ๋๋ค์ ๋ค์ด๋ก๋ ๋ฐ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

    ![Untitled](SelfManageBot(SMB)%20dd99b5930e8c4d2b8a57127ad880c234/Untitled%206.png)


**EC2 ์ธ์คํด์ค**

- ํด๋ผ์ฐ๋์ ๊ฐ์ ์๋ฒ
- Elastic Beanstalk๋ ํ๊ฒฝ์ ์์ฑํ  ๋ ํ๋ ์ด์์ Amazon EC2 ์ธ์คํด์ค๋ฅผ ํ๋ก๋น์ ๋ํ๋ค.

# ๐ DB(MongoDB)

- ์ฐธ๊ณ  ์๋ฃ

[MongoDB ์คํค๋ง ๋์์ธ์ ์ํ 6๊ฐ์ง ๊ท์น ์์ฝ](https://edykim.com/ko/post/summary-of-six-rules-for-designing-a-mongodb-schema/)

[What are naming conventions for MongoDB?](https://stackoverflow.com/questions/5916080/what-are-naming-conventions-for-mongodb)

- DB Variables โ Camel Case (ex: user id โ userId)

## ๊ฐ) **User**

- ์ ์  ์ ๋ณด
- accessKey ๋ ์น์์ ์๊ธฐ๊ณ์ ์ ์ ๊ทผํ๊ธฐ ์ํ ์์ํค. ํด๋น ํค๋ก ๋ก๊ทธ์ธ ํ  ์ ํ๊ดดํด์ ๋งค๋ฒ ๋ก๊ทธ์ธ์ ํ ๋๋ง๋ค ๋ฐ๊ธํ๋ ๋ฐฉํฅ์ผ๋ก ์๊ฐ์ค
- nickname trimํ์

| Name | Type | Options |
| --- | --- | --- |
| userId | string | unique, required |
| nickname | string | required |
| channelList | Array<Channel> |  |
| studieList | Array<Study> |  |
| todoList | Array<Todo> |  |
| accessKey | string |  |

## ๋) Study

- ๊ณต๋ถํ ๋ชฉ๋ก
- commit๋ฐฐ์ด ๊ตฌ์กฐ๋ โ{ title: โ์ ๋ชฉโ, content: โ๋ด์ฉโ , date: Date.now, isSecret: false}โ ํ์
- owner์๋ ์ ์ ์ ์๋ฒ์ ๋ณด๊ฐ ๋ค์ด์์ด์ผ ํจ
- title, comment trim ํ์

| Name | Type | Options |
| --- | --- | --- |
| title | String | required |
| commentList | Array<{title: String, content:String, date: Date, isSecret: Boolean}> |  |
| startDate | Date | required |
| endDate | Date | required |
| owner | ChannelUserGoal | required |

## ๋ค) Todo

- Todo๋ฆฌ์คํธ์ ๊ฐ์ ์ญํ 
- ์๋ฒ์๊ด์์ด ๊ณต์ฉ์ผ๋ก ์ฌ์ฉํ  ์์ 
- title, content trim ํ์

| Name | Type | Options |
| --- | --- | --- |
| content | string | required |
| owner | User | required |
| date | Date | default: Date.now |
| isCompleted | Boolean | default: false |
| todoId | Number | auto_increment |
| proceed | Number | default: 0 |

## ๋ผ) Channel

- ์ฑ๋ ์ ๋ณด

| Name | Type | Options |
| --- | --- | --- |
| channelId | String | unique |
| userList | Array<User> | default: [] |
| name | string |  |

## ๋ง) ChannelUserGoal

- ์ฑ๋๊ณผ ์ ์  ์ฌ์ด์ ์ ๋ณด
- user์ channel์ unique๊ฐ ์๋์ง๋ง channel๊ณผ user๊ฐ ๋์์ ๊ฒน์น๋ฉด ์๋จ
- content trim ํ์

| Name | Type | Options |
| --- | --- | --- |
| channel | Channel | required |
| user | User | required |
| goalTime | Number | default: 30 |
| content | String |  |

## ๋ฐ) AccountBook

- ๊ฐ๊ณ๋ถ ์ฉ๋ Table
- ์ฑ๋ ์๊ด์์ด ์ ์ ๊ฐ DB์ ์๋ค๋ฉด ๊ณต์ 
- isFixed์ ๊ณ ์ ์ง์ถ์ธ์ง ๋ณ๋์ง์ถ์ธ์ง
- category๋ ์๋น, ์๊ธฐ๊ด๋ฆฌ๋น ๋ฑ์ ์ ๋  ์์ ์. ๋์ค์ ์ด ์นดํ๊ณ ๋ฆฌ๋ณ๋ก ๊ทธ๋ํ๋ฅผ ๋ง๋ค๊ฑฐ๊ธฐ ๋๋ฌธ์ ์ฌ์ฉ์๋ ์ด๊ฑธ ์ ์ํ๋ฉด์ ์ ์ด์ผํจ.
- content๋ ์ ์ ๋ด์ฉ

| Name | Type | Options |
| --- | --- | --- |
| user | User | required |
| amount | Number | required |
| isFixed | Boolean | required |
| category | String |  |
| content | String |  |
| date | Date | default: Date.now |
| accountId | Numver | auto_increment |

## ์ฌ) Counter

- auto_increment๊ฐ Mongo DB๋ ๋ฐ๋ก ์ง์ํ์ง ์๊ธฐ ๋๋ฌธ์ Counter ํ์ด๋ธ ์์ฑ


    | Name | Type | Options |
    | --- | --- | --- |
    | name | String | required |
    | seq_value | Number | required |