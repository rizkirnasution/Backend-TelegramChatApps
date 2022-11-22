CREATE TABLE chats
(
  id          VARCHAR   NOT NULL,
  sender   VARCHAR   NOT NULL,
  receiver VARCHAR   NOT NULL,
  chat        VARCHAR   NOT NULL,
  chat_type    VARCHAR   NULL    ,
  is_deleted VARCHAR NULL,
  date        TIMESTAMP NULL    
);

CREATE TABLE users
(
  id       VARCHAR   NOT NULL,
  username VARCHAR   NOT NULL,
  email    VARCHAR   NOT NULL,
  password VARCHAR   NOT NULL,
  photo    TEXT      NULL    ,
  phone    VARCHAR   NULL    ,
  bio      VARCHAR   NULL    ,
  date     TIMESTAMP NULL    
);