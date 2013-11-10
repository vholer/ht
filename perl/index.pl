#!/usr/bin/env perl
use Mojolicious::Lite;

# Documentation browser under "/perldoc"
plugin 'PODRenderer';

get '/' => sub {
	my $self = shift;
	$self->render('index');
};

get '/:foo' => sub {
	my $self = shift;
	my $foo  = $self->param('foo');
	$self->render(text => "Hello from $foo!");
};

get '/sensor' => sub {
	my $self = shift;
	return $self->render(json => [1,2,3,4,5]);
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
