<?php

use Phalcon\Mvc\Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
      $this->tag->setTitle('View our Cars!');
      $cars = Cars::find();
      $this->view->cars = $cars;
    }
}