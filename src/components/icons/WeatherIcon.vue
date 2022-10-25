<template>
  <svg
    viewBox="0 0 65 65"
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
    clip-rule="evenodd"
    stroke-linejoin="round"
    stroke-miterlimit="2"
  >
    <path
      d="M65 14c0-7.727-6.273-14-14-14H14C6.273 0 0 6.273 0 14v37c0 7.727 6.273 14 14 14h37c7.727 0 14-6.273 14-14V14z"
      fill="url(#_weather)"
    />
    <circle cx="21.667" cy="27.083" r="11.917" fill="url(#_sun)" />
    <path
      d="M23.833 48.75h22.75v-.014c5.433-.282 9.75-4.775 9.75-10.278 0-5.683-4.608-10.291-10.291-10.291-.753 0-1.486.081-2.193.234-1.493-4.54-5.768-7.818-10.807-7.818-6.193 0-11.229 4.948-11.372 11.106a8.67 8.67 0 00-6.503 8.394 8.666 8.666 0 008.666 8.667z"
      fill="#fff"
      fill-opacity=".9"
    />
    <defs>
      <linearGradient
        id="_weather"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 65 -65 0 32.5 0)"
      >
        <stop offset="0" stop-color="#008ee7" />
        <stop offset="1" stop-color="#00d6fa" />
      </linearGradient>
      <linearGradient
        id="_sun"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(90 3.25 18.417) scale(23.8333)"
      >
        <stop offset="0" stop-color="#ffcc51" />
        <stop offset="1" stop-color="#f2da48" />
      </linearGradient>
    </defs>
  </svg>
</template>
