import { createGlobalStyle } from 'styled-components'

const NProgressStyles = createGlobalStyle`
  #nprogress {
    pointer-events: none; /* Disable interaction while loading */
  }

  #nprogress .bar {
    background: #29d; /* Progress bar color */
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px; /* Bar height */
  }

  #nprogress .peg {
    display: none; /* Disable the moving shadow */
  }

  #nprogress .spinner {
    display: none; /* Hide the spinner */
  }

  /* Optionally add a shadow or additional effects to the bar */
  #nprogress .bar {
    box-shadow: 0 0 10px #29d, 0 0 5px #29d; /* Glowing effect */
  }
`

export default function NgProgress() {
  return <NProgressStyles />
}
