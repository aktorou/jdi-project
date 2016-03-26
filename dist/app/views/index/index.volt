<header>
  <button class="toggle-nav" type="button"><i class="fa fa-bars"></i></button>
  <div class="max">
    <img class="logo" src="public/img/logo.png">
  </div>
</header>



<nav>
  <div class="account-status">
    <span class="icon fa-stack fa-lg">
      <i class="fa fa-circle fa-stack-2x"></i>
      <i class="fa fa-user fa-stack-1x fa-inverse"></i>
    </span>
    <span class="holder">
      <span class="name">Guest</span>
      <span class="status">Not logged in</span>
    </span>
  </div>
  <ul>
    <li class="heading">Navigation</li>
    <li><span><i class="fa fa-home"></i> Homepage</span></li>
    <li class="has-child active">
      <span><i class="fa fa-arrow-circle-o-right"></i> Products</span>
      <ul class="dropdown">
        <li><span>Example sub item</span></li>
        <li><span>Example sub item</span></li>
      </ul>
    </li>
    <li><span><i class="fa fa-question"></i> About Us</span></li>
    <li><span><i class="fa fa-pencil"></i> Blog</span></li>
    <li><span><i class="fa fa-list-alt"></i> Knowledgebase</span></li>
    <li><span><i class="fa fa-comments-o"></i> Support forums</span></li>
    <li class="heading">Accounts</li>
    <li class="dark top-divider"><span><i class="fa fa-user"></i> Register</span></li>
    <li class="dark"><span><i class="fa fa-lock"></i> Login</span></li>
    <li class="heading">Search</li>
    <li class="search dark">
      <input type="text" name="search" placeholder="Example..." />
      <i class="fa fa-search"></i>
    </li>
  </ul>
</nav>



<main>
  <div class="page">
    <ul class="bread">
      <li>Blog</li>
      <li>All posts</li>
    </ul>

    <h1>Example Title</h1>
    <h2>An Example of a sub header</h2>

    <div class="car-holder">
      <ul>
        {% for car in cars %}
        <li>
          <div class="bg-img"><div style="background-image: url({{car.getImg()}});"></div></div>
          <div class="info">
            <h3>{{car.make}} {{car.model}}</h3>
            <hr>
            <p>This car is {{car.color}}, click here for more information! <a href="#" class="tag">Car news</a></p>
          </div>
        </li>
        {% endfor %}
      </ul>      
    </div>
  </div>
</main>