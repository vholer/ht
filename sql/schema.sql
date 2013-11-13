DROP TABLE IF EXISTS data CASCADE;
DROP TABLE IF EXISTS sensor CASCADE;


CREATE TABLE sensor (
	id		SERIAL8 PRIMARY KEY NOT NULL,
	name	TEXT,
	key		VARCHAR(32) NOT NULL DEFAULT md5(random()::text)
);

CREATE TABLE data (
	sensor_id	INT8 REFERENCES sensor(id) ON DELETE CASCADE ON UPDATE CASCADE,
	date		TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
	temperature	FLOAT CHECK (temperature>=-40 AND temperature<=100),
	humidity	FLOAT CHECK (humidity>=0 AND humidity<=100)
);

CREATE INDEX sensor_date_idx ON data (sensor_id,date);
