#!/usr/bin/env perl
use Mojolicious::Lite;
use Mojolicious::Plugin::Database;

sub startup {
	my $self = shift;
	die('Kokotina!');

	$self->plugin('database', {
		dsn			=> "dbi:Pg:dbname=$ENV{'OPENSHIFT_APP_NAME'}",
		username	=> $ENV{'OPENSHIFT_POSTGRESQL_DB_USERNAME'},
		password	=> $ENV{'OPENSHIFT_POSTGRESQL_DB_PASSWORD'},
		options		=> { 'pg_enable_utf8' => 1 },
		helper		=> 'db',
	});
}

# Documentation browser under "/perldoc"
plugin 'PODRenderer';

# Create database plugin
plugin 'Database' => {
	dsn			=> "dbi:Pg:dbname=$ENV{'OPENSHIFT_APP_NAME'}",
	username	=> $ENV{'OPENSHIFT_POSTGRESQL_DB_USERNAME'},
	password	=> $ENV{'OPENSHIFT_POSTGRESQL_DB_PASSWORD'},
	options		=> { 'pg_enable_utf8' => 1 },
	helper		=> 'db',
};

get '/' => sub {
	my $self = shift;
	$self->render('index');
};

#get '/:foo' => sub {
#	my $self = shift;
#	my $foo  = $self->param('foo');
#	$self->render(text => "Hello from $foo!");
#};

get '/sensor' => sub {
	my $self = shift;

	return $self->render(json => $self->db->selectcol_arrayref('
		SELECT id
		FROM sensor
	'));
};

get '/sensor/:id' => sub {
	my $self = shift;

	return $self->render(json => $self->db->selectrow_hashref('
		SELECT extract(epoch from date) as date, temperature, humidity
		FROM data
		WHERE sensor_id = ?
		ORDER BY date DESC
		LIMIT 1
	', {}, $self->param('id')));
};

post '/sensor/:id' => sub {
	my $self = shift;

	$self->db->do('
		INSERT INTO data(sensor_id, temperature, humidity)
		VALUES (?, ?, ?)
	', {},
		$param('id'),
		$param('temperature'),
		$param('humidity')) or return undef;

	return 1;
};


app->start;
__DATA__

@@ index.html.ep
% layout 'default';
% title 'Welcome';
Welcome to the Mojolicious real-time web framework!

@@ layouts/default.html.ep
<!DOCTYPE html>
<html>
  <head><title><%= title %></title></head>
  <body><%= content %></body>
</html>
