<?php

use Phalcon\Mvc\Model;

class Cars extends Model
{
    public $id;

    public $make;

    public $model;

    public $color;

    public $img;

    public function getImg(){
      return "public/img/" . $this->img;
    }
}