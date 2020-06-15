const transparent = 'transparent';
const white = 'white';
const almostWhite = '#FAFAFA';
const separator = '#D4D4D4';

const primary = '#440099';
const primary75 = '#440099BF';
const primary50 = '#44009980';
const primary25 = '#E3CCFF';
const primaryContrast = white;

const secondary = '#D30098';
const secondary75 = '#D30098BF';
const secondary50 = '#D3009880';
const secondary25 = '#D3009840';
const secondaryContrast = white;

const neutral = '#4A4A4A';
const neutral75 = '#4A4A4ABF';
const neutral50 = '#4A4A4A80';
const neutral25 = '#4A4A4A40';
const neutralContrast = '#CCC';

const disabled = '#F0F0F0';
const disabledContrast = '#666';

const error = '#FCC';
const errorContrast = '#D00';

const link = '#0047b8';
const link75 = '#0047b8BF';

const defaultTheme = {
  primary,
  primary75,
  primary50,
  primary25,
  primaryContrast,

  secondary,
  secondary75,
  secondary50,
  secondary25,
  secondaryContrast,

  neutral,
  neutral75,
  neutral50,
  neutral25,
  neutralContrast,

  disabled,
  disabledContrast,

  error,
  errorContrast,

  link,

  table: {
    head: {
      background: disabled,
      backgroundContrast: disabledContrast,
    },

    background: white,
    backgroundOdd: almostWhite,
    separator,
  },

  text: {
    boldWeight: 600,
  },

  bezier: {
    fast: 'cubic-bezier(0, 0.65, 0.2, 1)',
  },

  button: {
    link: {
      primary: {
        background: {
          enabled: transparent,
          disabled: transparent,
        },
        text: {
          enabled: link,
          disabled,
        },
        border: {
          enabled: transparent,
          disabled: transparent,
        },
        highlight: {
          background: {
            enabled: transparent,
            disabled: transparent,
          },
          text: {
            enabled: link75,
            disabled,
          },
          border: {
            enabled: transparent,
            disabled: transparent,
          },
        },
      },
    },

    flat: {
      primary: {
        background: {
          enabled: transparent,
          disabled: transparent,
        },
        text: {
          enabled: primary,
          disabled: disabledContrast,
        },
        border: {
          enabled: transparent,
          disabled: transparent,
        },
        highlight: {
          background: {
            enabled: transparent,
            disabled: transparent,
          },
          text: {
            enabled: primary75,
            disabled: disabledContrast,
          },
          border: {
            enabled: transparent,
            disabled: transparent,
          },
        },
      },
      secondary: {
        background: {
          enabled: transparent,
          disabled: transparent,
        },
        text: {
          enabled: secondary,
          disabled: disabledContrast,
        },
        border: {
          enabled: transparent,
          disabled: transparent,
        },
        highlight: {
          background: {
            enabled: transparent,
            disabled: transparent,
          },
          text: {
            enabled: secondary75,
            disabled: disabledContrast,
          },
          border: {
            enabled: transparent,
            disabled: transparent,
          },
        },
      },
      neutral: {
        background: {
          enabled: transparent,
          disabled: transparent,
        },
        text: {
          enabled: neutral,
          disabled: disabledContrast,
        },
        border: {
          enabled: transparent,
          disabled: transparent,
        },
        highlight: {
          background: {
            enabled: transparent,
            disabled: transparent,
          },
          text: {
            enabled: neutral75,
            disabled: disabledContrast,
          },
          border: {
            enabled: transparent,
            disabled: transparent,
          },
        },
      },
    },
    filled: {
      primary: {
        background: {
          enabled: primary,
          disabled,
        },
        text: {
          enabled: white,
          disabled: disabledContrast,
        },
        border: {
          enabled: primary,
          disabled,
        },
        highlight: {
          background: {
            enabled: primary75,
            disabled,
          },
          text: {
            enabled: white,
            disabled: disabledContrast,
          },
          border: {
            enabled: primary75,
            disabled,
          },
        },
      },
      secondary: {
        background: {
          enabled: secondary,
          disabled,
        },
        text: {
          enabled: white,
          disabled: disabledContrast,
        },
        border: {
          enabled: secondary,
          disabled,
        },
        highlight: {
          background: {
            enabled: secondary75,
            disabled,
          },
          text: {
            enabled: white,
            disabled: disabledContrast,
          },
          border: {
            enabled: secondary75,
            disabled,
          },
        },
      },
      neutral: {
        background: {
          enabled: neutral,
          disabled,
        },
        text: {
          enabled: white,
          disabled: disabledContrast,
        },
        border: {
          enabled: neutral,
          disabled,
        },
        highlight: {
          background: {
            enabled: neutral75,
            disabled,
          },
          text: {
            enabled: white,
            disabled: disabledContrast,
          },
          border: {
            enabled: neutral75,
            disabled,
          },
        },
      },
    },
    outlined: {
      primary: {
        background: {
          enabled: white,
          disabled: white,
        },
        text: {
          enabled: primary,
          disabled: disabledContrast,
        },
        border: {
          enabled: primary,
          disabled: disabledContrast,
        },
        highlight: {
          background: {
            enabled: white,
            disabled: white,
          },
          text: {
            enabled: primary75,
            disabled: disabledContrast,
          },
          border: {
            enabled: primary75,
            disabled: disabledContrast,
          },
        },
      },
      secondary: {
        background: {
          enabled: white,
          disabled: white,
        },
        text: {
          enabled: secondary,
          disabled: disabledContrast,
        },
        border: {
          enabled: secondary,
          disabled: disabledContrast,
        },
        highlight: {
          background: {
            enabled: white,
            disabled: white,
          },
          text: {
            enabled: secondary75,
            disabled: disabledContrast,
          },
          border: {
            enabled: secondary75,
            disabled: disabledContrast,
          },
        },
      },
      neutral: {
        background: {
          enabled: white,
          disabled: white,
        },
        text: {
          enabled: neutral,
          disabled: disabledContrast,
        },
        border: {
          enabled: neutral,
          disabled: disabledContrast,
        },
        highlight: {
          background: {
            enabled: white,
            disabled: white,
          },
          text: {
            enabled: neutral75,
            disabled: disabledContrast,
          },
          border: {
            enabled: neutral75,
            disabled: disabledContrast,
          },
        },
      },
    },
  },
};

export default defaultTheme;
