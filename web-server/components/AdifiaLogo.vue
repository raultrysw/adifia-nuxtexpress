<template lang="html">
  <svg id="logo" width="90" height="90">
    <rect height="50" width="50" x="25" y="25" stroke="black" stroke-width="2" fill="transparent"></rect>
    <circle r="30" cx="50" cy="50" stroke="blue" stroke-width="2" fill="transparent"></circle>
    <circle r="15" cx="50" cy="50" stroke="black" stroke-width="2" fill="url(#grad1)"></circle>

    <defs>
      <radialGradient id="grad1" r="50%">
        <stop offset="0%" style="stop-color:rgb(255,255,255);
        stop-opacity:0" />
        <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
      </radialGradient>
    </defs>
  </svg>
</template>