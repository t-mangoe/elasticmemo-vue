# elasticmemo-vue

ElasticMemo is a web application for managing memos using ElasticSearch.

## Application setup

Download application from GitHub.

```
git clone https://github.com/t-mangoe/elasticmemo-vue.git
cd elasticmemo-vue
```

Install Node.js dependencies for the front-end(vue) and the back-end(express).

```
docker compose run --rm vue yarn install
docker compose run --rm express yarn install
```

ElasticMemo runs in a Docker container environment. Use `Docker compose` to run it.

```
docker compose up
```

Run the initialization script to create the sample memo data. This script communicates with the ElasticSearch container, so it must be executed while the container is running.

```
cd init_elasticsearch
bash init.sh
cd ..
```

Access `localhost` or the IP address of the machine on which the application runs with a web browser.

<!-- ## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/). -->
