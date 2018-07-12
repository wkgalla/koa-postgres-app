CREATE TABLE public.user_info (
	id int primary key NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(30) NOT NULL,
	email varchar(40) NOT NULL unique,
	phone_number varchar(16) unique,
	"address" varchar(80)
)