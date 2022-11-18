import { screens } from "../theme";

const cssHelpers = `
  /* Utility classes */
  .no-wrap {
    white-space: nowrap;
  }
  .hidden {
    display: none;
    max-width: 0px;
    max-height: 0px;
    overflow: hidden;
    mso-hide: all;
  }
  .lg-hidden {
    display: none;
    max-width: 0px;
    max-height: 0px;
    overflow: hidden;
    mso-hide: all;
  }

  @media (min-width: ${screens.xs}) {
    /* Utility classes */
    .sm-hidden {
      display: none;
      max-width: 0px;
      max-height: 0px;
      overflow: hidden;
      mso-hide: all;
    }
    .lg-hidden {
      display: block !important;
      max-width: none !important;
      max-height: none !important;
      overflow: visible !important;
      mso-hide: none !important;
    }
  }
  `;

export default cssHelpers;
