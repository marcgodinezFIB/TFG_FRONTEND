<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" style="color: #004411; border-color: #004411" href="/">
           FootPrintScanner
        </a>
        <ul class="nav flex-row float-right">
          <li class="nav-item">
            <a class="nav-link header-text" href="/login">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link header-text" href="/signup">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>