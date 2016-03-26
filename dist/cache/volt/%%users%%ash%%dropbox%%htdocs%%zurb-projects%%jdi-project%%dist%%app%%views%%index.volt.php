<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <?php echo $this->tag->getTitle(); ?>
        <?php echo $this->tag->stylesheetLink('public/css/app.css'); ?>
        <?php echo $this->tag->stylesheetLink('public/css/style.css'); ?>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Your invoices">
        <meta name="author" content="Ashley Ktorou">
    </head>
    <body>
        <?php echo $this->getContent(); ?>
        <?php echo $this->tag->javascriptInclude('js/app.js'); ?> 
    </body>
</html>