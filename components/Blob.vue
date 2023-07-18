<template>
  <div id="blob" ref="blob" />
</template>

<script setup lang="ts">
  const blob = ref<HTMLDivElement| null>(null)
  const isSafari = ref(false)

  const moveBlob = (x: number, y: number) => {
    if (isSafari.value && blob.value) {
      blob.value.style.left = `${x}px`
      blob.value.style.top = `${y}px`
    } else {
      blob.value?.animate({
        left: `${x}px`,
        top: `${y}px`
      }, { duration: 3000, fill: "forwards" })
    }
  }

  onMounted(() => {
    isSafari.value = !navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari")

    window.addEventListener("pointermove", event => {
      if (event.pointerType !== "touch") {
        const { clientX, clientY } = event
        moveBlob(clientX, clientY)
      }
    })
  })
</script>

<style scoped lang="scss">
  @keyframes move {
    50% {
      translate: -50% 0%;
    }
  }

  @keyframes rotate {
    0% {
      rotate: 0deg;
    }

    50% {
      scale: 1 1.5;
      rotate: 180deg;
    }

    100% {
      rotate: 360deg;
    }
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(179deg) scale(1, 1.5);
    }

    90% {
      -webkit-transform: rotate(324deg) scale(1, 1.1);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  #blob {
    animation: move 20s infinite, rotate 20s linear infinite;
    aspect-ratio: 1;
    background-image: linear-gradient(to right, $light-nuxt-green, mediumpurple);
    border-radius: 50%;
    filter: blur(100px);
    left: 50vw;
    height: min(300px, calc(100vw / 3 * 2));
    position: fixed;
    top: 50vh;
    translate: -50% -100%;
    z-index: -10;
    -webkit-animation: move 20s infinite, rotate 20s linear infinite, ;
  }

  @media screen and (min-width: 990px) {
    #blob {
      animation: rotate 20s linear infinite;
      height: 500px;
      filter: none;
      translate: -50% -50%;
    }
  }
</style>
