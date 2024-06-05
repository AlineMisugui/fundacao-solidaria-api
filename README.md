# Fundação Solidária


## Infra

http://fundacao-solidaria-api.us-west-2.elasticbeanstalk.com/

Node 20.x

AWS ElasticBeanstalk, usando Docker de runtime. Imagens Docker hospedadas em um repositório privado do AWS Elastic Container Registry.

## Ops

Pipeline usando GitHub Actions para buildar a imagem Docker, e então, atualizar o Elastic Beanstalk a cada push na branch main.
