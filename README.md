# Recuperação de Senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email
- O Usuário deve receber um email com instruções de recuperação de senha;
- O Usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envio de e-mails em desenvolvimento;
- Utilizar amazon SES para envio de e-mails em produção;
- O Envio de e-mails deve acontecer em segundo plano (_background job_)

**RN**

- O link enviado por email para resetar senha deve expirar em 2horas;
- O usuário precisa confirmar sua senha ao resetar a mesma;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, usuário e senha;

**RNF**

- N/A;

**RN**

- O usuário não pode alterar seu email, para outro e-mail sendo o mesmo pertencente a outro usuário;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar para a senha nova o mesmo deve informar a antiga;

# Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que tiver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real com Socket.io;

**RN**

- A notificação deve ter um estatos de lida ou não lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF**

- O usuário deverá listar todos os usuários de serviço cadastrado;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadoras deve ser armezanada em cache;

**RN**

- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar serviços consigo mesmo.

- Cada agendamento deve dura 1h hora exatamente.
- Os agendamentos deve estar disponíveis entre 8h às 18h (Primeiro 8h, último 18h)
- O usuário não pode agendar em um horário já ocupado.
- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar serviços consigo mesmo.
