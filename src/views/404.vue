<template>
    <div class="nofind">
        <span class="text">404!</span>
        <!-- <img src="../assets/404.gif" alt=""> -->
    </div>
</template>

<style scoped>
.nofind {
    margin-top:20vh;
  width: 100%;
     height: 20vh;
  overflow: hidden;
}
.nofind .text {
  font-size: 50px;
  padding-top:20px;
  display: inline-block;
  animation: textAniation 1s infinite ease-in-out;
 
}

@keyframes textAniation{
    0%{
        transform: rotateZ(-45deg)
    }
    20%{
        transform: rotateZ(0)
    }
  40% {
    transform: rotateZ(0);
    /* opacity: 1; */
    /* color: #000; */
  }
  60% {
    transform: rotateZ(45deg);
    /* color: #fff; */
  }
  80% {
  transform: rotateZ(0);
    /* opacity: 0; */
  }
  100% {
   transform: rotateZ(-45deg);
    /* opacity: 1; */
  }
}

</style>

