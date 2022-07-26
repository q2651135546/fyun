<template>
  <div>
    <div :style="{ height: height + 'px', backgroundColor: bgColor }"></div>
  </div>
</template>
<script>
export default {
  props: ["height", "bgColor"],
};
</script>