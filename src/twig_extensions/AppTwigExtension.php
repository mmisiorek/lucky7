<?php

/**
 * Created by PhpStorm.
 * User: marcinmisiorek
 * Date: 27.05.2017
 * Time: 14:09
 */
class AppTwigExtension extends \Twig_Extension
{
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('alphanumericChars', array($this, 'alphanumericChars'))
        );
    }

    public function getName()
    {
        return 'app';
    }

    public function alphanumericChars($str)
    {
        return preg_replace("/[^A-Za-z0-9]/", '', $str);
    }
}