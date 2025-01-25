# node-solid

Gympass Style App

### Rfs (Requisitos Funcionais):

- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser posssível obter o número de checkins realizados por um usuário
- [ ] Deve ser possível o usuário obter seu histórico de checkins
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias por nome
- [ ] Deve ser possível o usuário realizar checkins em academias
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## Rns (Regras de Negócio):

- [ ] O usuário não deve poder se cadastrar com um email já cadastrado
- [ ] O usuário não pode fazer 2 checkins no mesmo dia
- [ ] O usuário não pode fazer checkin em mais de 100 metros
- [ ] O checkin só pode se validado até 20 minutos após criado
- [ ] O checkin só pode ser validado por um administrador
- [ ] A academia só pode ser cadastrada por um administrador

## Rnfs (Requisitos Não-Funcionais):

- [ ] Senha do usuário precisa ser criptografada
- [ ] Os dados de aplicação precisam estar persistidos em um banco de dados
- [ ] Todas as listas precisam ser paginadas
- [ ] O usuário deve ser identificado por um JWT