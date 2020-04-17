import React from "react";
import { string, bool, node } from "prop-types";
import styled from "styled-components";

import Loader from "components/common/icons/Loader";

const Shade = styled.div`
  align-items: center;
  background-color: ${({ theme: { neutral25 } }) => neutral25};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;

  position: absolute;
  right: 0;
  top: 0;

  z-index: 75;
`;

const StyledLoader = styled(Loader)`
  height: 5rem;
`;

function LoaderOverlay({ className, children, loading }) {
  return (
    <div className={className}>
      {children}
      {loading && (
        <Shade>
          <StyledLoader />
        </Shade>
      )}
    </div>
  );
}

LoaderOverlay.propTypes = {
  className: string,
  loading: bool,
  children: node
};

LoaderOverlay.defaultProps = {
  className: undefined,
  loading: false,
  children: undefined
};

export default styled(LoaderOverlay)`
  display: inherit;
  position: relative;
`;
