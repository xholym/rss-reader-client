# RSS reader
https://github.com/xholym/rss-reader-client \
projekt pre predmet Webové publikovanie 

## CI/CD
nasadene na URL:
- https://xholym--rss-reader.herokuapp.com

použil som tieto nástroje:
- CircleCI
- Docker
- Heroku

vytvoril som konfiguračné súbory:
- .circleci/config.yml 
    - konfiguácia CI/CD circleci
- Dockerfile
    - subor na vytvorenie Docker imagu aplikácie

Po každom pushnutom kommite sa na CircleCI spustí build job. Tento job zbuilduje a otestuje aplikáciu. Po každom kommite do mastra alebo teda mergnutí branche do mastra sa na CircleCI spustí build job a potom deploy job. Deploy job aplikáciu nasadí na Heroku. Postup nasadenia je taký, že circleCi sa prihlási do Heroku container registry, vytvorí docker image, tagne ho tak ako Heroku potrebuje a ten pushne do Heroku container registry.

author: Matej Holý