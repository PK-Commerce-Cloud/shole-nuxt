<template>
  <div>
    <Nav />
    <main class="mx-auto min-h-screen max-w-screen-2xl px-2 sm:px-6 lg:px-8">
      <slot />
    </main>

    <FlayoutCart></FlayoutCart>
    <ProductQuickView></ProductQuickView>
  </div>
</template>
