# weplanet backend boilerplate

> weplanet backend boilerplate

## Stack
- Node.js 8.11.3
- mysql
- jwt token
- rsa

## rsa
- 최초 실행 시 rsa private, public key 생성 후 libs/jwt에 저장

## Build Setup
> ecosystem.config.js

- 배포시에 pm2를 사용해서 express를 구동함.
- 배포환경 변경시 ecosystem.config.js 수정 [(참고)](http://pm2.keymetrics.io/docs/usage/deployment/)

## Execution
- Local
```bash
npm run local
```
- Server
```bash
pm2 startOrReload ecosystem.config.js // 시작
pm2 kill // 종료

```

## Deploy via ssh 
#### pm2 + Github Repository를 사용해서 배포를 한다.

1. 설치하지 않았을 경우, setup 실행
    ```bash
    $ npm run setup
    ```

2. Github에 Commit push 후 배포를 진행.
    ```bash
    $ npm run deploy
    ```
    
3. ec2 ssh 접속
   ```bash
   $ ssh ec2-user@api.mymoviehistory.kr -i ~/.ssh/mmh-key.pem
   ```
4. Log
    ```bash
    $ pm2 logs /backend/ 
    ``` 
