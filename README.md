# TODO API

## Project setup

```
npm install
```

### Compiles and watch for development

I recommend to use Visual Studio Code for development. First you can run below command then you can debug code with Vscode Debugger.
Source map will be always created.

```
npm run watch-ts
```

### Compiles for production

```
npm run build
```

### Docker commands

```
docker build -t muratersin/todo-api .

docker run -p 127.0.0.1:3000:3000 -d --name todo-api  muratersin/todo-api
```
