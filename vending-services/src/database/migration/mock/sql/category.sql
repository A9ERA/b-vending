INSERT INTO "public"."category" ("id", "name", "parent_id") VALUES
('6af03747-a934-470d-9796-5bd7d4ac9901', 'Drink', NULL);
INSERT INTO "public"."category" ("id", "name", "parent_id") VALUES
('27057689-0872-4bfa-9132-9fb37a76bc39', 'Snack', NULL);
INSERT INTO "public"."category" ("id", "name", "parent_id") VALUES
('b59ec527-18e1-41fc-a6a4-461b25df52df', 'Fruit juice', '6af03747-a934-470d-9796-5bd7d4ac9901'),
('850d4074-6562-4294-92e9-c86215d58c13', 'Coffee', '6af03747-a934-470d-9796-5bd7d4ac9901'),
('0c947998-a101-4783-9a32-ab5bfa402e42', 'Tea', '6af03747-a934-470d-9796-5bd7d4ac9901'),
('71bf5534-f96a-4989-bcd6-271fbddf98b9', 'Biscuits', '27057689-0872-4bfa-9132-9fb37a76bc39'),
('cc59b45f-ff5d-4b9a-b88d-4c7482c63cfb', 'Potato', '27057689-0872-4bfa-9132-9fb37a76bc39'),
('0059bdf1-477f-4781-94f6-4d231c4a7515', 'Popcorn', '27057689-0872-4bfa-9132-9fb37a76bc39');