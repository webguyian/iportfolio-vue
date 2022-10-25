<template>
  <div class="ui-flip-container">
    <div class="ui-flip">
      <div class="ui-flip-front"><slot /></div>
      <div class="ui-flip-back"><slot name="back" /></div>
    </div>
  </div>
</template>

<style lang="scss">
.ui-flip-container {
  perspective: 1000px;
  cursor: pointer;

  &:hover,
  &:focus {
    .ui-flip {
      transform: rotateY(-180deg);
    }
  }
}

.ui-flip-container,
.ui-flip-front,
.ui-flip-back {
  width: 150px;
  height: 150px;
  margin: auto;
}

.ui-flip {
  position: relative;
  transform-style: preserve-3d;
  transition: 0.6s;
}

.ui-flip-front,
.ui-flip-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.ui-flip-front {
  z-index: 2;
  transform: rotateY(0deg);
}

.ui-flip-back {
  transform: rotateY(180deg);
}
</style>
