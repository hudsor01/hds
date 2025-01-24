import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

      body {
        font-family: 'Roboto', sans-serif;
      }

      .font-primary {
        font-family: 'Roboto', sans-serif;
      }

      .text-pastel {
        color: #A7C7E7;
      }

      .bg-pastel {
        background-color: #A7C7E7;
      }
    `}
  />
);
