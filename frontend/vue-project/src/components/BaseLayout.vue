<template>
  <div>
    <header class="py-16 overflow-hidden transition-colors duration-300">
      <div class="relative md:pb-4 container-wrap">
        <slot name="header"></slot>
      </div>
    </header>
    <div class="container-wrap pt-8 lg:pt-12 relative">
      <slot></slot>
    </div>
  </div>
</template>
