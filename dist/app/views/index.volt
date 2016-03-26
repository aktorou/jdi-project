<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        {{ get_title() }}
        {{ stylesheet_link('public/css/app.css') }}
        {{ stylesheet_link('public/css/style.css') }}
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Your invoices">
        <meta name="author" content="Ashley Ktorou">
    </head>
    <body>
        {{ content() }}
        {{ javascript_include('js/app.js') }} 
    </body>
</html>